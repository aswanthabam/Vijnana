import React from 'react';
import TopBar from '../../components/topbar/topbar';

interface TopBarLayerProps {
  children: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
}

const TopBarLayer : React.FC<TopBarLayerProps> = ({children}) => {
  return <>
    <TopBar/>
    {children}
  </>
}

export default TopBarLayer;