import { Alert } from '@navikt/ds-react';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import {
    DateRange,
    FormikYesOrNoQuestion,
    getIntlFormErrorHandler,
    getTypedFormComponents,
    ValidationError,
    YesOrNo,
} from '@navikt/sif-common-formik-ds';
import { UtenlandsoppholdEnkel } from '@navikt/sif-common-forms-ds';
import UtenlandsoppholdListAndDialog from '@navikt/sif-common-forms-ds/src/forms/utenlandsopphold/UtenlandsoppholdListAndDialog';
import { FormLayout } from '@navikt/sif-common-ui';
import { getDateRangeFromDates } from '@navikt/sif-common-utils';
import { getYesOrNoValidator } from '@navikt/sif-validation';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { AppText, useAppIntl } from '../../../i18n';
import { StepId } from '../../../types/StepId';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { appEnv } from '../../../utils/appEnv';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import SøknadStep from '../../SøknadStep';
import { getSøknadStepConfigForStep } from '../../søknadStepConfig';
import DagerMedPleieFormPart from './DagerMedPleieFormPart';
import {
    getTidsromStepInitialValues,
    getTidsromSøknadsdataFromFormValues,
    validateUtenlandsoppholdIPerioden,
} from './tidsromStepUtils';

export enum TidsromFormFields {
    dagerMedPleie = 'dagerMedPleie',
    pleierDuDenSykeHjemme = 'pleierDuDenSykeHjemme',
    skalJobbeOgPleieSammeDag = 'skalJobbeOgPleieSammeDag',
    skalOppholdeSegIUtlandetIPerioden = 'skalOppholdeSegIUtlandetIPerioden',
    utenlandsoppholdIPerioden = 'utenlandsoppholdIPerioden',
}

export interface TidsromFormValues {
    [TidsromFormFields.dagerMedPleie]?: Date[];
    [TidsromFormFields.pleierDuDenSykeHjemme]?: YesOrNo;
    [TidsromFormFields.skalJobbeOgPleieSammeDag]?: YesOrNo;
    [TidsromFormFields.skalOppholdeSegIUtlandetIPerioden]?: YesOrNo;
    [TidsromFormFields.utenlandsoppholdIPerioden]: UtenlandsoppholdEnkel[];
}

const { FormikWrapper, Form, YesOrNoQuestion } = getTypedFormComponents<
    TidsromFormFields,
    TidsromFormValues,
    ValidationError
>();

