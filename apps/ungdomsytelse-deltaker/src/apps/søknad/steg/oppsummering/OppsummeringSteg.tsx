import { Box, FormSummary, VStack } from '@navikt/ds-react';
import { Ungdomsytelsesøknad } from '@navikt/k9-brukerdialog-prosessering-api';
import { YesOrNo } from '@navikt/sif-common-core-ds/src';
import { dateFormatter, dateToISODate } from '@navikt/sif-common-utils';
import ApiErrorAlert from '@navikt/ung-common/src/components/api-error-alert/ApiErrorAlert';
import { useDeltakerContext } from '../../../../context/DeltakerContext';
import SkjemaFooter from '../../components/steg-skjema/SkjemaFooter';
import SøknadSteg from '../../components/søknad-steg/SøknadSteg';
import { Spørsmål, SøknadSvar, useSøknadContext } from '../../context/søknadContext';
import { useSendSøknad } from '../../hooks/useSendSøknad';
import { useSøknadNavigation } from '../../hooks/useSøknadNavigation';
import { Steg } from '../../types/Steg';
import BarnInfo from '../barn/BarnInfo';

const getSøknadFromSvar = (svar: SøknadSvar, søkerNorskIdent: string, startdato: Date): Ungdomsytelsesøknad => {
    return {
        språk: 'nb',
        harBekreftetOpplysninger: true,
        harForståttRettigheterOgPlikter: svar[Spørsmål.BEKREFTER] === true,
        startdato: dateToISODate(startdato),
        søkerNorskIdent,
    };
};

interface Props {
    versjon?: 'samlet' | 'stegvis';
}

