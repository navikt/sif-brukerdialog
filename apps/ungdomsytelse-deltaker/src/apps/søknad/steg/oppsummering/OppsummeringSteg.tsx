import { Alert, Checkbox, CheckboxGroup, FormSummary, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import { YesOrNo } from '@navikt/sif-common-core-ds/src';
import ApiErrorAlert from '@navikt/ung-common/src/components/api-error-alert/ApiErrorAlert';
import SkjemaFooter from '../../components/steg-skjema/SkjemaFooter';
import SøknadSteg from '../../components/søknad-steg/SøknadSteg';
import { useSendSøknad } from '../../hooks/api/useSendSøknad';
import { useSøknadContext } from '../../hooks/context/useSøknadContext';
import { useSøknadNavigation } from '../../hooks/utils/useSøknadNavigation';
import { Spørsmål, Steg } from '../../types';
import BarnInfo from '../barn/BarnInfo';
import { getBarnSpørsmål } from '../barn/BarnSteg';
import { buildSøknadFromSvar } from './oppsummeringUtils';
import { dateFormatter } from '@navikt/sif-common-utils';

const OppsummeringSteg = () => {
    const { søker, deltakelsePeriode, søknadOppgave, setSøknadSendt, kontonummerInfo, barn, svar } = useSøknadContext();
    const { gotoSteg, gotoKvittering } = useSøknadNavigation();

    const [bekrefterOpplysninger, setBekrefterOpplysninger] = useState<boolean>(false);
    const [bekreftError, setBekreftError] = useState<string | undefined>();
    const { error, isPending, mutateAsync } = useSendSøknad();

    const søknad = buildSøknadFromSvar(
        deltakelsePeriode.id,
        søknadOppgave.oppgaveReferanse,
        svar,
        søker.fødselsnummer,
        deltakelsePeriode.programPeriode.from,
        kontonummerInfo.harKontonummer ? kontonummerInfo.kontonummerFraRegister : undefined,
    );

    const søknadError = søknad
        ? undefined
        : 'Det mangler opplysninger i søknaden din. Vennligst gå tilbake og fyll ut de nødvendige feltene.';

    const handleOnSubmit = async () => {
        if (søknad) {
            setBekreftError(undefined);
            if (!bekrefterOpplysninger) {
                setBekreftError('Du må bekrefte at opplysningene er riktige');
                return;
            }
            try {
                await mutateAsync({ ...søknad, harBekreftetOpplysninger: bekrefterOpplysninger });
                setSøknadSendt();
                gotoKvittering();
            } catch {
                // Håndteres gjennom error objektet  i useSendSøknad
            }
        }
    };

    return (
        <SøknadSteg tittel="Oppsummering" steg={Steg.OPPSUMMERING}>
            <VStack gap="6">
                <VStack gap="4">
                    <FormSummary>
                        <FormSummary.Header>
                            <FormSummary.Heading level="2">Ungdomsprogramytelsen</FormSummary.Heading>
                        </FormSummary.Header>
                        <FormSummary.Answers>
                            <FormSummary.Answer>
                                <FormSummary.Label>Startdato</FormSummary.Label>
                                <FormSummary.Value>
                                    {dateFormatter.compact(deltakelsePeriode.programPeriode.from)}
                                </FormSummary.Value>
                            </FormSummary.Answer>
                        </FormSummary.Answers>
                    </FormSummary>
                    <FormSummary>
                        <FormSummary.Header>
                            <FormSummary.Heading level="2">Kontonummer for utbetaling</FormSummary.Heading>
                            <FormSummary.EditLink
                                href="#"
                                onClick={(evt) => {
                                    evt.preventDefault();
                                    evt.stopPropagation();
                                    gotoSteg(Steg.KONTONUMMER);
                                }}
                            />
                        </FormSummary.Header>
                        <FormSummary.Answers>
                            {kontonummerInfo.harKontonummer ? (
                                <FormSummary.Answer>
                                    <FormSummary.Label>
                                        Stemmer det at kontonummeret ditt er {kontonummerInfo.formatertKontonummer}?
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
                    <FormSummary>
                        <FormSummary.Header>
                            <FormSummary.Heading level="2">Barn</FormSummary.Heading>
                            <FormSummary.EditLink
                                href="#"
                                onClick={(evt) => {
                                    evt.preventDefault();
                                    evt.stopPropagation();
                                    gotoSteg(Steg.BARN);
                                }}
                            />
                        </FormSummary.Header>
                        <FormSummary.Answers>
                            <FormSummary.Answer>
                                <FormSummary.Label>Barn vi har registrert på deg:</FormSummary.Label>
                                <FormSummary.Value>
                                    <BarnInfo barn={barn} />
                                </FormSummary.Value>
                            </FormSummary.Answer>
                            <FormSummary.Answer>
                                <FormSummary.Label>{getBarnSpørsmål(barn.length)}</FormSummary.Label>
                                <FormSummary.Value>
                                    {svar[Spørsmål.BARN] === YesOrNo.YES ? 'Ja' : 'Nei'}
                                </FormSummary.Value>
                            </FormSummary.Answer>
                        </FormSummary.Answers>
                    </FormSummary>
                </VStack>

                {søknadError ? <Alert variant="error">{søknadError}</Alert> : null}

                <form
                    onSubmit={(evt) => {
                        evt.preventDefault();
                        setBekreftError(undefined);
                        handleOnSubmit();
                    }}>
                    <VStack gap="4">
                        <CheckboxGroup
                            name="bekrefterInnsending"
                            hideLegend={true}
                            legend="Bekreft opplysninger"
                            error={bekreftError}>
                            <Checkbox
                                value="bekrefter"
                                onChange={(evt) => {
                                    setBekreftError(undefined);
                                    setBekrefterOpplysninger(evt.target.checked);
                                }}>
                                Jeg bekrefter at opplysningene over er riktige og at jeg ønsker søke om
                                ungdomsprogram&shy;ytelsen.
                            </Checkbox>
                        </CheckboxGroup>

                        {error ? <ApiErrorAlert error={error} /> : null}
                        <SkjemaFooter
                            pending={isPending}
                            forrige={{ tittel: 'Forrige steg', onClick: () => gotoSteg(Steg.BARN) }}
                            submit={{ tittel: 'Send søknad', disabled: !!søknadError, erSendInn: true }}
                        />
                    </VStack>
                </form>
            </VStack>
        </SøknadSteg>
    );
};
export default OppsummeringSteg;
