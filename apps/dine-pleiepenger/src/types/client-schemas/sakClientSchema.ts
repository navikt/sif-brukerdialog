import { innsyn } from '@navikt/k9-sak-innsyn-api';
import z from 'zod';

import { BehandlingStatus } from '../';
import { dokumentClientSchema } from './dokumentClientSchema';
import { innsendelseISakClientSchema } from './innsendelseISakClientSchema';
import {
    zDateFromISODateString,
    zOptionalDateFromDateTimeString,
    zOptionalDateFromISODateString,
} from './zDateFromString';

/** Aksjonspunkt */
export const aksjonspunktClientSchema = innsyn.zAksjonspunktDto.extend({
    tidsfrist: zOptionalDateFromDateTimeString,
    venteårsak: z.enum(innsyn.Venteårsak),
});

/** Utledet status */
export const utledetStatusClientSchema = innsyn.zUtledetStatus.extend({
    status: z.enum(BehandlingStatus),
    aksjonspunkter: z.array(aksjonspunktClientSchema),
    saksbehandlingsFrist: zOptionalDateFromISODateString,
});

/** Behandling */
export const behandlingClientSchema = innsyn.zBehandlingDto
    .extend({
        opprettetTidspunkt: zDateFromISODateString,
        avsluttetTidspunkt: zOptionalDateFromDateTimeString,
        innsendelser: z.array(innsendelseISakClientSchema),
        utgåendeDokumenter: z.array(dokumentClientSchema),
        aksjonspunkter: z.array(aksjonspunktClientSchema),
    })
    .omit({
        utgåendeDokumenter: true,
    });

/** Sak */
export const sakClientSchema = innsyn.zSakDto.extend({
    utledetStatus: utledetStatusClientSchema,
    saksbehandlingsFrist: zOptionalDateFromISODateString,
    behandlinger: z.array(behandlingClientSchema),
});
