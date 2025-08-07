import { Alert, Checkbox, CheckboxGroup, FormSummary, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import { YesOrNo } from '@navikt/sif-common-core-ds/src';
import { dateFormatter } from '@navikt/sif-common-utils';
import ApiErrorAlert from '@navikt/ung-common/src/components/api-error-alert/ApiErrorAlert';
import { AppText, useAppIntl } from '../../../../i18n';
import SkjemaFooter from '../../components/steg-skjema/SkjemaFooter';
import SøknadSteg from '../../components/søknad-steg/SøknadSteg';
import { useSendSøknad } from '../../hooks/api/useSendSøknad';
import { useSøknadContext } from '../../hooks/context/useSøknadContext';
import { useSøknadNavigation } from '../../hooks/utils/useSøknadNavigation';
import { Spørsmål, Steg } from '../../types';
import BarnInfo from '../barn/BarnInfo';
import { buildSøknadFromSvar } from './oppsummeringUtils';
import { useAnalyticsInstance } from '../../../../utils/analytics';
import { DeltakerSkjemaType } from '../../../innsyn/utils/logUtils';

const OppsummeringSteg = () => {
    const { text } = useAppIntl();
    const { søker, deltakelsePeriode, søknadOppgave, setSøknadSendt, kontonummerInfo, barn, svar } = useSøknadContext();
    const { gotoSteg, gotoKvittering } = useSøknadNavigation();
    const { logSkjemaFeilet } = useAnalyticsInstance();

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

    const søknadError = søknad ? undefined : text('oppsummeringSteg.søknadIkkeGyldig');

    const handleOnSubmit = async () => {
        if (søknad) {
            setBekreftError(undefined);
            if (!bekrefterOpplysninger) {
                setBekreftError(text('oppsummeringSteg.bekreft.validering.bekreftIkkeValgt'));
                return;
            }
            try {
                await mutateAsync({ ...søknad, harBekreftetOpplysninger: bekrefterOpplysninger });
                setSøknadSendt();
                gotoKvittering();
            } catch {
                // Håndteres gjennom error objektet i useSendSøknad
                logSkjemaFeilet(DeltakerSkjemaType.SØKNAD);
            }
        }
    };

    return (
        <SøknadSteg tittel={text('oppsummeringSteg.tittel')} steg={Steg.OPPSUMMERING}>
            <VStack gap="6">
                <VStack gap="4">
                    <FormSummary>
                        <FormSummary.Header>
                            <FormSummary.Heading level="2">
                                <AppText id="søknad.tittel" />
                            </FormSummary.Heading>
                        </FormSummary.Header>
                        <FormSummary.Answers>
                            <FormSummary.Answer>
                                <FormSummary.Label>
                                    <AppText id="oppsummeringSteg.startdato" />
                                </FormSummary.Label>
                                <FormSummary.Value>
                                    {dateFormatter.compact(deltakelsePeriode.programPeriode.from)}
                                </FormSummary.Value>
                            </FormSummary.Answer>
                        </FormSummary.Answers>
                    </FormSummary>
                    <FormSummary>
                        <FormSummary.Header>
                            <FormSummary.Heading level="2">
                                <AppText id="oppsummeringSteg.kontonummer.tittel" />
                            </FormSummary.Heading>
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
                                        <AppText
                                            id="kontonummerSteg.kontonummer.spm"
                                            values={{ kontonummer: kontonummerInfo.formatertKontonummer }}
                                        />
                                    </FormSummary.Label>
                                    <FormSummary.Value>
                                        {svar[Spørsmål.KONTONUMMER] === YesOrNo.YES
                                            ? text('kontonummerSteg.kontonummer.ja.label')
                                            : text('kontonummerSteg.kontonummer.nei.label')}
                                    </FormSummary.Value>
                                </FormSummary.Answer>
                            ) : (
                                <FormSummary.Answer>
                                    <FormSummary.Label>
                                        <AppText id="oppsummeringSteg.kontonummer.ingenKontonummer.tittel" />
                                    </FormSummary.Label>
                                    <FormSummary.Value>
                                        <AppText id="oppsummeringSteg.kontonummer.ingenKontonummer.tekst" />
                                    </FormSummary.Value>
                                </FormSummary.Answer>
                            )}
                        </FormSummary.Answers>
                    </FormSummary>
                    <FormSummary>
                        <FormSummary.Header>
                            <FormSummary.Heading level="2">
                                <AppText id="oppsummeringSteg.barn.tittel" />
                            </FormSummary.Heading>
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
                                <FormSummary.Label>
                                    <AppText id="barnSteg.registrerteBarn.tittel" />
                                </FormSummary.Label>
                                <FormSummary.Value>
                                    <BarnInfo barn={barn} />
                                </FormSummary.Value>
                            </FormSummary.Answer>
                            <FormSummary.Answer>
                                <FormSummary.Label>
                                    <AppText
                                        id={
                                            barn.length === 0
                                                ? 'barnSteg.spørsmål.ingenBarn'
                                                : 'barnSteg.spørsmål.harBarn'
                                        }
                                        values={{
                                            antallBarn: barn.length,
                                        }}
                                    />
                                </FormSummary.Label>
                                <FormSummary.Value>
                                    {svar[Spørsmål.BARN] === YesOrNo.YES
                                        ? text('barnSteg.barnStemmer.ja.label')
                                        : text('barnSteg.barnStemmer.nei.label')}
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
                            legend={text('oppsummeringSteg.bekreft.hiddenLegend')}
                            error={bekreftError}>
                            <Checkbox
                                value="bekrefter"
                                onChange={(evt) => {
                                    setBekreftError(undefined);
                                    setBekrefterOpplysninger(evt.target.checked);
                                }}>
                                <AppText id="oppsummeringSteg.bekreft.tekst" />
                            </Checkbox>
                        </CheckboxGroup>

                        {error ? <ApiErrorAlert error={error} /> : null}
                        <SkjemaFooter
                            pending={isPending}
                            forrige={{
                                tittel: text('søknadApp.forrigeSteg.label'),
                                onClick: () => gotoSteg(Steg.BARN),
                            }}
                            submit={{
                                tittel: text('søknadApp.sendSøknad.label'),
                                disabled: !!søknadError,
                                erSendInn: true,
                            }}
                        />
                    </VStack>
                </form>
            </VStack>
        </SøknadSteg>
    );
};
export default OppsummeringSteg;
