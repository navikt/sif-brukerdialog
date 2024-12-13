import { Box, Button, Heading, VStack } from '@navikt/ds-react';
import { Add } from '@navikt/ds-icons';
import { DateRange } from '@navikt/sif-common-formik-ds';
import { FormLayout } from '@navikt/sif-common-ui';
import { FieldArray, useFormikContext } from 'formik';
import { AppText } from '../../../../i18n';
import { KursFormValues } from '../KursStep';
import KursperiodeQuestions from './KursperiodeQuestions';

interface Props {
    gyldigSøknadsperiode: DateRange;
}

const KursperioderFormPart = ({ gyldigSøknadsperiode }: Props) => {
    const { values, validateForm } = useFormikContext<KursFormValues>();
    const { kursperioder } = values;
    const harFlerePerioder = kursperioder && kursperioder.length > 1;

    return (
        <VStack gap="4">
            <Heading level="2" size="small">
                <AppText id="steg.kurs.kursperioder.tittel" />
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
                                                allePerioder={kursperioder}
                                                values={kursperiode || {}}
                                                index={index}
                                                gyldigSøknadsperiode={gyldigSøknadsperiode}
                                                harFlerePerioder={harFlerePerioder}
                                                onRemove={() => {
                                                    arrayHelpers.remove(index);
                                                    setTimeout(() => {
                                                        validateForm();
                                                    });
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
