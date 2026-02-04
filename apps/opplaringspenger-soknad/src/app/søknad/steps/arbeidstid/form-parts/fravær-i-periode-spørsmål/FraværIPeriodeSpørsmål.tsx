import { Alert, Box, Heading, HStack, Tag } from '@navikt/ds-react';
import {
    DateRange,
    getErrorForField,
    getTypedFormComponents,
    TypedFormikFormContext,
    ValidationError,
} from '@navikt/sif-common-formik-ds';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { DurationWeekdaysInput, FormLayout } from '@navikt/sif-common-ui';
import {
    dateFormatter,
    durationToDecimalDuration,
    getDatesInDateRange,
    getMonthsInDateRange,
    isDateInDates,
    summarizeDateDurationMap,
} from '@navikt/sif-common-utils';
import { getTimeValidator } from '@navikt/sif-validation';
import dayjs from 'dayjs';
import { useFormikContext } from 'formik';
import { useContext, useEffect, useState } from 'react';

import { AppIntlShape, AppText, useAppIntl } from '../../../../../i18n';
import { getArbeidstidIPeriodeIntlValues } from '../../arbeidstidPeriodeIntlValuesUtils';
import { ArbeidstidFormFields, ArbeidstidFormValues } from '../../ArbeidstidStep';
import { begrensPeriodeTilPeriodeEnSkalOppgiTimerFor } from '../../arbeidstidStepUtils';
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
    valgteDatoer: Date[];
    skjulJobberNormaltValg?: boolean;
    onArbeidstidVariertChange: () => void;
}

const FraværIPeriodeSpørsmål = ({
    parentFieldName,
    jobberNormaltTimer,
    arbeidIPeriode,
    arbeidsforholdType,
    periode,
    valgteDatoer,
    arbeidsstedNavn,
    skjulJobberNormaltValg = false,
    onArbeidstidVariertChange,
}: Props) => {
    const appIntl = useAppIntl();
    const { text } = appIntl;

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

    const intlValues = getArbeidstidIPeriodeIntlValues(appIntl.intl, {
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
            <HStack gap="space-16" align="center">
                <div style={{ minWidth: '10rem' }}>Timer med jobb {dayjs(month).format('MMMM YYYY')}</div>
                {numDatesInMonthWithDuration > 0 && (
                    <Tag variant="info" size="small">
                        <AppText
                            id="fraværIPeriode.arbeidIPeriodeSpørsmål.monthHeader"
                            values={{ numDatesInMonthWithDuration, enabledDatesInMonth }}
                        />
                    </Tag>
                )}
            </HStack>
        );
    };
    const renderMonthHeaderNoAccordion = (month: Date) => {
        return (
            <>
                <Heading size="small" level="3" spacing={true}>
                    <AppText
                        id="fraværIPeriode.arbeidIPeriodeSpørsmål.monthHeader.noAccordion"
                        values={{ date: dayjs(month).format('MMMM YYYY') }}
                    />
                </Heading>
            </>
        );
    };

    const useAccordion = skjulJobberNormaltValg !== true && getMonthsInDateRange(periode).length > 1;

    return (
        <FormLayout.Questions>
            {!skjulJobberNormaltValg && (
                <RadioGroup
                    name={getFieldName(ArbeidIPeriodeField.jobberIPerioden)}
                    legend={text(`fraværIPeriode.jobberIPerioden.spm`, intlValues)}
                    validate={getJobberIPeriodenValidator(intlValues)}
                    radios={getJobberIPeriodenRadios(appIntl, skjulJobberNormaltValg)}
                />
            )}
            {(jobberIPerioden === JobberIPeriodeSvar.redusert || skjulJobberNormaltValg) && (
                <FormLayout.Panel bleedTop={true}>
                    <InputGroup
                        id={`${fieldName}_group`}
                        name={`${fieldName}_group` as any}
                        legend={text('fraværIPeriode.enkeltdager_gruppe.legend', intlValues)}
                        validate={() => {
                            const { jobberIPerioden: jip, enkeltdager: ed = {} } = arbeidIPeriode || {};
                            if (jip === JobberIPeriodeSvar.redusert && skjulJobberNormaltValg === false) {
                                if (durationToDecimalDuration(summarizeDateDurationMap(ed)) === 0) {
                                    return {
                                        key: 'fraværIPeriode.validation.ingenTidRegistrert',
                                        values: intlValues,
                                        keepKeyUnaltered: true,
                                    };
                                }
                            }
                            return undefined;
                        }}
                        description={
                            <Box paddingBlock="space-8 space-0">
                                <Alert variant="info" inline={true}>
                                    <AppText id="fraværIPeriode.enkeltdager_gruppe.description" />
                                </Alert>
                            </Box>
                        }>
                        <div style={{ marginTop: '1.5rem' }}>
                            <DurationWeekdaysInput
                                dateRange={begrensPeriodeTilPeriodeEnSkalOppgiTimerFor(periode)}
                                disabledDates={getDagerSomSkalDisables(periode, valgteDatoer)}
                                formikFieldName={fieldName}
                                useExpansionCards={useAccordion}
                                renderMonthHeader={useAccordion ? renderMonthHeader : renderMonthHeaderNoAccordion}
                                accordionOpen={hasEnkeltdagerMedFeil}
                                validateDate={(value: any, date: Date) => {
                                    const error = getTimeValidator({ min: { hours: 0, minutes: 1 }, required: true })(
                                        value,
                                    );
                                    if (error) {
                                        return {
                                            key: `fraværIPeriode.validation.timerDag.${error}`,
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
                </FormLayout.Panel>
            )}
        </FormLayout.Questions>
    );
};

const getJobberIPeriodenRadios = ({ text }: AppIntlShape, skjulJobberNormaltValg: boolean) => [
    {
        label: text('fraværIPeriode.jobberIPerioden.jobberIkke'),
        value: JobberIPeriodeSvar.heltFravær,
    },
    {
        label: text('fraværIPeriode.jobberIPerioden.jobberRedusert'),
        value: JobberIPeriodeSvar.redusert,
    },
    ...(skjulJobberNormaltValg
        ? []
        : [
              {
                  label: text('fraværIPeriode.jobberIPerioden.jobberVanlig'),
                  value: JobberIPeriodeSvar.somVanlig,
              },
          ]),
];

const getDagerSomSkalDisables = (dateRange: DateRange, valgteDatoer: Date[]): Date[] => {
    return getDatesInDateRange(dateRange).filter((d) => isDateInDates(d, valgteDatoer) === false);
};

export default FraværIPeriodeSpørsmål;
