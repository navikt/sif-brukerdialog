import { FormSummary, Heading, List } from '@navikt/ds-react';
import { prettifyApiDate } from '@navikt/sif-common-utils';
import { AppText } from '../../../../i18n';
import { Arbeidsgiver } from '../../../../types/Arbeidsgiver';
import { FrilansApiData } from '../../../../types/søknadApiData/SøknadApiData';

interface Props {
    frilans?: FrilansApiData;
    frilansoppdrag?: Arbeidsgiver[];
}

const ArbeidssituasjonFrilansSummary = ({ frilans, frilansoppdrag }: Props) => {
    return (
        <FormSummary.Answer>
            <FormSummary.Label>
                <Heading level="3" size="small">
                    <AppText id="oppsummering.arbeidssituasjon.frilanser.header" />
                </Heading>
            </FormSummary.Label>
            <FormSummary.Value>
                <List>
                    {frilans === undefined ? (
                        <List.Item>
                            <AppText id={'oppsummering.arbeidssituasjon.frilans.erIkkeFrilanser'} />
                        </List.Item>
                    ) : (
                        <>
                            {frilans.harHattInntektSomFrilanser === false && (
                                <List.Item>
                                    <AppText id={'oppsummering.arbeidssituasjon.frilans.erIkkeFrilanser'} />
                                </List.Item>
                            )}

                            <List.Item>
                                <AppText
                                    id="oppsummering.arbeidssituasjon.frilans.startet"
                                    values={{ dato: prettifyApiDate(frilans.startdato) }}
                                />
                            </List.Item>
                            {frilans.sluttdato && (
                                <List.Item>
                                    <AppText
                                        id="oppsummering.arbeidssituasjon.frilans.sluttet"
                                        values={{ dato: prettifyApiDate(frilans.sluttdato) }}
                                    />
                                </List.Item>
                            )}
                            {frilans.jobberFortsattSomFrilans && (
                                <List.Item>
                                    <AppText id="oppsummering.arbeidssituasjon.frilans.fortsattFrilanser" />
                                </List.Item>
                            )}
                            {frilans.arbeidsforhold && (
                                <>
                                    <List.Item>
                                        <AppText
                                            id={`oppsummering.arbeidssituasjon.tid`}
                                            values={{ timer: frilans.arbeidsforhold.jobberNormaltTimer }}
                                        />
                                    </List.Item>
                                </>
                            )}
                            {/* Hvis bruker fortsatt er frilanser i perioden (arbeidsforhold finnes), og har frilansoppdrag */}
                            {frilans.arbeidsforhold && frilansoppdrag && frilansoppdrag.length > 0 && (
                                <List.Item>
                                    <AppText id="oppsummering.arbeidssituasjon.frilans.frilansoppdrag" />
                                    <ul style={{ margin: 0, padding: '0 0 0 1rem' }}>
                                        {frilansoppdrag.map((oppdrag) => (
                                            <List.Item key={oppdrag.id}>{oppdrag.navn}</List.Item>
                                        ))}
                                    </ul>
                                </List.Item>
                            )}
                        </>
                    )}
                </List>
            </FormSummary.Value>
        </FormSummary.Answer>
    );
};

export default ArbeidssituasjonFrilansSummary;
