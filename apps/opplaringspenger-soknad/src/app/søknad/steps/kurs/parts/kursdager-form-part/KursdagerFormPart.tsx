import { FieldArray, useFormikContext } from 'formik';
import { DateRange } from '@navikt/sif-common-utils';
import { Box, Button, Heading, VStack } from '@navikt/ds-react';
import { KursFormValues } from '../../KursStep';
import { FormLayout } from '@navikt/sif-common-ui';
import { Add } from '@navikt/ds-icons';
import KursdagQuestions from './KursdagQuestions';
import { AppText } from '../../../../../i18n';

interface Props {
    gyldigSøknadsperiode: DateRange;
}

const KursdagerFormPart = ({ gyldigSøknadsperiode }: Props) => {
    const { values, validateForm } = useFormikContext<KursFormValues>();
    const { kursdager } = values;

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
                                    <section aria-labelledby={harFlereDager ? 'dag-' + (index + 1) : undefined}>
                                        {harFlereDager ? (
                                            <Heading size="xsmall" level="3" spacing as="div" id={'dag-' + (index + 1)}>
                                                <AppText
                                                    id="steg.kurs.enkeltdager.dag.tittel"
                                                    values={{ dagNr: index + 1 }}
                                                />
                                            </Heading>
                                        ) : null}
                                        <KursdagQuestions
                                            values={kursdag}
                                            index={index}
                                            gyldigSøknadsperiode={gyldigSøknadsperiode}
                                            harFlereDager={harFlereDager}
                                            alleDager={kursdager}
                                            onRemove={() => {
                                                arrayHelpers.remove(index);
                                                setTimeout(() => {
                                                    validateForm();
                                                });
                                            }}
                                        />
                                    </section>
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
