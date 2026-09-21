import { BodyLong, VStack } from '@navikt/ds-react';

import { AndreLivsoppholdsytelserIkkeOppfyltÅrsak } from '@navikt/ung-brukerdialog-api';
import { AndreLivsoppholdsytelserOpphørOppgave } from '@sif/api/ung-brukerdialog';
import Fritekst from '../../../components/fritekst/Fritekst';

type Props = AndreLivsoppholdsytelserOpphørOppgave['oppgavetypeData'];

export const AndreLivsoppholdsytelserOpphørOppgavetekst = ({
    ikkeOppfyltÅrsak,
    ikkeOppfyltÅrsakFritekstbeskrivelse,
    varseltekst,
}: Props) => {
    return varseltekst ? (
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
    ) : null;
};
