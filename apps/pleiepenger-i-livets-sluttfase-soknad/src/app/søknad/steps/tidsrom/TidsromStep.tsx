import { FormattedMessage, useIntl } from 'react-intl';
import { DateRange, ValidationError, YesOrNo, getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';
import { Ferieuttak, Utenlandsopphold } from '@navikt/sif-common-forms-ds/lib';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { StepId } from '../../../types/StepId';
import { getSøknadStepConfigForStep } from '../../søknadStepConfig';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import actionsCreator from '../../context/action/actionCreator';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import SøknadStep from '../../SøknadStep';
import datepickerUtils from '@navikt/sif-common-formik-ds/lib/components/formik-datepicker/datepickerUtils';
import { date1YearAgo, date1YearFromNow } from '@navikt/sif-common-utils/lib';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import ExpandableInfo from '@navikt/sif-common-core-ds/lib/components/expandable-info/ExpandableInfo';
import {
    getTidsromStepInitialValues,
    getTidsromSøknadsdataFromFormValues,
    søkerKunHelgedager,
    validateFerieuttakIPerioden,
    validateFraDato,
    validateTildato,
    validateUtenlandsoppholdIPerioden,
} from './tidsromStepUtils';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import { Alert } from '@navikt/ds-react';
import { getRequiredFieldValidator, getYesOrNoValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import UtenlandsoppholdListAndDialog from '@navikt/sif-common-forms-ds/lib/forms/utenlandsopphold/UtenlandsoppholdListAndDialog';
import FerieuttakListAndDialog from '@navikt/sif-common-forms-ds/lib/forms/ferieuttak/FerieuttakListAndDialog';
import { YesOrNoDontKnow } from '../../../types/YesOrNoDontKnow';

export enum TidsromFormFields {
    periodeFra = 'periodeFra',
    periodeTil = 'periodeTil',
    pleierDuDenSykeHjemme = 'pleierDuDenSykeHjemme',
    flereSokere = 'flereSokere',
    skalOppholdeSegIUtlandetIPerioden = 'skalOppholdeSegIUtlandetIPerioden',
    utenlandsoppholdIPerioden = 'utenlandsoppholdIPerioden',
    skalTaUtFerieIPerioden = 'skalTaUtFerieIPerioden',
    ferieuttakIPerioden = 'ferieuttakIPerioden',
}

export interface TidsromFormValues {
    [TidsromFormFields.periodeFra]?: string;
    [TidsromFormFields.periodeTil]?: string;
    [TidsromFormFields.pleierDuDenSykeHjemme]: YesOrNo;
    [TidsromFormFields.flereSokere]: YesOrNoDontKnow;
    [TidsromFormFields.skalOppholdeSegIUtlandetIPerioden]?: YesOrNo;
    [TidsromFormFields.utenlandsoppholdIPerioden]: Utenlandsopphold[];
    [TidsromFormFields.skalTaUtFerieIPerioden]: YesOrNo;
    [TidsromFormFields.ferieuttakIPerioden]: Ferieuttak[];
}

const { FormikWrapper, Form, DateRangePicker, YesOrNoQuestion, RadioGroup } = getTypedFormComponents<
    TidsromFormFields,
    TidsromFormValues,
    ValidationError
>();

const TidsromStep = () => {
    const intl = useIntl();

    const {
        state: { søknadsdata },
    } = useSøknadContext();

    const stepId = StepId.TIDSROM;
    const step = getSøknadStepConfigForStep(søknadsdata, stepId);

    const { goBack } = useStepNavigation(step);

    const { stepFormValues, clearStepFormValues } = useStepFormValuesContext();

    const onValidSubmitHandler = (values: TidsromFormValues) => {
        const TidsromSøknadsdata = getTidsromSøknadsdataFromFormValues(values);
        if (TidsromSøknadsdata) {
            clearStepFormValues(stepId);
            return [actionsCreator.setSøknadTidsrom(TidsromSøknadsdata)];
        }
        return [];
    };

    const { handleSubmit, isSubmitting } = useOnValidSubmit(
        onValidSubmitHandler,
        stepId,
        (state: SøknadContextState) => {
            return lagreSøknadState({ ...state });
        }
    );

    return (
        <SøknadStep stepId={stepId}>
            <FormikWrapper
                initialValues={getTidsromStepInitialValues(søknadsdata, stepFormValues[stepId])}
                onSubmit={handleSubmit}
                renderForm={({
                    values: {
                        periodeFra,
                        periodeTil,
                        pleierDuDenSykeHjemme,
                        skalOppholdeSegIUtlandetIPerioden,
                        skalTaUtFerieIPerioden,
                    },
                }) => {
                    const periodeFraDate = datepickerUtils.getDateFromDateString(periodeFra);
                    const periodeTilDate = datepickerUtils.getDateFromDateString(periodeTil);
                    const periode: DateRange = {
                        from: periodeFraDate || date1YearAgo,
                        to: periodeTilDate || date1YearFromNow,
                    };

                    const validateFraDatoField = (date?: string) => {
                        return validateFraDato(date, periodeTil);
                    };

                    const validateTilDatoField = (date?: string) => {
                        return validateTildato(date, periodeFra);
                    };

                    return (
                        <>
                            <PersistStepFormValues stepId={stepId} />
                            <Form
                                formErrorHandler={getIntlFormErrorHandler(intl, 'validation')}
                                includeValidationSummary={true}
                                submitPending={isSubmitting}
                                submitDisabled={
                                    (søkerKunHelgedager(periodeFra, periodeTil) &&
                                        pleierDuDenSykeHjemme !== YesOrNo.NO) ||
                                    isSubmitting
                                }
                                onBack={goBack}
                                runDelayedFormValidation={true}>
                                <SifGuidePanel>
                                    <p>
                                        <FormattedMessage id="step.tidsrom.counsellorPanel.avsnit.1" />
                                    </p>
                                    <p>
                                        <FormattedMessage id="step.tidsrom.counsellorPanel.avsnit.2" />
                                    </p>
                                    <p>
                                        <FormattedMessage id="step.tidsrom.counsellorPanel.avsnit.3" />
                                    </p>
                                </SifGuidePanel>
                                <FormBlock>
                                    <DateRangePicker
                                        legend={intlHelper(intl, 'steg.tidsrom.hvilketTidsrom.spm')}
                                        description={
                                            <ExpandableInfo title={intlHelper(intl, 'steg.tidsrom.hjelpetekst.tittel')}>
                                                <p>
                                                    <FormattedMessage id="steg.tidsrom.hjelpetekst.1" />
                                                </p>
                                                <p>
                                                    <FormattedMessage id="steg.tidsrom.hjelpetekst.2" />
                                                </p>
                                                <p>
                                                    <FormattedMessage id="steg.tidsrom.hjelpetekst.3" />
                                                </p>
                                                <p>
                                                    <FormattedMessage id="steg.tidsrom.hjelpetekst.4" />
                                                </p>
                                            </ExpandableInfo>
                                        }
                                        fromInputProps={{
                                            label: intlHelper(intl, 'steg.tidsrom.hvilketTidsrom.fom'),
                                            validate: validateFraDatoField,
                                            name: TidsromFormFields.periodeFra,
                                        }}
                                        toInputProps={{
                                            label: intlHelper(intl, 'steg.tidsrom.hvilketTidsrom.tom'),
                                            validate: validateTilDatoField,
                                            name: TidsromFormFields.periodeTil,
                                        }}
                                        disableWeekend={false}
                                    />
                                    {søkerKunHelgedager(periodeFra, periodeTil) && (
                                        <Block padBottom="xl">
                                            <Alert variant="warning">
                                                <FormattedMessage id="step.tidsrom.søkerKunHelgedager.alert" />
                                            </Alert>
                                        </Block>
                                    )}
                                    {!søkerKunHelgedager(periodeFra, periodeTil) && (
                                        <>
                                            <Block margin="xl">
                                                <YesOrNoQuestion
                                                    legend={intlHelper(intl, 'steg.tidsrom.pleierDuDenSykeHjemme.spm')}
                                                    name={TidsromFormFields.pleierDuDenSykeHjemme}
                                                    validate={getYesOrNoValidator()}
                                                    description={
                                                        <ExpandableInfo
                                                            title={intlHelper(
                                                                intl,
                                                                'steg.tidsrom.pleierDuDenSykeHjemme.info.tittel'
                                                            )}>
                                                            <FormattedMessage
                                                                id={'steg.tidsrom.pleierDuDenSykeHjemme.info'}
                                                            />
                                                        </ExpandableInfo>
                                                    }
                                                />
                                            </Block>
                                            {pleierDuDenSykeHjemme === YesOrNo.NO && (
                                                <Block margin="l">
                                                    <Alert variant="warning">
                                                        <FormattedMessage id="steg.tidsrom.pleierDuDenSykeHjemme.alert" />
                                                    </Alert>
                                                </Block>
                                            )}
                                            {pleierDuDenSykeHjemme === YesOrNo.YES && (
                                                <>
                                                    <Block margin="xl">
                                                        <RadioGroup
                                                            legend={intlHelper(intl, 'steg.tidsrom.flereSokere.spm')}
                                                            name={TidsromFormFields.flereSokere}
                                                            validate={getRequiredFieldValidator()}
                                                            description={
                                                                <ExpandableInfo
                                                                    title={intlHelper(
                                                                        intl,
                                                                        'steg.tidsrom.flereSokere.spm.description.tittle'
                                                                    )}>
                                                                    {intlHelper(
                                                                        intl,
                                                                        'steg.tidsrom.flereSokere.spm.description'
                                                                    )}
                                                                </ExpandableInfo>
                                                            }
                                                            radios={[
                                                                {
                                                                    label: intlHelper(
                                                                        intl,
                                                                        `step.tidsrom.flereSokere.ja`
                                                                    ),
                                                                    value: YesOrNoDontKnow.YES,
                                                                    'data-testid': `steg.tidsrom.flereSokere.spm-ja`,
                                                                },
                                                                {
                                                                    label: intlHelper(
                                                                        intl,
                                                                        `step.tidsrom.flereSokere.nei`
                                                                    ),
                                                                    value: YesOrNoDontKnow.NO,
                                                                    'data-testid': `steg.tidsrom.flereSokere.spm-nei`,
                                                                },
                                                                {
                                                                    label: intlHelper(
                                                                        intl,
                                                                        `step.tidsrom.flereSokere.usikker`
                                                                    ),
                                                                    value: YesOrNoDontKnow.DO_NOT_KNOW,
                                                                    'data-testid': `steg.tidsrom.flereSokere.spm-usikker`,
                                                                },
                                                            ]}
                                                        />
                                                    </Block>
                                                    <Block margin="xl">
                                                        <YesOrNoQuestion
                                                            legend={intlHelper(
                                                                intl,
                                                                'steg.tidsrom.iUtlandetIPerioden.spm'
                                                            )}
                                                            name={TidsromFormFields.skalOppholdeSegIUtlandetIPerioden}
                                                            validate={getYesOrNoValidator()}
                                                        />
                                                    </Block>
                                                    {skalOppholdeSegIUtlandetIPerioden === YesOrNo.YES && (
                                                        <Block margin="m">
                                                            <UtenlandsoppholdListAndDialog<TidsromFormFields>
                                                                name={TidsromFormFields.utenlandsoppholdIPerioden}
                                                                minDate={periode.from}
                                                                maxDate={periode.to}
                                                                labels={{
                                                                    modalTitle: intlHelper(
                                                                        intl,
                                                                        'steg.tidsrom.iUtlandetIPerioden.modalTitle'
                                                                    ),
                                                                    listTitle: intlHelper(
                                                                        intl,
                                                                        'steg.tidsrom.iUtlandetIPerioden.listTitle'
                                                                    ),
                                                                    addLabel: intlHelper(
                                                                        intl,
                                                                        'steg.tidsrom.iUtlandetIPerioden.addLabel'
                                                                    ),
                                                                }}
                                                                validate={
                                                                    periode
                                                                        ? (opphold: Utenlandsopphold[]) =>
                                                                              validateUtenlandsoppholdIPerioden(
                                                                                  periode,
                                                                                  opphold
                                                                              )
                                                                        : undefined
                                                                }
                                                            />
                                                        </Block>
                                                    )}
                                                    <Block margin="xl">
                                                        <YesOrNoQuestion
                                                            legend={intlHelper(
                                                                intl,
                                                                'steg.tidsrom.ferieuttakIPerioden.spm'
                                                            )}
                                                            name={TidsromFormFields.skalTaUtFerieIPerioden}
                                                            validate={getYesOrNoValidator()}
                                                        />
                                                    </Block>
                                                    {skalTaUtFerieIPerioden === YesOrNo.YES && (
                                                        <Block margin="m" padBottom="l">
                                                            <FerieuttakListAndDialog<TidsromFormFields>
                                                                name={TidsromFormFields.ferieuttakIPerioden}
                                                                minDate={periode.from}
                                                                maxDate={periode.to}
                                                                labels={{
                                                                    modalTitle: intlHelper(
                                                                        intl,
                                                                        'steg.tidsrom.ferieuttakIPerioden.modalTitle'
                                                                    ),
                                                                    listTitle: intlHelper(
                                                                        intl,
                                                                        'steg.tidsrom.ferieuttakIPerioden.listTitle'
                                                                    ),
                                                                    addLabel: intlHelper(
                                                                        intl,
                                                                        'steg.tidsrom.ferieuttakIPerioden.addLabel'
                                                                    ),
                                                                }}
                                                                validate={
                                                                    periode
                                                                        ? (ferie: Ferieuttak[]) =>
                                                                              validateFerieuttakIPerioden(
                                                                                  periode,
                                                                                  ferie
                                                                              )
                                                                        : undefined
                                                                }
                                                            />
                                                        </Block>
                                                    )}
                                                </>
                                            )}
                                        </>
                                    )}
                                </FormBlock>
                            </Form>
                        </>
                    );
                }}
            />
        </SøknadStep>
    );
};

export default TidsromStep;
