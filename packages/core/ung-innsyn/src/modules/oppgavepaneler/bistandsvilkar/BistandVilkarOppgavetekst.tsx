import { BodyLong, VStack } from '@navikt/ds-react';
import { BistandVilkårOppgave } from '@sif/api/ung-brukerdialog';
import { BistandsvilkårIkkeOppfyltÅrsak } from '@sif/ung-brukerdialog-api';

import Fritekst from '../../../components/fritekst/Fritekst';

type Props = BistandVilkårOppgave['oppgavetypeData'];

export const BistandVilkårOppgavetekst = ({
    ikkeOppfyltÅrsak,
    ikkeOppfyltÅrsakFritekstbeskrivelse,
    varseltekst,
}: Props) => {
    return (
        <VStack gap="space-20">
            <BodyLong>
                <Fritekst text={varseltekst} />
            </BodyLong>
            {ikkeOppfyltÅrsak === BistandsvilkårIkkeOppfyltÅrsak.ANNET && (
                <BodyLong>
                    <Fritekst text={ikkeOppfyltÅrsakFritekstbeskrivelse} />
                </BodyLong>
            )}
        </VStack>
    );
};
