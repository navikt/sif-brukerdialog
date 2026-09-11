import { KontonummerInfo } from '@navikt/k9-brukerdialog-prosessering-api';
import { Søker } from '@sif/api/k9-prosessering';
import { ISODate } from '@sif/utils';

import { SøknadApiData } from '@app/types/SoknadApiData';
import { Søknadsdata } from '@app/types/Soknadsdata';

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
    kontoInfo: KontonummerInfo;
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
        forutgåendeBosteder: {
            harBoddIUtlandetSiste5År: false,
            utenlandsoppholdSiste5År: [],
        },
        medlemskap: {
            harBoddINorge: medlemskap.harBoddINorge,
            harJobbetINorge: medlemskap.harJobbetINorge,
            harJobbetUtenforNorge: medlemskap.harJobbetUtenforNorge,
            arbeidsstederUtenforNorge: medlemskap.arbeidsstederUtenforNorge?.map((a) => ({
                landkode: a.landkode,
                landnavn: a.landnavn,
                fraOgMed: a.periode.from,
                tilOgMed: a.periode.to,
                jobbetIPerioden: a.jobbetIPerioden,
                identitetsnummer: a.identitetsnummer,
            })),
            bostederUtenforNorge: medlemskap.bostederUtenforNorge?.map((b) => ({
                landkode: b.landkode,
                landnavn: b.landnavn,
                fraOgMed: b.periode.from,
                tilOgMed: b.periode.to,
                jobbetIPerioden: b.jobbetIPerioden,
                identitetsnummer: b.identitetsnummer,
            })),
        },
        erBosattITrondheim: bosted.erBosattITrondheim,
        startdato: startdato,
        harForståttRettigheterOgPlikter,
    };
};
