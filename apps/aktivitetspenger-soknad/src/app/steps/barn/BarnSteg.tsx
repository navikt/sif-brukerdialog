import { SøknadStepId } from '@app/setup/config/SøknadStepId';
import { SøknadStep } from '@app/setup/søknad/SøknadStep';

import { useSøknadState } from '../../setup/hooks';
import { BarnForm } from './BarnForm';

export const BarnSteg = () => {
    const registrerteBarn = useSøknadState().barn; // TODO: Fiks logikk for å registrere barn
    return (
        <SøknadStep stepId={SøknadStepId.BARN}>
            <BarnForm registrerteBarn={registrerteBarn} />
        </SøknadStep>
    );
};
