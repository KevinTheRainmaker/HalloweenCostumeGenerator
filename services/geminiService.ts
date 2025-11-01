
import { GoogleGenAI, Modality } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateCostumeImage = async (base64Image: string, mimeType: string, theme: string): Promise<string> => {
    
    const model = 'gemini-2.5-flash-image';
    const prompt = `Create a new photo where the person from the original image is wearing a ${theme} Halloween costume. Do not change the person's face. VERY IMPORTANT: The person should naturally take a pose or make a motion that fits the ${theme} costume, as if caught mid-movement. The photo should look like a casual, unplanned selfie with no clear subject or composition, as if taken spontaneously. Include a strong motion blur, and let the dim glow of streetlights spread evenly across the scene. The setting should be a dark street at night, and the image should look like it was taken with an iPhone. Use a 9:16 aspect ratio.`;
    
    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: {
                parts: [
                    {
                        inlineData: {
                            data: base64Image,
                            mimeType: mimeType,
                        },
                    },
                    {
                        text: prompt,
                    },
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });
        
        for (const part of response.candidates?.[0]?.content?.parts || []) {
            if (part.inlineData?.data) {
                return part.inlineData.data;
            }
        }
        
        throw new Error('No image data found in the API response.');

    } catch (error) {
        console.error('Error calling Gemini API:', error);
        throw new Error('The AI failed to generate the image. This might be due to safety restrictions or a temporary issue. Please try a different image or theme.');
    }
};
