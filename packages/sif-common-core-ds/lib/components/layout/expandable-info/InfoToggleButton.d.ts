import React from 'react';
import './infoToggleButton.less';
interface Props {
    controlsId: string;
    children: React.ReactNode;
    isOpen?: boolean;
    onToggle: () => void;
}
declare const InfoToggleButton: (props: Props) => JSX.Element;
export default InfoToggleButton;
