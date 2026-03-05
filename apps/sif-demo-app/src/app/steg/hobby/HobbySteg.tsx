import SøknadStep from '../../components/SøknadStep';
import { SøknadStepId } from '../../config/søknadStepConfig';
import { HobbySøknadsdata } from '../../types/Søknadsdata';
import HobbyForm, { HobbySkjemadata } from './HobbyForm';

const toSøknadsdata = (data) => ({ navn: data.navn });

const toFormValues = (søknadsdata) => ({ navn: søknadsdata?.navn });

export const HobbySteg = () => (
    <SøknadStep<HobbySkjemadata, HobbySøknadsdata>
        stepId={SøknadStepId.HOBBY}
        toSøknadsdata={toSøknadsdata}
        toFormValues={toFormValues}>
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
