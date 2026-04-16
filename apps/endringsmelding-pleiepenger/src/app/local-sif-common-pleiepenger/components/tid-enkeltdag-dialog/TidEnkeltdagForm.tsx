import { AppText, useAppIntl } from '@app/i18n';
import { Alert, BodyLong, VStack } from '@navikt/ds-react';
import bemUtils from '@navikt/sif-common-core-ds/src/utils/bemUtils';
import {
    DateRange,
    getIntlFormErrorHandler,
    getTypedFormComponents,
    InputTime,
    ValidationError,
    YesOrNo,
} from '@navikt/sif-common-formik-ds';
import { DurationText, FormLayout } from '@navikt/sif-common-ui';
import {
    DateDurationMap,
    DateDurationOrUndefinedMap,
    dateFormatter,
    Duration,
    getDateToday,
    getLastWeekdayOnOrBeforeDate,
    getMonthDateRange,
    getNumberOfDaysInDateRange,
    getWeekDateRange,
    NumberDuration,
} from '@navikt/sif-common-utils';
import { getRequiredFieldValidator, getYesOrNoValidator } from '@navikt/sif-validation';
import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import { ReactElement } from 'react';

import { Feature, isFeatureEnabled } from '../../../utils';
import {
    getDagerMedNyTid,
    getDateRangeWithinDateRange,
    getGjentagelseEnkeltdagFraFormValues,
    trimDateRangeToWeekdays,
} from './utils/tidEnkeltdagUtils';
import { getTidEnkeltdagFormTidValidator } from './utils/tidEnkeltdagValidation';

dayjs.extend(minMax);

export interface TidEnkeltdagFormProps {
    dato: Date;
    tid?: Partial<Duration>;
    tidOpprinnelig?: Duration;
    maksTid?: NumberDuration;
    minTid?: NumberDuration;
    søknadsperiode: DateRange;
    månedISøknadsperiode: DateRange;
    erIkkeIOmsorgstilbudLabelRenderer: (date: Date) => string;
    erBarnetIOmsorgstilbudLabelRenderer: (date: Date) => string;
    hvorMyeSpørsmålRenderer: (date: Date) => string;
    beskrivelseRenderer: (date: Date) => ReactElement | string;
    onSubmit: (dagerMedTid: TidEnkeltdagEndring) => void;
    onCancel: () => void;
}

export interface GjentagelseEnkeltdag {
    gjentagelsetype: GjentagelseType;
}

export interface TidEnkeltdagEndring {
    dagerMedTid: DateDurationMap | DateDurationOrUndefinedMap;
}

enum FormFields {
    'erIkkeIOmsorgstilbud' = 'erIkkeIOmsorgstilbud',
    'erBarnetIOmsorgstilbud' = 'erBarnetIOmsorgstilbud',
    'tid' = 'tid',
    'skalGjentas' = 'skalGjentas',
    'gjentagelse' = 'gjentagelse',
}

export enum GjentagelseType {
    sammeDagUtMånedFom = 'sammeDagUtMånedFom',
    heleUken = 'heleUken',
    heleMåneden = 'heleMåneden',
    sammeDagUtSøknadsperiodenFom = 'sammeDagUtSøknadsperiodenFom',
    alleDagerUtSøknadsperioden = 'alleDagerUtSøknadsperioden',
}

export interface TidEnkeltdagFormValues {
    [FormFields.erIkkeIOmsorgstilbud]: boolean;
    [FormFields.erBarnetIOmsorgstilbud]: YesOrNo;
    [FormFields.tid]: InputTime;
    [FormFields.skalGjentas]: boolean;
    [FormFields.gjentagelse]: GjentagelseType;
}

const FormComponents = getTypedFormComponents<FormFields, TidEnkeltdagFormValues, ValidationError>();

const bem = bemUtils('tidEnkeltdagForm');

const getInitialValues = ({
    tid,
    tidOpprinnelig,
}: {
    tid?: Partial<Duration>;
    tidOpprinnelig?: Duration;
    erIkkeIOmsorgstilbud?: boolean;
    erBarnetIOmsorgstilbud?: YesOrNo;
}): Partial<TidEnkeltdagFormValues> => {
    const values: Partial<TidEnkeltdagFormValues> = {};
    if (tid && tid.hours !== '' && tid.minutes !== '') {
        values.tid = {
            hours: tid.hours ?? '',
            minutes: tid.minutes ?? '',
        };
    } else if (tidOpprinnelig) {
        values.tid = {
            ...tidOpprinnelig,
        };
    }
    if (values.tid) {
        if (values.tid.hours === '0' && values.tid.minutes === '0') {
            values.erBarnetIOmsorgstilbud = YesOrNo.NO;
        } else if (values.tid.hours !== '' || values.tid.minutes !== '') {
            values.erBarnetIOmsorgstilbud = YesOrNo.YES;
        }
    }
    return values;
};

