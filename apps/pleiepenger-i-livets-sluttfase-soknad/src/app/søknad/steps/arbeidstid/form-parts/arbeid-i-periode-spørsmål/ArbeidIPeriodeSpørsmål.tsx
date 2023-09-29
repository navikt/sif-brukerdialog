import { Alert } from '@navikt/ds-react';
import { useEffect, useState } from 'react';
import { IntlShape, useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { DateRange, getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds/lib';
import getTimeValidator from '@navikt/sif-common-formik-ds/lib/validation/getTimeValidator';
import DurationWeekdaysInput from '@navikt/sif-common-ui/src/duration-weekdays-input/DurationWeekdaysInput';
import { dateFormatter, getDatesInDateRange, getMonthsInDateRange, isDateInDates } from '@navikt/sif-common-utils/lib';
import { getArbeidstidIPeriodeIntlValues } from '../../../../../local-sif-common-pleiepenger/arbeidstid/arbeidstid-periode-dialog/utils/arbeidstidPeriodeIntlValuesUtils';
import { ArbeidstidFormFields, ArbeidstidFormValues } from '../../ArbeidstidStep';
import { ArbeidIPeriode, ArbeidIPeriodeField, JobberIPeriodeSvar } from '../../ArbeidstidTypes';
import { ArbeidsforholdType, ArbeidstidRegistrertLogProps } from '../types';
import { getJobberIPeriodenValidator } from '../validation/jobberIPeriodenSpørsmål';

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
    const numberOfMonths = getMonthsInDateRange(periode).length;

    const { jobberIPerioden } = arbeidIPeriode || {};

    // const renderArbeidstidVariertPart = (kanLeggeTilPeriode: boolean) => (
    //     <ArbeidstidVariert
    //         arbeidstid={arbeidIPeriode?.enkeltdager}
    //         kanLeggeTilPeriode={kanLeggeTilPeriode}
    //         jobberNormaltTimer={jobberNormaltTimer}
    //         periode={periode}
    //         intlValues={intlValues}
    //         arbeidsstedNavn={arbeidsstedNavn}
    //         arbeidsforholdType={arbeidsforholdType}
    //         formFieldName={getFieldName(ArbeidIPeriodeField.enkeltdager)}
    //         onArbeidstidVariertChanged={() => setArbeidstidChanged(true)}
    //         // onArbeidPeriodeRegistrert={onArbeidPeriodeRegistrert}
    //         // onArbeidstidEnkeltdagRegistrert={onArbeidstidEnkeltdagRegistrert}
    //     />
    // );
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
                    {/* <FormBlock>{renderArbeidstidVariertPart(false)}</FormBlock> */}
                    <DurationWeekdaysInput
                        dateRange={periode}
                        disabledDates={getDagerSomSkalDisables(periode, dagerMedPleie)}
                        formikFieldName={getFieldName(ArbeidIPeriodeField.enkeltdager)}
                        useAccordion={numberOfMonths > 1}
                        validateDate={(date: Date, value?: any) => {
                            const error = getTimeValidator({ required: true })(value);
                            if (error) {
                                return {
                                    key: error,
                                    keepKeyUnaltered: true,
                                    values: {
                                        dato: dateFormatter.compact(date),
                                    },
                                };
                            }

                            return undefined;
                        }}
                    />
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
