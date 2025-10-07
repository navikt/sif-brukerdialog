import { FieldArray, useFormikContext } from 'formik';
import { DateRange } from '@navikt/sif-common-utils';
import { BodyLong, BodyShort, Box, Button, VStack } from '@navikt/ds-react';
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
                                    <section aria-labelledby={`heading-${index}`}>
                                        <VStack gap="6">
                                            <VStack gap="2">
                                                <BodyShort
                                                    weight="semibold"
                                                    size="large"
                                                    className="noPadding"
                                                    id={`heading-${index}`}>
                                                    <AppText
                                                        id="kursdag.form.dag.label"
                                                        values={{ harFlereDager, dagNr: index + 1 }}
                                                    />
                                                </BodyShort>
                                                <BodyLong className="noPadding">
                                                    <AppText id="kursdag.form.dag.description" />
                                                </BodyLong>
                                            </VStack>

                                            <KursdagQuestions
                                                values={kursdag}
                                                index={index}
                                                gyldigSøknadsperiode={gyldigSøknadsperiode}
                                                harFlereDager={harFlereDager}
                                                alleDager={kursdager}
                                            />
                                        </VStack>
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
                                    Legg til dag
                                </Button>
                            </Box>
                        </VStack>
                    );
                }}
            />{' '}
        </VStack>
    );
};

export default KursdagerFormPart;
