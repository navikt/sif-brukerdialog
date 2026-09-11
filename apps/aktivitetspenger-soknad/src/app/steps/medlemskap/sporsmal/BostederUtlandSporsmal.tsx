import { AppText } from '../../../i18n';
import { FormLayout } from '@sif/soknad-ui';
import { BodyLong, Heading, VStack } from '@navikt/ds-react';
import { ArbeidUtland, ArbeidUtlandListAndDialog } from '@sif/soknad-forms';
import { ISODate } from '@sif/utils';
import { MedlemskapFormFields } from '../types';

interface Props {
    minDate: ISODate;
    maxDate: ISODate;
    utenlandsopphold?: ArbeidUtland[];
    onChange: (bosteder: ArbeidUtland[]) => void;
}

export const BostederUtlandSporsmal = ({ minDate, maxDate, utenlandsopphold = [], onChange }: Props) => {
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
                    arbeidssteder={utenlandsopphold}
                    addButtonId={MedlemskapFormFields.arbeidsstederUtenforNorge}
                    addButtonLabel={<AppText id="medlemskapSteg.bosteder.leggTil" />}
                    onChange={onChange}
                />
            </VStack>
        </FormLayout.Panel>
    );
};
