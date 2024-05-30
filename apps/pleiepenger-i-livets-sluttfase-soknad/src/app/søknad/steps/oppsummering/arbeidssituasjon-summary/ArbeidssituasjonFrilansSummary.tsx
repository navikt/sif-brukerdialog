import { SummaryBlock } from '@navikt/sif-common-ui';
import { prettifyApiDate } from '@navikt/sif-common-utils';
import { Arbeidsgiver } from '../../../../types/Arbeidsgiver';
import { FrilansApiData } from '../../../../types/søknadApiData/SøknadApiData';
import { AppText, useAppIntl } from '../../../../i18n';

interface Props {
    frilans?: FrilansApiData;
    frilansoppdrag?: Arbeidsgiver[];
}

const ArbeidssituasjonFrilansSummary = ({ frilans, frilansoppdrag }: Props) => {
    const { text } = useAppIntl();
    if (frilans === undefined) {
        return (
            <SummaryBlock header={text('oppsummering.arbeidssituasjon.frilanser.header')}>
                <ul>
                    <li>
                        <p>
                            <AppText id={'oppsummering.arbeidssituasjon.frilans.erIkkeFrilanser'} />
                        </p>
                    </li>
                </ul>
            </SummaryBlock>
        );
    }

    return (
        <SummaryBlock header={text('oppsummering.arbeidssituasjon.frilanser.header')}>
            <ul>
                {frilans.harHattInntektSomFrilanser === false && (
                    <li>
                        <AppText id={'oppsummering.arbeidssituasjon.frilans.erIkkeFrilanser'} />
                    </li>
                )}

                <li>
                    <AppText
                        id="oppsummering.arbeidssituasjon.frilans.startet"
                        values={{ dato: prettifyApiDate(frilans.startdato) }}
                    />
                </li>
                {frilans.sluttdato && (
                    <li>
                        <AppText
                            id="oppsummering.arbeidssituasjon.frilans.sluttet"
                            values={{ dato: prettifyApiDate(frilans.sluttdato) }}
                        />
                    </li>
                )}
                {frilans.jobberFortsattSomFrilans && (
                    <li>
                        <AppText id="oppsummering.arbeidssituasjon.frilans.fortsattFrilanser" />
                    </li>
                )}
                {frilans.arbeidsforhold && (
                    <>
                        <li>
                            <AppText
                                id={`oppsummering.arbeidssituasjon.tid`}
                                values={{ timer: frilans.arbeidsforhold.jobberNormaltTimer }}
                            />
                        </li>
                    </>
                )}
                {/* Hvis bruker fortsatt er frilanser i perioden (arbeidsforhold finnes), og har frilansoppdrag */}
                {frilans.arbeidsforhold && frilansoppdrag && frilansoppdrag.length > 0 && (
                    <li>
                        <AppText id="oppsummering.arbeidssituasjon.frilans.frilansoppdrag" />
                        <ul style={{ margin: 0, padding: '0 0 0 1rem' }}>
                            {frilansoppdrag.map((oppdrag) => (
                                <li key={oppdrag.id}>{oppdrag.navn}</li>
                            ))}
                        </ul>
                    </li>
                )}
            </ul>
        </SummaryBlock>
    );
};

export default ArbeidssituasjonFrilansSummary;
