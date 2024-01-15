import React, { ReactNode } from 'react';
import { useMediaQuery } from 'react-responsive';
import bemUtils from '@navikt/sif-common-core-ds/src/utils/bemUtils';
import classNames from 'classnames';
import './labelInputInfoLayout.less';

interface Props {
    narrowBreakpoint?: number;
    label: ReactNode;
    input: ReactNode;
    info?: ReactNode;
}

const bem = bemUtils('labelInputInfoLayout');

const LabelInputInfoLayout: React.FunctionComponent<Props> = ({ narrowBreakpoint = 860, label, input, info }) => {
    const isNarrow = useMediaQuery({
        query: `(max-width: ${narrowBreakpoint}px)`,
    });
    return (
        <div className={classNames(bem.block, bem.modifierConditional('narrow', isNarrow))}>
            <div className={bem.element('labelWrapper')} role="presentation" aria-hidden={true}>
                {label}
            </div>
            <div className={bem.element('inputWrapper')}>{input}</div>
            {info && <div className={bem.element('infoWrapper')}>{info}</div>}
        </div>
    );
};

export default LabelInputInfoLayout;
