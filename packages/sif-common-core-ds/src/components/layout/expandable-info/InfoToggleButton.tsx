import React from 'react';
import bemUtils from '@navikt/sif-common-core/lib/utils/bemUtils';
import { Collapse, Expand } from '@navikt/ds-icons';
import './infoToggleButton.less';

const cls = bemUtils('infoToggleButton');

interface Props {
    controlsId: string;
    children: React.ReactNode;
    isOpen?: boolean;
    onToggle: () => void;
}

const InfoToggleButton = (props: Props) => {
    const { isOpen = false, children, onToggle, controlsId } = props;
    return (
        <button
            type="button"
            className={cls.block}
            onClick={onToggle}
            aria-expanded={isOpen}
            aria-controls={controlsId}>
            <span className={cls.element('content')}>
                <span className={cls.element('label')}>{children}</span>
                <span className={cls.element('chevron')}>{isOpen ? <Collapse /> : <Expand />}</span>
            </span>
        </button>
    );
};

export default InfoToggleButton;
