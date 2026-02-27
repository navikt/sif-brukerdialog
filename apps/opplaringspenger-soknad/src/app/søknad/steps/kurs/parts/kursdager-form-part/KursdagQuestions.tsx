import { TrashIcon } from '@navikt/aksel-icons';
import { Box, Button, HGrid, VStack } from '@navikt/ds-react';
import { getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds';
import { DateRange, isDateInDateRange, isDateWeekDay, ISODate } from '@navikt/sif-common-utils';
import { getDateValidator } from '@navikt/sif-validation';

import { AppText, useAppIntl } from '../../../../../i18n';
import { KursFormFields } from '../../KursStepForm';
import kursperiodeOgDagUtils from '../../utils/kursperiodeOgDagUtils';

export enum KursdagFormFields {
    dato = 'dato',
}

export interface KursdagFormValues {
    [KursdagFormFields.dato]: ISODate;
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

    return (
        <VStack gap="space-16">
            <HGrid columns={{ md: 3 }} gap="space-16">
                <Form.DatePicker
                    name={getFieldName(KursdagFormFields.dato)}
                    label={text('kursdag.form.dato.label', { dagNr: dagNr, harFlereDager })}
                    minDate={minDate}
                    maxDate={maxDate}
                    disabledDateRanges={disabledDateRanges}
                    disableWeekends={true}
                    validate={(value) => {
                        let error: any = getDateValidator({ required: true, min: minDate, max: maxDate })(value);
                        if (!error) {
                            const dato = kursperiodeOgDagUtils.getDatoFromKursdagFormDato(value);
                            if (dato !== undefined) {
                                if (disabledDateRanges.some((range) => isDateInDateRange(dato, range))) {
                                    error = 'likeKursdager';
                                }
                                if (isDateWeekDay(dato) === false) {
                                    error = 'erHelgedag';
                                }
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
            </HGrid>
            {harFlereDager && onRemove && (
                <Box>
                    <Button
                        type="button"
                        variant="tertiary"
                        iconPosition="left"
                        icon={<TrashIcon aria-hidden={true} />}
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
