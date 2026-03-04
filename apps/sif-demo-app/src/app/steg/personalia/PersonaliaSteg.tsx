import { SøknadStepId } from '../../config/søknadStepConfig';
import { PersonaliaSøknadsdata } from '../../types/Søknadsdata';
import PersonaliaForm, { PersonaliaSkjemadata } from './PersonaliaForm';
import SøknadStep from '../../components/SøknadStep';

export const PersonaliaSteg = () => (
    <SøknadStep<PersonaliaSkjemadata, PersonaliaSøknadsdata>
        stepId={SøknadStepId.PERSONALIA}
        mapToSøknadsdata={(data) => ({ navn: data.navn, harHobby: data.harHobby! })}
        getDefaultValues={(søknadsdata) => ({
            navn: søknadsdata?.navn,
            harHobby: søknadsdata?.harHobby,
        })}>
        {({ defaultValues, onSubmit, isPending }) => (
            <PersonaliaForm defaultValues={defaultValues} isPending={isPending} onSubmit={onSubmit} />
        )}
    </SøknadStep>
);
