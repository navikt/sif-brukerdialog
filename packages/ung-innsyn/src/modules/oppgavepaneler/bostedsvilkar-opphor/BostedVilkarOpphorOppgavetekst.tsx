import { BodyLong, VStack } from '@navikt/ds-react';

import { BostedsvilkårIkkeOppfyltÅrsak } from '@navikt/ung-brukerdialog-api';
import { BostedVilkårOpphørOppgave } from '@sif/api/ung-brukerdialog';
import Fritekst from '../../../components/fritekst/Fritekst';

type Props = BostedVilkårOpphørOppgave['oppgavetypeData'];

export const BostedVilkarOpphorOppgavetekst = ({
    ikkeOppfyltÅrsak,
    ikkeOppfyltÅrsakFritekstbeskrivelse,
    varseltekst,
}: Props) => {
    return varseltekst ? (
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
    ) : null;
};
