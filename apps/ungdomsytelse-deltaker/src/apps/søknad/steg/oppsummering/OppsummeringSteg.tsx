import { ErrorSummary, FormSummary, LocalAlert } from '@navikt/ds-react';
import { ErrorSummaryItem } from '@navikt/ds-react/ErrorSummary';
import { dateFormatter } from '@navikt/sif-common-utils';
import { getCheckedValidator } from '@navikt/sif-validation';
import { AppText, useAppIntl } from '@shared/i18n';
import { DeltakerSkjemaId } from '@shared/types/DeltakerSkjemaId';
import { getInvalidParametersFromApiError } from '@sif/api';
import { createSifFormComponents, useSifValidate, YesOrNo } from '@sif/rhf';
import { useSøknadFormValues } from '@sif/soknad/consistency';
import { FormLayout } from '@sif/soknad-ui/components';
import { useEffect, useRef } from 'react';

import { useAnalyticsInstance } from '../../../../analytics/analytics';
import { useDeltakerContext } from '../../../../hooks/useDeltakerContext';
import { SøknadStepId } from '../../setup/config/SøknadStepId';
import { useSøknadsflyt } from '../../setup/context/søknadContext';
import { useSøknadMellomlagring } from '../../setup/hooks/useSøknadMellomlagring';
import { useSøknadRhfForm } from '../../setup/hooks/useSøknadRhfForm';
import { useSøknadState } from '../../setup/hooks/useSøknadState';
import { useSøknadStore } from '../../setup/hooks/useSøknadStore';
import { AppForm } from '../../setup/soknad/AppForm';
import { SøknadStep } from '../../setup/soknad/SøknadStep';
import { useSendSøknad } from '../../hooks/api/useSendSøknad';
import BarnInfo from '../barn/BarnInfo';
import { buildSøknadFromSvar, HarKontonummerEnum } from './oppsummeringUtils';

enum FormFields {
    bekrefterOpplysninger = 'bekrefterOpplysninger',
}

type FormValues = {
    [FormFields.bekrefterOpplysninger]: boolean;
};

const { Checkbox } = createSifFormComponents<FormValues>();

const stepId = SøknadStepId.OPPSUMMERING;

const OppsummeringSteg = () => {
    const { text } = useAppIntl();
    const { validateField } = useSifValidate('oppsummeringForm');
    const methods = useSøknadRhfForm<FormValues>(stepId, {});

    const { søker, barn, kontoInfo, søknadOppgave } = useSøknadState();
    const { deltakelsePeriode } = useDeltakerContext();
    const { søknadsdata, navigateToStep } = useSøknadsflyt();
    const setSøknadSendt = useSøknadStore((s) => s.setSøknadSendt);
    const { clearSøknadFormValues } = useSøknadFormValues();
    const { slettMellomlagring } = useSøknadMellomlagring();
    const { logSkjemaFeilet, logSkjemaFullført } = useAnalyticsInstance();

    const { isPending, mutateAsync, error: sendSøknadError } = useSendSøknad();
    const sendSøknadErrorSummary = useRef<HTMLDivElement>(null);

    const dto = søknadsdata
        ? buildSøknadFromSvar({
              deltakelseId: deltakelsePeriode.id,
              oppgaveReferanse: søknadOppgave.oppgaveReferanse,
              søknadsdata,
              søkerNorskIdent: søker.fødselsnummer,
              startdato: deltakelsePeriode.programPeriode.from,
              kontonummerInfo: kontoInfo,
          })
        : undefined;

    const harBekreftetOpplysninger = methods.watch(FormFields.bekrefterOpplysninger);
    const invalidParameters = getInvalidParametersFromApiError(sendSøknadError);

    useEffect(() => {
        if (sendSøknadError && !invalidParameters) {
            sendSøknadErrorSummary.current?.focus();
        }
    }, [sendSøknadError, invalidParameters]);

    const onSubmit = async () => {
        if (dto === undefined) {
            return;
        }
        try {
            await mutateAsync({ ...dto, harBekreftetOpplysninger });
            await slettMellomlagring();
            clearSøknadFormValues();
            await logSkjemaFullført(DeltakerSkjemaId.SØKNAD);
            setSøknadSendt();
        } catch {
            await logSkjemaFeilet(DeltakerSkjemaId.SØKNAD);
        }
    };

    const kontonummerSvar = søknadsdata?.kontonummer?.kontonummerErRiktig;
    const barnSvar = søknadsdata?.barn?.barnStemmer;

    return (
        <SøknadStep stepId={stepId}>
            <AppForm
                stepId={stepId}
                methods={methods}
                onSubmit={onSubmit}
                isPending={isPending}
                isFinalSubmit={true}
                submitDisabled={!dto}>
                <FormLayout.Summary>
                    {!dto && (
                        <LocalAlert status="error">
                            <LocalAlert.Header>
                                <LocalAlert.Title>
                                    <AppText id="oppsummeringSteg.feil.tittel" />
                                </LocalAlert.Title>
                            </LocalAlert.Header>
                            <LocalAlert.Content>
                                <AppText id="oppsummeringSteg.feil.innhold" />
                            </LocalAlert.Content>
                        </LocalAlert>
                    )}
                    {dto && (
                        <>
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
                        </>
                    )}

                    <Checkbox
                        disabled={isPending}
                        name={FormFields.bekrefterOpplysninger}
                        validate={validateField(FormFields.bekrefterOpplysninger, getCheckedValidator())}>
                        <AppText id="oppsummeringSteg.bekrefterOpplysninger.label" />
                    </Checkbox>

                    {sendSøknadError && !invalidParameters && (
                        <ErrorSummary ref={sendSøknadErrorSummary}>
                            <ErrorSummaryItem>{sendSøknadError.message}</ErrorSummaryItem>
                        </ErrorSummary>
                    )}
                </FormLayout.Summary>
            </AppForm>
        </SøknadStep>
    );
};
export default OppsummeringSteg;
