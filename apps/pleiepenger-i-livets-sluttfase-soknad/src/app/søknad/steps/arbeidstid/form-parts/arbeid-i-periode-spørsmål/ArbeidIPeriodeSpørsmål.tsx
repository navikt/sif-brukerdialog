import { Alert, Box, Heading, HStack, Tag } from '@navikt/ds-react';
import { useContext, useEffect, useState } from 'react';
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
import { AppIntlShape, AppText, useAppIntl } from '../../../../../i18n';
import { getArbeidstidIPeriodeIntlValues } from '../../arbeidstidPeriodeIntlValuesUtils';
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
            <HStack gap="4" align="center">
                <div style={{ minWidth: '10rem' }}>
                    <AppText
                        id="arbeidIPeriode.jobberIPerioden.accordionHeader"
                        values={{ når: dayjs(month).format('MMMM YYYY') }}
                    />
                </div>
                {numDatesInMonthWithDuration > 0 && (
                    <Tag variant="info" size="small">
                        <AppText
                            id="arbeidIPeriode.jobberIPerioden.accordionHeader.dagerTag"
                            values={{
                                dagerMedArbeid: numDatesInMonthWithDuration,
                                tilgjengeligeDager: enabledDatesInMonth,
                            }}
                        />
                    </Tag>
                )}
            </HStack>
        );
    };
    const renderMonthHeaderNoAccordion = (month: Date) => {
        return (
            <Heading size="small" level="3" spacing={true}>
                <AppText
                    id="arbeidIPeriode.jobberIPerioden.accordionHeader"
                    values={{ når: dayjs(month).format('MMMM YYYY') }}
                />
                :
            </Heading>
        );
    };

    const useAccordion = skjulJobberNormaltValg !== true && getMonthsInDateRange(periode).length > 1;

    return (
        <FormLayout.Questions>
            {!skjulJobberNormaltValg && (
                <RadioGroup
                    name={getFieldName(ArbeidIPeriodeField.jobberIPerioden)}
                    legend={text(`arbeidIPeriode.jobberIPerioden.spm`, intlValues)}
                    validate={getJobberIPeriodenValidator(intlValues)}
                    radios={getJobberIPeriodenRadios(appIntl, skjulJobberNormaltValg)}
                />
            )}

            {(jobberIPerioden === JobberIPeriodeSvar.redusert || skjulJobberNormaltValg) && (
                <FormLayout.Panel bleedTop={!skjulJobberNormaltValg}>
                    <InputGroup
                        id={`${fieldName}_group`}
                        name={`${fieldName}_group` as any}
                        legend={text('arbeidIPeriode.enkeltdager_gruppe.legend', intlValues)}
                        validate={() => {
                            const { jobberIPerioden: jip, enkeltdager: ed = {} } = arbeidIPeriode || {};
                            if (jip === JobberIPeriodeSvar.redusert && skjulJobberNormaltValg === false) {
                                if (durationToDecimalDuration(summarizeDateDurationMap(ed)) === 0) {
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
                            <Alert variant="info" inline={true} className="mt-4">
                                <AppText id="arbeidIPeriode.jobberIPerioden.ingenJobbInfo" />
                            </Alert>
                        }>
                        <Box paddingBlock="4 0">
                            <DurationWeekdaysInput
                                dateRange={periode}
                                disabledDates={getDagerSomSkalDisables(periode, dagerMedPleie)}
                                formikFieldName={fieldName}
                                useExpansionCards={useAccordion}
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
                        </Box>
                    </InputGroup>
                </FormLayout.Panel>
            )}
        </FormLayout.Questions>
    );
};

const getJobberIPeriodenRadios = ({ text }: AppIntlShape, skjulJobberNormaltValg: boolean) => [
    {
        label: text('arbeidIPeriode.jobberIPerioden.jobberIkke'),
        value: JobberIPeriodeSvar.heltFravær,
    },
    {
        label: text('arbeidIPeriode.jobberIPerioden.jobberRedusert'),
        value: JobberIPeriodeSvar.redusert,
    },
    ...(skjulJobberNormaltValg
        ? []
        : [
              {
                  label: text('arbeidIPeriode.jobberIPerioden.jobberVanlig'),
                  value: JobberIPeriodeSvar.somVanlig,
              },
          ]),
];

const getDagerSomSkalDisables = (dateRange: DateRange, dagerMedPleie: Date[]): Date[] => {
    return getDatesInDateRange(dateRange).filter((d) => isDateInDates(d, dagerMedPleie) === false);
};

export default ArbeidIPeriodeSpørsmål;
