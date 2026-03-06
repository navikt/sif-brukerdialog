import { SøknadStep } from '../../components/søknad-step/SøknadStep';
import { SøknadStepId } from '../../config/søknadStepConfig';
import { BarnSøknadsdata } from '../../types/Søknadsdata';
import { BarnForm, BarnFormValues } from './BarnForm';
import { toBarnFormValues, toBarnSøknadsdata } from './barnStegUtils';

export const BarnSteg = () => (
    <SøknadStep<BarnFormValues, BarnSøknadsdata>
        stepId={SøknadStepId.BARN}
        toSøknadsdata={toBarnSøknadsdata}
        toFormValues={toBarnFormValues}>
        {({ defaultValues, onSubmit, onPrevious, isPending }) => (
            <BarnForm defaultValues={defaultValues} isPending={isPending} onSubmit={onSubmit} onPrevious={onPrevious} />
        )}
    </SøknadStep>
);
