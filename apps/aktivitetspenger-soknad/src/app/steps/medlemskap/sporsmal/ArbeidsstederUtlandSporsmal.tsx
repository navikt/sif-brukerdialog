import { AppText } from '../../../i18n';
import { FormLayout } from '@sif/soknad-ui';
import { BodyLong, Heading, VStack } from '@navikt/ds-react';
import { ArbeidUtland, ArbeidUtlandListAndDialog } from '@sif/soknad-forms';
import { ISODate } from '@sif/utils';
import { MedlemskapFormFields } from '../types';

interface Props {
    minDate: ISODate;
    maxDate: ISODate;
    arbeidsstederUtenforNorge?: ArbeidUtland[];
    onChange: (arbeidssteder: ArbeidUtland[]) => void;
}

export const ArbeidsstederUtlandSporsmal = ({ minDate, maxDate, arbeidsstederUtenforNorge = [], onChange }: Props) => {
    return (
        <FormLayout.Panel bleedTop={true}>
            <VStack gap="space-16">
                <Heading size="xsmall" level="3">
                    <AppText id="medlemskapSteg.arbeidsstederUtenforNorge.tittel" />
                </Heading>
                <BodyLong>
                    <AppText id="medlemskapSteg.arbeidsstederUtenforNorge.info.1" />
                </BodyLong>
                <ArbeidUtlandListAndDialog
                    minDate={minDate}
                    maxDate={maxDate}
                    variant="periodeMedJobb"
                    arbeidssteder={arbeidsstederUtenforNorge}
                    addButtonId={MedlemskapFormFields.arbeidsstederUtenforNorge}
                    addButtonLabel={<AppText id="medlemskapSteg.arbeidsstederUtenforNorge.leggTil" />}
                    onChange={onChange}
                />
            </VStack>
        </FormLayout.Panel>
    );
};
