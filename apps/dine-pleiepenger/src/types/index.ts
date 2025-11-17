import { innsyn } from '@navikt/k9-sak-innsyn-api';
import z from 'zod';

import { dokumentClientSchema } from './client-schemas/dokumentClientSchema';
import {
    innsendelseISakClientSchema,
    pleiepengerSøknadInnsendelseSchema,
} from './client-schemas/innsendelseISakClientSchema';
import { innsynsdataClientSchema } from './client-schemas/innsynsdataClientSchema';
import { InntektsmeldingerSchema, InntektsmeldingSchema } from './client-schemas/inntektsmeldingClientSchema';
import { pleietrengendeClientSchema } from './client-schemas/pleietrengendeClientSchema';
import { pleietrengendeMedSakClientSchema } from './client-schemas/pleietrengendeMedSakClientSchema';
import {
    aksjonspunktClientSchema,
    behandlingClientSchema,
    sakClientSchema,
    utledetStatusClientSchema,
} from './client-schemas/sakClientSchema';
import { sakerMetadataClientSchema } from './client-schemas/sakerMetadataClientSchema';
import { sakMedInntektsmeldingerClientSchema } from './client-schemas/sakMedInntektsmeldingerClientSchema';
import { søkerClientSchema } from './client-schemas/søkerClientSchema';

export type PleietrengendeMedSak = z.infer<typeof pleietrengendeMedSakClientSchema>;
export type Pleietrengende = z.infer<typeof pleietrengendeClientSchema>;
export type Inntektsmelding = z.infer<typeof InntektsmeldingSchema>;
export type Inntektsmeldinger = z.infer<typeof InntektsmeldingerSchema>;
export type UtledetStatus = z.infer<typeof utledetStatusClientSchema>;
export type Aksjonspunkt = z.infer<typeof aksjonspunktClientSchema>;
export type Dokument = z.infer<typeof dokumentClientSchema>;
export type InnsendelseISak = z.infer<typeof innsendelseISakClientSchema>;
export type PleiepengersøknadInnsendelse = z.infer<typeof pleiepengerSøknadInnsendelseSchema>;
export type Behandling = z.infer<typeof behandlingClientSchema>;
export type Sak = z.infer<typeof sakClientSchema>;
export type SakerMetadata = z.infer<typeof sakerMetadataClientSchema>;
export type SakMedInntektsmeldinger = z.infer<typeof sakMedInntektsmeldingerClientSchema>;
export type Søker = z.infer<typeof søkerClientSchema>;
export type Organisasjon = z.infer<typeof innsyn.zOrganisasjon>;
export type Innsynsdata = z.infer<typeof innsynsdataClientSchema>;

export type { SaksbehandlingtidDto as Saksbehandlingstid } from '@navikt/k9-sak-innsyn-api/src/generated/innsyn';
export { BehandlingStatus, Venteårsak } from '@navikt/k9-sak-innsyn-api/src/generated/innsyn';
export { InntektsmeldingStatusDto as InntektsmeldingStatus } from '@navikt/k9-sak-innsyn-api/src/generated/innsyn/types.gen';
