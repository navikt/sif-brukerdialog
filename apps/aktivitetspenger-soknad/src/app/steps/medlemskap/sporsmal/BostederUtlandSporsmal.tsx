import { AppText } from '../../../i18n';
import { FormLayout } from '@sif/soknad-ui';
import { BodyLong, Heading, VStack } from '@navikt/ds-react';
import { BostedUtland, BostedUtlandListAndDialog } from '@sif/soknad-forms';
import { ISODate } from '@sif/utils';
import { MedlemskapFormFields } from '../types';

interface Props {
    minDate: ISODate;
    maxDate: ISODate;
    bostederUtenforNorge?: BostedUtland[];
    onChange: (bosteder: BostedUtland[]) => void;
}

export const BostederUtlandSporsmal = ({ minDate, maxDate, bostederUtenforNorge = [], onChange }: Props) => {
    return (
        <FormLayout.Panel bleedTop={true}>
            <VStack gap="space-16">
                <Heading size="xsmall" level="3">
                    <AppText id="medlemskapSteg.bosteder.tittel" />
                </Heading>
                <BodyLong>
                    <AppText id="medlemskapSteg.bosteder.info.1" />
                </BodyLong>
                <BostedUtlandListAndDialog
                    minDate={minDate}
                    maxDate={maxDate}
                    bosteder={bostederUtenforNorge}
                    addButtonId={MedlemskapFormFields.bostederUtenforNorge}
                    addButtonLabel={<AppText id="medlemskapSteg.bosteder.leggTil" />}
                    onChange={onChange}
                />
            </VStack>
        </FormLayout.Panel>
    );
};
