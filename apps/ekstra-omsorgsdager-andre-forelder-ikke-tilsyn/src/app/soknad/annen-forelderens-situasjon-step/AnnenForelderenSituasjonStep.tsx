import React from 'react';
import SoknadFormStep from '../SoknadFormStep';
import { StepID } from '../soknadStepsConfig';
import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import CounsellorPanel from '@navikt/sif-common-core/lib/components/counsellor-panel/CounsellorPanel';
import Box from '@navikt/sif-common-core/lib/components/box/Box';
import SoknadFormComponents from '../SoknadFormComponents';
import { AnnenForeldrenSituasjon, SoknadFormData, SoknadFormField } from '../../types/SoknadFormData';
import { useFormikContext } from 'formik';
import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
import { YesOrNo } from '@navikt/sif-common-core/lib/types/YesOrNo';
import AlertStripe from 'nav-frontend-alertstriper';
import datepickerUtils from '@navikt/sif-common-formik/lib/components/formik-datepicker/datepickerUtils';
import dayjs from 'dayjs';

import {
    getYesOrNoValidator,
    getRequiredFieldValidator,
    getStringValidator,
} from '@navikt/sif-common-formik/lib/validation';
import { validateFradato, validateTildato } from '../../validation/fieldValidations';

export const isPeriodeLess6month = (periodeFom: string, periodeTom: string): boolean => {
    return dayjs(periodeTom).add(1, 'day').diff(periodeFom, 'month', true) < 6;
};

export const cleanupAnnenForelderenSituasjonStep = (values: SoknadFormData): SoknadFormData => {
    const cleanedValues = { ...values };

    if (values.annenForelderPeriodeVetIkkeTom) {
        cleanedValues.annenForelderPeriodeTom = '';
    } else {
        cleanedValues.annenForelderPeriodeMer6Maneder = YesOrNo.UNANSWERED;
    }

    if (
        values.annenForelderSituasjon === AnnenForeldrenSituasjon.fengsel ||
        values.annenForelderSituasjon === AnnenForeldrenSituasjon.utøverVerneplikt ||
        values.annenForelderSituasjon === AnnenForeldrenSituasjon.innlagtIHelseinstitusjon
    ) {
        cleanedValues.annenForelderSituasjonBeskrivelse = '';
    }

    return cleanedValues;
};

