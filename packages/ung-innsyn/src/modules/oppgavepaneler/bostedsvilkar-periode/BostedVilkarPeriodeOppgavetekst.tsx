import { BodyLong, VStack } from '@navikt/ds-react';

import { BostedsvilkårIkkeOppfyltÅrsak } from '@navikt/ung-brukerdialog-api';
import { BostedVilkårPeriodeOppgave } from '@sif/api/ung-brukerdialog';
import Fritekst from '../../../components/fritekst/Fritekst';

type Props = BostedVilkårPeriodeOppgave['oppgavetypeData'];

export const BostedVilkarPeriodeOppgavetekst = ({
    ikkeOppfyltÅrsak,
    ikkeOppfyltÅrsakFritekstbeskrivelse,
    varseltekst,
}: Props) => {
    return (
        <VStack gap="space-20">
            <BodyLong>{varseltekst}</BodyLong>
            {ikkeOppfyltÅrsak === BostedsvilkårIkkeOppfyltÅrsak.ANNET && (
                <BodyLong>
                    <Fritekst text={ikkeOppfyltÅrsakFritekstbeskrivelse} />
                </BodyLong>
            )}
        </VStack>
    );
};
