import { BodyLong, VStack } from '@navikt/ds-react';
import { AktivitetVilkårOppgave } from '@sif/api/ung-brukerdialog';
import { AktivitetsvilkåretIkkeOppfyltÅrsak } from '@sif/ung-brukerdialog-api';

import Fritekst from '../../../components/fritekst/Fritekst';

type Props = AktivitetVilkårOppgave['oppgavetypeData'];

export const AktivitetVilkårOppgavetekst = ({
    ikkeOppfyltÅrsak,
    ikkeOppfyltÅrsakFritekstbeskrivelse,
    varseltekst,
}: Props) => {
    return (
        <VStack gap="space-20">
            <BodyLong>
                <Fritekst text={varseltekst} />
            </BodyLong>
            {ikkeOppfyltÅrsak === AktivitetsvilkåretIkkeOppfyltÅrsak.ANNET && (
                <BodyLong>
                    <Fritekst text={ikkeOppfyltÅrsakFritekstbeskrivelse} />
                </BodyLong>
            )}
        </VStack>
    );
};
