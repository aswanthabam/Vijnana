import React, { useContext, useState } from 'react';

interface ThemeLayerProps {
  children: string | JSX.Element | JSX.Element[];
}
var theme: null | [string, React.Dispatch<React.SetStateAction<string>>] = null;

const ThemeLayer : React.FC<ThemeLayerProps> = ({children}) => {
  theme = useState('light');
  return <ThemeContext.Provider value={theme}>
  <div className={theme[0]}>
    {children}
  </div></ThemeContext.Provider>
}

export const ThemeContext = React.createContext(theme);

export default ThemeLayer;