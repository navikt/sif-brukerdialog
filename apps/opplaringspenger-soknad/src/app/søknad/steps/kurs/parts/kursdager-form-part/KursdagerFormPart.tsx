import { FieldArray, useFormikContext } from 'formik';
import { DateRange } from '@navikt/sif-common-utils';
import { Box, Button, Heading, VStack } from '@navikt/ds-react';
import { KursFormValues } from '../../KursStep';
import { FormLayout } from '@navikt/sif-common-ui';
import { Add } from '@navikt/ds-icons';
import KursdagQuestions from './KursdagQuestions';
import { AppText } from '../../../../../i18n';
import { useRef } from 'react';

interface Props {
    gyldigSøknadsperiode: DateRange;
}

const KursdagerFormPart = ({ gyldigSøknadsperiode }: Props) => {
    const { values, validateForm } = useFormikContext<KursFormValues>();
    const { kursdager } = values;
    const periodeHeadingRefs = useRef<Array<HTMLDivElement | null>>([]);

    const harFlereDager = kursdager.length > 1;

    const focusNyPeriodeHeading = (dagIndex: number) => {
        setTimeout(() => {
            // Sett fokus på headingen for den nye dagen via ref
            const heading = periodeHeadingRefs.current[dagIndex];
            if (heading) {
                heading.focus();
            }
        }, 100);
    };

    return (
        <VStack gap="4">
            <FieldArray
                name="kursdager"
                render={(arrayHelpers) => {
                    return (
                        <VStack gap="4">
                            {kursdager.map((kursdag, index) => (
                                <FormLayout.Panel key={index}>
                                    <section>
                                        {harFlereDager ? (
                                            <Heading
                                                size="xsmall"
                                                level="3"
                                                spacing
                                                as="div"
                                                ref={(el) => {
                                                    periodeHeadingRefs.current[index] = el;
                                                }}
                                                tabIndex={-1}>
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
                                            focusNyPeriodeHeading(kursdager.length);
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
