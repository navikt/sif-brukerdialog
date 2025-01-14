import { Box, Button, Heading, VStack } from '@navikt/ds-react';
import { FieldArray, useFormikContext } from 'formik';
import { KursFormFields, KursFormValues } from '../KursStep';
import { FormLayout } from '@navikt/sif-common-ui';
import { Add, Delete } from '@navikt/ds-icons';
import { FormikDatepicker, FormikTextarea } from '@navikt/sif-common-formik-ds';
import { getDateValidator, getStringValidator } from '@navikt/sif-common-formik-ds/src/validation';

const ReisedagerFormPart = () => {
    const { values, validateForm } = useFormikContext<KursFormValues>();
    const { reisedager = [''] } = values;

    const getFieldName = (index: number) => `${KursFormFields.reisedager}.${index}`;
    const harFlereReisedager = reisedager.length > 1;

    return (
        <FormLayout.Panel>
            <VStack gap="2">
                <Heading level="2" size="xsmall" spacing={true}>
                    Legg til reisedager:
                </Heading>
            </VStack>
            <FormLayout.Questions>
                <FieldArray
                    name={KursFormFields.reisedager}
                    render={(arrayHelpers) => {
                        return (
                            <VStack gap="6">
                                {reisedager.map((_reisedag, index) => (
                                    <Box key={index}>
                                        <VStack gap="2">
                                            <FormikDatepicker
                                                name={getFieldName(index)}
                                                label={`Reisedag ${harFlereReisedager ? `${index + 1}` : ''} (dato)`}
                                                validate={getDateValidator({ required: true })}
                                            />
                                            {harFlereReisedager ? (
                                                <Box>
                                                    <Button
                                                        type="button"
                                                        variant="tertiary"
                                                        size="small"
                                                        onClick={() => arrayHelpers.remove(index)}
                                                        icon={<Delete aria-hidden={true} />}>
                                                        Fjern {harFlereReisedager ? `reisedag ${index + 1}` : null}
                                                    </Button>
                                                </Box>
                                            ) : null}
                                        </VStack>
                                    </Box>
                                ))}
                                <Box>
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        size="small"
                                        icon={<Add aria-hidden={true} />}
                                        onClick={() => {
                                            arrayHelpers.push({});
                                            setTimeout(() => {
                                                validateForm(values);
                                            });
                                        }}>
                                        Legg til reisedag
                                    </Button>
                                </Box>
                            </VStack>
                        );
                    }}
                />
                <FormikTextarea
                    name={KursFormFields.reisedagerBeskrivelse}
                    label="Årsak for reisetid"
                    maxLength={250}
                    validate={getStringValidator({
                        required: true,
                        maxLength: 250,
                        minLength: 5,
                        disallowUnicodeCharacters: true,
                    })}
                    description="Fordi du reiser på andre dager enn du har kurs eller opplæring, må du beskrive hvorfor."
                />
            </FormLayout.Questions>
        </FormLayout.Panel>
    );
};

export default ReisedagerFormPart;
