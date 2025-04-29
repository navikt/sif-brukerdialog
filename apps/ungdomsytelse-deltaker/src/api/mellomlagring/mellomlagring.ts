import { MellomlagringControllerService } from '@navikt/k9-brukerdialog-prosessering-api';
import { RegistrertBarn } from '@navikt/sif-common-api';
import { jsonSort } from '@navikt/sif-common-utils';
import hash from 'object-hash';
import { SøknadSvar } from '../../apps/søknad/context/søknadContext';
import { handleApiError } from '@navikt/ung-common';
import { YTELSE } from '../../constants';
import { SkjemaSteg } from '../../apps/søknad/types/Steg';
import { z } from 'zod';
import { YesOrNo } from '@navikt/sif-common-core-ds/src';

type MellomlagringHashInfo = {
    barn: Array<Pick<RegistrertBarn, 'fornavn' | 'fødselsdato'>>;
    kontonummer?: string;
};

const createHashString = (info: MellomlagringHashInfo) => {
    return hash(JSON.stringify(jsonSort(info)));
};

export const zMellomlagringSchema = z.object({
    søknad: z.object({
        bekrefter: z.boolean().optional(),
        oppstart: z.nativeEnum(YesOrNo).optional(),
        barn: z.nativeEnum(YesOrNo).optional(),
        kontonummer: z.nativeEnum(YesOrNo).optional(),
    }),
    meta: z.object({
        aktivtSteg: z.nativeEnum(SkjemaSteg),
        hash: z.string(),
    }),
});

export type MellomlagringDTO = z.infer<typeof zMellomlagringSchema>;

export const createMellomlagringDTO = (
    søknad: SøknadSvar,
    aktivtSteg: SkjemaSteg,
    registrerteBarn: RegistrertBarn[],
    kontonummer?: string,
): MellomlagringDTO => {
    const barn = registrerteBarn.map((b) => ({
        fornavn: b.fornavn,
        fødselsdato: b.fødselsdato,
    }));
    const hash = createHashString({ barn, kontonummer });
    return {
        søknad,
        meta: {
            aktivtSteg,
            hash,
        },
    };
};

export const getMellomlagring = async (): Promise<MellomlagringDTO> => {
    try {
        const { data } = await MellomlagringControllerService.getMellomlagring({ path: { ytelse: YTELSE } });
        return typeof data === 'string' ? JSON.parse(data) : data;
    } catch (e) {
        throw handleApiError(e, 'getMellomlagring');
    }
};

export const deleteMellomlagring = async (): Promise<void> => {
    try {
        await MellomlagringControllerService.deleteMellomlagring({ path: { ytelse: YTELSE } });
    } catch (e) {
        throw handleApiError(e, 'deleteMellomlagring');
    }
};

export const createMellomlagring = async (body: MellomlagringDTO): Promise<void> => {
    try {
        await MellomlagringControllerService.createMellomlagring({
            path: { ytelse: YTELSE },
            body,
        });
    } catch (e) {
        throw handleApiError(e, 'createMellomlagring');
    }
};

export const updateMellomlagring = async (body: MellomlagringDTO): Promise<void> => {
    try {
        await MellomlagringControllerService.updateMellomlagring({
            path: { ytelse: YTELSE },
            body,
        });
    } catch (e) {
        throw handleApiError(e, 'updateMellomlagring');
    }
};
