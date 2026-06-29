import { RegistrertBarn } from '../../types/Barn';
import { alfaTestesen } from '../entiteter/barn';

export const mockRegistrertBarn: RegistrertBarn = {
    aktørId: alfaTestesen.aktørId,
    fornavn: alfaTestesen.fornavn,
    etternavn: alfaTestesen.etternavn,
    fødselsdato: alfaTestesen.fødselsdato,
    mellomnavn: alfaTestesen.mellomnavn ?? undefined,
};

export const mockRegistrerteBarn: RegistrertBarn[] = [mockRegistrertBarn];
