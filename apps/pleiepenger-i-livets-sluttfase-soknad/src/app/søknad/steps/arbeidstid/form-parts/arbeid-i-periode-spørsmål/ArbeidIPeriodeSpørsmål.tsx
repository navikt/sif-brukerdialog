import { Alert, BodyShort, HStack, Heading, Tag } from '@navikt/ds-react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import {
    DateRange,
    TypedFormikFormContext,
    ValidationError,
    getErrorForField,
    getTypedFormComponents,
} from '@navikt/sif-common-formik-ds';
import getTimeValidator from '@navikt/sif-common-formik-ds/src/validation/getTimeValidator';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import DurationWeekdaysInput from '@navikt/sif-common-ui/src/duration-weekdays-input/DurationWeekdaysInput';
import {
    dateFormatter,
    durationToDecimalDuration,
    getDatesInDateRange,
    getMonthsInDateRange,
    isDateInDates,
    summarizeDateDurationMap,
} from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import { useFormikContext } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { IntlShape, useIntl } from 'react-intl';
import { getArbeidstidIPeriodeIntlValues } from '../../../../../local-sif-common-pleiepenger/arbeidstid/arbeidstid-periode-dialog/utils/arbeidstidPeriodeIntlValuesUtils';
import { ArbeidstidFormFields, ArbeidstidFormValues } from '../../ArbeidstidStep';
import { ArbeidIPeriode, ArbeidIPeriodeField, JobberIPeriodeSvar } from '../../ArbeidstidTypes';
import { ArbeidsforholdType, ArbeidstidRegistrertLogProps } from '../types';
import { getJobberIPeriodenValidator } from '../validation/jobberIPeriodenSpørsmål';

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
    skjulJobberNormaltValg = false,
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

    useEffectOnce(() => {
        if (skjulJobberNormaltValg && jobberIPerioden === undefined) {
            formik.setFieldValue(getFieldName(ArbeidIPeriodeField.jobberIPerioden), JobberIPeriodeSvar.redusert);
        }
    });

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
                    Timer med jobb {dayjs(month).format('MMMM YYYY')}
                </div>
                {numDatesInMonthWithDuration > 0 && (
                    <Tag variant="info" size="small">
                        Arbeider {numDatesInMonthWithDuration} av {enabledDatesInMonth} dager
                    </Tag>
                )}
            </HStack>
        );
    };
    const renderMonthHeaderNoAccordion = (month: Date, enabledDatesInMonth: number) => {
        const numDatesInMonthWithDuration = datesWithDuration.filter((d) =>
            dayjs(d.date).isSame(month, 'month'),
        ).length;

        return (
            <>
                <Heading size="small" level="4" spacing={true}>
                    Timer med jobb {dayjs(month).format('MMMM YYYY')}
                </Heading>
                {1 + 1 === 3 && (
                    <>
                        {numDatesInMonthWithDuration === 0 ? (
                            <BodyShort size="small">Arbeider ingen dager</BodyShort>
                        ) : (
                            <Tag variant="info" size="small">
                                Arbeider {numDatesInMonthWithDuration} av {enabledDatesInMonth} dager
                            </Tag>
                        )}
                    </>
                )}
            </>
        );
    };

    const useAccordion = skjulJobberNormaltValg !== true && getMonthsInDateRange(periode).length > 1;

    return (
        <>
            {!skjulJobberNormaltValg && (
                <RadioGroup
                    name={getFieldName(ArbeidIPeriodeField.jobberIPerioden)}
                    legend={intlHelper(intl, `arbeidIPeriode.jobberIPerioden.spm`, intlValues)}
                    validate={getJobberIPeriodenValidator(intlValues)}
                    radios={getJobberIPeriodenRadios(intl, skjulJobberNormaltValg)}
                />
            )}

            {(jobberIPerioden === JobberIPeriodeSvar.redusert || skjulJobberNormaltValg) && (
                <FormBlock>
                    <InputGroup
                        id={`${fieldName}_group`}
                        name={`${fieldName}_group` as any}
                        legend={intlHelper(intl, 'arbeidIPeriode.enkeltdager_gruppe.legend', intlValues)}
                        validate={() => {
                            const { jobberIPerioden, enkeltdager = {} } = arbeidIPeriode || {};
                            if (jobberIPerioden === JobberIPeriodeSvar.redusert && skjulJobberNormaltValg === false) {
                                if (durationToDecimalDuration(summarizeDateDurationMap(enkeltdager)) === 0) {
                                    return {
                                        key: 'arbeidIPeriode.validation.ingenTidRegistrert',
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
                                    Du trenger ikke fylle ut noe for dager du ikke skal jobbe.
                                </Alert>
                            </Block>
                        }>
                        <div style={{ marginTop: '1.5rem' }}>
                            <DurationWeekdaysInput
                                dateRange={periode}
                                disabledDates={getDagerSomSkalDisables(periode, dagerMedPleie)}
                                formikFieldName={fieldName}
                                useAccordion={useAccordion}
                                renderMonthHeader={useAccordion ? renderMonthHeader : renderMonthHeaderNoAccordion}
                                accordionOpen={hasEnkeltdagerMedFeil}
                                validateDate={(value: any, date: Date) => {
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
