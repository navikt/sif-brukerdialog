import { BodyLong, VStack } from '@navikt/ds-react';
import { BostedVilkårOppgave } from '@sif/api/ung-brukerdialog';
import { BostedsvilkårIkkeOppfyltÅrsak } from '@sif/ung-brukerdialog-api';

import Fritekst from '../../../components/fritekst/Fritekst';

type Props = BostedVilkårOppgave['oppgavetypeData'];

export const BostedVilkarOppgavetekst = ({
    ikkeOppfyltÅrsak,
    ikkeOppfyltÅrsakFritekstbeskrivelse,
    varseltekst,
}: Props) => {
    return (
        <VStack gap="space-20">
            <BodyLong>
                <Fritekst text={varseltekst} />
            </BodyLong>
            {ikkeOppfyltÅrsak === BostedsvilkårIkkeOppfyltÅrsak.ANNET && (
                <BodyLong>
                    <Fritekst text={ikkeOppfyltÅrsakFritekstbeskrivelse} />
                </BodyLong>
            )}
        </VStack>
    );
};