const OppsummeringSteg = ({ versjon = 'stegvis' }: Props) => {
    const { deltakelse, søker } = useDeltakerContext();
    const { setSøknadSendt, kontonummer, barn } = useSøknadContext();
    const { gotoSteg, gotoKvittering } = useSøknadNavigation();
    const harKontonummer = kontonummer !== undefined && kontonummer !== null;

    const { svar } = useSøknadContext();

    const { error, pending, sendSøknad } = useSendSøknad(deltakelse.id);

    const handleOnSubmit = async () => {
        const søknad = getSøknadFromSvar(svar, søker.fødselsnummer, deltakelse.programPeriode.from);

        await sendSøknad(søknad);

        if (!error) {
            setSøknadSendt(true);
            gotoKvittering();
        }
    };

    return (
        <SøknadSteg tittel="Oppsummering" steg={Steg.OPPSUMMERING}>
            {versjon === 'stegvis' ? (
                <VStack gap="10">
                    <FormSummary>
                        <FormSummary.Header>
                            <FormSummary.Heading level="2">Oppstart</FormSummary.Heading>
                            <FormSummary.EditLink href="#" onClick={() => gotoSteg(Steg.OPPSTART)} />
                        </FormSummary.Header>
                        <FormSummary.Answers>
                            <FormSummary.Answer>
                                <FormSummary.Label>
                                    Er det riktig at du starter i ungdomsprogrammet{' '}
                                    {dateFormatter.dayDateMonthYear(deltakelse.programPeriode.from)}?
                                </FormSummary.Label>
                                <FormSummary.Value>
                                    {svar[Spørsmål.OPPSTART] === YesOrNo.YES ? 'Ja' : 'Nei'}
                                </FormSummary.Value>
                            </FormSummary.Answer>
                        </FormSummary.Answers>
                    </FormSummary>
                    <FormSummary>
                        <FormSummary.Header>
                            <FormSummary.Heading level="2">Barn</FormSummary.Heading>
                            <FormSummary.EditLink href="#" onClick={() => gotoSteg(Steg.BARN)} />
                        </FormSummary.Header>
                        <FormSummary.Answers>
                            <FormSummary.Answer>
                                <FormSummary.Label>Barn vi har registrert på deg:</FormSummary.Label>
                                <FormSummary.Value>
                                    <BarnInfo barn={barn} />
                                </FormSummary.Value>
                            </FormSummary.Answer>
                            <FormSummary.Answer>
                                <FormSummary.Label>Stemmer informasjonen om barn?</FormSummary.Label>
                                <FormSummary.Value>
                                    {svar[Spørsmål.BARN] === YesOrNo.YES ? 'Ja' : 'Nei'}
                                </FormSummary.Value>
                            </FormSummary.Answer>
                        </FormSummary.Answers>
                    </FormSummary>
                    <FormSummary>
                        <FormSummary.Header>
                            <FormSummary.Heading level="2">Kontonummer for utbetaling</FormSummary.Heading>
                            <FormSummary.EditLink href="#" onClick={() => gotoSteg(Steg.KONTONUMMER)} />
                        </FormSummary.Header>
                        <FormSummary.Answers>
                            {harKontonummer ? (
                                <FormSummary.Answer>
                                    <FormSummary.Label>
                                        Stemmer det at kontonummeret ditt er {kontonummer}?
                                    </FormSummary.Label>
                                    <FormSummary.Value>
                                        {svar[Spørsmål.KONTONUMMER] === YesOrNo.YES ? 'Ja' : 'Nei'}
                                    </FormSummary.Value>
                                </FormSummary.Answer>
                            ) : (
                                <FormSummary.Answer>
                                    <FormSummary.Label>Kontonummer for utbetaling</FormSummary.Label>
                                    <FormSummary.Value>
                                        Vi har ikke registrert noe kontonummer på deg.
                                    </FormSummary.Value>
                                </FormSummary.Answer>
                            )}
                        </FormSummary.Answers>
                    </FormSummary>
                </VStack>
            ) : (
                <FormSummary>
                    <FormSummary.Header>
                        <FormSummary.Heading level="2">Dine svar</FormSummary.Heading>
                    </FormSummary.Header>
                    <FormSummary.Answers>
                        <FormSummary.Answer>
                            <FormSummary.Label>
                                Er det riktig at du starter i ungdomsprogrammet{' '}
                                {dateFormatter.dayDateMonthYear(deltakelse.programPeriode.from)}?
                            </FormSummary.Label>
                            <FormSummary.Value>
                                {svar[Spørsmål.OPPSTART] === YesOrNo.YES ? 'Ja' : 'Nei'}
                            </FormSummary.Value>
                        </FormSummary.Answer>
                        <FormSummary.Answer>
                            <FormSummary.Label>Barn vi har registrert på deg:</FormSummary.Label>
                            <FormSummary.Value>
                                <BarnInfo barn={barn} />
                            </FormSummary.Value>
                        </FormSummary.Answer>
                        <FormSummary.Answer>
                            <FormSummary.Label>Stemmer informasjonen om barn?</FormSummary.Label>
                            <FormSummary.Value>{svar[Spørsmål.BARN] === YesOrNo.YES ? 'Ja' : 'Nei'}</FormSummary.Value>
                        </FormSummary.Answer>
                        {harKontonummer ? (
                            <FormSummary.Answer>
                                <FormSummary.Label>
                                    Stemmer det at kontonummeret ditt er {kontonummer}?
                                </FormSummary.Label>
                                <FormSummary.Value>
                                    {svar[Spørsmål.KONTONUMMER] === YesOrNo.YES ? 'Ja' : 'Nei'}
                                </FormSummary.Value>
                            </FormSummary.Answer>
                        ) : (
                            <FormSummary.Answer>
                                <FormSummary.Label>Kontonummer for utbetaling</FormSummary.Label>
                                <FormSummary.Value>Vi har ikke registrert noe kontonummer på deg.</FormSummary.Value>
                            </FormSummary.Answer>
                        )}
                    </FormSummary.Answers>
                </FormSummary>
            )}

            {error ? (
                <Box marginBlock="8 8">
                    <ApiErrorAlert error={error} />
                </Box>
            ) : null}

            <form
                onSubmit={(evt) => {
                    evt.preventDefault();
                    handleOnSubmit();
                }}>
                <SkjemaFooter
                    pending={pending}
                    forrige={{ tittel: 'Forrige steg', onClick: () => gotoSteg(Steg.KONTONUMMER) }}
                    submit={{ tittel: 'Send søknad', erSendInn: true }}
                />
            </form>
        </SøknadSteg>
    );
};
export default OppsummeringSteg;
