import { GuidePanel, GuidePanelProps } from '@navikt/ds-react';
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import bemUtils from '../../utils/bemUtils';
import VeilederSVG from '../veileder-svg/VeilederSVG';
import { GuideMood } from './SifGuide';
import './sifGuidePanel.scss';
interface Props extends GuidePanelProps {
    mood?: GuideMood;
    switchToPosterBreakpoint?: number;
    compact?: boolean;
}

const bem = bemUtils('sif-guidePanel');

const SifGuidePanel: React.FunctionComponent<Props> = ({
    mood = 'happy',
    poster,
    compact,
    switchToPosterBreakpoint = 576,
    ...restProps
}) => {
    const isNarrow = useMediaQuery({
        query: `(max-width: ${switchToPosterBreakpoint}px)`,
    });
    const illustration = mood === 'uncertain' ? <VeilederSVG mood="uncertain" /> : undefined;
    return (
        <GuidePanel
            className={bem.classNames(
                bem.block,
                bem.modifierConditional('narrow', isNarrow),
                bem.modifierConditional('compact', compact),
                restProps.className
            )}
            {...restProps}
            poster={isNarrow ? true : poster}
            illustration={illustration}
        />
    );
};

export default SifGuidePanel;
