import { Alert, Button, Heading, VStack } from '@navikt/ds-react';
import { Add } from '@navikt/ds-icons';
import { DateRange, ISOStringToDate } from '@navikt/sif-common-formik-ds';
import { FormLayout } from '@navikt/sif-common-ui';
import { FieldArray, useFormikContext } from 'formik';
import { AppText } from '../../../../../i18n';
import { KursFormValues } from '../../KursStep';
import KursperiodeQuestions, { KursperiodeFormFields } from './KursperiodeQuestions';
import { startOgSluttErSammeHelg } from '../../utils/kursStepUtils';
import { useRef } from 'react';

interface Props {
    gyldigSøknadsperiode: DateRange;
}

const KursperioderFormPart = ({ gyldigSøknadsperiode }: Props) => {
    const { values, validateForm } = useFormikContext<KursFormValues>();
    const { kursperioder } = values;
    const harFlerePerioder = kursperioder && kursperioder.length > 1;
    const dagHeadingRefs = useRef<Array<HTMLDivElement | null>>([]);

    const harPerioderMedKunHelg = kursperioder.some((p) => {
        const startdato = ISOStringToDate(p[KursperiodeFormFields.fom]);
        const sluttdato = ISOStringToDate(p[KursperiodeFormFields.tom]);
        return startdato && sluttdato && startOgSluttErSammeHelg(startdato, sluttdato);
    });

    const focusNyDagHeading = (dagIndex: number) => {
        setTimeout(() => {
            // Sett fokus på headingen for den nye dagen via ref
            const heading = dagHeadingRefs.current[dagIndex];
            if (heading) {
                heading.focus();
            }
        }, 100);
    };

    return (
        <FieldArray
            name="kursperioder"
            render={(arrayHelpers) => {
                return (
                    <VStack gap="4">
                        {kursperioder.map((kursperiode, index) => (
                            <FormLayout.Panel key={index}>
                                <section>
                                    {harFlerePerioder ? (
                                        <Heading
                                            size="xsmall"
                                            level="3"
                                            spacing
                                            as="div"
                                            ref={(el) => {
                                                dagHeadingRefs.current[index] = el;
                                            }}
                                            tabIndex={-1}>
                                            <AppText
                                                id="steg.kurs.enkeltdager.dag.tittel"
                                                values={{ dagNr: index + 1 }}
                                            />
                                        </Heading>
                                    ) : null}
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
                                </section>
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
                                        focusNyDagHeading(kursperioder.length);
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
