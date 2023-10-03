import { Alert, BodyShort, HStack, Tag } from '@navikt/ds-react';
import { useContext, useEffect, useState } from 'react';
import { IntlShape, useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import {
    DateRange,
    getErrorForField,
    getTypedFormComponents,
    TypedFormikFormContext,
    ValidationError,
} from '@navikt/sif-common-formik-ds/lib';
import getTimeValidator from '@navikt/sif-common-formik-ds/lib/validation/getTimeValidator';
import DurationWeekdaysInput from '@navikt/sif-common-ui/src/duration-weekdays-input/DurationWeekdaysInput';
import {
    dateFormatter,
    durationToDecimalDuration,
    getDatesInDateRange,
    isDateInDates,
    summarizeDateDurationMap,
} from '@navikt/sif-common-utils/lib';
import { ArbeidstidFormFields, ArbeidstidFormValues } from '../../ArbeidstidStep';
import { ArbeidIPeriode, ArbeidIPeriodeField, JobberIPeriodeSvar } from '../../ArbeidstidTypes';
import { ArbeidsforholdType, ArbeidstidRegistrertLogProps } from '../types';
import { getJobberIPeriodenValidator } from '../validation/jobberIPeriodenSpørsmål';
import { getArbeidstidIPeriodeIntlValues } from '../../../../../local-sif-common-pleiepenger/arbeidstid/arbeidstid-periode-dialog/utils/arbeidstidPeriodeIntlValuesUtils';
import { useFormikContext } from 'formik';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import dayjs from 'dayjs';

const { RadioGroup, InputGroup } = getTypedFormComponents<
    ArbeidstidFormFields,
    ArbeidstidFormValues,
    ValidationError
>();

interface Props extends ArbeidstidRegistrertLogProps {
    parentFieldName: string;
    jobberNormaltTimer: number;
    arbeidIPeriode?: ArbeidIPeriode;
    arbeidsforholdType: ArbeidsforholdType;
    arbeidsstedNavn: string;
    periode: DateRange;
    dagerMedPleie: Date[];
    søkerKunHelgedager: boolean;
    skjulJobberNormaltValg: boolean;
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
    skjulJobberNormaltValg,
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

    const { enkeltdager } = arbeidIPeriode || {};
    const datesWithDuration = enkeltdager
        ? Object.keys(enkeltdager)
              .map((key) => ({
                  date: key,
                  duration: enkeltdager[key] ? durationToDecimalDuration(enkeltdager[key]) : undefined,
              }))
              .filter((d) => d.duration && d.duration > 0)
        : [];

    const renderMonthHeader = (month: Date, enabledDatesInMonth: number) => {
        const numDatesInMonthWithDuration = datesWithDuration.filter((d) =>
            dayjs(d.date).isSame(month, 'month'),
        ).length;

        return (
            <HStack gap="4" align="center">
                <div style={{ minWidth: '10rem' }} className="capitalize">
                    {dayjs(month).format('MMMM YYYY')}
                </div>
                {numDatesInMonthWithDuration === 0 ? (
                    <BodyShort size="small">Arbeider ingen dager</BodyShort>
                ) : (
                    <Tag variant="info" size="small">
                        Arbeider {numDatesInMonthWithDuration} av {enabledDatesInMonth} dager
                    </Tag>
                )}
            </HStack>
        );
    };

    return (
        <>
            <RadioGroup
                name={getFieldName(ArbeidIPeriodeField.jobberIPerioden)}
                legend={intlHelper(intl, `arbeidIPeriode.jobberIPerioden.spm`, intlValues)}
                validate={getJobberIPeriodenValidator(intlValues)}
                radios={getJobberIPeriodenRadios(intl, skjulJobberNormaltValg)}
            />

            {jobberIPerioden === JobberIPeriodeSvar.redusert && (
                <FormBlock>
                    <InputGroup
                        id={`${fieldName}_group`}
                        name={`${fieldName}_group` as any}
                        legend={intlHelper(intl, 'arbeidIPeriode.enkeltdager_gruppe.legend', intlValues)}
                        validate={() => {
                            const { jobberIPerioden, enkeltdager = {} } = arbeidIPeriode || {};
                            if (jobberIPerioden === JobberIPeriodeSvar.redusert) {
                                if (durationToDecimalDuration(summarizeDateDurationMap(enkeltdager)) === 0) {
                                    return {
                                        key: 'validation.arbeidIPeriode.ingenTidRegistrert',
                                        values: intlValues,
                                        keepKeyUnaltered: true,
                                    };
                                }
                            }
                            return undefined;
                        }}
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
                                renderMonthHeader={renderMonthHeader}
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
                    </InputGroup>
                </FormBlock>
            )}
        </>
    );
};

const getJobberIPeriodenRadios = (intl: IntlShape, skjulJobberNormaltValg: boolean) => [
    {
        label: intlHelper(intl, 'arbeidIPeriode.jobberIPerioden.jobberIkke'),
        value: JobberIPeriodeSvar.heltFravær,
    },
    {
        label: intlHelper(intl, 'arbeidIPeriode.jobberIPerioden.jobberRedusert'),
        value: JobberIPeriodeSvar.redusert,
    },
    ...(skjulJobberNormaltValg
        ? []
        : [
              {
                  label: intlHelper(intl, 'arbeidIPeriode.jobberIPerioden.jobberVanlig'),
                  value: JobberIPeriodeSvar.somVanlig,
              },
          ]),
];

const getDagerSomSkalDisables = (dateRange: DateRange, dagerMedPleie: Date[]): Date[] => {
    return getDatesInDateRange(dateRange).filter((d) => isDateInDates(d, dagerMedPleie) === false);
};

export default ArbeidIPeriodeSpørsmål;
