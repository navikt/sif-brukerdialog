import { Alert, Checkbox, CheckboxGroup, FormSummary, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { AppText, useAppIntl } from '@shared/i18n';
import { DeltakerSkjemaId } from '@shared/types/DeltakerSkjemaId';
import { ApiErrorAlert } from '@sif/api';
import { YesOrNo } from '@sif/rhf';
import { FormLayout } from '@sif/soknad-ui/components';
import { useState } from 'react';

import { useAnalyticsInstance } from '../../../../analytics/analytics';
import { useDeltakerContext } from '../../../../hooks/useDeltakerContext';
import { SøknadStepId } from '../../setup/config/SøknadStepId';
import { useSøknadsflyt } from '../../setup/context/søknadContext';
import { useSøknadState } from '../../setup/hooks/useSøknadState';
import { useSøknadStore } from '../../setup/hooks/useSøknadStore';
import { SøknadStep } from '../../setup/soknad/SøknadStep';
import { useSendSøknad } from '../../hooks/api/useSendSøknad';
import BarnInfo from '../barn/BarnInfo';
import { buildSøknadFromSvar, HarKontonummerEnum } from './oppsummeringUtils';

const stepId = SøknadStepId.OPPSUMMERING;

const OppsummeringSteg = () => {
    const { text } = useAppIntl();
    const { søker, barn, kontoInfo, søknadOppgave } = useSøknadState();
    const { deltakelsePeriode } = useDeltakerContext();
    const { søknadsdata, navigateToStep } = useSøknadsflyt();
    const setSøknadSendt = useSøknadStore((s) => s.setSøknadSendt);
    const { logSkjemaFeilet, logSkjemaFullført } = useAnalyticsInstance();

    const [bekrefterOpplysninger, setBekrefterOpplysninger] = useState<boolean>(false);
    const [bekreftError, setBekreftError] = useState<string | undefined>();
    const { error, isPending, mutateAsync } = useSendSøknad();

    const søknad = søknadsdata
        ? buildSøknadFromSvar({
              deltakelseId: deltakelsePeriode.id,
              oppgaveReferanse: søknadOppgave.oppgaveReferanse,
              søknadsdata,
              søkerNorskIdent: søker.fødselsnummer,
              startdato: deltakelsePeriode.programPeriode.from,
              kontonummerInfo: kontoInfo,
          })
        : undefined;

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
                logSkjemaFullført(DeltakerSkjemaId.SØKNAD);
                setSøknadSendt();
            } catch {
                logSkjemaFeilet(DeltakerSkjemaId.SØKNAD);
            }
        }
    };

    const kontonummerSvar = søknadsdata?.kontonummer?.kontonummerErRiktig;
    const barnSvar = søknadsdata?.barn?.barnStemmer;

    return (
        <SøknadStep stepId={stepId}>
            <VStack gap="space-32">
                <VStack gap="space-16">
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
                        </FormSummary.Header>
                        <FormSummary.Answers>
                            {kontoInfo.harKontonummer === HarKontonummerEnum.JA && (
                                <FormSummary.Answer>
                                    <FormSummary.Label>
                                        <AppText
                                            id="kontonummerSteg.kontonummer.spm"
                                            values={{ kontonummer: kontoInfo.formatertKontonummer }}
                                        />
                                    </FormSummary.Label>
                                    <FormSummary.Value>
                                        {kontonummerSvar === YesOrNo.YES
                                            ? text('kontonummerSteg.kontonummer.ja.label')
                                            : text('kontonummerSteg.kontonummer.nei.label')}
                                    </FormSummary.Value>
                                </FormSummary.Answer>
                            )}
                            {kontoInfo.harKontonummer === HarKontonummerEnum.NEI && (
                                <FormSummary.Answer>
                                    <FormSummary.Label>
                                        <AppText id="oppsummeringSteg.kontonummer.ingenKontonummer.tittel" />
                                    </FormSummary.Label>
                                    <FormSummary.Value>
                                        <AppText id="oppsummeringSteg.kontonummer.ingenKontonummer.tekst" />
                                    </FormSummary.Value>
                                </FormSummary.Answer>
                            )}
                            {kontoInfo.harKontonummer === HarKontonummerEnum.UVISST && (
                                <FormSummary.Answer>
                                    <FormSummary.Label>
                                        <AppText id="oppsummeringSteg.kontonummer.kontonummerInfoMangler.tittel" />
                                    </FormSummary.Label>
                                    <FormSummary.Value>
                                        <AppText id="oppsummeringSteg.kontonummer.kontonummerInfoMangler.tekst" />
                                    </FormSummary.Value>
                                </FormSummary.Answer>
                            )}
                        </FormSummary.Answers>
                        <FormSummary.Footer>
                            <FormSummary.EditLink
                                href="#"
                                onClick={(evt) => {
                                    evt.preventDefault();
                                    evt.stopPropagation();
                                    navigateToStep(SøknadStepId.KONTONUMMER);
                                }}
                            />
                        </FormSummary.Footer>
                    </FormSummary>
                    <FormSummary>
                        <FormSummary.Header>
                            <FormSummary.Heading level="2">
                                <AppText id="oppsummeringSteg.barn.tittel" />
                            </FormSummary.Heading>
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
                                        values={{ antallBarn: barn.length }}
                                    />
                                </FormSummary.Label>
                                <FormSummary.Value>
                                    {barnSvar === YesOrNo.YES
                                        ? text('barnSteg.barnStemmer.ja.label')
                                        : text('barnSteg.barnStemmer.nei.label')}
                                </FormSummary.Value>
                            </FormSummary.Answer>
                        </FormSummary.Answers>
                        <FormSummary.Footer>
                            <FormSummary.EditLink
                                href="#"
                                onClick={(evt) => {
                                    evt.preventDefault();
                                    evt.stopPropagation();
                                    navigateToStep(SøknadStepId.BARN);
                                }}
                            />
                        </FormSummary.Footer>
                    </FormSummary>
                </VStack>

                {søknadError ? <Alert variant="error">{søknadError}</Alert> : null}

                <form
                    onSubmit={(evt) => {
                        evt.preventDefault();
                        handleOnSubmit();
                    }}>
                    <VStack gap="space-16">
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

                        <FormLayout.FormButtons
                            submitPending={isPending}
                            submitDisabled={!!søknadError}
                            onPrevious={() => navigateToStep(SøknadStepId.BARN)}
                            isFinalSubmit={true}
                            submitLabel={text('søknadApp.sendSøknad.label')}
                        />
                    </VStack>
                </form>
            </VStack>
        </SøknadStep>
    );
};
export default OppsummeringSteg;