const TidEnkeltdagForm = ({
    dato,
    tid,
    tidOpprinnelig,
    /** Månedsperiode - avgrenset til innenfor søknadsperioden */
    månedISøknadsperiode,
    /** Hele søknadsperioden */
    søknadsperiode,
    maksTid = { hours: 24, minutes: 0 },
    minTid = { hours: 0, minutes: 0 },
    erBarnetIOmsorgstilbudLabelRenderer,
    hvorMyeSpørsmålRenderer,
    onSubmit,
    onCancel,
}: TidEnkeltdagFormProps) => {
    const { text, intl } = useAppIntl();

    const onValidSubmit = (values: Partial<TidEnkeltdagFormValues>) => {
        if (values.tid && values.erBarnetIOmsorgstilbud === YesOrNo.YES) {
            onSubmit({
                dagerMedTid: getDagerMedNyTid(
                    søknadsperiode,
                    månedISøknadsperiode,
                    dato,
                    values.tid,
                    getGjentagelseEnkeltdagFraFormValues(values),
                ),
            });
        }
        if (values.erBarnetIOmsorgstilbud === YesOrNo.NO) {
            onSubmit({
                dagerMedTid: getDagerMedNyTid(
                    søknadsperiode,
                    månedISøknadsperiode,
                    dato,
                    { hours: '0', minutes: '0' },
                    getGjentagelseEnkeltdagFraFormValues(values),
                ),
            });
        }
    };

    const dagerNavn = `${dayjs(dato).format('dddd')}er`;

    const ukePeriode: DateRange = trimDateRangeToWeekdays(
        getDateRangeWithinDateRange(getWeekDateRange(dato, true), månedISøknadsperiode),
    );
    const ukeErHel = dayjs(ukePeriode.from).isoWeekday() === 1 && dayjs(ukePeriode.to).isoWeekday() === 5;

    /** Avgrenser til ukedager innenfor månedsperioden */
    const ukedagMåned: DateRange = trimDateRangeToWeekdays(
        getDateRangeWithinDateRange(getMonthDateRange(dato, true), månedISøknadsperiode),
    );

    const ukePeriodeStartTxt = dateFormatter.dayCompactDate(ukePeriode.from);
    const ukePeriodeSluttTxt = dateFormatter.dayCompactDate(ukePeriode.to);

    const månedPeriodeStartTxt = dateFormatter.dayCompactDate(ukedagMåned.from);
    const månedPeriodeSluttTxt = dateFormatter.dayCompactDate(ukedagMåned.to);

    const ukeNavn = `${dayjs(dato).isoWeek()}`;
    const månedNavn = dayjs(dato).format('MMMM YYYY');

    const sluttDatoTxt = dateFormatter.full(getLastWeekdayOnOrBeforeDate(månedISøknadsperiode.to));

    const skalViseValgetGjelderFlereDager = getNumberOfDaysInDateRange(månedISøknadsperiode) > 2;

    const renderGjentagelseRadioLabel = (key: string, p?: { fra: string; til: string }, values?: any): ReactElement => (
        <AppText id={`tidEnkeltdagForm.gjentagelse.${key}` as any} values={{ ...values, ...p }} />
    );

    const initalValues = getInitialValues({ tid, tidOpprinnelig });

    const visOpprinneligTid = isFeatureEnabled(Feature.SIF_PUBLIC_SKJUL_TID_I_OMSORGSTILBUD) === false;

    return (
        <FormComponents.FormikWrapper
            enableReinitialize={true}
            initialValues={initalValues}
            onSubmit={onValidSubmit}
            renderForm={({ values }) => {
                const { skalGjentas, erBarnetIOmsorgstilbud } = values;
                const erHistorisk = dayjs(dato).isBefore(getDateToday(), 'day');
                return (
                    <FormComponents.Form
                        onCancel={onCancel}
                        formErrorHandler={getIntlFormErrorHandler(intl, 'tidEnkeltdagForm.validation')}
                        includeValidationSummary={false}
                        includeButtons={true}
                        submitButtonLabel="Lagre"
                        showButtonArrows={false}
                        cancelButtonLabel="Avbryt">
                        <VStack gap="space-24">
                            <BodyLong className="noPadding">
                                Velg om barnet {erHistorisk ? 'var' : 'er'} i omsorgstilbud denne dagen, og eventuelt
                                hvor mye tid barnet {erHistorisk ? 'var' : 'er'} i omsorgstilbudet.
                            </BodyLong>
                            {visOpprinneligTid && (
                                <Alert variant="info" inline>
                                    {tidOpprinnelig ? (
                                        <>
                                            <AppText id="tidEnkeltdagForm.opprinneligTid" />{' '}
                                            <DurationText duration={tidOpprinnelig} fullText={true} />
                                        </>
                                    ) : (
                                        <>
                                            <AppText id="tidEnkeltdagForm.ingenOpprinneligTid" />
                                        </>
                                    )}
                                </Alert>
                            )}
                            <VStack gap="space-32">
                                <FormLayout.Panel>
                                    <VStack gap="space-16">
                                        <FormComponents.YesOrNoQuestion
                                            name={FormFields.erBarnetIOmsorgstilbud}
                                            legend={erBarnetIOmsorgstilbudLabelRenderer(dato)}
                                            renderHorizontal={true}
                                            validate={getYesOrNoValidator()}
                                        />

                                        {erBarnetIOmsorgstilbud === YesOrNo.YES && (
                                            <FormComponents.TimeInput
                                                name={FormFields.tid}
                                                label={hvorMyeSpørsmålRenderer(dato)}
                                                validate={getTidEnkeltdagFormTidValidator(maksTid, minTid)}
                                                timeInputLayout={{
                                                    justifyContent: 'left',
                                                    compact: false,
                                                    direction: 'vertical',
                                                }}
                                            />
                                        )}
                                    </VStack>
                                </FormLayout.Panel>
                                {skalViseValgetGjelderFlereDager && erBarnetIOmsorgstilbud !== undefined && (
                                    <FormLayout.QuestionBleedTop>
                                        <FormComponents.Checkbox
                                            label={text('tidEnkeltdagForm.gjelderFlereDager.label')}
                                            name={FormFields.skalGjentas}
                                        />
                                    </FormLayout.QuestionBleedTop>
                                )}
                                {skalGjentas === true && (
                                    <FormLayout.Panel>
                                        <FormComponents.RadioGroup
                                            legend={text('tidEnkeltdagForm.gjelderFlereDager.info')}
                                            className={bem.element('gjentagelseOptions')}
                                            name={FormFields.gjentagelse}
                                            validate={getRequiredFieldValidator()}
                                            radios={[
                                                {
                                                    label: text('tidEnkeltdagForm.gjentagelse.separator.alleUkedager'),
                                                    isSeparator: true,
                                                    value: 'separator-1',
                                                },
                                                {
                                                    label: renderGjentagelseRadioLabel(
                                                        ukeErHel ? 'helUke' : 'delAvUke',
                                                        {
                                                            fra: ukePeriodeStartTxt,
                                                            til: ukePeriodeSluttTxt,
                                                        },
                                                        { ukeNavn },
                                                    ),
                                                    value: GjentagelseType.heleUken,
                                                },
                                                {
                                                    label: renderGjentagelseRadioLabel(
                                                        'alleDagerIMåned',
                                                        {
                                                            fra: månedPeriodeStartTxt,
                                                            til: månedPeriodeSluttTxt,
                                                        },
                                                        { månedNavn },
                                                    ),
                                                    value: GjentagelseType.heleMåneden,
                                                },
                                                {
                                                    label: renderGjentagelseRadioLabel(
                                                        'alleDagerUtSøknadsperioden',
                                                        {
                                                            fra: dateFormatter.full(dato),
                                                            til: dateFormatter.full(
                                                                getLastWeekdayOnOrBeforeDate(søknadsperiode.to),
                                                            ),
                                                        },
                                                        { dagerNavn, månedNavn },
                                                    ),
                                                    value: GjentagelseType.alleDagerUtSøknadsperioden,
                                                },
                                                {
                                                    label: text('tidEnkeltdagForm.gjentagelse.separator.alleSammeDag', {
                                                        dagnavn: dagerNavn,
                                                    }),
                                                    isSeparator: true,
                                                    value: 'separator-2',
                                                },
                                                {
                                                    label: renderGjentagelseRadioLabel(
                                                        'sammeDagUtMånedFom',
                                                        {
                                                            fra: dateFormatter.full(dato),
                                                            til: sluttDatoTxt,
                                                        },
                                                        { dagerNavn, månedNavn },
                                                    ),

                                                    value: GjentagelseType.sammeDagUtMånedFom,
                                                },
                                                {
                                                    label: renderGjentagelseRadioLabel(
                                                        'sammeDagUtSøknadsperiodenFom',
                                                        {
                                                            fra: dateFormatter.full(dato),
                                                            til: dateFormatter.full(
                                                                getLastWeekdayOnOrBeforeDate(søknadsperiode.to),
                                                            ),
                                                        },
                                                        { dagerNavn, månedNavn },
                                                    ),
                                                    value: GjentagelseType.sammeDagUtSøknadsperiodenFom,
                                                },
                                            ]}
                                        />
                                    </FormLayout.Panel>
                                )}
                            </VStack>
                        </VStack>
                    </FormComponents.Form>
                );
            }}
        />
    );
};

export default TidEnkeltdagForm;
