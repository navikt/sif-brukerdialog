import { innsyn } from '@navikt/k9-sak-innsyn-api';

import { pleietrengendeClientSchema } from './pleietrengendeClientSchema';

export const sakerMetadataClientSchema = innsyn.zSakerMetadataDto.extend({
    pleietrengende: pleietrengendeClientSchema,
});
