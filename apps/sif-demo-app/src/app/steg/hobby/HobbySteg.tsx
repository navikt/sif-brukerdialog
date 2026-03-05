import { AppSøknadStep } from '../../components/app-søknad-step/AppSøknadStep';
import { SøknadStepId } from '../../config/søknadStepConfig';
import { HobbySøknadsdata } from '../../types/Søknadsdata';
import { HobbyForm, HobbySkjemadata } from './HobbyForm';

const toSøknadsdata = (data) => ({ navn: data.navn });

const toFormValues = (søknadsdata) => ({ navn: søknadsdata?.navn });

export const HobbySteg = () => (
    <AppSøknadStep<HobbySkjemadata, HobbySøknadsdata>
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
    </AppSøknadStep>
);
