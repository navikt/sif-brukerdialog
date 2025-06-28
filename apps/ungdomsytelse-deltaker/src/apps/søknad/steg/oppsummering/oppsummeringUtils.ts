import { Ungdomsytelsesøknad } from '@navikt/k9-brukerdialog-prosessering-api';
import { YesOrNo } from '@navikt/sif-common-formik-ds';
import { dateToISODate } from '@navikt/sif-common-utils';
import { Spørsmål, SøknadSvar } from '../../types';
import { formaterKontonummer } from '../../utils/formaterKontonummer';

const isYesOrNoAnswered = (answer?: YesOrNo) => {
    return answer === YesOrNo.YES || answer === YesOrNo.NO;
};

export const buildSøknadFromSvar = (
    deltakelseId: string,
    oppgaveReferanse: string,
    svar: SøknadSvar,
    søkerNorskIdent: string,
    startdato: Date,
    kontonummerFraRegister?: string,
): Omit<Ungdomsytelsesøknad, 'harBekreftetOpplysninger'> | undefined => {
    const harKontonummer = !!kontonummerFraRegister;
    if (
        svar[Spørsmål.FORSTÅR_PLIKTER] !== true ||
        !isYesOrNoAnswered(svar[Spørsmål.BARN]) ||
        (harKontonummer && !isYesOrNoAnswered(svar[Spørsmål.KONTONUMMER]))
    ) {
        return undefined;
    }

    const harForståttRettigheterOgPlikter = svar[Spørsmål.FORSTÅR_PLIKTER] === true;

    return {
        deltakelseId,
        oppgaveReferanse,
        språk: 'nb',
        startdato: dateToISODate(startdato),
        harForståttRettigheterOgPlikter,
        barnErRiktig: svar[Spørsmål.BARN] === YesOrNo.YES,
        kontonummerErRiktig: harKontonummer ? svar[Spørsmål.KONTONUMMER] === YesOrNo.YES : undefined,
        søkerNorskIdent,
        kontonummerFraRegister: kontonummerFraRegister ? formaterKontonummer(kontonummerFraRegister) : undefined,
    };
};
