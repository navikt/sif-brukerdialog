import './pictureScanningGuide.css';

import { ExternalLinkIcon } from '@navikt/aksel-icons';
import { BodyLong, Box, Heading, HStack, Link, List, ReadMore, VStack } from '@navikt/ds-react';

import { useSifSoknadUiIntl } from '../../i18n';
import ScanningIcon from './ScanningIcon';

type HeadingLevel = '2' | '3' | '4' | '5';

const nextLevel = (level: HeadingLevel): HeadingLevel => {
    const map: Record<HeadingLevel, HeadingLevel> = { '2': '3', '3': '4', '4': '5', '5': '5' };
    return map[level];
};

interface Props {
    headingLevel?: HeadingLevel;
}

const ScanningExample = ({
    image,
    statusText,
    isGood,
    description,
    headingLevel,
}: {
    image: React.ReactNode;
    statusText: string;
    isGood: boolean;
    description: string;
    headingLevel: HeadingLevel;
}) => (
    <BodyLong as="div">
        <Box marginBlock="space-0 space-16">{image}</Box>
        <Heading size="xsmall" level={headingLevel} spacing={true}>
            <HStack gap="space-4" align="center">
                <span aria-hidden="true">{isGood ? '✓' : '✗'}</span>
                <span>{statusText}</span>
            </HStack>
        </Heading>
        <p>{description}</p>
    </BodyLong>
);

export const PictureScanningGuide = ({ headingLevel = '2' }: Props) => {
    const { text } = useSifSoknadUiIntl();
    const childLevel = nextLevel(headingLevel);
    const exampleLevel = nextLevel(childLevel);
    const svgIconHeight = 100;

    return (
        <ReadMore header={text('@sifSoknadUi.psg.expandable.tittel')}>
            <div className="pictureScanningGuide">
                <BodyLong as="div">
                    <VStack gap="space-24">
                        <Heading level={headingLevel} size="medium">
                            {text('@sifSoknadUi.psg.tittel')}
                        </Heading>
                        <div>
                            <Heading level={childLevel} size="small" spacing={true}>
                                {text('@sifSoknadUi.psg.section1.tittel')}
                            </Heading>
                            <List>
                                <List.Item>{text('@sifSoknadUi.psg.section1.liste.1')}</List.Item>
                                <List.Item>{text('@sifSoknadUi.psg.section1.liste.2')}</List.Item>
                                <List.Item>{text('@sifSoknadUi.psg.section1.liste.3')}</List.Item>
                            </List>
                        </div>
                        <div>
                            <Heading level={childLevel} size="small" spacing={true}>
                                {text('@sifSoknadUi.psg.section2.tittel')}
                            </Heading>
                            <List>
                                <List.Item>{text('@sifSoknadUi.psg.section2.liste.1')}</List.Item>
                                <List.Item>{text('@sifSoknadUi.psg.section2.liste.2')}</List.Item>
                                <List.Item>{text('@sifSoknadUi.psg.section2.liste.3')}</List.Item>
                            </List>
                        </div>
                        <div>
                            <Heading level={childLevel} size="small" spacing={true}>
                                {text('@sifSoknadUi.psg.section3.tittel')}
                            </Heading>
                            <List>
                                <List.Item>{text('@sifSoknadUi.psg.section3.liste.1')}</List.Item>
                                <List.Item>{text('@sifSoknadUi.psg.section3.liste.2')}</List.Item>
                                <List.Item>{text('@sifSoknadUi.psg.section3.liste.3')}</List.Item>
                            </List>
                        </div>
                        <div>
                            <Heading level={childLevel} size="small" spacing={true}>
                                {text('@sifSoknadUi.psg.icon.heading')}
                            </Heading>
                            <div className="pictureScanningGuide__body">
                                <div className="pictureScanningGuide__cell">
                                    <ScanningExample
                                        image={<ScanningIcon status="good" height={svgIconHeight} />}
                                        isGood={true}
                                        statusText={text('@sifSoknadUi.psg.good')}
                                        description={text('@sifSoknadUi.psg.icon.label.good')}
                                        headingLevel={exampleLevel}
                                    />
                                </div>
                                <div className="pictureScanningGuide__cell">
                                    <ScanningExample
                                        image={<ScanningIcon status="keystone" height={svgIconHeight} />}
                                        isGood={false}
                                        statusText={text('@sifSoknadUi.psg.bad')}
                                        description={text('@sifSoknadUi.psg.icon.label.keystone')}
                                        headingLevel={exampleLevel}
                                    />
                                </div>
                                <div className="pictureScanningGuide__cell">
                                    <ScanningExample
                                        image={<ScanningIcon status="horizontal" height={svgIconHeight} />}
                                        isGood={false}
                                        statusText={text('@sifSoknadUi.psg.bad')}
                                        description={text('@sifSoknadUi.psg.icon.label.horizontal')}
                                        headingLevel={exampleLevel}
                                    />
                                </div>
                                <div className="pictureScanningGuide__cell">
                                    <ScanningExample
                                        image={<ScanningIcon status="shadow" height={svgIconHeight} />}
                                        isGood={false}
                                        statusText={text('@sifSoknadUi.psg.bad')}
                                        description={text('@sifSoknadUi.psg.icon.label.shadow')}
                                        headingLevel={exampleLevel}
                                    />
                                </div>
                            </div>
                            <Link
                                target="_blank"
                                rel="noopener noreferrer"
                                href={text('@sifSoknadUi.psg.lenkepanel.url')}>
                                {text('@sifSoknadUi.psg.lenkepanel.text')}
                                <ExternalLinkIcon role="presentation" aria-hidden={true} />
                            </Link>
                        </div>
                    </VStack>
                </BodyLong>
            </div>
        </ReadMore>
    );
};
