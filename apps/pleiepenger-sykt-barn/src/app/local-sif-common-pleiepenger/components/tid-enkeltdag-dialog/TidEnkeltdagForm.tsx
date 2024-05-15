import React from 'react';
import { useAppIntl } from '@i18n/index';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import { DurationText } from '@navikt/sif-common-ui';
import bemUtils from '@navikt/sif-common-core-ds/src/utils/bemUtils';
import { DateRange, getTypedFormComponents, InputTime } from '@navikt/sif-common-formik-ds/src';
import { getDateValidator, getRequiredFieldValidator } from '@navikt/sif-common-formik-ds/src/validation';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { ValidationError } from '@navikt/sif-common-formik-ds/src/validation/types';
import {
    DateDurationMap,
    dateFormatter,
    Duration,
    durationsAreEqual,
    ensureDuration,
    getLastWeekdayOnOrBeforeDate,
    getMonthDateRange,
    getNumberOfDaysInDateRange,
    getWeekDateRange,
    NumberDuration,
} from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import ResponsivePanel from '../../../components/responsive-panel/ResponsivePanel';
import {
    getDagerMedNyTid,
    getDateRangeWithinDateRange,
    getGjentagelseEnkeltdagFraFormValues,
    trimDateRangeToWeekdays,
} from './utils/tidEnkeltdagUtils';
import { getTidEnkeltdagFormTidValidator } from './utils/tidEnkeltdagValidation';
import { AppText } from '../../../i18n';

dayjs.extend(minMax);

export interface TidEnkeltdagFormProps {
    periode: DateRange;
    dato: Date;
    tid?: Partial<Duration>;
    tidOpprinnelig?: Duration;
    maksTid?: NumberDuration;
    minTid?: NumberDuration;
    hvorMyeSpørsmålRenderer: (date: Date) => string;
    onSubmit: (dagerMedTid: TidEnkeltdagEndring) => void;
    onCancel: () => void;
}

export interface GjentagelseEnkeltdag {
    gjentagelsetype: GjentagelseType;
    tom?: Date;
}

export interface TidEnkeltdagEndring {
    dagerMedTid: DateDurationMap;
}

const visStoppGjentagelse = false;

enum FormFields {
    'tid' = 'tid',
    'skalGjentas' = 'skalGjentas',
    'gjentagelse' = 'gjentagelse',
    'stoppGjentagelse' = 'stoppGjentagelse',
    'stopDato' = 'stopDato',
}

export enum GjentagelseType {
    hverUke = 'hverUke',
    hverAndreUke = 'hverAndreUke',
    heleUken = 'heleUken',
    heleMåneden = 'heleMåneden',
}

export interface TidEnkeltdagFormValues {
    [FormFields.tid]: InputTime;
    [FormFields.skalGjentas]: boolean;
    [FormFields.gjentagelse]: GjentagelseType;
    [FormFields.stoppGjentagelse]: boolean;
    [FormFields.stopDato]: string;
}

const FormComponents = getTypedFormComponents<FormFields, TidEnkeltdagFormValues, ValidationError>();

const bem = bemUtils('tidEnkeltdagForm');

