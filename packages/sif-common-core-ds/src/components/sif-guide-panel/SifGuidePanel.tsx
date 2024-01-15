import { BodyLong, GuidePanel, GuidePanelProps, Heading } from '@navikt/ds-react';
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import classNames from 'classnames';
import bemUtils from '../../utils/bemUtils';
import { GuideMood } from './SifGuide';
import VeilederSVG from './VeilederSVG';
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
    title,
    compact,
    switchToPosterBreakpoint = 576,
    children,
    ...restProps
}) => {
    const isNarrow = useMediaQuery({
        query: `(max-width: ${switchToPosterBreakpoint}px)`,
    });
    const illustration = mood === 'uncertain' ? <VeilederSVG mood="uncertain" /> : undefined;
    return (
        <GuidePanel
            className={classNames(
                bem.block,
                bem.modifierConditional('narrow', isNarrow),
                bem.modifierConditional('compact', compact),
                restProps.className,
            )}
            {...restProps}
            poster={isNarrow ? true : poster}
            illustration={illustration}>
            {title && (
                <Heading level="2" size="medium">
                    {title}
                </Heading>
            )}
            <BodyLong spacing={false} as="div">
                {children}
            </BodyLong>
        </GuidePanel>
    );
};

export default SifGuidePanel;
