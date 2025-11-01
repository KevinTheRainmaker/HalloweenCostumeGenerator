
import React, { useState, useEffect } from 'react';
import { HALLOWEEN_THEMES } from '../constants';

interface ThemeSelectorProps {
  onThemeChange: (theme: string) => void;
}

const CUSTOM_THEME_VALUE = 'custom';

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ onThemeChange }) => {
  const [selected, setSelected] = useState('');
  const [customTheme, setCustomTheme] = useState('');

  useEffect(() => {
    if (selected === CUSTOM_THEME_VALUE) {
      onThemeChange(customTheme);
    } else {
      onThemeChange(selected);
    }
  }, [selected, customTheme, onThemeChange]);

  return (
    <div className="space-y-4">
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
      >
        <option value="" disabled>Select a theme...</option>
        {HALLOWEEN_THEMES.map((theme) => (
          <option key={theme} value={theme}>{theme}</option>
        ))}
        <option value={CUSTOM_THEME_VALUE}>Custom...</option>
      </select>

      {selected === CUSTOM_THEME_VALUE && (
        <input
          type="text"
          value={customTheme}
          onChange={(e) => setCustomTheme(e.target.value)}
          placeholder="e.g., Cyberpunk Ghost, Steampunk Vampire"
          className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none placeholder-gray-400"
        />
      )}
    </div>
  );
};