const TidEnkeltdagForm: React.FunctionComponent<TidEnkeltdagFormProps> = ({
    dato,
    tid,
    tidOpprinnelig,
    periode,
    maksTid = { hours: 24, minutes: 0 },
    minTid = { hours: 0, minutes: 0 },
    hvorMyeSpørsmålRenderer,
    onSubmit,
    onCancel,
}) => {
    const { text, intl } = useAppIntl();

    const onValidSubmit = (values: Partial<TidEnkeltdagFormValues>) => {
        if (values.tid) {
            onSubmit({
                dagerMedTid: getDagerMedNyTid(periode, dato, values.tid, getGjentagelseEnkeltdagFraFormValues(values)),
            });
        }
    };

    const erEndret = durationsAreEqual(tid, tidOpprinnelig) === false;
    const dagerNavn = `${dayjs(dato).format('dddd')}er`;
    const valgtDatoTxt = dateFormatter.dayDateMonthYear(dato);

    const ukePeriode: DateRange = trimDateRangeToWeekdays(
        getDateRangeWithinDateRange(getWeekDateRange(dato, true), periode),
    );
    const ukeErHel = dayjs(ukePeriode.from).isoWeekday() === 1 && dayjs(ukePeriode.to).isoWeekday() === 5;
    const månedPeriode: DateRange = trimDateRangeToWeekdays(
        getDateRangeWithinDateRange(getMonthDateRange(dato, true), periode),
    );
    const månedErHel =
        dayjs(periode.from).isBefore(månedPeriode.from, 'month') && dayjs(periode.to).isAfter(månedPeriode.to, 'month');

    const ukePeriodeStartTxt = dateFormatter.dayDateShortMonth(ukePeriode.from);
    const ukePeriodeSluttTxt = dateFormatter.dayDateShortMonth(ukePeriode.to);

    const månedPeriodeStartTxt = dateFormatter.dayDateShortMonth(månedPeriode.from);
    const månedPeriodeSluttTxt = dateFormatter.dayDateShortMonth(månedPeriode.to);

    const ukeNavn = `${dayjs(dato).isoWeek()}`;
    const månedNavn = dayjs(dato).format('MMMM YYYY');

    const sluttDatoTxt = dateFormatter.dayDateShortMonth(getLastWeekdayOnOrBeforeDate(periode.to));

    const skalViseValgetGjelderFlereDager = getNumberOfDaysInDateRange(periode) > 2;

    const renderGjentagelseRadioLabel = (
        key: string,
        periode?: { fra: string; til: string },
        values?: any,
        // TODO - fikse nøkkel
    ): JSX.Element => <AppText id={`tidEnkeltdagForm.gjentagelse.${key}` as any} values={{ ...values, ...periode }} />;

    return (
        <FormComponents.FormikWrapper
            enableReinitialize={true}
            initialValues={{
                tid: tid ? ensureDuration(tid) : undefined,
            }}
            onSubmit={onValidSubmit}
            renderForm={({ values: { skalGjentas, stoppGjentagelse, gjentagelse } }) => {
                return (
                    <FormComponents.Form
                        onCancel={onCancel}
                        formErrorHandler={getIntlFormErrorHandler(intl, 'tidEnkeltdagForm.validation')}
                        includeValidationSummary={false}
                        includeButtons={true}
                        submitButtonLabel="Lagre"
                        showButtonArrows={false}
                        cancelButtonLabel="Avbryt">
                        <FormComponents.TimeInput
                            name={FormFields.tid}
                            label={hvorMyeSpørsmålRenderer(dato)}
                            validate={getTidEnkeltdagFormTidValidator(maksTid, minTid)}
                            timeInputLayout={{ justifyContent: 'left', compact: false, direction: 'vertical' }}
                        />
                        {tidOpprinnelig && erEndret && (
                            <p>
                                <AppText id="tidEnkeltdagForm.endretFra" />{' '}
                                <DurationText duration={tidOpprinnelig} fullText={true} />
                            </p>
                        )}
                        {skalViseValgetGjelderFlereDager && (
                            <FormBlock margin="l">
                                <FormComponents.Checkbox
                                    label={text('tidEnkeltdagForm.gjelderFlereDager.label')}
                                    name={FormFields.skalGjentas}
                                />
                            </FormBlock>
                        )}
                        {skalGjentas === true && (
                            <Block margin="l">
                                <ResponsivePanel>
                                    {/* <div style={{ paddingLeft: '1.5rem' }}> */}

                                    <FormComponents.RadioGroup
                                        legend={text('tidEnkeltdagForm.gjelderFlereDager.info')}
                                        className={bem.element('gjentagelseOptions')}
                                        name={FormFields.gjentagelse}
                                        validate={getRequiredFieldValidator()}
                                        radios={[
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
                                                    månedErHel ? 'helMåned' : 'delAvMåned',
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
                                                    'dagerFremover',
                                                    {
                                                        fra: valgtDatoTxt,
                                                        til: sluttDatoTxt,
                                                    },
                                                    { dagerNavn },
                                                ),

                                                value: GjentagelseType.hverUke,
                                            },
                                        ]}
                                    />
                                    {visStoppGjentagelse && (
                                        <>
                                            {(gjentagelse === GjentagelseType.hverUke ||
                                                gjentagelse === GjentagelseType.hverAndreUke) && (
                                                <div style={{ marginLeft: '1.5rem' }}>
                                                    <FormBlock margin="m">
                                                        <FormComponents.Checkbox
                                                            label={text('tidEnkeltdagForm.stoppGjentagelse.label')}
                                                            name={FormFields.stoppGjentagelse}
                                                        />
                                                    </FormBlock>
                                                    {stoppGjentagelse && (
                                                        <FormBlock margin="l">
                                                            <FormComponents.DatePicker
                                                                label={text('tidEnkeltdagForm.stopDato.label')}
                                                                minDate={dato}
                                                                maxDate={periode.to}
                                                                validate={getDateValidator({
                                                                    min: dato,
                                                                    max: periode.to,
                                                                    required: true,
                                                                })}
                                                                disableWeekends={true}
                                                                defaultMonth={dato}
                                                                name={FormFields.stopDato}
                                                            />
                                                        </FormBlock>
                                                    )}
                                                </div>
                                            )}
                                        </>
                                    )}
                                </ResponsivePanel>
                            </Block>
                        )}
                    </FormComponents.Form>
                );
            }}
        />
    );
};

export default TidEnkeltdagForm;
