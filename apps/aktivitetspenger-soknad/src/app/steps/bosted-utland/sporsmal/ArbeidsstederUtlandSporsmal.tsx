import { AppText } from '../../../i18n';
import { FormLayout } from '@sif/soknad-ui';
import { BodyLong, Heading, VStack } from '@navikt/ds-react';
import { ArbeidUtland, ArbeidUtlandListAndDialog } from '@sif/soknad-forms';
import { ISODate } from '@sif/utils';
import { BostedUtlandFormFields } from '../types';

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
                    <AppText id="bostedUtlandSteg.arbeidsstederUtenforNorge.tittel" />
                </Heading>
                <BodyLong>
                    <AppText id="bostedUtlandSteg.arbeidsstederUtenforNorge.info.1" />
                </BodyLong>
                <ArbeidUtlandListAndDialog
                    minDate={minDate}
                    maxDate={maxDate}
                    arbeidssteder={arbeidsstederUtenforNorge}
                    addButtonId={BostedUtlandFormFields.arbeidsstederUtenforNorge}
                    addButtonLabel={<AppText id="bostedUtlandSteg.arbeidsstederUtenforNorge.leggTil" />}
                    onChange={onChange}
                />
            </VStack>
        </FormLayout.Panel>
    );
};
