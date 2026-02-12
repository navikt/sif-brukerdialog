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
    getLastWeekdayOnOrBeforeDate,
    getMonthDateRange,
    getNumberOfDaysInDateRange,
    getWeekDateRange,
    NumberDuration,
} from '@navikt/sif-common-utils';
import { getRequiredFieldValidator } from '@navikt/sif-validation';
import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import { ReactElement } from 'react';

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
    erIkkeIOmsorgstilbudLabelRenderer: (date: Date) => string;
    hvorMyeSpørsmålRenderer: (date: Date) => string;
    beskrivelseRenderer: (date: Date) => ReactElement | string;
    onSubmit: (dagerMedTid: TidEnkeltdagEndring) => void;
    onCancel: () => void;
}

export interface GjentagelseEnkeltdag {
    gjentagelsetype: GjentagelseType;
    tom?: Date;
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
    'stopDato' = 'stopDato',
}

export enum GjentagelseType {
    hverUke = 'hverUke',
    hverAndreUke = 'hverAndreUke',
    heleUken = 'heleUken',
    heleMåneden = 'heleMåneden',
}

export interface TidEnkeltdagFormValues {
    [FormFields.erIkkeIOmsorgstilbud]: boolean;
    [FormFields.erBarnetIOmsorgstilbud]: YesOrNo;
    [FormFields.tid]: InputTime;
    [FormFields.skalGjentas]: boolean;
    [FormFields.gjentagelse]: GjentagelseType;
    [FormFields.stopDato]: string;
}

const FormComponents = getTypedFormComponents<FormFields, TidEnkeltdagFormValues, ValidationError>();

const bem = bemUtils('tidEnkeltdagForm');

/** Lytter på endringer i erIkkeIOmsorgstilbud og oppdaterer tid til 0 når den krysses av */
// const OmsorgstilbudWatcher = () => {
//     const { values, setFieldValue } = useFormikContext<TidEnkeltdagFormValues>();
//     const prevValue = useRef(values.erIkkeIOmsorgstilbud);

//     useEffect(() => {
//         // Kun oppdater hvis verdien endres til true (fra false eller undefined)
//         if (values.erIkkeIOmsorgstilbud === true && prevValue.current !== true) {
//             setFieldValue(FormFields.tid, { hours: '0', minutes: '0' });
//         }
//         prevValue.current = values.erIkkeIOmsorgstilbud;
//     }, [values.erIkkeIOmsorgstilbud, setFieldValue]);

//     return null;
// };

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
            // values.erIkkeIOmsorgstilbud = true;
            values.erBarnetIOmsorgstilbud = YesOrNo.NO;
        }
        if (values.tid.hours !== '' || values.tid.minutes !== '') {
            // values.erIkkeIOmsorgstilbud = true;
            values.erBarnetIOmsorgstilbud = YesOrNo.YES;
        }
    }
    return values;
};

const TidEnkeltdagForm = ({
    dato,
    tid,
    tidOpprinnelig,
    periode,
    maksTid = { hours: 24, minutes: 0 },
    minTid = { hours: 0, minutes: 0 },
    hvorMyeSpørsmålRenderer,
    // erIkkeIOmsorgstilbudLabelRenderer,
    // beskrivelseRenderer,
    onSubmit,
    onCancel,
}: TidEnkeltdagFormProps) => {
    const { text, intl } = useAppIntl();

    const onValidSubmit = (values: Partial<TidEnkeltdagFormValues>) => {
        if (values.tid && values.erBarnetIOmsorgstilbud === YesOrNo.YES) {
            onSubmit({
                dagerMedTid: getDagerMedNyTid(periode, dato, values.tid, getGjentagelseEnkeltdagFraFormValues(values)),
            });
        }
        if (values.erBarnetIOmsorgstilbud === YesOrNo.NO) {
            onSubmit({
                dagerMedTid: getDagerMedNyTid(
                    periode,
                    dato,
                    { hours: '0', minutes: '0' },
                    getGjentagelseEnkeltdagFraFormValues(values),
                ),
            });
        }
    };

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

    const renderGjentagelseRadioLabel = (key: string, p?: { fra: string; til: string }, values?: any): ReactElement => (
        <AppText id={`tidEnkeltdagForm.gjentagelse.${key}` as any} values={{ ...values, ...p }} />
    );

    const initalValues = getInitialValues({ tid, tidOpprinnelig });

    return (
        <FormComponents.FormikWrapper
            enableReinitialize={true}
            initialValues={initalValues}
            onSubmit={onValidSubmit}
            renderForm={({ values }) => {
                const { skalGjentas, erBarnetIOmsorgstilbud } = values;
                return (
                    <FormComponents.Form
                        onCancel={onCancel}
                        formErrorHandler={getIntlFormErrorHandler(intl, 'tidEnkeltdagForm.validation')}
                        includeValidationSummary={false}
                        includeButtons={true}
                        submitButtonLabel="Lagre"
                        showButtonArrows={false}
                        cancelButtonLabel="Avbryt">
                        {/* <OmsorgstilbudWatcher /> */}
                        <VStack gap="space-24">
                            <BodyLong className="noPadding">
                                Velg om barnet er i omsorgstilbud denne dagen, og eventuelt hvor mye tid barnet er i
                                omsorgstilbudet.
                            </BodyLong>
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
                            {/* <BodyLong className="noPadding">{beskrivelseRenderer(dato)}</BodyLong> */}
                            <VStack gap="space-32">
                                <FormLayout.Panel>
                                    <VStack gap="space-16">
                                        <FormComponents.YesOrNoQuestion
                                            name={FormFields.erBarnetIOmsorgstilbud}
                                            legend={`Er barnet i omsorgstilbud ${dateFormatter.dayCompactDate(dato)}?`}
                                            renderHorizontal={true}
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
                                        {/* <FormLayout.QuestionBleedTop>
                                            <FormComponents.Checkbox
                                                name={FormFields.erIkkeIOmsorgstilbud}
                                                label={erIkkeIOmsorgstilbudLabelRenderer(dato)}
                                            />
                                        </FormLayout.QuestionBleedTop> */}
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
                                                        { dagerNavn, månedNavn },
                                                    ),

                                                    value: GjentagelseType.hverUke,
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
