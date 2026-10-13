import { z } from 'zod';

import {
    arbeidsgivereResponseSchema,
    arbeidsgiverFrilansoppdragSchema,
    arbeidsgiverOrganisasjonSchema,
    arbeidsgiverPrivatSchema,
    barnSchema,
    søkerResponseSchema,
} from '../schemas';

export * from './innsendingType';
export * from './mellomlagringYtelse';

export type Søker = z.infer<typeof søkerResponseSchema>;

export type RegistrertBarn = z.infer<typeof barnSchema>;

export type Arbeidsgivere = z.infer<typeof arbeidsgivereResponseSchema>;

export type ArbeidsgiverOrganisasjon = z.infer<typeof arbeidsgiverOrganisasjonSchema>;

export type ArbeidsgiverPrivat = z.infer<typeof arbeidsgiverPrivatSchema>;

export type ArbeidsgiverFrilansoppdrag = z.infer<typeof arbeidsgiverFrilansoppdragSchema>;
