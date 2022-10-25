import { InstitusjonSøknadsdata } from '../../../types/Søknadsdata';
import { InstitusjonFormValues } from './InstitusjonSteg';

export const getInstitusjonStegInitialValues = (institusjon?: InstitusjonSøknadsdata): InstitusjonFormValues => {
    switch (institusjon?.type) {
        case 'egendefinert':
            return {
                erAnnenInstitusjon: true,
                annen_navn: institusjon.navn,
            };
        case 'registrert':
            return {
                institusjonId: institusjon.institusjonId,
            };
        default:
            return {
                annen_navn: '',
                erAnnenInstitusjon: undefined,
                institusjonId: undefined,
            };
    }
};
