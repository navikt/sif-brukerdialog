import { KontonummerInfo, ungdomsytelse } from '@navikt/k9-brukerdialog-prosessering-api';
import { YesOrNo } from '@navikt/sif-common-formik-ds';
import { UtvidetKontonummerInfo } from '@sif/api/ung-deltaker';
import { dateToISODate, ISODate } from '@sif/utils';

import { SøknadSvar, Spørsmål } from '../../types';

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
    svar,
    søkerNorskIdent,
    startdato,
    kontonummerInfo,
}: {
    deltakelseId: string;
    oppgaveReferanse: string;
    svar: SøknadSvar;
    søkerNorskIdent: string;
    startdato: ISODate;
    kontonummerInfo: UtvidetKontonummerInfo;
}): SøknadApiData | undefined => {
    if (svar[Spørsmål.FORSTÅR_PLIKTER] !== true || !isYesOrNoAnswered(svar[Spørsmål.BARN])) {
        return undefined;
    }
    const harForståttRettigheterOgPlikter = svar[Spørsmål.FORSTÅR_PLIKTER] === true;
    const kontonummerApiInfo = getKontonummerApiInfo(kontonummerInfo, svar[Spørsmål.KONTONUMMER]);

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
        barnErRiktig: svar[Spørsmål.BARN] === YesOrNo.YES,
        kontonummerInfo: kontonummerApiInfo,
        søkerNorskIdent,
    };
};
