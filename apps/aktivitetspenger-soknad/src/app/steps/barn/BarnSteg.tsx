import { SøknadStepId } from '@app/setup/config/SøknadStepId';
import { useSøknadState } from '@app/setup/hooks';
import { SøknadStep } from '@app/setup/søknad/SøknadStep';

import { BarnForm } from './BarnForm';

export const BarnSteg = () => {
    const registrerteBarn = useSøknadState().barn; // TODO: Fiks logikk for å registrere barn
    return (
        <SøknadStep stepId={SøknadStepId.BARN}>
            <BarnForm registrerteBarn={registrerteBarn} />
        </SøknadStep>
    );
};
