import React from 'react';
import ResponsivePanel from '../responsive-panel/ResponsivePanel';

interface Props {
    usePanelLayout: boolean;
    children: React.ReactNode;
}

const ConditionalResponsivePanel: React.FunctionComponent<Props> = ({ usePanelLayout, children }) => {
    return usePanelLayout ? <ResponsivePanel>{children}</ResponsivePanel> : <>{children}</>;
};

export default ConditionalResponsivePanel;
