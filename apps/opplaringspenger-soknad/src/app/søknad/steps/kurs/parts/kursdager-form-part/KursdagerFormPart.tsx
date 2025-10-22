import { FieldArray, useFormikContext } from 'formik';
import { DateRange } from '@navikt/sif-common-utils';
import { BodyShort, Box, Button, Hide, VStack } from '@navikt/ds-react';
import { KursFormValues } from '../../KursStep';
import { FormLayout } from '@navikt/sif-common-ui';
import { Add } from '@navikt/ds-icons';
import KursdagQuestions from './KursdagQuestions';
import { AppText } from '../../../../../i18n';
import { useFocusManagement } from '../../hooks/useFocusManagement';

interface Props {
    gyldigSøknadsperiode: DateRange;
}

const KursdagerFormPart = ({ gyldigSøknadsperiode }: Props) => {
    const { values, validateForm } = useFormikContext<KursFormValues>();
    const { kursdager } = values;
    const { focusFirstInputElement, setElementRef } = useFocusManagement();

    const harFlereDager = kursdager.length > 1;

    return (
        <VStack gap="4">
            <FieldArray
                name="kursdager"
                render={(arrayHelpers) => {
                    return (
                        <VStack gap="4">
                            {kursdager.map((kursdag, index) => (
                                <FormLayout.Panel key={index}>
                                    <fieldset ref={setElementRef(index)} aria-labelledby={`kursdag-legend-${index}`}>
                                        <Hide hidden={harFlereDager === false}>
                                            <Box marginBlock="0 2">
                                                <legend id={`kursdag-legend-${index}`}>
                                                    <BodyShort weight="semibold" spacing={false} className="noPadding">
                                                        <AppText
                                                            id="steg.kurs.enkeltdager.dag.tittel"
                                                            values={{ dagNr: index + 1 }}
                                                        />
                                                    </BodyShort>
                                                </legend>
                                            </Box>
                                        </Hide>

                                        <KursdagQuestions
                                            values={kursdag}
                                            index={index}
                                            gyldigSøknadsperiode={gyldigSøknadsperiode}
                                            harFlereDager={harFlereDager}
                                            alleDager={kursdager}
                                            onRemove={() => {
                                                const isLastItem = index === kursdager.length - 1;
                                                const focusIndex = isLastItem ? index - 1 : index;
                                                arrayHelpers.remove(index);
                                                setTimeout(() => {
                                                    validateForm();
                                                    focusFirstInputElement(focusIndex);
                                                });
                                            }}
                                        />
                                    </fieldset>
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
                                            focusFirstInputElement(kursdager.length);
                                        });
                                    }}>
                                    <AppText id="steg.kurs.enkeltdager.leggTil.label" />
                                </Button>
                            </Box>
                        </VStack>
                    );
                }}
            />
        </VStack>
    );
};

export default KursdagerFormPart;
