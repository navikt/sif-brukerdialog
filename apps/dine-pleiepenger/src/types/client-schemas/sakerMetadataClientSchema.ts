import { zSakerMetadataDtoModified } from '../../server/dto-schemas/sakerMetadataDtoModified';
import { pleietrengendeClientSchema } from './pleietrengendeClientSchema';
import { validateAndConvertToUTCDate } from './zDateFromString';

export const sakerMetadataClientSchema = zSakerMetadataDtoModified
    .extend({
        pleietrengende: pleietrengendeClientSchema,
    })
    .transform(({ fagsakOpprettetTidspunkt, ...rest }) => ({
        ...rest,
        fagsakOpprettetTidspunkt: fagsakOpprettetTidspunkt
            ? validateAndConvertToUTCDate(fagsakOpprettetTidspunkt)
            : undefined,
    }));
