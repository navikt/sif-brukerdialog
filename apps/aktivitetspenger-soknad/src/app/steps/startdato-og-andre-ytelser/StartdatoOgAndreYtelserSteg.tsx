import { SøknadStepId } from '@app/setup/config/SoknadStepId';
import { SøknadStep } from '@app/setup/soknad/SoknadStep';

import { StartdatoOgAndreYtelserForm } from './StartdatoOgAndreYtelserForm';

export const StartdatoOgAndreYtelserSteg = () => (
    <SøknadStep stepId={SøknadStepId.STARTDATO_OG_ANDRE_YTELSER}>
        <StartdatoOgAndreYtelserForm />
    </SøknadStep>
);
