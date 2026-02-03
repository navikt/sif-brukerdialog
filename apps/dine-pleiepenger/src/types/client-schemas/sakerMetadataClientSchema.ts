import { zSakerMetadataDtoModified } from '../../server/dto-schemas/sakerMetadataDtoModified';
import { pleietrengendeClientSchema } from './pleietrengendeClientSchema';
import { validateAndConvertToUTCDate } from './zDateFromString';

export const sakerMetadataClientSchema = zSakerMetadataDtoModified
    .extend({
        pleietrengende: pleietrengendeClientSchema,
    })
    .transform(({ føresteInnsendingTidspunkt, sisteInnsendingTidspunkt, ...rest }) => ({
        ...rest,
        førsteInnsendingTidspunkt: føresteInnsendingTidspunkt
            ? validateAndConvertToUTCDate(føresteInnsendingTidspunkt)
            : undefined,
        sisteInnsendingTidspunkt: sisteInnsendingTidspunkt
            ? validateAndConvertToUTCDate(sisteInnsendingTidspunkt)
            : undefined,
    }));
