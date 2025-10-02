import { Alert, BodyLong, Heading, VStack } from '@navikt/ds-react';
import { AppText } from '@shared/i18n';
import { forwardRef } from 'react';

import Skyra from '../../../../../../components/skyra/Skyra';
import ForsideLenkeButton from '../../../../atoms/forside-lenke-button/ForsideLenkeButton';
import { useSkyraReloader } from '../../../../hooks/useSkyraReloader';
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
                {/* <Skyra slug="arbeids-og-velferdsetaten-nav/ungdomsprorgramytelsen-rapportere-inntekt" /> */}
                <Skyra slug="arbeids-og-velferdsetaten-nav/test-rapportering-av-inntekt" />
            </div>
        </VStack>
    );
});

export default RapporterInntektKvittering;
