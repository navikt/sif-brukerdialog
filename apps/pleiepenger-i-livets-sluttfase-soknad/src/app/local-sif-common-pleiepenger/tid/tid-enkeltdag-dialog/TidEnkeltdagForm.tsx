import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';

import {
    DateDurationMap,
    dateFormatter,
    DateRange,
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
import { DurationText } from '../..';
import {
    getDagerMedNyTid,
    getDateRangeWithinDateRange,
    getGjentagelseEnkeltdagFraFormValues,
    trimDateRangeToWeekdays,
} from './utils/tidEnkeltdagUtils';
import { getTidEnkeltdagFormTidValidator } from './utils/tidEnkeltdagValidation';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { getTypedFormComponents, InputTime, ValidationError } from '@navikt/sif-common-formik-ds/lib';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import { getDateValidator, getRequiredFieldValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import { Heading } from '@navikt/ds-react';
import { InputDateString } from '@navikt/sif-common-formik-ds/lib/components/formik-datepicker/dateFormatUtils';

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
    [FormFields.stopDato]: InputDateString;
}

const FormComponents = getTypedFormComponents<FormFields, TidEnkeltdagFormValues, ValidationError>();

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
    const intl = useIntl();

    const onValidSubmit = (values: Partial<TidEnkeltdagFormValues>) => {
        if (values.tid) {
            onSubmit({
                dagerMedTid: getDagerMedNyTid(periode, dato, values.tid, getGjentagelseEnkeltdagFraFormValues(values)),
            });
        }
    };

    const erEndret = durationsAreEqual(tid, tidOpprinnelig) === false;
    const dagNavn = dayjs(dato).format('dddd');
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
    ): JSX.Element => (
        <FormattedMessage id={`tidEnkeltdagForm.gjentagelse.${key}`} values={{ ...values, ...periode }} />
    );

    return (
        <div>
            <div className="dialogFormTitle">
                <Heading level="1" size="medium">
                    <span className="m-caps">{dagNavn}</span> {dateFormatter.full(dato)}
                </Heading>
            </div>

            <FormBlock margin="l">
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
                                cancelButtonLabel="Avbryt">
                                <FormComponents.TimeInput
                                    name={FormFields.tid}
                                    label={hvorMyeSpørsmålRenderer(dato)}
                                    validate={getTidEnkeltdagFormTidValidator(maksTid, minTid)}
                                    timeInputLayout={{ justifyContent: 'left', compact: false, direction: 'vertical' }}
                                />
                                {tidOpprinnelig && erEndret && (
                                    <p>
                                        <FormattedMessage id="tidEnkeltdagForm.endretFra" />{' '}
                                        <DurationText duration={tidOpprinnelig} fullText={true} />
                                    </p>
                                )}
                                {skalViseValgetGjelderFlereDager && (
                                    <FormBlock margin="l">
                                        <FormComponents.Checkbox
                                            label={intlHelper(intl, 'tidEnkeltdagForm.gjelderFlereDager.label')}
                                            name={FormFields.skalGjentas}
                                        />
                                    </FormBlock>
                                )}
                                {skalGjentas === true && (
                                    <Block margin="l">
                                        <>
                                            <div className="tidEnkeltdagForm__gjentagelseOptions">
                                                <FormComponents.RadioGroup
                                                    legend={intlHelper(intl, 'tidEnkeltdagForm.gjelderFlereDager.info')}
                                                    className={'skjemaelement'}
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
                                            </div>
                                            {visStoppGjentagelse && (
                                                <>
                                                    {(gjentagelse === GjentagelseType.hverUke ||
                                                        gjentagelse === GjentagelseType.hverAndreUke) && (
                                                        <div style={{ marginLeft: '1.5rem' }}>
                                                            <FormBlock margin="m">
                                                                <FormComponents.Checkbox
                                                                    label={intlHelper(
                                                                        intl,
                                                                        'tidEnkeltdagForm.stoppGjentagelse.label',
                                                                    )}
                                                                    name={FormFields.stoppGjentagelse}
                                                                />
                                                            </FormBlock>
                                                            {stoppGjentagelse && (
                                                                <FormBlock margin="l">
                                                                    <FormComponents.DatePicker
                                                                        label={intlHelper(
                                                                            intl,
                                                                            'tidEnkeltdagForm.stopDato.label',
                                                                        )}
                                                                        minDate={dato}
                                                                        maxDate={periode.to}
                                                                        validate={getDateValidator({
                                                                            min: dato,
                                                                            max: periode.to,
                                                                            required: true,
                                                                        })}
                                                                        dropdownCaption={true}
                                                                        name={FormFields.stopDato}
                                                                    />
                                                                </FormBlock>
                                                            )}
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </>
                                    </Block>
                                )}
                            </FormComponents.Form>
                        );
                    }}
                />
            </FormBlock>
        </div>
    );
};

export default TidEnkeltdagForm;
