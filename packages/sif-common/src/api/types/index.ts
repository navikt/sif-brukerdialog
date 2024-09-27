import { z } from 'zod';
import {
    arbeidsgivereResponseSchema,
    barnSchema,
    arbeidsgiverFrilansoppdragSchema,
    arbeidsgiverOrganisasjonSchema,
    arbeidsgiverPrivatSchema,
    søkerResponseSchema,
} from '../schemas';

export type Søker = z.infer<typeof søkerResponseSchema>;

export type RegistrertBarn = z.infer<typeof barnSchema>;

export type Arbeidsgivere = z.infer<typeof arbeidsgivereResponseSchema>;

export type ArbeidsgiverOrganisasjon = z.infer<typeof arbeidsgiverOrganisasjonSchema>;

export type ArbeidsgiverPrivat = z.infer<typeof arbeidsgiverPrivatSchema>;

export type ArbeidsgiverFrilansoppdrag = z.infer<typeof arbeidsgiverFrilansoppdragSchema>;

export enum MellomlagringYtelse {
    'DINE_PLEIEPENGER' = 'DINE_PLEIEPENGER',
    'ENDRINGSMELDING_PLEIEPENGER_SYKT_BARN' = 'ENDRINGSMELDING_PLEIEPENGER_SYKT_BARN',
    'ETTERSENDING_OMP' = 'ETTERSENDING_OMP',
    'ETTERSENDING_PLEIEPENGER_LIVETS_SLUTTFASE' = 'ETTERSENDING_PLEIEPENGER_LIVETS_SLUTTFASE',
    'ETTERSENDING_PLEIEPENGER_SYKT_BARN' = 'ETTERSENDING_PLEIEPENGER_SYKT_BARN',
    'ETTERSENDING' = 'ETTERSENDING',
    'OMSORGSDAGER_ALENEOMSORG' = 'OMSORGSDAGER_ALENEOMSORG',
    'OMSORGSPENGER_MIDLERTIDIG_ALENE' = 'OMSORGSPENGER_MIDLERTIDIG_ALENE',
    'OMSORGSPENGER_UTBETALING_ARBEIDSTAKER' = 'OMSORGSPENGER_UTBETALING_ARBEIDSTAKER',
    'OMSORGSPENGER_UTBETALING_SNF' = 'OMSORGSPENGER_UTBETALING_SNF',
    'OMSORGSPENGER_UTVIDET_RETT' = 'OMSORGSPENGER_UTVIDET_RETT',
    'OPPLARINGSPENGER' = 'OPPLARINGSPENGER',
    'PLEIEPENGER_LIVETS_SLUTTFASE' = 'PLEIEPENGER_LIVETS_SLUTTFASE',
    'PLEIEPENGER_SYKT_BARN' = 'PLEIEPENGER_SYKT_BARN',
}
