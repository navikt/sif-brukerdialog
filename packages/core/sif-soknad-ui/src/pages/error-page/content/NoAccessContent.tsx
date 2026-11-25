import { BodyShort } from '@navikt/ds-react';

import { SifInfoCard } from '../../../components/sif-info-card/SifInfoCard';
import { SifSoknadUiText } from '../../../i18n';

export const NoAccessContent = () => {
    return (
        <SifInfoCard variant="warning">
            <BodyShort weight="semibold" spacing={true}>
                <SifSoknadUiText id="@sifSoknadUi.noAccess.title" />
            </BodyShort>
            <BodyShort>
                <SifSoknadUiText id="@sifSoknadUi.noAccess.description" />
            </BodyShort>
        </SifInfoCard>
    );
};
