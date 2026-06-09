import { KontonummerInfo, ungdomsytelse } from '@navikt/k9-brukerdialog-prosessering-api';
import { YesOrNo } from '@sif/rhf';
import { dateToISODate } from '@navikt/sif-common-utils';
import { UtvidetKontonummerInfo } from '@sif/api/ung-deltaker';

import { Søknadsdata } from '../../setup/types/Søknadsdata';

const isYesOrNoAnswered = (answer?: YesOrNo) => {
    return answer === YesOrNo.YES || answer === YesOrNo.NO;
};

export type HarKontonummerValues = Pick<UtvidetKontonummerInfo, 'harKontonummer'>;

export enum HarKontonummerEnum {
    JA = 'JA',
    NEI = 'NEI',
    UVISST = 'UVISST',
}

export type SøknadApiData = Omit<ungdomsytelse.Ungdomsytelsesøknad, 'harBekreftetOpplysninger' | 'kontonummerErRiktig'>;

export const getKontonummerApiInfo = (
    kontonummerInfo: UtvidetKontonummerInfo,
    kontonummerErRiktigSvar?: YesOrNo,
): KontonummerInfo | undefined => {
    switch (kontonummerInfo.harKontonummer) {
        case 'UVISST':
            return {
                harKontonummer: 'UVISST',
            };
        case 'JA':
            if (!isYesOrNoAnswered(kontonummerErRiktigSvar)) {
                return undefined;
            }
            return {
                harKontonummer: 'JA',
                kontonummerFraRegister: kontonummerInfo.kontonummerFraRegister,
                kontonummerErRiktig: kontonummerErRiktigSvar === YesOrNo.YES,
            };
        case 'NEI':
            return {
                harKontonummer: 'NEI',
            };
    }
};

export const buildSøknadFromSvar = ({
    deltakelseId,
    oppgaveReferanse,
    søknadsdata,
    søkerNorskIdent,
    startdato,
    kontonummerInfo,
}: {
    deltakelseId: string;
    oppgaveReferanse: string;
    søknadsdata: Søknadsdata;
    søkerNorskIdent: string;
    startdato: Date;
    kontonummerInfo: UtvidetKontonummerInfo;
}): SøknadApiData | undefined => {
    if (søknadsdata.harForståttRettigheterOgPlikter !== true || søknadsdata.barn?.barnStemmer === undefined) {
        return undefined;
    }
    const harForståttRettigheterOgPlikter = true;
    const kontonummerApiInfo = getKontonummerApiInfo(kontonummerInfo, søknadsdata.kontonummer?.kontonummerErRiktig);

    if (!kontonummerApiInfo) {
        // eslint-disable-next-line no-console
        console.error('Kontonummer info is missing or invalid');
        return undefined;
    }

    return {
        deltakelseId,
        oppgaveReferanse,
        språk: 'nb',
        startdato: dateToISODate(startdato),
        harForståttRettigheterOgPlikter,
        barnErRiktig: søknadsdata.barn.barnStemmer === YesOrNo.YES,
        kontonummerInfo: kontonummerApiInfo,
        søkerNorskIdent,
    };
};
