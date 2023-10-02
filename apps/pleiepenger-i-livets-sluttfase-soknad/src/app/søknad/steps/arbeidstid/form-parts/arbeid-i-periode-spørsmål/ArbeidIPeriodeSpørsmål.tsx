import { Alert } from '@navikt/ds-react';
import { useContext, useEffect, useState } from 'react';
import { IntlShape, useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import {
    DateRange,
    FormikInputGroup,
    getErrorForField,
    getTypedFormComponents,
    TypedFormikFormContext,
    ValidationError,
} from '@navikt/sif-common-formik-ds/lib';
import getTimeValidator from '@navikt/sif-common-formik-ds/lib/validation/getTimeValidator';
import DurationWeekdaysInput from '@navikt/sif-common-ui/src/duration-weekdays-input/DurationWeekdaysInput';
import { dateFormatter, getDatesInDateRange, isDateInDates } from '@navikt/sif-common-utils/lib';
import { ArbeidstidFormFields, ArbeidstidFormValues } from '../../ArbeidstidStep';
import { ArbeidIPeriode, ArbeidIPeriodeField, JobberIPeriodeSvar } from '../../ArbeidstidTypes';
import { ArbeidsforholdType, ArbeidstidRegistrertLogProps } from '../types';
import { getJobberIPeriodenValidator } from '../validation/jobberIPeriodenSpørsmål';
import { getArbeidstidIPeriodeIntlValues } from '../../../../../local-sif-common-pleiepenger/arbeidstid/arbeidstid-periode-dialog/utils/arbeidstidPeriodeIntlValuesUtils';
import { useFormikContext } from 'formik';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';

const { RadioGroup } = getTypedFormComponents<ArbeidstidFormFields, ArbeidstidFormValues, ValidationError>();

interface Props extends ArbeidstidRegistrertLogProps {
    parentFieldName: string;
    jobberNormaltTimer: number;
    arbeidIPeriode?: ArbeidIPeriode;
    arbeidsforholdType: ArbeidsforholdType;
    arbeidsstedNavn: string;
    periode: DateRange;
    dagerMedPleie: Date[];
    søkerKunHelgedager: boolean;
    onArbeidstidVariertChange: () => void;
}

const ArbeidIPeriodeSpørsmål = ({
    parentFieldName,
    jobberNormaltTimer,
    arbeidIPeriode,
    arbeidsforholdType,
    periode,
    dagerMedPleie,
    arbeidsstedNavn,
    onArbeidstidVariertChange,
}: Props) => {
    const intl = useIntl();
    const [arbeidstidChanged, setArbeidstidChanged] = useState(false);

    const context = useContext(TypedFormikFormContext);
    const formik = useFormikContext<ArbeidstidFormValues>();

    useEffect(() => {
        if (arbeidstidChanged === true) {
            setArbeidstidChanged(false);
            onArbeidstidVariertChange();
        }
    }, [arbeidstidChanged, onArbeidstidVariertChange]);

    if (jobberNormaltTimer === undefined) {
        return <Alert variant="error">Det mangler informasjon om hvor mye du jobber normalt</Alert>;
    }

    const intlValues = getArbeidstidIPeriodeIntlValues(intl, {
        arbeidsforhold: {
            arbeidsstedNavn,
            jobberNormaltTimer,
            type: arbeidsforholdType,
        },
        periode,
    });

    const getFieldName = (field: ArbeidIPeriodeField) => `${parentFieldName}.arbeidIPeriode.${field}` as any;
    const fieldName = getFieldName(ArbeidIPeriodeField.enkeltdager);

    const hasEnkeltdagerMedFeil =
        formik.isValid === false && context?.showErrors && getErrorForField(fieldName, formik.errors) !== undefined;

    const { jobberIPerioden } = arbeidIPeriode || {};

    return (
        <>
            <RadioGroup
                name={getFieldName(ArbeidIPeriodeField.jobberIPerioden)}
                legend={intlHelper(intl, `arbeidIPeriode.jobberIPerioden.spm`, intlValues)}
                validate={getJobberIPeriodenValidator(intlValues)}
                radios={getJobberIPeriodenRadios(intl)}
            />

            {jobberIPerioden === JobberIPeriodeSvar.redusert && (
                <FormBlock>
                    <FormikInputGroup
                        name={`${fieldName}_group`}
                        legend={intlHelper(intl, 'arbeidIPeriode.enkeltdager_gruppe.legend', intlValues)}
                        description={
                            <Block margin="l">
                                <Alert variant="info" inline={true}>
                                    Dager hvor du ikke skal jobbe noe, trenger du ikke fylle ut.
                                </Alert>
                            </Block>
                        }>
                        <div style={{ marginTop: '1.5rem' }}>
                            <DurationWeekdaysInput
                                dateRange={periode}
                                disabledDates={getDagerSomSkalDisables(periode, dagerMedPleie)}
                                formikFieldName={fieldName}
                                useAccordion={true}
                                accordionOpen={hasEnkeltdagerMedFeil}
                                validateDate={(date: Date, value?: any) => {
                                    const error = getTimeValidator()(value);
                                    if (error) {
                                        return {
                                            key: `arbeidIPeriode.validation.timerDag.${error}`,
                                            keepKeyUnaltered: true,
                                            values: {
                                                ...intlValues,
                                                dato: dateFormatter.compact(date),
                                            },
                                        };
                                    }

                                    return undefined;
                                }}
                            />
                        </div>
                    </FormikInputGroup>
                </FormBlock>
            )}
        </>
    );
};

const getJobberIPeriodenRadios = (intl: IntlShape) => [
    {
        label: intlHelper(intl, 'arbeidIPeriode.jobberIPerioden.jobberIkke'),
        value: JobberIPeriodeSvar.heltFravær,
    },
    {
        label: intlHelper(intl, 'arbeidIPeriode.jobberIPerioden.jobberRedusert'),
        value: JobberIPeriodeSvar.redusert,
    },
    {
        label: intlHelper(intl, 'arbeidIPeriode.jobberIPerioden.jobberVanlig'),
        value: JobberIPeriodeSvar.somVanlig,
    },
];

const getDagerSomSkalDisables = (dateRange: DateRange, dagerMedPleie: Date[]): Date[] => {
    return getDatesInDateRange(dateRange).filter((d) => isDateInDates(d, dagerMedPleie) === false);
};

export default ArbeidIPeriodeSpørsmål;
