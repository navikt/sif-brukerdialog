import { Alert } from '@navikt/ds-react';
import { FormattedMessage, useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import ExpandableInfo from '@navikt/sif-common-core-ds/lib/components/expandable-info/ExpandableInfo';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { DateRange, getTypedFormComponents, ValidationError, YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import datepickerUtils from '@navikt/sif-common-formik-ds/lib/components/formik-datepicker/datepickerUtils';
import { getRequiredFieldValidator, getYesOrNoValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import { Ferieuttak, Utenlandsopphold } from '@navikt/sif-common-forms-ds/lib';
import FerieuttakListAndDialog from '@navikt/sif-common-forms-ds/lib/forms/ferieuttak/FerieuttakListAndDialog';
import UtenlandsoppholdListAndDialog from '@navikt/sif-common-forms-ds/lib/forms/utenlandsopphold/UtenlandsoppholdListAndDialog';
import { date1YearAgo, date1YearFromNow } from '@navikt/sif-common-utils/lib';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { StepId } from '../../../types/StepId';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { YesOrNoDontKnow } from '../../../types/YesOrNoDontKnow';
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
    søkerKunHelgedager,
    validateFerieuttakIPerioden,
    validateUtenlandsoppholdIPerioden,
} from './tidsromStepUtils';

export enum TidsromFormFields {
    dagerMedPleie = 'dagerMedPleie',
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
    [TidsromFormFields.dagerMedPleie]?: Date[];
    [TidsromFormFields.periodeFra]?: string;
    [TidsromFormFields.periodeTil]?: string;
    [TidsromFormFields.pleierDuDenSykeHjemme]: YesOrNo;
    [TidsromFormFields.flereSokere]: YesOrNoDontKnow;
    [TidsromFormFields.skalOppholdeSegIUtlandetIPerioden]?: YesOrNo;
    [TidsromFormFields.utenlandsoppholdIPerioden]: Utenlandsopphold[];
    [TidsromFormFields.skalTaUtFerieIPerioden]: YesOrNo;
    [TidsromFormFields.ferieuttakIPerioden]: Ferieuttak[];
}

const { FormikWrapper, Form, YesOrNoQuestion, RadioGroup } = getTypedFormComponents<
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
        },
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

                    return (
                        <>
                            <PersistStepFormValues stepId={stepId} />
                            <Form
                                formErrorHandler={getIntlFormErrorHandler(intl, 'validation')}
                                includeValidationSummary={true}
                                submitPending={isSubmitting}
                                submitDisabled={
                                    søkerKunHelgedager(periodeFra, periodeTil) ||
                                    pleierDuDenSykeHjemme === YesOrNo.NO ||
                                    isSubmitting
                                }
                                onBack={goBack}
                                runDelayedFormValidation={true}>
                                <SifGuidePanel>
                                    <FormattedMessage id="step.tidsrom.counsellorPanel.avsnitt.1" />

                                    <p>
                                        <FormattedMessage id="step.tidsrom.counsellorPanel.avsnitt.2" />
                                    </p>
                                    <p>
                                        <FormattedMessage id="step.tidsrom.counsellorPanel.avsnitt.3" />
                                    </p>
                                </SifGuidePanel>

                                <FormBlock>
                                    <DagerMedPleieFormPart />
                                </FormBlock>

                                {søkerKunHelgedager(periodeFra, periodeTil) && (
                                    <Block padBottom="xl">
                                        <Alert variant="warning">
                                            <FormattedMessage id="step.tidsrom.søkerKunHelgedager.alert" />
                                        </Alert>
                                    </Block>
                                )}
                                {!søkerKunHelgedager(periodeFra, periodeTil) && (
                                    <>
                                        <FormBlock>
                                            <YesOrNoQuestion
                                                legend={intlHelper(intl, 'steg.tidsrom.pleierDuDenSykeHjemme.spm')}
                                                name={TidsromFormFields.pleierDuDenSykeHjemme}
                                                validate={getYesOrNoValidator()}
                                                description={
                                                    <ExpandableInfo
                                                        title={intlHelper(
                                                            intl,
                                                            'steg.tidsrom.pleierDuDenSykeHjemme.info.tittel',
                                                        )}>
                                                        <FormattedMessage
                                                            id={'steg.tidsrom.pleierDuDenSykeHjemme.info'}
                                                        />
                                                    </ExpandableInfo>
                                                }
                                                data-testid="pleierDuDenSykeHjemme.spm"
                                            />
                                        </FormBlock>
                                        {pleierDuDenSykeHjemme === YesOrNo.NO && (
                                            <FormBlock>
                                                <Alert variant="warning">
                                                    <FormattedMessage id="steg.tidsrom.pleierDuDenSykeHjemme.alert" />
                                                </Alert>
                                            </FormBlock>
                                        )}
                                        {pleierDuDenSykeHjemme === YesOrNo.YES && (
                                            <>
                                                <FormBlock>
                                                    <RadioGroup
                                                        legend={intlHelper(intl, 'steg.tidsrom.flereSokere.spm')}
                                                        name={TidsromFormFields.flereSokere}
                                                        validate={getRequiredFieldValidator()}
                                                        description={
                                                            <ExpandableInfo
                                                                title={intlHelper(
                                                                    intl,
                                                                    'steg.tidsrom.flereSokere.spm.description.tittle',
                                                                )}>
                                                                {intlHelper(
                                                                    intl,
                                                                    'steg.tidsrom.flereSokere.spm.description',
                                                                )}
                                                            </ExpandableInfo>
                                                        }
                                                        radios={[
                                                            {
                                                                label: intlHelper(intl, `step.tidsrom.flereSokere.ja`),
                                                                value: YesOrNoDontKnow.YES,
                                                                'data-testid': `steg.tidsrom.flereSokere.spm_yes`,
                                                            },
                                                            {
                                                                label: intlHelper(intl, `step.tidsrom.flereSokere.nei`),
                                                                value: YesOrNoDontKnow.NO,
                                                                'data-testid': `steg.tidsrom.flereSokere.spm_no`,
                                                            },
                                                            {
                                                                label: intlHelper(
                                                                    intl,
                                                                    `step.tidsrom.flereSokere.usikker`,
                                                                ),
                                                                value: YesOrNoDontKnow.DO_NOT_KNOW,
                                                                'data-testid': `steg.tidsrom.flereSokere.spm_usikker`,
                                                            },
                                                        ]}
                                                    />
                                                </FormBlock>
                                                <FormBlock>
                                                    <YesOrNoQuestion
                                                        legend={intlHelper(intl, 'steg.tidsrom.iUtlandetIPerioden.spm')}
                                                        name={TidsromFormFields.skalOppholdeSegIUtlandetIPerioden}
                                                        validate={getYesOrNoValidator()}
                                                        data-testid="iUtlandetIPerioden.spm"
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
                                                                modalTitle: intlHelper(
                                                                    intl,
                                                                    'steg.tidsrom.iUtlandetIPerioden.modalTitle',
                                                                ),
                                                                listTitle: intlHelper(
                                                                    intl,
                                                                    'steg.tidsrom.iUtlandetIPerioden.listTitle',
                                                                ),
                                                                addLabel: intlHelper(
                                                                    intl,
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
                                                <FormBlock>
                                                    <YesOrNoQuestion
                                                        legend={intlHelper(
                                                            intl,
                                                            'steg.tidsrom.ferieuttakIPerioden.spm',
                                                        )}
                                                        name={TidsromFormFields.skalTaUtFerieIPerioden}
                                                        validate={getYesOrNoValidator()}
                                                        data-testid="ferieuttakIPerioden.spm"
                                                    />
                                                </FormBlock>
                                                {skalTaUtFerieIPerioden === YesOrNo.YES && (
                                                    <FormBlock>
                                                        <FerieuttakListAndDialog<TidsromFormFields>
                                                            name={TidsromFormFields.ferieuttakIPerioden}
                                                            minDate={periode.from}
                                                            maxDate={periode.to}
                                                            labels={{
                                                                modalTitle: intlHelper(
                                                                    intl,
                                                                    'steg.tidsrom.ferieuttakIPerioden.modalTitle',
                                                                ),
                                                                listTitle: intlHelper(
                                                                    intl,
                                                                    'steg.tidsrom.ferieuttakIPerioden.listTitle',
                                                                ),
                                                                addLabel: intlHelper(
                                                                    intl,
                                                                    'steg.tidsrom.ferieuttakIPerioden.addLabel',
                                                                ),
                                                            }}
                                                            validate={
                                                                periode
                                                                    ? (ferie: Ferieuttak[]) =>
                                                                          validateFerieuttakIPerioden(periode, ferie)
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
