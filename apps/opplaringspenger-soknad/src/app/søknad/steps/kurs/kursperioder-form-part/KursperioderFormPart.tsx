import KursperiodeQuestions from './KursperiodeQuestions';
import { BodyShort, Box, Button, Heading, VStack } from '@navikt/ds-react';
import { FieldArray, useFormikContext } from 'formik';
import { KursFormValues } from '../KursStep';
import { FormLayout } from '@navikt/sif-common-ui';
import { Add } from '@navikt/ds-icons';
import { AppText } from '../../../../i18n';

const KursperioderFormPart = () => {
    const { values, validateForm } = useFormikContext<KursFormValues>();
    const { kursperioder } = values;
    const harFlerePerioder = kursperioder && kursperioder.length > 1;

    return (
        <VStack gap="4">
            <VStack gap="2">
                <Heading level="2" size="xsmall">
                    <AppText id="steg.kurs.kursperioder.tittel" />
                </Heading>
                <BodyShort className="navds-form-field__description">
                    <AppText id="steg.kurs.kursperioder.tekst" />
                </BodyShort>
            </VStack>
            <FieldArray
                name="kursperioder"
                render={(arrayHelpers) => {
                    return (
                        <VStack gap="4">
                            {kursperioder.map((kursperiode, index) => (
                                <FormLayout.Panel key={index}>
                                    <KursperiodeQuestions
                                        allePerioder={kursperioder}
                                        values={kursperiode || {}}
                                        index={index}
                                        harFlerePerioder={harFlerePerioder}
                                        onRemove={() => {
                                            arrayHelpers.remove(index);
                                            setTimeout(() => {
                                                validateForm();
                                            });
                                        }}
                                    />
                                </FormLayout.Panel>
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
