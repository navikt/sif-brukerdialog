import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import { AppText, useAppIntl } from '../../../../../i18n';

const InfoJobberNormaltTimerSN = () => {
    const { text } = useAppIntl();
    return (
        <ExpandableInfo title={text('arbeidsforhold.normalTimer.info.tittel')}>
            <AppText id={`arbeidsforhold.selvstendig.normalTimer.info`} />

            <ul style={{ paddingInlineStart: '20px' }}>
                <li>
                    <AppText id={'arbeidsforhold.normalTimer.info.list.item.1'} />
                </li>
                <li>
                    <AppText id={'arbeidsforhold.normalTimer.info.list.item.2'} />
                </li>
            </ul>
            <ExpandableInfo title={text('arbeidsforhold.normalTimer.info.turnus.tittel')}>
                <AppText id={'arbeidsforhold.normalTimer.info.turnus.avsnitt.1'} />

                <p>
                    <AppText id={'arbeidsforhold.normalTimer.info.turnus.avsnitt.2'} />
                </p>
                <p>
                    <AppText id={'arbeidsforhold.normalTimer.info.turnus.avsnitt.3'} />
                </p>
                <p>
                    <AppText id={'arbeidsforhold.normalTimer.info.turnus.avsnitt.4'} />
                    <br />
                    <AppText id={'arbeidsforhold.normalTimer.info.turnus.avsnitt.4a'} />
                    <br />
                    <AppText id={'arbeidsforhold.normalTimer.info.turnus.avsnitt.4b'} />
                </p>
                <p>
                    <AppText id={'arbeidsforhold.normalTimer.info.turnus.avsnitt.5'} />
                </p>
            </ExpandableInfo>
            <ExpandableInfo title={text('arbeidsforhold.normalTimer.info.varierende.tittel')}>
                <AppText id={'arbeidsforhold.normalTimer.info.varierende.avsnitt.1'} />

                <p>
                    <AppText id={'arbeidsforhold.normalTimer.info.varierende.avsnitt.2'} />
                </p>
                <p>
                    <AppText id={'arbeidsforhold.normalTimer.info.varierende.avsnitt.3'} />
                </p>
                <p>
                    <AppText id={'arbeidsforhold.normalTimer.info.varierende.avsnitt.4'} />
                </p>
                <p>
                    <AppText id={'arbeidsforhold.normalTimer.info.varierende.avsnitt.5'} />
                </p>
                <p>
                    <AppText id={'arbeidsforhold.normalTimer.info.varierende.avsnitt.6'} />
                </p>
            </ExpandableInfo>
        </ExpandableInfo>
    );
};

export default InfoJobberNormaltTimerSN;
