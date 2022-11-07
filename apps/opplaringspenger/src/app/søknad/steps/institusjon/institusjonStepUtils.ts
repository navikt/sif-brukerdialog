import { InstitusjonSøknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { InstitusjonFormValues } from './InstitusjonStep';

export const getInstitusjonStepInitialValues = (institusjon?: InstitusjonSøknadsdata): InstitusjonFormValues => {
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

export const getInstitusjonSøknadsdata = ({
    annen_navn,
    erAnnenInstitusjon,
    institusjonId,
}: InstitusjonFormValues): InstitusjonSøknadsdata | undefined => {
    if (erAnnenInstitusjon && annen_navn) {
        return {
            type: 'egendefinert',
            navn: annen_navn,
        };
    }
    if (institusjonId) {
        return {
            type: 'registrert',
            institusjonId,
        };
    }
    return undefined;
};
