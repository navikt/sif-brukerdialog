import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Lenke from 'nav-frontend-lenker';
import { Undertittel } from 'nav-frontend-typografi';
import bemHelper from '../../utils/bemUtils';
import intlHelper from '../../utils/intlUtils';
import ExpandableInfo from '../expandable-content/ExpandableInfo';
import PictureScanningExample from './PictureScanningExample';
import ScanningIcon from './scanning-icon/ScanningIcon';
import './pictureScanningGuide.less';

const bem = bemHelper('pictureScanningGuide');

const PictureScanningGuide = () => {
    const intl = useIntl();
    const svgIconHeight = 100;
    return (
        <ExpandableInfo title={intlHelper(intl, 'psg.expandable.tittel')}>
            <div className={bem.block}>
                <Undertittel className={bem.element('title')}>
                    <FormattedMessage id="psg.section1.tittel" />
                </Undertittel>
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
                </ul>

                <Undertittel tag="h3" className={bem.element('title')}>
                    <FormattedMessage id="psg.section2.tittel" />
                </Undertittel>
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
                <div className={bem.element('examples')}>
                    <Undertittel tag="h3" className={bem.element('title')}>
                        <FormattedMessage id="psg.icon.heading" />
                    </Undertittel>
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
                    <Lenke target="_blank" href={intlHelper(intl, 'psg.lenkepanel.url')}>
                        <FormattedMessage id="psg.lenkepanel.text" />
                    </Lenke>
                </div>
            </div>
        </ExpandableInfo>
    );
};
export default PictureScanningGuide;
