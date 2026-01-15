import { zSakerMetadataDtoModified } from '../../server/dto-schemas/sakerMetadataDtoModified';
import { pleietrengendeClientSchema } from './pleietrengendeClientSchema';

export const sakerMetadataClientSchema = zSakerMetadataDtoModified.extend({
    pleietrengende: pleietrengendeClientSchema,
});
