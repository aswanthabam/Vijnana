import React from "react";
import TopBar from "../../components/topbar/topbar";

interface TopBarLayerProps {
  children: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
  setTheme: (theme: string) => void;
  setSidebarState: (state: boolean) => void;
  sidebarState: boolean;
  theme: string;
  showLogoutButton?: boolean;
}

const TopBarLayer: React.FC<TopBarLayerProps> = ({
  children,
  setTheme,
  setSidebarState,
  sidebarState,
  showLogoutButton = true,
  theme,
}) => {
  return (
    <>
      <TopBar
        setTheme={setTheme}
        theme={theme}
        setSidebarState={setSidebarState}
        sidebarState={sidebarState}
        showLogoutButton={showLogoutButton}
      />
      {children}
    </>
  );
};

export default TopBarLayer;
