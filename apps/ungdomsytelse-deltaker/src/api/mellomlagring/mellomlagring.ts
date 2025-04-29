import { MellomlagringControllerService } from '@navikt/k9-brukerdialog-prosessering-api';
import { RegistrertBarn } from '@navikt/sif-common-api';
import { jsonSort } from '@navikt/sif-common-utils';
import hash from 'object-hash';
import { SøknadSvar } from '../../apps/søknad/context/søknadContext';
import { handleApiError } from '@navikt/ung-common';
import { YTELSE } from '../../constants';

type MellomlagringHashInfo = {
    barn: Array<Pick<RegistrertBarn, 'fornavn' | 'fødselsdato'>>;
    kontonummer?: string;
};

const createHashString = (info: MellomlagringHashInfo) => {
    return hash(JSON.stringify(jsonSort(info)));
};

export type MellomlagringDTO = {
    søknad?: SøknadSvar;
    meta?: {
        hash: string;
    };
};

export const createMellomlagringDTO = (
    søknad: SøknadSvar,
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
            hash,
        },
    };
};

export const getMellomlagring = async (): Promise<MellomlagringDTO> => {
    try {
        const { data } = await MellomlagringControllerService.getMellomlagring({ path: { ytelse: YTELSE } });
        return JSON.parse(data);
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
