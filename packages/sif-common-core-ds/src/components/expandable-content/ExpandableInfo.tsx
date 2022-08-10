import React, { useState } from 'react';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { guid } from 'nav-frontend-js-utils';
import { Normaltekst } from 'nav-frontend-typografi';
import bemUtils from '../../utils/bemUtils';
import CollapsableContainer from './CollapsableContainer';
import InfoToggleButton from './InfoToggleButton';
import './expandableInfo.less';

interface Props {
    children: React.ReactNode;
    title?: string;
    closeTitle?: string;
    initialOpen?: boolean;
    filledBackground?: boolean;
}

const bem = bemUtils('expandableInfo');

const ExpandableInfo = ({ children, initialOpen, closeTitle, title, filledBackground = true }: Props) => {
    const [isOpen, setIsOpen] = useState<boolean>(initialOpen || false);
    const [toggleContentId] = useState(guid());

    return (
        <div className={bem.block}>
            <div className={bem.element('toggler', isOpen ? 'open' : undefined)}>
                <InfoToggleButton onToggle={() => setIsOpen(!isOpen)} isOpen={isOpen} controlsId={toggleContentId}>
                    <Normaltekst tag="span">{isOpen ? closeTitle || title : title}</Normaltekst>
                </InfoToggleButton>
            </div>
            <div className={bem.element('content')} id={toggleContentId}>
                <CollapsableContainer isOpen={isOpen} animated={true} ariaLive="polite">
                    {filledBackground ? <AlertStripeInfo>{children}</AlertStripeInfo> : children}
                </CollapsableContainer>
            </div>
        </div>
    );
};

export default ExpandableInfo;
