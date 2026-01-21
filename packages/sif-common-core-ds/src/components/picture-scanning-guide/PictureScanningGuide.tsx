import './pictureScanningGuide.scss';

import { ExternalLinkIcon } from '@navikt/aksel-icons';
import { BodyLong, Heading, Link, List, VStack } from '@navikt/ds-react';

import ExpandableInfo from '../../components/expandable-info/ExpandableInfo';
import { CoreText, useCoreIntl } from '../../i18n/common.messages';
import bemUtils from '../../utils/bemUtils';
import { getChildHeadingLevel, HeadingLevel } from '../../utils/headingLevelUtils';
import ScanningIcon from './scanning-icon/ScanningIcon';
import PictureScanningExample from './storybook/PictureScanningExample';

const bem = bemUtils('pictureScanningGuide');
interface Props {
    headingLevel?: HeadingLevel;
}

const PictureScanningGuide = ({ headingLevel = '2' }: Props) => {
    const { text } = useCoreIntl();
    const svgIconHeight = 100;
    const childHeadingLevel = getChildHeadingLevel(headingLevel);
    const exampleHeadingLevel = getChildHeadingLevel(childHeadingLevel);

    return (
        <ExpandableInfo title={text('@core.psg.expandable.tittel')}>
            <div className={bem.block}>
                <BodyLong as="div">
                    <VStack gap="space-24">
                        <Heading level={headingLevel} size="medium">
                            <CoreText id="@core.psg.tittel" />
                        </Heading>
                        <div>
                            <Heading level={childHeadingLevel} size="small" spacing={true}>
                                <CoreText id="@core.psg.section1.tittel" />
                            </Heading>
                            <List>
                                <List.Item>
                                    <CoreText id="@core.psg.section1.liste.1" />
                                </List.Item>
                                <List.Item>
                                    <CoreText id="@core.psg.section1.liste.2" />
                                </List.Item>
                                <List.Item>
                                    <CoreText id="@core.psg.section1.liste.3" />
                                </List.Item>
                            </List>
                        </div>

                        <div>
                            <Heading level={childHeadingLevel} size="small" spacing={true}>
                                <CoreText id="@core.psg.section2.tittel" />
                            </Heading>
                            <List>
                                <List.Item>
                                    <CoreText id="@core.psg.section2.liste.1" />
                                </List.Item>
                                <List.Item>
                                    <CoreText id="@core.psg.section2.liste.2" />
                                </List.Item>
                                <List.Item>
                                    <CoreText id="@core.psg.section2.liste.3" />
                                </List.Item>
                            </List>
                        </div>
                        <div>
                            <Heading level={childHeadingLevel} size="small" spacing={true}>
                                <CoreText id="@core.psg.section3.tittel" />
                            </Heading>
                            <List>
                                <List.Item>
                                    <CoreText id="@core.psg.section3.liste.1" />
                                </List.Item>
                                <List.Item>
                                    <CoreText id="@core.psg.section3.liste.2" />
                                </List.Item>
                                <List.Item>
                                    <CoreText id="@core.psg.section3.liste.3" />
                                </List.Item>
                            </List>
                        </div>
                        <div>
                            <Heading level={childHeadingLevel} size="small" spacing={true}>
                                <CoreText id="@core.psg.icon.heading" />
                            </Heading>

                            <div className={bem.element('body')}>
                                <div className={bem.element('cell')}>
                                    <PictureScanningExample
                                        image={<ScanningIcon status="good" height={svgIconHeight} />}
                                        status="suksess"
                                        headingLevel={exampleHeadingLevel}
                                        statusText={text('@core.psg.good')}
                                        description={text('@core.psg.icon.label.good')}
                                    />
                                </div>
                                <div className={bem.element('cell')}>
                                    <PictureScanningExample
                                        image={<ScanningIcon status="keystone" height={svgIconHeight} />}
                                        status="feil"
                                        headingLevel={exampleHeadingLevel}
                                        statusText={text('@core.psg.bad')}
                                        description={text('@core.psg.icon.label.keystone')}
                                    />
                                </div>
                                <div className={bem.element('cell')}>
                                    <PictureScanningExample
                                        image={<ScanningIcon status="horizontal" height={svgIconHeight} />}
                                        status="feil"
                                        headingLevel={exampleHeadingLevel}
                                        statusText={text('@core.psg.bad')}
                                        description={text('@core.psg.icon.label.horizontal')}
                                    />
                                </div>
                                <div className={bem.element('cell')}>
                                    <PictureScanningExample
                                        image={<ScanningIcon status="shadow" height={svgIconHeight} />}
                                        status="feil"
                                        headingLevel={exampleHeadingLevel}
                                        statusText={text('@core.psg.bad')}
                                        description={text('@core.psg.icon.label.shadow')}
                                    />
                                </div>
                            </div>
                            <Link target="_blank" href={text('@core.psg.lenkepanel.url')}>
                                <CoreText id="@core.psg.lenkepanel.text" />
                                <ExternalLinkIcon role="presentation" aria-hidden={true} />
                            </Link>
                        </div>
                    </VStack>
                </BodyLong>
            </div>
        </ExpandableInfo>
    );
};
export default PictureScanningGuide;
