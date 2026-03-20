import { KontonummerInfo } from '@navikt/k9-brukerdialog-prosessering-api';
import { ForutgåendeBosteder } from '@navikt/k9-brukerdialog-prosessering-api/src/generated/aktivitetspenger';
import { getCountryName, YesOrNo } from '@navikt/sif-common-formik-ds';
import { dateToISODate } from '@navikt/sif-common-utils';

import { SøknadSvar, Spørsmål } from '../../types';
import { SøknadApiData } from '../../types/SøknadApiData';

const isYesOrNoAnswered = (answer?: YesOrNo) => {
    return answer === YesOrNo.YES || answer === YesOrNo.NO;
};

export type HarKontonummerValues = Pick<KontonummerInfo, 'harKontonummer'>;

export enum HarKontonummerEnum {
    JA = 'JA',
    NEI = 'NEI',
    UVISST = 'UVISST',
}

export const getKontonummerApiInfo = (
    kontonummerInfo: KontonummerInfo,
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
    svar,
    søkerNorskIdent,
    kontonummerInfo,
}: {
    svar: SøknadSvar;
    søkerNorskIdent: string;
    kontonummerInfo: KontonummerInfo;
}): Omit<SøknadApiData, 'harBekreftetOpplysninger'> | undefined => {
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

    const harBoddIUtlandetSiste5År = svar[Spørsmål.MEDLEMSKAP] === YesOrNo.YES;
    const bosteder = svar[Spørsmål.MEDLEMSKAP_PERIODER] || [];
    const bosted: ForutgåendeBosteder = {
        harBoddIUtlandetSiste5År,
        utenlandsoppholdSiste5År: harBoddIUtlandetSiste5År
            ? bosteder.map((b) => ({
                  fraOgMed: dateToISODate(b.fom),
                  tilOgMed: dateToISODate(b.tom),
                  landkode: b.landkode,
                  landnavn: getCountryName(b.landkode, 'nb'),
              }))
            : [],
    };

    return {
        språk: 'nb',
        startdato: dateToISODate(new Date()),
        harForståttRettigheterOgPlikter,
        barnErRiktig: svar[Spørsmål.BARN] === YesOrNo.YES,
        kontonummerInfo: kontonummerApiInfo,
        forutgåendeBosteder: bosted,
        søkerNorskIdent,
    };
};
