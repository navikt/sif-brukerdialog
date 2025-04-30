import { MellomlagringControllerService } from '@navikt/k9-brukerdialog-prosessering-api';
import { RegistrertBarn } from '@navikt/sif-common-api';
import { YesOrNo } from '@navikt/sif-common-core-ds/src';
import { jsonSort } from '@navikt/sif-common-utils';
import { handleApiError } from '@navikt/ung-common';
import hash from 'object-hash';
import { z } from 'zod';
import { SøknadSvar } from '../../apps/søknad/context/søknadContext';
import { YTELSE } from '../../constants';
import { Steg } from '../../apps/søknad/types/Steg';

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
        aktivtSteg: z.nativeEnum(Steg),
        hash: z.string(),
    }),
});

export type MellomlagringDTO = z.infer<typeof zMellomlagringSchema>;

export const createMellomlagringDTO = (
    søknad: SøknadSvar,
    aktivtSteg: Steg,
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

export const getGyldigMellomlagring = (mellomlagring: MellomlagringDTO | undefined): MellomlagringDTO | undefined => {
    const result = zMellomlagringSchema.safeParse(mellomlagring);
    if (result.success) {
        return result.data;
    } else {
        return undefined;
    }
};
