import { KontonummerInfo } from '@navikt/k9-brukerdialog-prosessering-api';
import { dateToISODate } from '@navikt/sif-common-utils';
import { Søker } from '@sif/api/k9-prosessering';

import { SøknadApiData } from '../types/SoknadApiData';
import { Søknadsdata } from '../types/Soknadsdata';

export const søknadsdataToSøknadDTO = ({
    søker,
    søknadsdata,
    språk = 'nb',
    kontoInfo,
}: {
    søknadsdata: Søknadsdata;
    søker: Søker;
    språk?: 'nb' | 'nn';
    kontoInfo: KontonummerInfo;
}): Omit<SøknadApiData, 'harBekreftetOpplysninger'> | undefined => {
    const { barn, harForståttRettigheterOgPlikter, bostedUtland, kontonummer, bosted, startdato } = søknadsdata;

    if (!barn || !harForståttRettigheterOgPlikter || !bosted || !kontonummer || !bostedUtland || !startdato) {
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
            harBoddIUtlandetSiste5År: bostedUtland.harBoddIUtlandetSiste5år,
            utenlandsoppholdSiste5År: (bostedUtland.bosteder || []).map((b) => ({
                fraOgMed: dateToISODate(b.periode.from),
                tilOgMed: dateToISODate(b.periode.to),
                landkode: b.landkode,
                landnavn: b.landnavn,
            })),
        },
        erBosattITrondheim: bosted.erBosattITrondheim,
        startdato: startdato.startdato,
        harForståttRettigheterOgPlikter,
    };
};
