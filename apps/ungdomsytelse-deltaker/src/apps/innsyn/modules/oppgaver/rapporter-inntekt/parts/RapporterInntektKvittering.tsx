import ForsideLenkeButton from '@innsyn/atoms/forside-lenke-button/ForsideLenkeButton';
import UXRapportertInntekt from '@innsyn/ux-signals/UXRapportertInntekt';
import { Alert, BodyLong, Heading, VStack } from '@navikt/ds-react';
import Skyra, { Slug } from '@shared/components/skyra/Skyra';
import { useSkyraReloader } from '@shared/hooks/useSkyraReloader';
import { AppText } from '@shared/i18n';
import { forwardRef } from 'react';

import { RapporterInntektKvitteringData } from '../RapporterInntektOppgavePage';

interface Props {
    kvitteringData: RapporterInntektKvitteringData;
}

const RapporterInntektKvittering = forwardRef<HTMLDivElement, Props>(({ kvitteringData }, ref) => {
    useSkyraReloader();
    return (
        <VStack gap="8">
            <Alert variant="success" ref={ref} tabIndex={-1}>
                <Heading level="2" size="small" spacing>
                    <AppText id="rapporterInntektKvittering.tittel" />
                </Heading>
                {kvitteringData.harHattInntektOver0 ? (
                    <BodyLong>
                        <AppText id="rapporterInntektKvittering.harHattInntekt" />
                    </BodyLong>
                ) : (
                    <BodyLong>
                        <AppText id="rapporterInntektKvittering.harIkkeHattInntekt" />
                    </BodyLong>
                )}
            </Alert>
            <div>
                <ForsideLenkeButton />
            </div>
            <div>
                <UXRapportertInntekt />
            </div>
            <div>
                <Skyra slug={Slug.prod_rapporterInntekt} />
            </div>
        </VStack>
    );
});

export default RapporterInntektKvittering;
