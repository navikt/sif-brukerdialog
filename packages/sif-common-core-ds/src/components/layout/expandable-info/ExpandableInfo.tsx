import { Alert } from '@navikt/ds-react';
import React, { useState } from 'react';
import bemUtils from '@navikt/sif-common-core/lib/utils/bemUtils';
import { v4 as uuid } from 'uuid';
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
    const [toggleContentId] = useState(uuid());

    return (
        <div className={bem.block}>
            <div className={bem.element('toggler', isOpen ? 'open' : undefined)}>
                <InfoToggleButton onToggle={() => setIsOpen(!isOpen)} isOpen={isOpen} controlsId={toggleContentId}>
                    {isOpen ? closeTitle || title : title}
                </InfoToggleButton>
            </div>
            <div className={bem.element('content')} id={toggleContentId}>
                <CollapsableContainer isOpen={isOpen} animated={true} ariaLive="polite">
                    {filledBackground ? <Alert variant="info">{children}</Alert> : children}
                </CollapsableContainer>
            </div>
        </div>
    );
};

export default ExpandableInfo;
