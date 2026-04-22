import { ISODateToDate } from '@navikt/sif-common-utils';

import { RegistrertBarn } from '../../types/Barn';
import { alfaTestesen } from '../entiteter/barn';

export const mockRegistrertBarn: RegistrertBarn = {
    ...alfaTestesen,
    fødselsdato: ISODateToDate(alfaTestesen.fødselsdato),
};

export const mockRegistrerteBarn: RegistrertBarn[] = [mockRegistrertBarn];
