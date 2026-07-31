import { BodyShort } from '@navikt/ds-react';

import { SifInfoCard } from '../../../components/sif-info-card/SifInfoCard';
import { SifSoknadUiText } from '../../../i18n';

export const ApplicationUnavailableContent = () => {
    return (
        <SifInfoCard variant="warning">
            <BodyShort weight="semibold" spacing={true}>
                <SifSoknadUiText id="@sifSoknadUi.applicationUnavailable.title" />
            </BodyShort>
            <BodyShort>
                <SifSoknadUiText id="@sifSoknadUi.applicationUnavailable.description" />
            </BodyShort>
        </SifInfoCard>
    );
};
