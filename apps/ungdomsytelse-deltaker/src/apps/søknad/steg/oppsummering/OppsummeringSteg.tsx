import { Alert, Checkbox, CheckboxGroup, FormSummary, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import { Ungdomsytelsesøknad } from '@navikt/k9-brukerdialog-prosessering-api';
import { YesOrNo } from '@navikt/sif-common-core-ds/src';
import { dateFormatter, dateToISODate } from '@navikt/sif-common-utils';
import ApiErrorAlert from '@navikt/ung-common/src/components/api-error-alert/ApiErrorAlert';
import SkjemaFooter from '../../components/steg-skjema/SkjemaFooter';
import SøknadSteg from '../../components/søknad-steg/SøknadSteg';
import { useSendSøknad } from '../../hooks/api/useSendSøknad';
import { useSøknadContext } from '../../hooks/context/useSøknadContext';
import { useSøknadNavigation } from '../../hooks/utils/useSøknadNavigation';
import { Spørsmål, Steg, SøknadSvar } from '../../types';
import BarnInfo from '../barn/BarnInfo';

type UngdomsytelsesøknadV2 = Ungdomsytelsesøknad & {
    oppstartErRiktig: boolean;
    barnErRiktig: boolean;
    kontonummerErRiktig?: boolean;
    _harKontonummer: boolean;
};

export const isYesOrNoAnswered = (answer?: YesOrNo) => {
    return answer !== undefined && (answer === YesOrNo.NO || answer === YesOrNo.YES);
};

const getSøknadFromSvar = (
    svar: SøknadSvar,
    søkerNorskIdent: string,
    startdato: Date,
    harKontonummer: boolean,
): Omit<UngdomsytelsesøknadV2, 'harBekreftetOpplysninger'> | undefined => {
    if (
        (svar[Spørsmål.FORSTÅR_PLIKTER] !== true,
        !isYesOrNoAnswered(svar[Spørsmål.OPPSTART]) ||
            !isYesOrNoAnswered(svar[Spørsmål.BARN]) ||
            (harKontonummer && !isYesOrNoAnswered(svar[Spørsmål.KONTONUMMER])))
    ) {
        return undefined;
    }

    const harForståttRettigheterOgPlikter = svar[Spørsmål.FORSTÅR_PLIKTER] === true;

    return {
        språk: 'nb',
        startdato: dateToISODate(startdato),
        harForståttRettigheterOgPlikter,
        oppstartErRiktig: svar[Spørsmål.OPPSTART] === YesOrNo.YES,
        barnErRiktig: svar[Spørsmål.BARN] === YesOrNo.YES,
        kontonummerErRiktig: harKontonummer ? svar[Spørsmål.KONTONUMMER] === YesOrNo.YES : undefined,
        søkerNorskIdent,
        _harKontonummer: harKontonummer,
    };
};

const OppsummeringSteg = () => {
    const { søker, deltakelsePeriode, setSøknadSendt, kontonummer, barn } = useSøknadContext();
    const { gotoSteg, gotoKvittering } = useSøknadNavigation();
    const harKontonummer = kontonummer !== undefined && kontonummer !== null;

    const { svar } = useSøknadContext();

    const [bekrefterOpplysninger, setBekrefterOpplysninger] = useState<boolean>(false);
    const [bekreftError, setBekreftError] = useState<string | undefined>();
    const { error, isPending, mutateAsync } = useSendSøknad();

    const søknad = getSøknadFromSvar(svar, søker.fødselsnummer, deltakelsePeriode.programPeriode.from, harKontonummer);

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
                setSøknadSendt(true);
                gotoKvittering();
            } catch {
                // Håndteres gjennom error objektet  i useSendSøknad
            }
        }
    };

    return (
        <SøknadSteg tittel="Oppsummering" steg={Steg.OPPSUMMERING}>
            <form
                onSubmit={(evt) => {
                    evt.preventDefault();
                    setBekreftError(undefined);
                    handleOnSubmit();
                }}>
                <VStack gap="6">
                    <VStack gap="4">
                        <FormSummary>
                            <FormSummary.Header>
                                <FormSummary.Heading level="2">Oppstart</FormSummary.Heading>
                                <FormSummary.EditLink href="#" onClick={() => gotoSteg(Steg.OPPSTART)} />
                            </FormSummary.Header>
                            <FormSummary.Answers>
                                <FormSummary.Answer>
                                    <FormSummary.Label>
                                        Er det riktig at du starter i ungdomsprogrammet{' '}
                                        {dateFormatter.dayDateMonthYear(deltakelsePeriode.programPeriode.from)}?
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

                    {søknadError ? <Alert variant="error">{søknadError}</Alert> : null}

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
                        forrige={{ tittel: 'Forrige steg', onClick: () => gotoSteg(Steg.KONTONUMMER) }}
                        submit={{ tittel: 'Send søknad', disabled: !!søknadError, erSendInn: true }}
                    />
                </VStack>
            </form>
        </SøknadSteg>
    );
};
export default OppsummeringSteg;
