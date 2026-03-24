import { AppText } from '@app/i18n';
import { SøknadStepId } from '@app/setup/config/SoknadStepId';
import { SøknadStep } from '@app/setup/soknad/SoknadStep';
import { BodyLong, GuidePanel, VStack } from '@navikt/ds-react';

import { StartdatoOgAndreYtelserForm } from './StartdatoOgAndreYtelserForm';

export const StartdatoOgAndreYtelserSteg = () => (
    <SøknadStep stepId={SøknadStepId.STARTDATO_OG_ANDRE_YTELSER}>
        <VStack gap="space-48">
            <GuidePanel>
                <BodyLong spacing>
                    <AppText id="startdatoOgAndreYtelserSteg.guidePanel.text.1" />
                </BodyLong>
                <BodyLong>
                    <AppText id="startdatoOgAndreYtelserSteg.guidePanel.text.2" />
                </BodyLong>
            </GuidePanel>
            <StartdatoOgAndreYtelserForm />
        </VStack>
    </SøknadStep>
);
