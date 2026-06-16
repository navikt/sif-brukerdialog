import { Deltakelse } from '../../types/Deltakelse';
import { HGrid, ReadMore } from '@navikt/ds-react';
import { getDeltakelseHandlinger } from '../../utils/deltakelseUtils';
import { appEnv } from '../../utils/appEnv';

interface Props {
    deltakelse: Deltakelse;
}

export const DevDeltakelseHandlinger = ({ deltakelse }: Props) => {
    if (appEnv.SIF_PUBLIC_VIS_DEV_INFO !== true) {
        return null;
    }
    const handlinger = getDeltakelseHandlinger(deltakelse);
    return (
        <ReadMore header="Deltakelse handlinger (kun synlig i Q)">
            {Object.entries(handlinger)
                .sort(([aKey], [bKey]) => aKey.localeCompare(bKey))
                .map(([key, value]) => (
                    <HGrid key={key} gap="space-8" columns="15rem auto" paddingBlock="space-4">
                        <strong>{key}:</strong>
                        <span>{String(value)}</span>
                    </HGrid>
                ))}
        </ReadMore>
    );
};
