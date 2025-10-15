import { Alert, Box, Button, Heading, VStack } from '@navikt/ds-react';
import { Add } from '@navikt/ds-icons';
import { DateRange, ISOStringToDate } from '@navikt/sif-common-formik-ds';
import { FormLayout } from '@navikt/sif-common-ui';
import { FieldArray, useFormikContext } from 'formik';
import { AppText } from '../../../../i18n';
import { KursFormValues } from '../KursStep';
import KursperiodeQuestions, { KursperiodeFormFields } from './KursperiodeQuestions';
import { startOgSluttErSammeHelg } from '../kursStepUtils';

interface Props {
    gyldigSøknadsperiode: DateRange;
}

const KursperioderFormPart = ({ gyldigSøknadsperiode }: Props) => {
    const { values, validateForm } = useFormikContext<KursFormValues>();
    const { kursperioder } = values;
    const harFlerePerioder = kursperioder && kursperioder.length > 1;

    const harPerioderMedKunHelg = kursperioder.some((p) => {
        const startdato = ISOStringToDate(p[KursperiodeFormFields.fom]);
        const sluttdato = ISOStringToDate(p[KursperiodeFormFields.tom]);
        return startdato && sluttdato && startOgSluttErSammeHelg(startdato, sluttdato);
    });

    return (
        <VStack gap="4">
            <VStack gap="2">
                <Heading level="2" size="xsmall">
                    <AppText id="steg.kurs.kursperioder.tittel" />
                </Heading>
                <AppText id="steg.kurs.kursperioder.tekst" />
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
                                        gyldigSøknadsperiode={gyldigSøknadsperiode}
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
                                    <AppText id="steg.kurs.kursperioder.leggTil.label" />
                                </Button>
                            </Box>
                            {harPerioderMedKunHelg && (
                                <Alert variant="warning">
                                    <AppText id="kursperiode.form.validation.startOgSluttErSammeHelg.info" />
                                </Alert>
                            )}
                        </VStack>
                    );
                }}
            />
        </VStack>
    );
};

export default KursperioderFormPart;
