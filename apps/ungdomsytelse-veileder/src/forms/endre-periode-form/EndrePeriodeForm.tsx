import { Alert, Button, HStack, VStack } from '@navikt/ds-react';
import {
    FormikDatepicker,
    FormikYesOrNoQuestion,
    TypedFormikForm,
    TypedFormikWrapper,
} from '@navikt/sif-common-formik-ds';
import { dateToISODate } from '@navikt/sif-common-utils';
import { Deltakelse, Deltaker, formaterNavn } from '@navikt/ung-common';
import { GYLDIG_PERIODE } from '../../settings';
import { max, min } from 'date-fns';
import { usePeriodeForDeltakelse } from '../../hooks/usePeriodeForDeltakelse';
import { EndrePeriodeVariant } from '../../types/EndrePeriodeVariant';
import { getDateValidator, getRequiredFieldValidator } from '@navikt/sif-validation';
import { ToDoKeys } from '../../dev-components/ToDos';
import ToDo from '../../dev-components/ToDo';

export type EndrePeriodeFormValues = {
    id: string;
    fnr: string;
    fom: string;
    tom: string;
};

interface Props {
    variant: EndrePeriodeVariant;
    deltaker: Deltaker;
    deltakelse: Deltakelse;
    onCancel?: () => void;
    onDeltakelseChanged: (oppdatertDeltakelse: Deltakelse) => void;
}

const EndrePeriodeForm = ({ variant, deltakelse, deltaker, onCancel, onDeltakelseChanged }: Props) => {
    const { mutate, isPending, error } = usePeriodeForDeltakelse({
        variant,
        deltakelseId: deltakelse.id,
        deltakerId: deltaker.id,
    });

    const deltakernavn = formaterNavn(deltaker.navn);

    const startdatoMinMax = {
        min: GYLDIG_PERIODE.from,
        max: min([deltakelse.tilOgMed ? deltakelse.tilOgMed : GYLDIG_PERIODE.to, GYLDIG_PERIODE.to]),
    };

    const sluttdatoMinMax = {
        min: max([deltakelse.fraOgMed || GYLDIG_PERIODE.from, GYLDIG_PERIODE.from]),
        max: GYLDIG_PERIODE.to,
    };

    const handleOnSubmit = async (values: EndrePeriodeFormValues) => {
        const dato = variant === EndrePeriodeVariant.startdato ? values.fom : values.tom;
        if (!dato) {
            return;
        }
        mutate(
            {
                dato,
            },
            {
                onSuccess: onDeltakelseChanged,
            },
        );
    };

    return (
        <TypedFormikWrapper<EndrePeriodeFormValues>
            initialValues={{
                fom: dateToISODate(deltakelse.fraOgMed),
                tom: deltakelse.tilOgMed ? dateToISODate(deltakelse.tilOgMed) : undefined,
            }}
            onSubmit={handleOnSubmit}
            renderForm={() => {
                return (
                    <VStack gap="6">
                        <TypedFormikForm
                            submitPending={isPending}
                            showSubmitButton={false}
                            submitButtonLabel="Endre"
                            showButtonArrows={false}>
                            <VStack gap="6">
                                <VStack gap="8" className="rounded-xs">
                                    {variant === EndrePeriodeVariant.startdato ? (
                                        <>
                                            <FormikDatepicker
                                                name="fom"
                                                label="Ny startdato"
                                                description={<ToDo id={ToDoKeys.endreStartdato} />}
                                                minDate={startdatoMinMax.min}
                                                maxDate={startdatoMinMax.max}
                                                defaultMonth={deltakelse.fraOgMed}
                                                validate={getDateValidator({
                                                    required: true,
                                                    ...startdatoMinMax,
                                                })}
                                            />
                                        </>
                                    ) : (
                                        <FormikDatepicker
                                            name="tom"
                                            label="Ny sluttdato"
                                            description={<ToDo id={ToDoKeys.endreSluttdato} />}
                                            minDate={sluttdatoMinMax.min}
                                            maxDate={sluttdatoMinMax.max}
                                            defaultMonth={deltakelse.tilOgMed}
                                            validate={getDateValidator({
                                                ...sluttdatoMinMax,
                                                required: true,
                                            })}
                                        />
                                    )}
                                    <FormikYesOrNoQuestion
                                        name="deltakerInformert"
                                        legend={`Er denne endringen avklart med ${deltakernavn}?`}
                                        description={<ToDo id={ToDoKeys.erDeltakerInformert} />}
                                        validate={getRequiredFieldValidator()}
                                    />
                                    <ToDo id={ToDoKeys.bekreftEndrePeriode} />
                                    <HStack gap="4">
                                        <Button type="submit" loading={isPending} variant="primary">
                                            Lagre endring
                                        </Button>
                                        {onCancel ? (
                                            <Button type="button" variant="secondary" onClick={onCancel}>
                                                Avbryt
                                            </Button>
                                        ) : null}
                                    </HStack>
                                </VStack>
                                {error ? <Alert variant="error">{error.error.message}</Alert> : null}
                            </VStack>
                        </TypedFormikForm>
                    </VStack>
                );
            }}
        />
    );
};

export default EndrePeriodeForm;
