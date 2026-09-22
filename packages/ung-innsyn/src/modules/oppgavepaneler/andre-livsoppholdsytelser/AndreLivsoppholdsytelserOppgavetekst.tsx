import { BodyLong, VStack } from '@navikt/ds-react';

import { AndreLivsoppholdsytelserIkkeOppfyltÅrsak } from '@navikt/ung-brukerdialog-api';
import { AndreLivsoppholdsytelserOppgave } from '@sif/api/ung-brukerdialog';
import Fritekst from '../../../components/fritekst/Fritekst';

type Props = AndreLivsoppholdsytelserOppgave['oppgavetypeData'];

export const AndreLivsoppholdsytelserOppgavetekst = ({
    ikkeOppfyltÅrsak,
    ikkeOppfyltÅrsakFritekstbeskrivelse,
    varseltekst,
}: Props) => {
    return (
        <VStack gap="space-20">
            <BodyLong>
                <Fritekst text={varseltekst} />
            </BodyLong>
            {ikkeOppfyltÅrsak === AndreLivsoppholdsytelserIkkeOppfyltÅrsak.MOTTAR_ANNEN_YTELSE && (
                <BodyLong>
                    <Fritekst text={ikkeOppfyltÅrsakFritekstbeskrivelse} />
                </BodyLong>
            )}
        </VStack>
    );
};
