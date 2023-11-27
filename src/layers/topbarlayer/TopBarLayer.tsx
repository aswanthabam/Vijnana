import React from "react";
import TopBar from "../../components/topbar/topbar";

interface TopBarLayerProps {
  children: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
  setTheme: (theme: string) => void;
  theme: string;
}

const TopBarLayer: React.FC<TopBarLayerProps> = ({
  children,
  setTheme,
  theme,
}) => {
  return (
    <>
      <TopBar setTheme={setTheme} theme={theme} />
      {children}
    </>
  );
};

export default TopBarLayer;
