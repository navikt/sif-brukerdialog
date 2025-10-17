import { Alert, BodyShort, Box, Button, Hide, VStack } from '@navikt/ds-react';
import { Add } from '@navikt/ds-icons';
import { DateRange, ISOStringToDate } from '@navikt/sif-common-formik-ds';
import { FormLayout } from '@navikt/sif-common-ui';
import { FieldArray, useFormikContext } from 'formik';
import { AppText } from '../../../../../i18n';
import { KursFormValues } from '../../KursStep';
import KursperiodeQuestions, { KursperiodeFormFields } from './KursperiodeQuestions';
import { startOgSluttErSammeHelg } from '../../utils/kursStepUtils';
import { useFocusManagement } from '../../hooks/useFocusManagement';

interface Props {
    gyldigSøknadsperiode: DateRange;
}

const KursperioderFormPart = ({ gyldigSøknadsperiode }: Props) => {
    const { values, validateForm } = useFormikContext<KursFormValues>();
    const { kursperioder } = values;
    const harFlerePerioder = kursperioder && kursperioder.length > 1;
    const { focusFirstInputElement, setElementRef } = useFocusManagement();

    const harPerioderMedKunHelg = kursperioder.some((p) => {
        const startdato = ISOStringToDate(p[KursperiodeFormFields.fom]);
        const sluttdato = ISOStringToDate(p[KursperiodeFormFields.tom]);
        return startdato && sluttdato && startOgSluttErSammeHelg(startdato, sluttdato);
    });

    return (
        <FieldArray
            name="kursperioder"
            render={(arrayHelpers) => {
                return (
                    <VStack gap="4">
                        {kursperioder.map((kursperiode, index) => (
                            <FormLayout.Panel key={index}>
                                <fieldset ref={setElementRef(index)} aria-labelledby={`kursperiode-legend-${index}`}>
                                    <Hide hidden={harFlerePerioder === false}>
                                        <Box marginBlock="0 2">
                                            <legend id={`kursperiode-legend-${index}`}>
                                                <BodyShort weight="semibold" spacing={false} className="noPadding">
                                                    <AppText
                                                        id="steg.kurs.kursperioder.periode.tittel"
                                                        values={{ periodeNr: index + 1 }}
                                                    />
                                                </BodyShort>
                                            </legend>
                                        </Box>
                                    </Hide>

                                    <KursperiodeQuestions
                                        allePerioder={kursperioder}
                                        values={kursperiode || {}}
                                        index={index}
                                        harFlerePerioder={harFlerePerioder}
                                        gyldigSøknadsperiode={gyldigSøknadsperiode}
                                        onRemove={() => {
                                            const isLastItem = index === kursperioder.length - 1;
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
                        <div>
                            <Button
                                type="button"
                                variant="secondary"
                                size="small"
                                icon={<Add aria-hidden={true} />}
                                onClick={() => {
                                    arrayHelpers.push({});
                                    setTimeout(() => {
                                        validateForm(values);
                                        focusFirstInputElement(kursperioder.length);
                                    });
                                }}>
                                <AppText id="steg.kurs.kursperioder.leggTil.label" />
                            </Button>
                        </div>
                        {harPerioderMedKunHelg && (
                            <Alert variant="warning">
                                <AppText id="kursperiode.form.validation.startOgSluttErSammeHelg.info" />
                            </Alert>
                        )}
                    </VStack>
                );
            }}
        />
    );
};

export default KursperioderFormPart;
