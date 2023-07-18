import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { ValidationError, ValidationResult, YesOrNo, getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';
import { AppFieldValidationErrors } from '../../../../utils/validations';
import ExpandableInfo from '@navikt/sif-common-core-ds/lib/components/expandable-info/ExpandableInfo';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import { FraværStepFormFields, FraværStepFormValues } from '../FraværStep';
import { Fravær, FraværFormFields } from '../../../../types/FraværTypes';
import FraværPerioderListAndDialog from '@navikt/sif-common-forms-ds/lib/forms/fravær/FraværPerioderListAndDialog';
import FraværDagerListAndDialog from '@navikt/sif-common-forms-ds/lib/forms/fravær/FraværDagerListAndDialog';
import { fraværDagToFraværDateRange, fraværPeriodeToDateRange } from '@navikt/sif-common-forms-ds/lib/forms/fravær';

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
    parentFieldName: string;
    minDateForFravær: Date;
    maxDateForFravær: Date;
    årstall?: number;
}

const ArbeidsforholdFravær: React.FC<Props> = ({
    fravær,
    parentFieldName,
    maxDateForFravær,
    minDateForFravær,
}: Props) => {
    const intl = useIntl();

    const getFieldName = (field: FraværFormFields) => `${parentFieldName}.${field}` as FraværStepFormFields;

    const tidsromBegrensningInfo = (
        <ExpandableInfo title={intlHelper(intl, 'step.fravær.info.ikkeHelg.tittel')}>
            <FormattedMessage id="step.fravær.info.ikkeHelg.tekst" />
        </ExpandableInfo>
    );

    const { harPerioderMedFravær, harDagerMedDelvisFravær, fraværDager, fraværPerioder } = fravær;

    return (
        <>
            <FormBlock>
                <YesOrNoQuestion
                    name={getFieldName(FraværFormFields.harPerioderMedFravær)}
                    legend={intlHelper(intl, 'step.fravær.heledager.spm')}
                />
            </FormBlock>

            {/* DAGER MED FULLT FRAVÆR*/}
            {harPerioderMedFravær === YesOrNo.YES && (
                <>
                    <FormBlock>
                        <FraværPerioderListAndDialog
                            name={getFieldName(FraværFormFields.fraværPerioder)}
                            periodeDescription={tidsromBegrensningInfo}
                            minDate={minDateForFravær}
                            maxDate={maxDateForFravær}
                            // validate={getFraværPerioderValidator({ fraværDager, årstall })}
                            labels={{
                                addLabel: intlHelper(intl, 'step.fravær.heledager.perioderModal.label'),
                                modalTitle: intlHelper(intl, 'step.fravær.heledager.perioderModal.title'),
                            }}
                            dateRangesToDisable={[
                                ...fraværPerioder.map(fraværPeriodeToDateRange),
                                ...fraværDager.map(fraværDagToFraværDateRange),
                            ]}
                            begrensTilSammeÅrAlertStripeTekst={intlHelper(
                                intl,
                                'step.fravær.heledager.perioderModal.begrensTilSammeÅrAlertStripeTekst',
                            )}
                            helgedagerIkkeTillat={true}
                        />
                    </FormBlock>
                </>
            )}
            <FormBlock>
                <YesOrNoQuestion
                    name={getFieldName(FraværFormFields.harDagerMedDelvisFravær)}
                    legend={intlHelper(intl, 'step.fravær.delvisdag.spm')}
                />
            </FormBlock>

            {/* DAGER MED DELVIS FRAVÆR*/}
            {harDagerMedDelvisFravær === YesOrNo.YES && (
                <>
                    <FormBlock>
                        <FraværDagerListAndDialog
                            name={getFieldName(FraværFormFields.fraværDager)}
                            dagDescription={tidsromBegrensningInfo}
                            minDate={minDateForFravær}
                            maxDate={maxDateForFravær}
                            // validate={getFraværDagerValidator({ fraværPerioder, årstall })}
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
