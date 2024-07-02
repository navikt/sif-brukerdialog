import { prettifyApiDate } from '@navikt/sif-common-utils';
import { Arbeidsgiver } from '../../../../types/Arbeidsgiver';
import { FrilansApiData } from '../../../../types/søknadApiData/SøknadApiData';
import { AppText } from '../../../../i18n';
import { FormSummary } from '@navikt/ds-react';

interface Props {
    frilans?: FrilansApiData;
    frilansoppdrag?: Arbeidsgiver[];
}

const ArbeidssituasjonFrilansSummary = ({ frilans, frilansoppdrag }: Props) => {
    if (frilans === undefined) {
        return (
            <FormSummary.Answer>
                <FormSummary.Label>
                    <AppText id="oppsummering.arbeidssituasjon.frilanser.header" />
                </FormSummary.Label>
                <FormSummary.Value>
                    <AppText id={'oppsummering.arbeidssituasjon.frilans.erIkkeFrilanser'} />
                </FormSummary.Value>
            </FormSummary.Answer>
        );
    }

    return (
        <FormSummary.Answer>
            <FormSummary.Label>
                <AppText id="oppsummering.arbeidssituasjon.frilanser.header" />
            </FormSummary.Label>
            <FormSummary.Value>
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
            </FormSummary.Value>
        </FormSummary.Answer>
    );
};

export default ArbeidssituasjonFrilansSummary;
