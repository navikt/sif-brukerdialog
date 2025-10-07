import { Box, Button, HGrid, VStack } from '@navikt/ds-react';
import { Delete } from '@navikt/ds-icons';
import { getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds';
import { dateFormatter, DateRange, Duration, isDateInDateRange, ISODate } from '@navikt/sif-common-utils';
import { AppText, useAppIntl } from '../../../../../i18n';
import { KursFormFields } from '../../KursStep';
import { getDateValidator, getTimeValidator } from '@navikt/sif-validation';
import kursperiodeOgDagUtils from '../../utils/kursperiodeOgDagUtils';

export enum KursdagFormFields {
    dato = 'dato',
    tidKurs = 'tidKurs',
    tidReise = 'tidReise',
}

export interface KursdagFormValues {
    [KursdagFormFields.dato]: ISODate;
    [KursdagFormFields.tidKurs]: Duration;
    [KursdagFormFields.tidReise]: Duration;
}
const Form = getTypedFormComponents<KursdagFormFields, KursdagFormValues, ValidationError>();

interface Props {
    values: Partial<KursdagFormValues>;
    index: number;
    harFlereDager?: boolean;
    alleDager: Array<Partial<KursdagFormValues>>;
    gyldigSøknadsperiode: DateRange;
    onRemove?: () => void;
}

const getValidationErrorKey = (field: KursdagFormFields, error: string) => {
    return `kursdag.form.${field}.validation.${error}`;
};

const KursdagQuestions = ({ index, harFlereDager, alleDager, gyldigSøknadsperiode, values, onRemove }: Props) => {
    const { text } = useAppIntl();
    const minDate = gyldigSøknadsperiode.from;
    const maxDate = gyldigSøknadsperiode.to;

    const getFieldName = (field: KursdagFormFields) =>
        `${KursFormFields.kursdager}.${index}.${field}` as KursdagFormFields;

    const disabledDateRanges = alleDager
        .filter((dag) => dag !== values)
        .map((dag) => kursperiodeOgDagUtils.getDatoFromKursdagFormValue(dag))
        .filter((dato) => dato !== undefined)
        .map((dato) => ({ from: dato, to: dato }));

    const dagNr = index + 1;

    const valgtDato = kursperiodeOgDagUtils.getDatoFromKursdagFormDato(values[KursdagFormFields.dato]);

    return (
        <VStack gap="4">
            <HGrid columns={{ md: 3 }} gap="4">
                <Form.DatePicker
                    name={getFieldName(KursdagFormFields.dato)}
                    label={text('kursdag.form.dato.label', { dagNr: dagNr, harFlereDager })}
                    minDate={minDate}
                    maxDate={maxDate}
                    disabledDateRanges={disabledDateRanges}
                    validate={(value) => {
                        let error: any = getDateValidator({ required: true, min: minDate, max: maxDate })(value);
                        if (!error) {
                            const dato = kursperiodeOgDagUtils.getDatoFromKursdagFormDato(value);
                            if (
                                dato !== undefined &&
                                disabledDateRanges.some((range) => isDateInDateRange(dato, range))
                            ) {
                                error = 'likeKursdager';
                            }
                        }
                        return error
                            ? {
                                  key: getValidationErrorKey(KursdagFormFields.dato, error),
                                  keepKeyUnaltered: true,
                                  values: { dagNr, harFlereDager },
                              }
                            : undefined;
                    }}
                />
                <Form.TimeInput
                    wide={true}
                    compact={false}
                    validate={(value) => {
                        if (!valgtDato) {
                            return;
                        }
                        const error: any = getTimeValidator({ required: true })(value);
                        return error
                            ? {
                                  key: getValidationErrorKey(KursdagFormFields.tidKurs, error),
                                  keepKeyUnaltered: true,
                                  values: { dato: dateFormatter.compact(valgtDato), harFlereDager },
                              }
                            : undefined;
                    }}
                    name={getFieldName(KursdagFormFields.tidKurs)}
                    label={text('kursdag.form.tidKurs.label')}
                />
                <Form.TimeInput
                    wide={true}
                    compact={false}
                    validate={(value) => {
                        if (!valgtDato) {
                            return;
                        }
                        const error: any = getTimeValidator()(value);
                        return error
                            ? {
                                  key: getValidationErrorKey(KursdagFormFields.tidReise, error),
                                  keepKeyUnaltered: true,
                                  values: { dato: dateFormatter.compact(valgtDato), harFlereDager },
                              }
                            : undefined;
                    }}
                    name={getFieldName(KursdagFormFields.tidReise)}
                    label={text('kursdag.form.tidReise.label')}
                />
            </HGrid>

            {harFlereDager && onRemove && (
                <Box>
                    <Button
                        type="button"
                        variant="tertiary"
                        iconPosition="left"
                        icon={<Delete aria-hidden={true} />}
                        onClick={onRemove}
                        size="small">
                        <AppText id="kursdag.fjern.label" values={{ dagNr, harFlereDager }} />
                    </Button>
                </Box>
            )}
        </VStack>
    );
};

export default KursdagQuestions;
