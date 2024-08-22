import { dateFormatter, DateRange, ISODateToDate } from '@navikt/sif-common-utils';
import { AppText } from '../../../i18n';
import { Arbeidsgiver } from '../../../types';
import { FrilansApiData } from '../../../types/søknad-api-data/SøknadApiData';
import { Frilanstype } from '../../../types/søknad-form-values/FrilansFormValues';
import { getStartdatoForNySomFrilanser } from '../../../utils/frilanserUtils';
import NormalarbeidstidSummary from './NormalarbeidstidSummary';
import { FormSummary, Heading, List } from '@navikt/ds-react';

interface Props {
    frilans: FrilansApiData;
    frilansoppdrag: Arbeidsgiver[];
    søknadsperiode: DateRange;
}

const ArbeidssituasjonFrilansSummary = ({ frilans, frilansoppdrag, søknadsperiode }: Props) => {
    if (frilans.harInntektSomFrilanser === false) {
        return (
            <FormSummary.Answer>
                <FormSummary.Label>
                    <Heading level="3" size="small">
                        <AppText id="oppsummering.arbeidssituasjon.frilanser.header" />
                    </Heading>
                </FormSummary.Label>
                <FormSummary.Value>
                    <List>
                        <List.Item>
                            <AppText id={'oppsummering.arbeidssituasjon.frilans.erIkkeFrilanser'} />
                        </List.Item>
                    </List>
                </FormSummary.Value>
            </FormSummary.Answer>
        );
    }

    if (frilans.type === Frilanstype.HONORAR && frilans._misterInntektSomFrilanser === false) {
        return (
            <FormSummary.Answer data-testid="frilans-summary">
                <FormSummary.Label>
                    <Heading level="3" size="small">
                        <AppText id="oppsummering.arbeidssituasjon.frilanser.header" />
                    </Heading>
                </FormSummary.Label>
                <FormSummary.Value>
                    <List>
                        <List.Item>
                            <AppText id={`oppsummering.arbeidssituasjon.frilans.HONORAR`} />
                        </List.Item>
                        <List.Item>
                            <AppText id={'oppsummering.arbeidssituasjon.frilans.HONORAR.misterIkkeHonorar'} />
                        </List.Item>
                    </List>
                </FormSummary.Value>
            </FormSummary.Answer>
        );
    }

    return (
        <FormSummary.Answer data-testid="frilans-summary">
            <FormSummary.Label>
                <Heading level="3" size="small">
                    <AppText id="oppsummering.arbeidssituasjon.frilanser.header" />
                </Heading>
            </FormSummary.Label>
            <FormSummary.Value>
                <List>
                    <List.Item>
                        <AppText id={`oppsummering.arbeidssituasjon.frilans.${frilans.type}`} />
                    </List.Item>
                    {frilans.type === Frilanstype.HONORAR && frilans.misterHonorar === false && (
                        <List.Item>
                            <AppText id={'oppsummering.arbeidssituasjon.frilans.HONORAR.misterIkkeHonorar'} />
                        </List.Item>
                    )}
                    {frilans.type === Frilanstype.HONORAR && frilans.misterHonorar === true && (
                        <List.Item>
                            <AppText id={'oppsummering.arbeidssituasjon.frilans.HONORAR.misterHonorar'} />
                        </List.Item>
                    )}
                    <List.Item>
                        <NormalarbeidstidSummary normalarbeidstidApiData={frilans.arbeidsforhold.normalarbeidstid} />
                    </List.Item>
                    {frilans.startetFørSisteTreHeleMåneder ? (
                        <List.Item>
                            <AppText
                                id="oppsummering.arbeidssituasjon.frilans.startetFørSisteTreHeleMåneder"
                                values={{
                                    opptjeningStartdato: dateFormatter.full(
                                        getStartdatoForNySomFrilanser(søknadsperiode),
                                    ),
                                }}
                            />
                        </List.Item>
                    ) : (
                        <List.Item>
                            <AppText
                                id="oppsummering.arbeidssituasjon.frilans.startet"
                                values={{ dato: dateFormatter.full(ISODateToDate(frilans.startdato)) }}
                            />
                        </List.Item>
                    )}
                    {frilans.sluttdato && (
                        <List.Item>
                            <AppText
                                id="oppsummering.arbeidssituasjon.frilans.sluttet"
                                values={{ dato: dateFormatter.full(ISODateToDate(frilans.sluttdato)) }}
                            />
                        </List.Item>
                    )}
                    {frilansoppdrag && frilansoppdrag.length > 0 && (
                        <List.Item>
                            <AppText id="oppsummering.arbeidssituasjon.frilans.frilansoppdrag" />
                            <br />
                            <ul style={{ margin: 0, padding: '0 0 0 1rem' }}>
                                {frilansoppdrag.map((oppdrag) => (
                                    <List.Item key={oppdrag.id}>{oppdrag.navn}</List.Item>
                                ))}
                            </ul>
                        </List.Item>
                    )}{' '}
                </List>
            </FormSummary.Value>
        </FormSummary.Answer>
    );
};

export default ArbeidssituasjonFrilansSummary;
