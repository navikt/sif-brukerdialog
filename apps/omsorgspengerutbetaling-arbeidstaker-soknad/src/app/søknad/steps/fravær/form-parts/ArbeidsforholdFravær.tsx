import { BodyLong } from '@navikt/ds-react';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import { getTypedFormComponents, ValidationError, ValidationResult, YesOrNo } from '@navikt/sif-common-formik-ds';
import { getYesOrNoValidator, ValidateYesOrNoError } from '@navikt/sif-common-validation';
import { validateAll } from '@navikt/sif-common-formik-ds';
import { fraværDagToFraværDateRange, fraværPeriodeToDateRange } from '@navikt/sif-common-forms-ds/src/forms/fravær';
import FraværDagerListAndDialog from '@navikt/sif-common-forms-ds/src/forms/fravær/FraværDagerListAndDialog';
import FraværPerioderListAndDialog from '@navikt/sif-common-forms-ds/src/forms/fravær/FraværPerioderListAndDialog';
import { AppText, useAppIntl } from '../../../../i18n';
import { Fravær, FraværFormFields } from '../../../../types/FraværTypes';
import {
    AppFieldValidationErrors,
    getFraværDagerValidator,
    getFraværPerioderValidator,
} from '../../../../utils/validations';
import { FraværStepFormFields, FraværStepFormValues } from '../FraværStep';

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
    const { text } = useAppIntl();

    const getFieldName = (field: FraværFormFields) => `${parentFieldName}.${field}` as FraværStepFormFields;

    const getTidsromBegrensningInfo = (delvisdag?: boolean) => (
        <>
            <ExpandableInfo title={text('step.fravær.info.ikkeHelg.tittel')}>
                {delvisdag && <AppText id="step.fravær.delvisdag.info.ikkeHelg.tekst" />}
                {!delvisdag && <AppText id="step.fravær.heledager.info.ikkeHelg.tekst" />}
            </ExpandableInfo>
            <BodyLong style={{ marginTop: '.5rem', paddingBottom: '.5rem' }}>
                <AppText id="step.fravær.perioderDagModal.begrensTilSammeÅrInfo" />
            </BodyLong>
        </>
    );

    const { harPerioderMedFravær, harDagerMedDelvisFravær, fraværDager, fraværPerioder } = fravær;

    return (
        <>
            <FormBlock>
                <YesOrNoQuestion
                    name={getFieldName(FraværFormFields.harPerioderMedFravær)}
                    legend={text('step.fravær.heledager.spm')}
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
                        periodeDescription={getTidsromBegrensningInfo()}
                        minDate={minDateForFravær}
                        maxDate={maxDateForFravær}
                        validate={getFraværPerioderValidator({ fraværDager, arbeidsgiverNavn, årstall })}
                        labels={{
                            addLabel: text('step.fravær.heledager.perioderModal.label'),
                            modalTitle: text('step.fravær.heledager.perioderModal.title'),
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
                    legend={text('step.fravær.delvisdag.spm')}
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
                            dagDescription={getTidsromBegrensningInfo(true)}
                            minDate={minDateForFravær}
                            maxDate={maxDateForFravær}
                            validate={getFraværDagerValidator({ fraværPerioder, arbeidsgiverNavn, årstall })}
                            labels={{
                                addLabel: text('step.fravær.delvisdag.dagModal.label'),
                                modalTitle: text('step.fravær.delvisdag.dagModal.title'),
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
