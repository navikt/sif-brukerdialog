import { BodyLong, Heading, Link } from '@navikt/ds-react';
import { ExternalLink } from '@navikt/ds-icons';
import Block from '../../atoms/block/Block';
import ExpandableInfo from '../../components/expandable-info/ExpandableInfo';
import bemUtils from '../../utils/bemUtils';
import ScanningIcon from './scanning-icon/ScanningIcon';
import PictureScanningExample from './storybook/PictureScanningExample';
import './pictureScanningGuide.scss';
import { CoreText, useCoreIntl } from '../../i18n/common.messages';

const bem = bemUtils('pictureScanningGuide');

const PictureScanningGuide = () => {
    const { text } = useCoreIntl();
    const svgIconHeight = 100;
    return (
        <ExpandableInfo title={text('psg.expandable.tittel')}>
            <div className={bem.block}>
                <Block margin="l">
                    <Heading level="3" size="xsmall" spacing={true}>
                        <CoreText id="psg.section1.tittel" />
                    </Heading>
                </Block>
                <BodyLong as="div">
                    <ul>
                        <li>
                            <CoreText id="psg.section1.liste.1" />
                        </li>
                        <li>
                            <CoreText id="psg.section1.liste.2" />
                        </li>
                        <li>
                            <CoreText id="psg.section1.liste.3" />
                        </li>
                    </ul>
                </BodyLong>

                <div>
                    <Heading level="3" size="xsmall" spacing={true}>
                        <CoreText id="psg.section2.tittel" />
                    </Heading>
                    <ul>
                        <li>
                            <CoreText id="psg.section2.liste.1" />
                        </li>
                        <li>
                            <CoreText id="psg.section2.liste.2" />
                        </li>
                        <li>
                            <CoreText id="psg.section2.liste.3" />
                        </li>
                    </ul>
                </div>
                <div>
                    <Heading level="3" size="xsmall" spacing={true}>
                        <CoreText id="psg.section3.tittel" />
                    </Heading>
                    <ul>
                        <li>
                            <CoreText id="psg.section3.liste.1" />
                        </li>
                        <li>
                            <CoreText id="psg.section3.liste.2" />
                        </li>
                        <li>
                            <CoreText id="psg.section3.liste.3" />
                        </li>
                    </ul>
                </div>
                <div>
                    <Heading level="3" size="xsmall" spacing={true}>
                        <CoreText id="psg.icon.heading" />
                    </Heading>

                    <div className={bem.element('body')}>
                        <div className={bem.element('cell')}>
                            <PictureScanningExample
                                image={<ScanningIcon status="good" height={svgIconHeight} />}
                                status="suksess"
                                statusText={text('psg.good')}
                                description={text('psg.icon.label.good')}
                            />
                        </div>
                        <div className={bem.element('cell')}>
                            <PictureScanningExample
                                image={<ScanningIcon status="keystone" height={svgIconHeight} />}
                                status="feil"
                                statusText={text('psg.bad')}
                                description={text('psg.icon.label.keystone')}
                            />
                        </div>
                        <div className={bem.element('cell')}>
                            <PictureScanningExample
                                image={<ScanningIcon status="horizontal" height={svgIconHeight} />}
                                status="feil"
                                statusText={text('psg.bad')}
                                description={text('psg.icon.label.horizontal')}
                            />
                        </div>
                        <div className={bem.element('cell')}>
                            <PictureScanningExample
                                image={<ScanningIcon status="shadow" height={svgIconHeight} />}
                                status="feil"
                                statusText={text('psg.bad')}
                                description={text('psg.icon.label.shadow')}
                            />
                        </div>
                    </div>
                    <Link target="_blank" href={text('psg.lenkepanel.url')}>
                        <CoreText id="psg.lenkepanel.text" />
                        <ExternalLink />
                    </Link>
                </div>
            </div>
        </ExpandableInfo>
    );
};
export default PictureScanningGuide;
