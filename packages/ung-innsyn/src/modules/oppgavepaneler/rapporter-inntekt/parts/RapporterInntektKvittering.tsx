import { Alert, BodyLong, Heading, VStack } from '@navikt/ds-react';
import { forwardRef } from 'react';

import { ForsideLenkeButton } from '../../../../components';
import { UngUiText } from '../../../../i18n';
import { RapporterInntektKvitteringData } from '../RapporterInntektOppgavePanel';

interface Props {
    kvitteringData: RapporterInntektKvitteringData;
}

export const RapporterInntektKvittering = forwardRef<HTMLDivElement, Props>(({ kvitteringData }, ref) => {
    return (
        <VStack gap="space-32">
            <Alert variant="success" ref={ref} tabIndex={-1}>
                <Heading level="2" size="small" spacing>
                    <UngUiText id="@ungInnsyn.rapporterInntektKvittering.tittel" />
                </Heading>
                {kvitteringData.harHattInntektOver0 ? (
                    <BodyLong>
                        <UngUiText id="@ungInnsyn.rapporterInntektKvittering.harHattInntekt" />
                    </BodyLong>
                ) : (
                    <BodyLong>
                        <UngUiText id="@ungInnsyn.rapporterInntektKvittering.harIkkeHattInntekt" />
                    </BodyLong>
                )}
            </Alert>
            <div>
                <ForsideLenkeButton />
            </div>
        </VStack>
    );
});
