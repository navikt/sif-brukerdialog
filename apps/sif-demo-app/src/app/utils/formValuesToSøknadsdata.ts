import { SøknadStepId } from '../config/søknadStepConfig';

type FormValues = Record<string, unknown>;

export const formValuesToSøknadsdata = (
    stepId: string,
    formValues: FormValues,
): Record<string, unknown> | undefined => {
    switch (stepId) {
        case SøknadStepId.PERSONALIA:
            return {
                navn: formValues.navn,
                harHobby: formValues.harHobby,
            };
        case SøknadStepId.HOBBY:
            return {
                navn: formValues.navn,
            };
        case SøknadStepId.KONTAKT:
            return {
                epost: formValues.epost,
            };
        default:
            return undefined;
    }
};
