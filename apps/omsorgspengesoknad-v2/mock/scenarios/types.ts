import { zBarnOppslag, zSøker } from '@sif/k9-brukerdialog-prosessering-api';
import { z } from 'zod';

export enum ScenarioType {
    default = 'default',
    ingenRegistrerteBarn = 'ingenRegistrerteBarn',
    toBarnMedVedtak = 'toBarnMedVedtak',
    barnMedTidsavgrensetVedtak = 'barnMedTidsavgrensetVedtak',
    innsendingFeiler = 'innsendingFeiler',
    innsendingFeilerMedUgyldigeParametre = 'innsendingFeilerMedUgyldigeParametre',
    vedleggMangler = 'vedleggMangler',
}

interface InnsendingResponse {
    status: number;
    body?: Record<string, unknown>;
}

export interface ScenarioData {
    søker: z.infer<typeof zSøker>;
    barn: { barn: Array<z.infer<typeof zBarnOppslag>> };
    mellomlagring?: Record<string, unknown>;
    innsendingResponse?: InnsendingResponse;
    /** Alle vedlegg rapporteres som manglende i backend */
    vedleggMangler?: boolean;
    vedtakPerAktørId?: Record<
        string,
        {
            harInnvilgedeBehandlinger: boolean;
            saksnummer: string | null;
            vedtaksdato: string | null;
            førsteMuligeSøknadsdato?: string | null;
            vedtakTomDato?: string | null;
        }
    >;
}
