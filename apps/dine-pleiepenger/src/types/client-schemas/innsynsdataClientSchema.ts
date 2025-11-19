import { innsynsdataDtoSchema } from '../../server/dto-schemas/innsynsdataDtoSchema';
import { sakerMetadataClientSchema } from './sakerMetadataClientSchema';
import { søkerClientSchema } from './søkerClientSchema';

export const innsynsdataClientSchema = innsynsdataDtoSchema.extend({
    søker: søkerClientSchema,
    sakerMetadata: sakerMetadataClientSchema.array(),
});
