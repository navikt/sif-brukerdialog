import { SøknadStep } from '../../components/søknad-step/SøknadStep';
import { SøknadStepId } from '../../config/søknadStepConfig';
import { PersonaliaSøknadsdata } from '../../types/Søknadsdata';
import { PersonaliaForm, PersonaliaSkjemadata } from './PersonaliaForm';

const toFormValues = (søknadsdata: PersonaliaSøknadsdata | undefined): Partial<PersonaliaSkjemadata> => ({
    navn: søknadsdata?.navn,
    harHobby: søknadsdata?.harHobby,
});

const toSøknadsdata = (data: PersonaliaSkjemadata): PersonaliaSøknadsdata => ({
    navn: data.navn,
    harHobby: data.harHobby!,
});

export const PersonaliaSteg = () => (
    <SøknadStep<PersonaliaSkjemadata, PersonaliaSøknadsdata>
        stepId={SøknadStepId.PERSONALIA}
        toSøknadsdata={toSøknadsdata}
        toFormValues={toFormValues}>
        {({ defaultValues, onSubmit, isPending }) => (
            <PersonaliaForm defaultValues={defaultValues} isPending={isPending} onSubmit={onSubmit} />
        )}
    </SøknadStep>
);
