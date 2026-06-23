import { HGrid, Switch, VStack } from '@navikt/ds-react';
import { Deltakelse } from '../../../types/Deltakelse';
import { Deltaker } from '../../../types/Deltaker';
import { Features } from '../../../types/Features';
import SlettAktivDeltakerInfo from './SlettAktivDeltakerInfo';
import { useState } from 'react';
import SlettSluttdatoPanel from './SlettSluttdatoPanel';
import { getDeltakelseHandlinger } from '../../../utils/deltakelseUtils';

interface Props {
    deltakelse: Deltakelse;
    deltaker: Deltaker;
}

export const Unntakshandlinger = ({ deltakelse, deltaker }: Props) => {
    const [ekspandert, setEkspandert] = useState(false);

    if (deltakelse.erSlettet || !deltakelse.søktTidspunkt) {
        return null;
    }

    const handlinger = getDeltakelseHandlinger(deltakelse);

    return (
        <VStack gap="space-8">
            <Switch checked={ekspandert} onChange={(e) => setEkspandert(e.target.checked)} size="small">
                Vis unntakshandlinger
            </Switch>
            {ekspandert && (
                <HGrid gap="space-24" columns={{ sm: 1, md: '1fr 1fr' }}>
                    {Features.slettAktivDeltakelse && !deltakelse.erSlettet && (
                        <SlettAktivDeltakerInfo deltaker={deltaker} deltakelse={deltakelse} />
                    )}
                    {handlinger.kanSletteSluttdato && (
                        <SlettSluttdatoPanel deltaker={deltaker} deltakelse={deltakelse} />
                    )}
                </HGrid>
            )}
        </VStack>
    );
};
