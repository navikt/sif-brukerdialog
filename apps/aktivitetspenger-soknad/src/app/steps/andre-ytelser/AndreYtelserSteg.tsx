import { AppText } from '@app/i18n';
import { SøknadStepId } from '@app/setup/config/SoknadStepId';
import { SøknadStep } from '@app/setup/soknad/SoknadStep';
import { BodyLong, GuidePanel, VStack } from '@navikt/ds-react';

import { AndreYtelserForm } from './AndreYtelserForm';

export const AndreYtelserSteg = () => (
    <SøknadStep stepId={SøknadStepId.ANDRE_YTELSER}>
        <VStack gap="space-48">
            <GuidePanel>
                <BodyLong spacing>
                    <AppText id="andreYtelserSteg.guidePanel.text.1" />
                </BodyLong>
                <BodyLong>
                    <AppText id="andreYtelserSteg.guidePanel.text.2" />
                </BodyLong>
            </GuidePanel>
            <AndreYtelserForm />
        </VStack>
    </SøknadStep>
);
