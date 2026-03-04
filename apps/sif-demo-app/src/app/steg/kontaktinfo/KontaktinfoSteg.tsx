import { SøknadStepId } from '../../config/søknadStepConfig';
import { KontaktSøknadsdata } from '../../types/Søknadsdata';
import KontaktinfoForm, { KontaktSkjemadata } from './KontaktinfoForm';
import SøknadStep from '../../components/SøknadStep';

export const KontaktinfoSteg = () => (
    <SøknadStep<KontaktSkjemadata, KontaktSøknadsdata>
        stepId={SøknadStepId.KONTAKT}
        mapToSøknadsdata={(data) => ({ epost: data.epost })}
        getDefaultValues={(søknadsdata) => ({ epost: søknadsdata?.epost })}>
        {({ defaultValues, onSubmit, isPending, onPrevious }) => (
            <KontaktinfoForm
                defaultValues={defaultValues}
                isPending={isPending}
                onSubmit={onSubmit}
                onPrevious={onPrevious}
            />
        )}
    </SøknadStep>
);
