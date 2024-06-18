import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import {
    DateRange,
    FormikYesOrNoQuestion,
    ValidationError,
    YesOrNo,
    getTypedFormComponents,
} from '@navikt/sif-common-formik-ds';
import { getYesOrNoValidator } from '@navikt/sif-common-formik-ds/src/validation';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { Utenlandsopphold } from '@navikt/sif-common-forms-ds';
import UtenlandsoppholdListAndDialog from '@navikt/sif-common-forms-ds/src/forms/utenlandsopphold/UtenlandsoppholdListAndDialog';
import { getDateRangeFromDates } from '@navikt/sif-common-utils';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { StepId } from '../../../types/StepId';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import SøknadStep from '../../SøknadStep';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { getSøknadStepConfigForStep } from '../../søknadStepConfig';
import DagerMedPleieFormPart from './DagerMedPleieFormPart';
import {
    getTidsromStepInitialValues,
    getTidsromSøknadsdataFromFormValues,
    validateUtenlandsoppholdIPerioden,
} from './tidsromStepUtils';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import { Alert } from '@navikt/ds-react';
import { AppText, useAppIntl } from '../../../i18n';

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
    [TidsromFormFields.utenlandsoppholdIPerioden]: Utenlandsopphold[];
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
                                <SifGuidePanel>
                                    <p>
                                        <AppText id="step.tidsrom.counsellorPanel.avsnitt.1" />
                                    </p>
                                    <p>
                                        <AppText id="step.tidsrom.counsellorPanel.avsnitt.2" />
                                    </p>
                                    <p>
                                        <AppText id="step.tidsrom.counsellorPanel.avsnitt.3" />
                                    </p>
                                </SifGuidePanel>

                                <FormBlock>
                                    <DagerMedPleieFormPart />
                                </FormBlock>
                                {periode && (
                                    <>
                                        <FormBlock>
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
                                                            <AppText
                                                                id={
                                                                    'steg.opplysningerOmPleietrengende.pleierDuDenSykeHjemme.info.1'
                                                                }
                                                            />
                                                        </p>
                                                        <p>
                                                            <AppText
                                                                id={
                                                                    'steg.opplysningerOmPleietrengende.pleierDuDenSykeHjemme.info.2'
                                                                }
                                                            />
                                                        </p>
                                                    </ExpandableInfo>
                                                }
                                            />
                                        </FormBlock>
                                        {pleierDuDenSykeHjemme === YesOrNo.NO && (
                                            <FormBlock>
                                                <Alert variant="warning">
                                                    <AppText id="steg.opplysningerOmPleietrengende.pleierDuDenSykeHjemme.alert" />
                                                </Alert>
                                            </FormBlock>
                                        )}

                                        {pleierDuDenSykeHjemme === YesOrNo.YES && (
                                            <>
                                                <FormBlock>
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
                                                </FormBlock>
                                                <FormBlock>
                                                    <YesOrNoQuestion
                                                        legend={text('steg.tidsrom.iUtlandetIPerioden.spm')}
                                                        name={TidsromFormFields.skalOppholdeSegIUtlandetIPerioden}
                                                        validate={getYesOrNoValidator()}
                                                    />
                                                </FormBlock>
                                                {skalOppholdeSegIUtlandetIPerioden === YesOrNo.YES && (
                                                    <FormBlock>
                                                        <UtenlandsoppholdListAndDialog<TidsromFormFields>
                                                            name={TidsromFormFields.utenlandsoppholdIPerioden}
                                                            minDate={periode.from}
                                                            maxDate={periode.to}
                                                            excludeInnlagtQuestion={true}
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
                                                                    ? (opphold: Utenlandsopphold[]) =>
                                                                          validateUtenlandsoppholdIPerioden(
                                                                              periode,
                                                                              opphold,
                                                                          )
                                                                    : undefined
                                                            }
                                                        />
                                                    </FormBlock>
                                                )}
                                            </>
                                        )}
                                    </>
                                )}
                            </Form>
                        </>
                    );
                }}
            />
        </SøknadStep>
    );
};

export default TidsromStep;
