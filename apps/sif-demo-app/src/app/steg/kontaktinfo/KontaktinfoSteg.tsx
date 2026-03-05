import { AppSøknadStep } from '../../components/app-søknad-step/AppSøknadStep';
import { SøknadStepId } from '../../config/søknadStepConfig';
import { KontaktSøknadsdata } from '../../types/Søknadsdata';
import { KontaktinfoForm, KontaktSkjemadata } from './KontaktinfoForm';

const toSøknadsdata = (data) => ({ epost: data.epost });

const toFormValues = (søknadsdata) => ({ epost: søknadsdata?.epost });

export const KontaktinfoSteg = () => (
    <AppSøknadStep<KontaktSkjemadata, KontaktSøknadsdata>
        stepId={SøknadStepId.KONTAKT}
        toSøknadsdata={toSøknadsdata}
        toFormValues={toFormValues}>
        {({ defaultValues, onSubmit, isPending, onPrevious }) => (
            <KontaktinfoForm
                defaultValues={defaultValues}
                isPending={isPending}
                onSubmit={onSubmit}
                onPrevious={onPrevious}
            />
        )}
    </AppSøknadStep>
);
