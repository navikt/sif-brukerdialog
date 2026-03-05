import { SøknadStep } from '../../components/søknad-step/SøknadStep';
import { SøknadStepId } from '../../config/søknadStepConfig';
import { KontaktSøknadsdata } from '../../types/Søknadsdata';
import { KontaktinfoForm, KontaktSkjemadata } from './KontaktinfoForm';

const toSøknadsdata = (data) => ({ epost: data.epost });

const toFormValues = (søknadsdata) => ({ epost: søknadsdata?.epost });

export const KontaktinfoSteg = () => (
    <SøknadStep<KontaktSkjemadata, KontaktSøknadsdata>
        stepId={SøknadStepId.KONTAKT}
        toSøknadsdata={toSøknadsdata}
        toFormValues={toFormValues}>
        {({ defaultValues, isPending, onSubmit, onPrevious }) => (
            <KontaktinfoForm
                defaultValues={defaultValues}
                isPending={isPending}
                onSubmit={onSubmit}
                onPrevious={onPrevious}
            />
        )}
    </SøknadStep>
);
