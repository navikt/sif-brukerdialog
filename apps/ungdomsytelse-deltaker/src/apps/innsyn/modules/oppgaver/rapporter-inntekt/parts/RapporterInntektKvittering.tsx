import { Alert, BodyLong, Heading, VStack } from '@navikt/ds-react';
import { forwardRef } from 'react';

import { AppText } from '@shared/i18n';
import ForsideLenkeButton from '../../../../atoms/forside-lenke-button/ForsideLenkeButton';
import { RapporterInntektKvitteringData } from '../RapporterInntektOppgavePage';

interface Props {
    kvitteringData: RapporterInntektKvitteringData;
}

const RapporterInntektKvittering = forwardRef<HTMLDivElement, Props>(({ kvitteringData }, ref) => {
    return (
        <>
            <VStack gap="4">
                <Alert variant="success" ref={ref} tabIndex={-1}>
                    <Heading level="2" size="small" spacing>
                        <AppText id="rapporterInntektKvittering.tittel" />
                    </Heading>
                    {kvitteringData.harHattInntekt ? (
                        <BodyLong>
                            <AppText id="rapporterInntektKvittering.harHattInntekt" />
                        </BodyLong>
                    ) : (
                        <BodyLong>
                            <AppText id="rapporterInntektKvittering.harIkkeHattInntekt" />
                        </BodyLong>
                    )}
                </Alert>
            </VStack>
            <div>
                <ForsideLenkeButton />
            </div>
        </>
    );
});

export default RapporterInntektKvittering;
