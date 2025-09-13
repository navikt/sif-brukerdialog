import { ReactElement } from 'react';
import { useAppIntl } from '@i18n/index';
import bemUtils from '@navikt/sif-common-core-ds/src/utils/bemUtils';
import {
    DateRange,
    getIntlFormErrorHandler,
    getTypedFormComponents,
    InputTime,
    ValidationError,
} from '@navikt/sif-common-formik-ds';
import { DurationText, FormLayout } from '@navikt/sif-common-ui';
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
import { getRequiredFieldValidator } from '@navikt/sif-validation';
import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import { AppText } from '../../../i18n';
import {
    getDagerMedNyTid,
    getDateRangeWithinDateRange,
    getGjentagelseEnkeltdagFraFormValues,
    trimDateRangeToWeekdays,
} from './utils/tidEnkeltdagUtils';
import { getTidEnkeltdagFormTidValidator } from './utils/tidEnkeltdagValidation';

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

enum FormFields {
    'tid' = 'tid',
    'skalGjentas' = 'skalGjentas',
    'gjentagelse' = 'gjentagelse',
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
    [FormFields.stopDato]: string;
}

const FormComponents = getTypedFormComponents<FormFields, TidEnkeltdagFormValues, ValidationError>();

const bem = bemUtils('tidEnkeltdagForm');

const TidEnkeltdagForm = ({
    dato,
    tid,
    tidOpprinnelig,
    periode,
    maksTid = { hours: 24, minutes: 0 },
    minTid = { hours: 0, minutes: 0 },
    hvorMyeSpørsmålRenderer,
    onSubmit,
    onCancel,
}: TidEnkeltdagFormProps) => {
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
        p?: { fra: string; til: string },
        values?: any,
        // TODO - fikse nøkkel
    ): ReactElement => <AppText id={`tidEnkeltdagForm.gjentagelse.${key}` as any} values={{ ...values, ...p }} />;

    return (
        <FormComponents.FormikWrapper
            enableReinitialize={true}
            initialValues={{
                tid: tid ? ensureDuration(tid) : undefined,
            }}
            onSubmit={onValidSubmit}
            renderForm={({ values: { skalGjentas } }) => {
                return (
                    <FormComponents.Form
                        onCancel={onCancel}
                        formErrorHandler={getIntlFormErrorHandler(intl, 'tidEnkeltdagForm.validation')}
                        includeValidationSummary={false}
                        includeButtons={true}
                        submitButtonLabel="Lagre"
                        showButtonArrows={false}
                        cancelButtonLabel="Avbryt">
                        <FormLayout.Questions>
                            <FormComponents.TimeInput
                                name={FormFields.tid}
                                label={hvorMyeSpørsmålRenderer(dato)}
                                validate={getTidEnkeltdagFormTidValidator(maksTid, minTid)}
                                timeInputLayout={{ justifyContent: 'left', compact: false, direction: 'vertical' }}
                            />
                            {tidOpprinnelig && erEndret && (
                                <FormLayout.QuestionRelatedMessage>
                                    <p>
                                        <AppText id="tidEnkeltdagForm.endretFra" />{' '}
                                        <DurationText duration={tidOpprinnelig} fullText={true} />
                                    </p>
                                </FormLayout.QuestionRelatedMessage>
                            )}
                            {skalViseValgetGjelderFlereDager && (
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
                                </FormLayout.Panel>
                            )}
                        </FormLayout.Questions>
                    </FormComponents.Form>
                );
            }}
        />
    );
};

export default TidEnkeltdagForm;
