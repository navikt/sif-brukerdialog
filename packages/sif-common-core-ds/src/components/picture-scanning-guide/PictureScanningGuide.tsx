import { BodyLong, Heading, Link } from '@navikt/ds-react';
import { FormattedMessage, useIntl } from 'react-intl';
import { ExternalLink } from '@navikt/ds-icons';
import Block from '../../atoms/block/Block';
import ExpandableInfo from '../../components/expandable-info/ExpandableInfo';
import bemUtils from '../../utils/bemUtils';
import intlHelper from '../../utils/intlUtils';
import ScanningIcon from './scanning-icon/ScanningIcon';
import PictureScanningExample from './storybook/PictureScanningExample';
import './pictureScanningGuide.scss';

const bem = bemUtils('pictureScanningGuide');

const PictureScanningGuide = () => {
    const intl = useIntl();
    const svgIconHeight = 100;
    return (
        <ExpandableInfo title={intlHelper(intl, 'psg.expandable.tittel')}>
            <div className={bem.block}>
                <Block margin="l">
                    <Heading level="2" size="small" spacing={true}>
                        <FormattedMessage id="psg.section1.tittel" />
                    </Heading>
                </Block>
                <BodyLong as="div">
                    <ul>
                        <li>
                            <FormattedMessage id="psg.section1.liste.1" />
                        </li>
                        <li>
                            <FormattedMessage id="psg.section1.liste.2" />
                        </li>
                        <li>
                            <FormattedMessage id="psg.section1.liste.3" />
                        </li>
                        <li>
                            <FormattedMessage id="psg.section1.liste.4" />
                        </li>
                    </ul>
                </BodyLong>

                <div>
                    <Heading level="3" size="xsmall" spacing={true}>
                        <FormattedMessage id="psg.section2.tittel" />
                    </Heading>
                    <ul>
                        <li>
                            <FormattedMessage id="psg.section2.liste.1" />
                        </li>
                        <li>
                            <FormattedMessage id="psg.section2.liste.2" />
                        </li>
                        <li>
                            <FormattedMessage id="psg.section2.liste.3" />
                        </li>
                    </ul>
                </div>

                <div>
                    <Heading level="3" size="xsmall" spacing={true}>
                        <FormattedMessage id="psg.icon.heading" />
                    </Heading>

                    <div className={bem.element('body')}>
                        <div className={bem.element('cell')}>
                            <PictureScanningExample
                                image={<ScanningIcon status="good" height={svgIconHeight} />}
                                status="suksess"
                                statusText={intlHelper(intl, 'psg.good')}
                                description={intlHelper(intl, 'psg.icon.label.good')}
                            />
                        </div>
                        <div className={bem.element('cell')}>
                            <PictureScanningExample
                                image={<ScanningIcon status="keystone" height={svgIconHeight} />}
                                status="feil"
                                statusText={intlHelper(intl, 'psg.bad')}
                                description={intlHelper(intl, 'psg.icon.label.keystone')}
                            />
                        </div>
                        <div className={bem.element('cell')}>
                            <PictureScanningExample
                                image={<ScanningIcon status="horizontal" height={svgIconHeight} />}
                                status="feil"
                                statusText={intlHelper(intl, 'psg.bad')}
                                description={intlHelper(intl, 'psg.icon.label.horizontal')}
                            />
                        </div>
                        <div className={bem.element('cell')}>
                            <PictureScanningExample
                                image={<ScanningIcon status="shadow" height={svgIconHeight} />}
                                status="feil"
                                statusText={intlHelper(intl, 'psg.bad')}
                                description={intlHelper(intl, 'psg.icon.label.shadow')}
                            />
                        </div>
                    </div>
                    <Link target="_blank" href={intlHelper(intl, 'psg.lenkepanel.url')}>
                        <FormattedMessage id="psg.lenkepanel.text" />
                        <ExternalLink />
                    </Link>
                </div>
            </div>
        </ExpandableInfo>
    );
};
export default PictureScanningGuide;
