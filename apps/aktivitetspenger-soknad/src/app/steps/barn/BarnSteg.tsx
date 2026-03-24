import { SøknadStepId } from '@app/setup/config/SoknadStepId';
import { useSøknadState } from '@app/setup/hooks';
import { SøknadStep } from '@app/setup/soknad/SoknadStep';

import { BarnForm } from './BarnForm';

export const BarnSteg = () => {
    const registrerteBarn = useSøknadState().barn; // TODO: Fiks logikk for å registrere barn
    return (
        <SøknadStep stepId={SøknadStepId.BARN}>
            <BarnForm registrerteBarn={registrerteBarn} />
        </SøknadStep>
    );
};
