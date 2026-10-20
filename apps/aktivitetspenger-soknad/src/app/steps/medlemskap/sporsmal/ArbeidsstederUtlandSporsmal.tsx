import { AppText } from '@app/i18n';
import { BodyLong, Heading, VStack } from '@navikt/ds-react';
import { useSifValidate } from '@sif/rhf';
import { useMellomlagring } from '@sif/soknad-app';
import { ArbeidUtlandFormData, ArbeidUtlandListAndDialog } from '@sif/soknad-forms';
import { FormLayout } from '@sif/soknad-ui';
import { ISODate } from '@sif/utils';
import { getListValidator } from '@sif/validation';
import { useController } from 'react-hook-form';

import { MedlemskapFormValues } from '../types';

interface Props {
    minDate: ISODate;
    maxDate: ISODate;
}

export const ArbeidsstederUtlandSporsmal = ({ minDate, maxDate }: Props) => {
    const { validateField } = useSifValidate('medlemskapForm');
    const { lagre } = useMellomlagring();
    const { field } = useController<MedlemskapFormValues, 'arbeidsstederUtenforNorge'>({
        name: 'arbeidsstederUtenforNorge',
        rules: {
            validate: validateField('arbeidsstederUtenforNorge', getListValidator({ minItems: 1, required: true })),
        },
    });

    const onChange = (arbeidssteder: ArbeidUtlandFormData[]) => {
        field.onChange(arbeidssteder);
        void lagre();
    };

    return (
        <FormLayout.Panel bleedTop={true}>
            <VStack gap="space-16">
                <Heading size="xsmall" level="2">
                    <AppText id="medlemskapSteg.arbeidsstederUtenforNorge.tittel" />
                </Heading>
                <BodyLong>
                    <AppText id="medlemskapSteg.arbeidsstederUtenforNorge.info.1" />
                </BodyLong>
                <ArbeidUtlandListAndDialog
                    minDate={minDate}
                    maxDate={maxDate}
                    variant="periodeMedJobb"
                    arbeidssteder={field.value ?? []}
                    addButtonId="arbeidsstederUtenforNorge"
                    addButtonLabel={<AppText id="medlemskapSteg.arbeidsstederUtenforNorge.leggTil" />}
                    onChange={onChange}
                />
            </VStack>
        </FormLayout.Panel>
    );
};