const AnnenForelderenSituasjonStep = () => {
    const intl = useIntl();
    const { values } = useFormikContext<SoknadFormData>();

    const periodeFra = datepickerUtils.getDateFromDateString(values.annenForelderPeriodeFom);

    const periodeTil = datepickerUtils.getDateFromDateString(values.annenForelderPeriodeTom);

    const renderTekstArea = () => {
        return (
            <FormBlock>
                <SoknadFormComponents.Textarea
                    name={SoknadFormField.annenForelderSituasjonBeskrivelse}
                    label={intlHelper(intl, 'step.annen-foreldrens-situasjon.beskrivelseAvSituasjonen.spm')}
                    minLength={5}
                    maxLength={1000}
                    validate={(value) => {
                        const error = getStringValidator({ required: true, minLength: 5, maxLength: 1000 })(value);
                        return error
                            ? {
                                  key: error,
                                  values: {
                                      min: 5,
                                      maks: 1000,
                                  },
                              }
                            : undefined;
                    }}
                />
            </FormBlock>
        );
    };

    const renderOver6MndSpm = () => {
        return (
            <>
                <FormBlock>
                    <SoknadFormComponents.YesOrNoQuestion
                        name={SoknadFormField.annenForelderPeriodeMer6Maneder}
                        legend={intlHelper(intl, 'step.annen-foreldrens-situasjon.erVarighetMerEnn6Maneder.spm')}
                        validate={getYesOrNoValidator()}
                    />
                    {values.annenForelderPeriodeMer6Maneder === YesOrNo.NO && (
                        <FormBlock>
                            <AlertStripe type={'info'}>
                                {intlHelper(intl, 'step.annen-foreldrens-situasjon.advarsel.1')}
                            </AlertStripe>
                        </FormBlock>
                    )}
                </FormBlock>
            </>
        );
    };

    const renderDateRangePicker = () => {
        const dontShowVetIkkeTomCheckbox = () => {
            return (
                values.annenForelderSituasjon === AnnenForeldrenSituasjon.fengsel ||
                values.annenForelderSituasjon === AnnenForeldrenSituasjon.utøverVerneplikt
            );
        };
        if (dontShowVetIkkeTomCheckbox()) {
            values.annenForelderPeriodeVetIkkeTom = undefined;
        }

        if (values.annenForelderPeriodeVetIkkeTom) {
            values.annenForelderPeriodeTom = '';
        }
        return (
            <FormBlock>
                <SoknadFormComponents.DateRangePicker
                    legend={
                        values.annenForelderSituasjon === AnnenForeldrenSituasjon.sykdom
                            ? intlHelper(intl, 'step.annen-foreldrens-situasjon.periode.sykdom.spm')
                            : values.annenForelderSituasjon === AnnenForeldrenSituasjon.innlagtIHelseinstitusjon
                            ? intlHelper(intl, 'step.annen-foreldrens-situasjon.periode.innlagtIHelseinstitusjon.spm')
                            : values.annenForelderSituasjon === AnnenForeldrenSituasjon.fengsel
                            ? intlHelper(intl, 'step.annen-foreldrens-situasjon.periode.fengsel.spm')
                            : values.annenForelderSituasjon === AnnenForeldrenSituasjon.utøverVerneplikt
                            ? intlHelper(intl, 'step.annen-foreldrens-situasjon.periode.verneplikt.spm')
                            : intlHelper(intl, 'step.annen-foreldrens-situasjon.periode.annet.spm')
                    }
                    fromInputProps={{
                        label: intlHelper(intl, 'step.annen-foreldrens-situasjon.periode.fra'),
                        validate: (value) => validateFradato(value, periodeTil, values.annenForelderSituasjon),
                        name: SoknadFormField.annenForelderPeriodeFom,
                    }}
                    toInputProps={{
                        label: intlHelper(intl, 'step.annen-foreldrens-situasjon.periode.til'),
                        validate: values.annenForelderPeriodeVetIkkeTom
                            ? undefined
                            : (value) => validateTildato(value, periodeFra, values.annenForelderSituasjon),
                        name: SoknadFormField.annenForelderPeriodeTom,
                        disabled: values.annenForelderPeriodeVetIkkeTom,
                    }}
                />
                {!dontShowVetIkkeTomCheckbox() && (
                    <SoknadFormComponents.Checkbox
                        label={intlHelper(intl, 'step.annen-foreldrens-situasjon.periode.checkboxVetIkkeTom')}
                        name={SoknadFormField.annenForelderPeriodeVetIkkeTom}
                    />
                )}
                {values.annenForelderPeriodeFom &&
                    values.annenForelderPeriodeTom &&
                    isPeriodeLess6month(values.annenForelderPeriodeFom, values.annenForelderPeriodeTom) && (
                        <FormBlock>
                            <AlertStripe type={'info'}>
                                {intlHelper(intl, 'step.annen-foreldrens-situasjon.advarsel.1')}
                            </AlertStripe>
                        </FormBlock>
                    )}
            </FormBlock>
        );
    };

    return (
        <SoknadFormStep id={StepID.ANNEN_FORELDER_SITUASJON} onStepCleanup={cleanupAnnenForelderenSituasjonStep}>
            <CounsellorPanel>{intlHelper(intl, 'step.annen-foreldrens-situasjon.banner.1')}</CounsellorPanel>

            <Box margin="xxl">
                <SoknadFormComponents.RadioPanelGroup
                    legend={intlHelper(intl, 'step.annen-foreldrens-situasjon.grunn.spm')}
                    name={SoknadFormField.annenForelderSituasjon}
                    radios={[
                        {
                            label: intlHelper(intl, 'step.annen-foreldrens-situasjon.grunn.sykdom'),
                            value: AnnenForeldrenSituasjon.sykdom,
                        },
                        {
                            label: intlHelper(intl, 'step.annen-foreldrens-situasjon.grunn.innlagtIHelseinstitusjon'),
                            value: AnnenForeldrenSituasjon.innlagtIHelseinstitusjon,
                        },
                        {
                            label: intlHelper(intl, 'step.annen-foreldrens-situasjon.grunn.fengsel'),
                            value: AnnenForeldrenSituasjon.fengsel,
                        },
                        {
                            label: intlHelper(intl, 'step.annen-foreldrens-situasjon.grunn.verneplikt'),
                            value: AnnenForeldrenSituasjon.utøverVerneplikt,
                        },
                        {
                            label: intlHelper(intl, 'step.annen-foreldrens-situasjon.grunn.annet'),
                            value: AnnenForeldrenSituasjon.annet,
                        },
                    ]}
                    validate={getRequiredFieldValidator()}
                />
            </Box>

            {(values.annenForelderSituasjon === AnnenForeldrenSituasjon.sykdom ||
                values.annenForelderSituasjon === AnnenForeldrenSituasjon.annet) &&
                renderTekstArea()}

            {values.annenForelderSituasjon && renderDateRangePicker()}

            {values.annenForelderPeriodeVetIkkeTom && renderOver6MndSpm()}
        </SoknadFormStep>
    );
};

export default AnnenForelderenSituasjonStep;