const TidsromStep = () => {
    const { text, intl } = useAppIntl();

    const {
        state: { søknadsdata },
    } = useSøknadContext();

    const stepId = StepId.TIDSROM;
    const step = getSøknadStepConfigForStep(søknadsdata, stepId);

    const { goBack } = useStepNavigation(step);

    const { stepFormValues, clearStepFormValues } = useStepFormValuesContext();

    const onValidSubmitHandler = (values: TidsromFormValues) => {
        const tidsromSøknadsdata = getTidsromSøknadsdataFromFormValues(values);
        if (tidsromSøknadsdata) {
            clearStepFormValues(stepId);
            return [
                actionsCreator.setSøknadTidsrom(tidsromSøknadsdata),
                actionsCreator.syncArbeidstidMedTidsrom(tidsromSøknadsdata),
            ];
        }
        return [];
    };

    const { handleSubmit, isSubmitting } = useOnValidSubmit(
        onValidSubmitHandler,
        stepId,
        (state: SøknadContextState) => {
            return lagreSøknadState({ ...state });
        },
    );

    return (
        <SøknadStep stepId={stepId}>
            <FormikWrapper
                initialValues={getTidsromStepInitialValues(søknadsdata, stepFormValues[stepId])}
                onSubmit={handleSubmit}
                renderForm={({
                    values: { pleierDuDenSykeHjemme, skalOppholdeSegIUtlandetIPerioden, dagerMedPleie },
                }) => {
                    const periode: DateRange | undefined =
                        dagerMedPleie && dagerMedPleie.length > 0 ? getDateRangeFromDates(dagerMedPleie) : undefined;

                    return (
                        <>
                            <PersistStepFormValues stepId={stepId} />
                            <Form
                                formErrorHandler={getIntlFormErrorHandler(intl, 'validation')}
                                includeValidationSummary={true}
                                submitPending={isSubmitting}
                                showSubmitButton={pleierDuDenSykeHjemme !== YesOrNo.NO}
                                submitDisabled={pleierDuDenSykeHjemme === YesOrNo.NO || isSubmitting}
                                onBack={goBack}
                                runDelayedFormValidation={true}>
                                <FormLayout.Guide>
                                    <p>
                                        <AppText id="step.tidsrom.counsellorPanel.avsnitt.1" />
                                    </p>
                                    <p>
                                        {appEnv.SIF_PUBLIC_FEATURE_SOKE_TIDLIGERE === 'on' ? (
                                            <AppText id="step.tidsrom.counsellorPanel.avsnitt.2.6mnd" />
                                        ) : (
                                            <AppText id="step.tidsrom.counsellorPanel.avsnitt.2.3mnd" />
                                        )}
                                    </p>
                                    <p>
                                        <AppText id="step.tidsrom.counsellorPanel.avsnitt.3" />
                                    </p>
                                </FormLayout.Guide>
                                <FormLayout.Questions>
                                    <DagerMedPleieFormPart />
                                    {periode && (
                                        <>
                                            <FormikYesOrNoQuestion
                                                legend={text(
                                                    'steg.opplysningerOmPleietrengende.pleierDuDenSykeHjemme.spm',
                                                )}
                                                name={TidsromFormFields.pleierDuDenSykeHjemme}
                                                validate={getYesOrNoValidator()}
                                                description={
                                                    <ExpandableInfo
                                                        title={text(
                                                            'steg.opplysningerOmPleietrengende.pleierDuDenSykeHjemme.info.tittel',
                                                        )}>
                                                        <p>
                                                            <AppText id="steg.opplysningerOmPleietrengende.pleierDuDenSykeHjemme.info.1" />
                                                        </p>
                                                        <p>
                                                            <AppText id="steg.opplysningerOmPleietrengende.pleierDuDenSykeHjemme.info.2" />
                                                        </p>
                                                    </ExpandableInfo>
                                                }
                                            />

                                            {pleierDuDenSykeHjemme === YesOrNo.NO && (
                                                <Alert variant="warning">
                                                    <AppText id="steg.opplysningerOmPleietrengende.pleierDuDenSykeHjemme.alert" />
                                                </Alert>
                                            )}

                                            {pleierDuDenSykeHjemme === YesOrNo.YES && (
                                                <>
                                                    <YesOrNoQuestion
                                                        legend={text('steg.tidsrom.skalJobbeIPerioden.spm')}
                                                        name={TidsromFormFields.skalJobbeOgPleieSammeDag}
                                                        validate={getYesOrNoValidator()}
                                                        description={
                                                            <ExpandableInfo
                                                                title={text(
                                                                    'steg.tidsrom.skalJobbeIPerioden.info.tittel',
                                                                )}>
                                                                <p>
                                                                    <AppText id="steg.tidsrom.skalJobbeIPerioden.info.tekst.1" />
                                                                </p>
                                                                <p>
                                                                    <strong>
                                                                        <AppText id="steg.tidsrom.skalJobbeIPerioden.info.tekst.2.1" />
                                                                    </strong>{' '}
                                                                    <AppText id="steg.tidsrom.skalJobbeIPerioden.info.tekst.2.2" />
                                                                </p>
                                                            </ExpandableInfo>
                                                        }
                                                    />
                                                    <YesOrNoQuestion
                                                        legend={text('steg.tidsrom.iUtlandetIPerioden.spm')}
                                                        name={TidsromFormFields.skalOppholdeSegIUtlandetIPerioden}
                                                        validate={getYesOrNoValidator()}
                                                    />

                                                    {skalOppholdeSegIUtlandetIPerioden === YesOrNo.YES && (
                                                        <FormLayout.Panel bleedTop={true}>
                                                            <UtenlandsoppholdListAndDialog<TidsromFormFields>
                                                                name={TidsromFormFields.utenlandsoppholdIPerioden}
                                                                minDate={periode.from}
                                                                maxDate={periode.to}
                                                                variant="enkel"
                                                                labels={{
                                                                    modalTitle: text(
                                                                        'steg.tidsrom.iUtlandetIPerioden.modalTitle',
                                                                    ),
                                                                    listTitle: text(
                                                                        'steg.tidsrom.iUtlandetIPerioden.listTitle',
                                                                    ),
                                                                    addLabel: text(
                                                                        'steg.tidsrom.iUtlandetIPerioden.addLabel',
                                                                    ),
                                                                }}
                                                                validate={
                                                                    periode
                                                                        ? (opphold: UtenlandsoppholdEnkel[]) =>
                                                                              validateUtenlandsoppholdIPerioden(
                                                                                  periode,
                                                                                  opphold,
                                                                              )
                                                                        : undefined
                                                                }
                                                            />
                                                        </FormLayout.Panel>
                                                    )}
                                                </>
                                            )}
                                        </>
                                    )}
                                </FormLayout.Questions>
                            </Form>
                        </>
                    );
                }}
            />
        </SøknadStep>
    );
};

export default TidsromStep;
