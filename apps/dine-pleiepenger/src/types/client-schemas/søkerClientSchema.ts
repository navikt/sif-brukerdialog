import { søkerDtoSchema } from '../../server/dto-schemas/søkerDtoSchema';
import { zDateFromISODateString } from './zDateFromString';

export const søkerClientSchema = søkerDtoSchema.transform((dto) => ({
    ...dto,
    fødselsdato: zDateFromISODateString,
}));
