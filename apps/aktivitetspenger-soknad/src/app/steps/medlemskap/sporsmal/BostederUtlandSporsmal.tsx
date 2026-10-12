import { AppText } from '@app/i18n';
import { BodyLong, Heading, VStack } from '@navikt/ds-react';
import { getListValidator } from '@navikt/sif-validation';
import { useSifValidate } from '@sif/rhf';
import { useMellomlagring } from '@sif/soknad-app';
import { ArbeidUtlandFormData, ArbeidUtlandListAndDialog } from '@sif/soknad-forms';
import { FormLayout } from '@sif/soknad-ui';
import { ISODate } from '@sif/utils';
import { useController } from 'react-hook-form';

import { MedlemskapFormFields, MedlemskapFormValues } from '../types';

interface Props {
    minDate: ISODate;
    maxDate: ISODate;
}

export const BostederUtlandSporsmal = ({ minDate, maxDate }: Props) => {
    const { validateField } = useSifValidate('medlemskapForm');
    const { lagre } = useMellomlagring();
    const { field } = useController<MedlemskapFormValues, MedlemskapFormFields.bostederUtenforNorge>({
        name: MedlemskapFormFields.bostederUtenforNorge,
        rules: {
            validate: validateField(
                MedlemskapFormFields.bostederUtenforNorge,
                getListValidator({ minItems: 1, required: true }),
            ),
        },
    });

    const onChange = (bosteder: ArbeidUtlandFormData[]) => {
        field.onChange(bosteder);
        void lagre();
    };

    return (
        <FormLayout.Panel bleedTop={true}>
            <VStack gap="space-16">
                <Heading size="xsmall" level="2">
                    <AppText id="medlemskapSteg.bosteder.tittel" />
                </Heading>
                <BodyLong>
                    <AppText id="medlemskapSteg.bosteder.info.1" />
                </BodyLong>
                <ArbeidUtlandListAndDialog
                    minDate={minDate}
                    maxDate={maxDate}
                    variant="generell"
                    arbeidssteder={field.value ?? []}
                    addButtonId={MedlemskapFormFields.bostederUtenforNorge}
                    addButtonLabel={<AppText id="medlemskapSteg.bosteder.leggTil" />}
                    onChange={onChange}
                />
            </VStack>
        </FormLayout.Panel>
    );
};
