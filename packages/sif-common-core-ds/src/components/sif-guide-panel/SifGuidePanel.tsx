import { GuidePanel, GuidePanelProps } from '@navikt/ds-react';
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { GuideMood } from './SifGuide';
import bemUtils from '../../utils/bemUtils';
import './sifGuidePanel.css';

interface Props extends GuidePanelProps {
    mood?: GuideMood;
    switchToPosterBreakpoint?: number;
}

const bem = bemUtils('sif-guidePanel');

const SifGuidePanel: React.FunctionComponent<Props> = ({
    // mood = 'happy',
    poster,
    switchToPosterBreakpoint = 576,
    ...restProps
}) => {
    const isNarrow = useMediaQuery({
        query: `(max-width: ${switchToPosterBreakpoint}px)`,
    });

    return (
        <GuidePanel
            className={bem.classNames(bem.block, bem.modifierConditional('narrow', isNarrow), restProps.className)}
            poster={isNarrow ? true : poster}
            {...restProps}
        />
    );
};

export default SifGuidePanel;
