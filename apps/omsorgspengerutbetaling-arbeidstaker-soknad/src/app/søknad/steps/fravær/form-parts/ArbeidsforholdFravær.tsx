import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { ValidationError, ValidationResult, YesOrNo, getTypedFormComponents } from '@navikt/sif-common-formik-ds';
import {
    AppFieldValidationErrors,
    getFraværDagerValidator,
    getFraværPerioderValidator,
} from '../../../../utils/validations';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import { FraværStepFormFields, FraværStepFormValues } from '../FraværStep';
import { Fravær, FraværFormFields } from '../../../../types/FraværTypes';
import FraværPerioderListAndDialog from '@navikt/sif-common-forms-ds/src/forms/fravær/FraværPerioderListAndDialog';
import FraværDagerListAndDialog from '@navikt/sif-common-forms-ds/src/forms/fravær/FraværDagerListAndDialog';
import { fraværDagToFraværDateRange, fraværPeriodeToDateRange } from '@navikt/sif-common-forms-ds/src/forms/fravær';
import { ValidateYesOrNoError, getYesOrNoValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { validateAll } from '@navikt/sif-common-formik-ds/src/validation/validationUtils';
import { BodyLong } from '@navikt/ds-react';

const { YesOrNoQuestion } = getTypedFormComponents<FraværStepFormFields, FraværStepFormValues, ValidationError>();

export const minimumHarPeriodeEllerDelerAvDagYes = (
    harPerioder: YesOrNo,
    harDelerAvDag: YesOrNo,
): ValidationResult<ValidationError> => {
    if (harPerioder === YesOrNo.NO && harDelerAvDag === YesOrNo.NO) {
        return { key: AppFieldValidationErrors.periode_ingenDagerEllerPerioder, keepKeyUnaltered: true };
    }
    return undefined;
};

interface Props {
    fravær: Fravær;
    arbeidsgiverNavn: string;
    parentFieldName: string;
    minDateForFravær: Date;
    maxDateForFravær: Date;
    årstall?: number;
}

const ArbeidsforholdFravær: React.FC<Props> = ({
    fravær,
    arbeidsgiverNavn,
    parentFieldName,
    maxDateForFravær,
    minDateForFravær,
    årstall,
}: Props) => {
    const intl = useIntl();

    const getFieldName = (field: FraværFormFields) => `${parentFieldName}.${field}` as FraværStepFormFields;

    const tidsromBegrensningInfo = (
        <>
            <ExpandableInfo title={intlHelper(intl, 'step.fravær.info.ikkeHelg.tittel')}>
                <FormattedMessage id="step.fravær.info.ikkeHelg.tekst" />
            </ExpandableInfo>
            <BodyLong style={{ marginTop: '.5rem', paddingBottom: '.5rem' }}>
                <FormattedMessage id="step.fravær.heledager.perioderModal.begrensTilSammeÅrAlertStripeTekst" />
            </BodyLong>
        </>
    );

    const { harPerioderMedFravær, harDagerMedDelvisFravær, fraværDager, fraværPerioder } = fravær;

    return (
        <>
            <FormBlock>
                <YesOrNoQuestion
                    name={getFieldName(FraværFormFields.harPerioderMedFravær)}
                    legend={intlHelper(intl, 'step.fravær.heledager.spm')}
                    validate={(value) => {
                        const error = validateAll([
                            () => getYesOrNoValidator()(value),
                            () => minimumHarPeriodeEllerDelerAvDagYes(harPerioderMedFravær, harDagerMedDelvisFravær),
                        ]);
                        if (error === ValidateYesOrNoError.yesOrNoIsUnanswered) {
                            return {
                                key: AppFieldValidationErrors.arbeidsforhold_harPerioderMedFravær_yesOrNoIsUnanswered,
                                keepKeyUnaltered: true,
                                values: { arbeidsgivernavn: arbeidsgiverNavn },
                            };
                        }
                        return error;
                    }}
                    data-testid="harPerioderMedFravær"
                />
            </FormBlock>

            {/* DAGER MED FULLT FRAVÆR*/}
            {harPerioderMedFravær === YesOrNo.YES && (
                <FormBlock margin={'m'}>
                    <FraværPerioderListAndDialog
                        name={getFieldName(FraværFormFields.fraværPerioder)}
                        periodeDescription={tidsromBegrensningInfo}
                        minDate={minDateForFravær}
                        maxDate={maxDateForFravær}
                        validate={getFraværPerioderValidator({ fraværDager, arbeidsgiverNavn, årstall })}
                        labels={{
                            addLabel: intlHelper(intl, 'step.fravær.heledager.perioderModal.label'),
                            modalTitle: intlHelper(intl, 'step.fravær.heledager.perioderModal.title'),
                        }}
                        dateRangesToDisable={[
                            ...fraværPerioder.map(fraværPeriodeToDateRange),
                            ...fraværDager.map(fraværDagToFraværDateRange),
                        ]}
                        helgedagerIkkeTillat={true}
                    />
                </FormBlock>
            )}
            <FormBlock>
                <YesOrNoQuestion
                    name={getFieldName(FraværFormFields.harDagerMedDelvisFravær)}
                    legend={intlHelper(intl, 'step.fravær.delvisdag.spm')}
                    validate={(value) => {
                        const error = validateAll([
                            () => {
                                return getYesOrNoValidator()(value);
                            },
                            () => minimumHarPeriodeEllerDelerAvDagYes(harPerioderMedFravær, harDagerMedDelvisFravær),
                        ]);
                        if (error === ValidateYesOrNoError.yesOrNoIsUnanswered) {
                            return {
                                key: AppFieldValidationErrors.arbeidsforhold_harDagerMedDelvisFravær_yesOrNoIsUnanswered,
                                keepKeyUnaltered: true,
                                values: { arbeidsgivernavn: arbeidsgiverNavn },
                            };
                        }
                        return error;
                    }}
                    data-testid="harDagerMedDelvisFravær"
                />
            </FormBlock>

            {/* DAGER MED DELVIS FRAVÆR*/}
            {harDagerMedDelvisFravær === YesOrNo.YES && (
                <>
                    <FormBlock margin={'m'}>
                        <FraværDagerListAndDialog
                            name={getFieldName(FraværFormFields.fraværDager)}
                            dagDescription={tidsromBegrensningInfo}
                            minDate={minDateForFravær}
                            maxDate={maxDateForFravær}
                            validate={getFraværDagerValidator({ fraværPerioder, arbeidsgiverNavn, årstall })}
                            labels={{
                                addLabel: intlHelper(intl, 'step.fravær.delvisdag.dagModal.label'),
                                modalTitle: intlHelper(intl, 'step.fravær.delvisdag.dagModal.title'),
                            }}
                            dateRangesToDisable={[
                                ...fraværDager.map(fraværDagToFraværDateRange),
                                ...fraværPerioder.map(fraværPeriodeToDateRange),
                            ]}
                            helgedagerIkkeTillatt={true}
                            maksArbeidstidPerDag={24}
                        />
                    </FormBlock>
                </>
            )}
        </>
    );
};

export default ArbeidsforholdFravær;
