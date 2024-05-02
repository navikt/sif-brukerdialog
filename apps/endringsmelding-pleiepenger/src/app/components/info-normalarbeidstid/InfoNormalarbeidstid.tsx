import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import { AppText, useAppIntl } from '../../i18n';

export const InfoNormalarbeidstid = () => {
    const { text } = useAppIntl();
    return (
        <>
            <ExpandableInfo title={text('info.normalarbeidstid.tittel')}>
                <p>
                    <AppText id="info.normalarbeidstid.tekst.1" values={{ q: (children) => <q>{children}</q> }} />
                </p>
                <p>
                    <AppText id="info.normalarbeidstid.tekst.2" />
                </p>
            </ExpandableInfo>
            <ExpandableInfo title={text('arbeidsforhold.normalTimer.info.tittel')}>
                <p>
                    <AppText id={`arbeidsforhold.normalTimer.info.turnus`} />
                </p>

                <ExpandableInfo title={text('arbeidsforhold.normalTimer.info.turnus.tittel')}>
                    <AppText id={'arbeidsforhold.normalTimer.info.turnus.avsnitt.1'} />
                    <p>
                        <strong>
                            <AppText id={'arbeidsforhold.normalTimer.info.turnus.avsnitt.2'} />
                        </strong>
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
                        <strong>
                            <AppText id={'arbeidsforhold.normalTimer.info.varierende.avsnitt.2'} />
                        </strong>
                    </p>
                    <p>
                        <AppText id={'arbeidsforhold.normalTimer.info.varierende.avsnitt.3'} />
                    </p>
                    <p>
                        <AppText id={'arbeidsforhold.normalTimer.info.varierende.avsnitt.4'} />
                    </p>
                    <p>
                        <strong>
                            <AppText id={'arbeidsforhold.normalTimer.info.varierende.avsnitt.5'} />
                        </strong>
                    </p>
                    <p>
                        <AppText id={'arbeidsforhold.normalTimer.info.varierende.avsnitt.6'} />
                    </p>
                </ExpandableInfo>
            </ExpandableInfo>
        </>
    );
};
