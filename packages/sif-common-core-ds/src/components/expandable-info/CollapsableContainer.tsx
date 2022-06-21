import React from 'react';
import { Collapse } from 'react-collapse';
import bemUtils from '../../utils/bemUtils';
import './collapsableContainer.less';

export interface Props {
    children: React.ReactNode;
    isOpen?: boolean;
    ariaLive?: 'assertive' | 'polite' | 'off';
    animated?: boolean;
}

const bem = bemUtils('collapsableContainer');

const CollapsableContainer = ({ children, animated = true, isOpen = false, ariaLive = 'off' }: Props) => {
    const content = <div aria-live={ariaLive}>{isOpen ? <div>{children}</div> : <div />}</div>;
    if (!animated) {
        return content;
    }
    return (
        <Collapse isOpened={isOpen} className={bem.classNames(bem.block, bem.modifierConditional('isOpen', isOpen))}>
            {content}
        </Collapse>
    );
};

export default CollapsableContainer;
