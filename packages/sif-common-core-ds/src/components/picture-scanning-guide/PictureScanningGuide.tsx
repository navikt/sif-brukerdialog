import { BodyLong, Heading, Link, List, VStack } from '@navikt/ds-react';
import { ExternalLink } from '@navikt/ds-icons';
import ExpandableInfo from '../../components/expandable-info/ExpandableInfo';
import { CoreText, useCoreIntl } from '../../i18n/common.messages';
import bemUtils from '../../utils/bemUtils';
import ScanningIcon from './scanning-icon/ScanningIcon';
import PictureScanningExample from './storybook/PictureScanningExample';
import './pictureScanningGuide.scss';

const bem = bemUtils('pictureScanningGuide');

const PictureScanningGuide = () => {
    const { text } = useCoreIntl();
    const svgIconHeight = 100;
    return (
        <ExpandableInfo title={text('@core.psg.expandable.tittel')}>
            <div className={bem.block}>
                <BodyLong as="div">
                    <VStack gap="6">
                        <Heading level="2" size="medium">
                            <CoreText id="@core.psg.tittel" />
                        </Heading>
                        <List title={text('@core.psg.section1.tittel')} headingTag={'h3'}>
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

                        <List title={text('@core.psg.section2.tittel')} headingTag={'h3'}>
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
                        <List title={text('@core.psg.section3.tittel')} headingTag={'h3'}>
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
                        <div>
                            <Heading level="3" size="small" spacing={true}>
                                <CoreText id="@core.psg.icon.heading" />
                            </Heading>

                            <div className={bem.element('body')}>
                                <div className={bem.element('cell')}>
                                    <PictureScanningExample
                                        image={<ScanningIcon status="good" height={svgIconHeight} />}
                                        status="suksess"
                                        statusText={text('@core.psg.good')}
                                        description={text('@core.psg.icon.label.good')}
                                    />
                                </div>
                                <div className={bem.element('cell')}>
                                    <PictureScanningExample
                                        image={<ScanningIcon status="keystone" height={svgIconHeight} />}
                                        status="feil"
                                        statusText={text('@core.psg.bad')}
                                        description={text('@core.psg.icon.label.keystone')}
                                    />
                                </div>
                                <div className={bem.element('cell')}>
                                    <PictureScanningExample
                                        image={<ScanningIcon status="horizontal" height={svgIconHeight} />}
                                        status="feil"
                                        statusText={text('@core.psg.bad')}
                                        description={text('@core.psg.icon.label.horizontal')}
                                    />
                                </div>
                                <div className={bem.element('cell')}>
                                    <PictureScanningExample
                                        image={<ScanningIcon status="shadow" height={svgIconHeight} />}
                                        status="feil"
                                        statusText={text('@core.psg.bad')}
                                        description={text('@core.psg.icon.label.shadow')}
                                    />
                                </div>
                            </div>
                            <Link target="_blank" href={text('@core.psg.lenkepanel.url')}>
                                <CoreText id="@core.psg.lenkepanel.text" />
                                <ExternalLink />
                            </Link>
                        </div>
                    </VStack>
                </BodyLong>
            </div>
        </ExpandableInfo>
    );
};
export default PictureScanningGuide;
