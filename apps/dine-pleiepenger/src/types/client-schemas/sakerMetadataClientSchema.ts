import { zSakerMetadataDtoModified } from '../../server/dto-schemas/sakerMetadataDtoModified';
import { pleietrengendeClientSchema } from './pleietrengendeClientSchema';
import { validateAndConvertToUTCDate } from './zDateFromString';

export const sakerMetadataClientSchema = zSakerMetadataDtoModified
    .extend({
        pleietrengende: pleietrengendeClientSchema,
    })
    .transform(({ førsteInnsendingTidspunkt, sisteInnsendingTidspunkt, ...rest }) => ({
        ...rest,
        førsteInnsendingTidspunkt: førsteInnsendingTidspunkt
            ? validateAndConvertToUTCDate(førsteInnsendingTidspunkt)
            : undefined,
        sisteInnsendingTidspunkt: sisteInnsendingTidspunkt
            ? validateAndConvertToUTCDate(sisteInnsendingTidspunkt)
            : undefined,
    }));
