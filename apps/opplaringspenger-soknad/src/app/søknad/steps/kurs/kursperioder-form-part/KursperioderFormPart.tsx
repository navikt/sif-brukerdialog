import KursperiodeQuestions from './KursperiodeQuestions';
import { Box, Button, Heading, VStack } from '@navikt/ds-react';
import { FieldArray, useFormikContext } from 'formik';
import { KursFormValues } from '../KursStep';
import { FormLayout } from '@navikt/sif-common-ui';
import { Add } from '@navikt/ds-icons';

// interface Props {
//     gyldigSøknadsperiode: DateRange;
// }

const KursperioderFormPart = () => {
    const { values, validateForm } = useFormikContext<KursFormValues>();
    const { kursperioder } = values;
    const harFlerePerioder = kursperioder && kursperioder.length > 1;
    return (
        <VStack gap="4">
            <Heading level="2" size="xsmall">
                Hvilken dag eller periode er opplæringen?
            </Heading>
            <FieldArray
                name="kursperioder"
                render={(arrayHelpers) => {
                    return (
                        <VStack gap="6">
                            <VStack gap="2">
                                {kursperioder.map((kursperiode, index) => (
                                    <FormLayout.Panel key={index}>
                                        <VStack gap="4">
                                            <KursperiodeQuestions
                                                values={kursperiode || {}}
                                                index={index}
                                                harFlerePerioder={harFlerePerioder}
                                                onRemove={() => {
                                                    arrayHelpers.remove(index);
                                                    validateForm();
                                                }}
                                            />
                                        </VStack>
                                    </FormLayout.Panel>
                                ))}
                            </VStack>
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
                                    Legg til ny periode
                                </Button>
                            </Box>
                        </VStack>
                    );
                }}
            />
        </VStack>
    );
};

export default KursperioderFormPart;
