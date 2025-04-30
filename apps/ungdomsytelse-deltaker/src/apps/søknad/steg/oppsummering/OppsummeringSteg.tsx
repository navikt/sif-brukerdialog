import { Alert, Checkbox, CheckboxGroup, FormSummary, VStack } from '@navikt/ds-react';
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
import { useState } from 'react';

type UngdomsytelsesøknadV2 = Ungdomsytelsesøknad & {
    oppstartErRiktig: YesOrNo;
    barnErRiktig: YesOrNo;
    kontonummerErRiktig?: YesOrNo;
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
    const harForståttRettigheterOgPlikter = svar[Spørsmål.FORSTÅR_PLIKTER] === true;
    const oppstartErRiktig = svar[Spørsmål.OPPSTART];
    const barnErRiktig = svar[Spørsmål.BARN];
    const kontonummerErRiktig = harKontonummer ? svar[Spørsmål.KONTONUMMER] : undefined;

    if (
        !oppstartErRiktig ||
        !barnErRiktig ||
        !isYesOrNoAnswered(oppstartErRiktig) ||
        !isYesOrNoAnswered(barnErRiktig) ||
        !harForståttRettigheterOgPlikter
    ) {
        return undefined;
    }
    if (harKontonummer && !kontonummerErRiktig && !isYesOrNoAnswered(kontonummerErRiktig)) {
        return undefined;
    }

    return {
        språk: 'nb',
        startdato: dateToISODate(startdato),
        harForståttRettigheterOgPlikter,
        oppstartErRiktig,
        barnErRiktig,
        kontonummerErRiktig,
        søkerNorskIdent,
        _harKontonummer: harKontonummer,
    };
};

const OppsummeringSteg = () => {
    const { deltakelse, søker } = useDeltakerContext();
    const { setSøknadSendt, kontonummer, barn } = useSøknadContext();
    const { gotoSteg, gotoKvittering } = useSøknadNavigation();
    const harKontonummer = kontonummer !== undefined && kontonummer !== null;

    const { svar } = useSøknadContext();

    const [bekrefterOpplysninger, setBekrefterOpplysninger] = useState<boolean>(false);
    const [bekreftError, setBekreftError] = useState<string | undefined>();
    const { error, pending, sendSøknad } = useSendSøknad(deltakelse.id);

    const søknad = getSøknadFromSvar(svar, søker.fødselsnummer, deltakelse.programPeriode.from, harKontonummer);

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

            await sendSøknad({ ...søknad, harBekreftetOpplysninger: bekrefterOpplysninger });

            if (!error) {
                setSøknadSendt(true);
                gotoKvittering();
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
                        pending={pending}
                        forrige={{ tittel: 'Forrige steg', onClick: () => gotoSteg(Steg.KONTONUMMER) }}
                        submit={{ tittel: 'Send søknad', disabled: !!søknadError, erSendInn: true }}
                    />
                </VStack>
            </form>
        </SøknadSteg>
    );
};
export default OppsummeringSteg;
