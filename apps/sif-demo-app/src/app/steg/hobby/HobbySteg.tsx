import { SøknadStepId } from '../../config/søknadStepConfig';
import { HobbySøknadsdata } from '../../types/Søknadsdata';
import HobbyForm, { HobbySkjemadata } from './HobbyForm';
import SøknadStep from '../../components/SøknadStep';

export const HobbySteg = () => (
    <SøknadStep<HobbySkjemadata, HobbySøknadsdata>
        stepId={SøknadStepId.HOBBY}
        mapToSøknadsdata={(data) => ({ navn: data.navn })}
        getDefaultValues={(søknadsdata) => ({ navn: søknadsdata?.navn })}>
        {({ defaultValues, onSubmit, isPending, onPrevious }) => (
            <HobbyForm
                defaultValues={defaultValues}
                isPending={isPending}
                onSubmit={onSubmit}
                onPrevious={onPrevious}
            />
        )}
    </SøknadStep>
);
