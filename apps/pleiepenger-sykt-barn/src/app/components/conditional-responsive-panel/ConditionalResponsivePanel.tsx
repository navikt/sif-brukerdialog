import { PanelProps } from '@navikt/ds-react';
import React from 'react';
import ResponsivePanel from '../responsive-panel/ResponsivePanel';

interface Props extends PanelProps {
    usePanelLayout: boolean;
    children: React.ReactNode;
}

const ConditionalResponsivePanel: React.FunctionComponent<Props> = ({ usePanelLayout, children, ...rest }) => {
    return usePanelLayout ? <ResponsivePanel {...rest}>{children}</ResponsivePanel> : <>{children}</>;
};

export default ConditionalResponsivePanel;
