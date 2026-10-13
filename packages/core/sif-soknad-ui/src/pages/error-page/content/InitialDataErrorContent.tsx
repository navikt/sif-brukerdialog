import { BodyShort } from '@navikt/ds-react';

import { SifInfoCard } from '../../../components/sif-info-card/SifInfoCard';
import { SifSoknadUiText } from '../../../i18n';

export const InitialDataErrorContent = () => {
    return (
        <SifInfoCard variant="warning">
            <BodyShort weight="semibold" spacing={true}>
                <SifSoknadUiText id="@sifSoknadUi.initialDataError.title" />
            </BodyShort>
            <BodyShort>
                <SifSoknadUiText id="@sifSoknadUi.initialDataError.description" />
            </BodyShort>
        </SifInfoCard>
    );
};
