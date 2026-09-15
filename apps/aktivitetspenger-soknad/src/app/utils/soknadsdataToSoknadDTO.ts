import { SøknadApiData } from '@app/types/SoknadApiData';
import { MedlemskapSøknadsdata, Søknadsdata } from '@app/types/Soknadsdata';
import type { aktivitetspenger } from '@navikt/k9-brukerdialog-prosessering-api';
import { Søker } from '@sif/api/k9-prosessering';
import { ISODate } from '@sif/utils';

import { getMedlemskapSynlighet } from '../steps/medlemskap/medlemskapSynlighet';

const getUtenlandsoppholdFromMedlemskap = (
    medlemskap: MedlemskapSøknadsdata,
): aktivitetspenger.UtenlandsoppholdAktivitetspenger[] => {
    const synlig = getMedlemskapSynlighet(medlemskap);
    const utenlandsopphold: aktivitetspenger.UtenlandsoppholdAktivitetspenger[] = synlig.arbeidsstederUtenforNorge
        ? medlemskap.arbeidsstederUtenforNorge?.map((a) => ({
              land: a.land,
              fraOgMed: a.periode.from,
              tilOgMed: a.periode.to,
              jobbetIPerioden: a.jobbetIPerioden,
              utenlandskNasjonalId: a.utenlandskNasjonalId,
          })) || []
        : medlemskap.bostederUtenforNorge?.map((b) => ({
              land: b.land,
              fraOgMed: b.periode.from,
              tilOgMed: b.periode.to,
              jobbetIPerioden: b.jobbetIPerioden,
              utenlandskNasjonalId: b.utenlandskNasjonalId,
          })) || [];
    return utenlandsopphold;
};

export const søknadsdataToSøknadDTO = ({
    søker,
    søknadsdata,
    språk = 'nb',
    kontoInfo,
    startdato,
}: {
    søknadsdata: Søknadsdata;
    søker: Søker;
    språk?: 'nb' | 'nn';
    kontoInfo: aktivitetspenger.KontonummerInfo;
    startdato?: ISODate;
}): Omit<SøknadApiData, 'harBekreftetOpplysninger'> | undefined => {
    const { barn, harForståttRettigheterOgPlikter, medlemskap, kontonummer, bosted } = søknadsdata;

    if (!barn || !harForståttRettigheterOgPlikter || !bosted || !kontonummer || !medlemskap || !startdato) {
        // eslint-disable-next-line no-console
        console.error('Manglende data i søknadsdata');
        return undefined;
    }

    return {
        søkerNorskIdent: søker.fødselsnummer,
        språk,
        barnErRiktig: barn.informasjonStemmer,
        kontonummerInfo: {
            ...kontoInfo,
            kontonummerErRiktig: kontonummer.kontonummerErRiktig,
        },
        medlemskap: {
            harBoddINorge: medlemskap.harBoddINorge,
            harJobbetINorge: medlemskap.harJobbetINorge,
            harJobbetUtenforNorge: medlemskap.harJobbetUtenforNorge,
            utenlandsopphold: getUtenlandsoppholdFromMedlemskap(medlemskap),
        },
        erBosattITrondheim: bosted.erBosattITrondheim,
        startdato: startdato,
        harForståttRettigheterOgPlikter,
    };
};
