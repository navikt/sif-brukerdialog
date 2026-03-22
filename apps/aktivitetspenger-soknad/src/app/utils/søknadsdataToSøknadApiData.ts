import { dateToISODate } from '@navikt/sif-common-utils';
import { Søker } from '@sif/api';

import { KontoInfo } from '../types/KontoInfo';
import { SøknadApiData } from '../types/SøknadApiData';
import { Søknadsdata } from '../types/Søknadsdata';

export const getSøknadApiDataFromSøknad = ({
    søker,
    søknadsdata,
    språk = 'nb',
    kontoInfo,
}: {
    søknadsdata: Søknadsdata;
    søker: Søker;
    språk?: 'nb' | 'nn';
    kontoInfo: KontoInfo;
}): Omit<SøknadApiData, 'harBekreftetOpplysninger'> => {
    const { barn, harForståttRettigheterOgPlikter, bostedUtland, kontonummer, bosted } = søknadsdata;

    if (!barn || !harForståttRettigheterOgPlikter || !bosted || !kontonummer || !bostedUtland) {
        throw new Error('Manglende data i søknadsdata');
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
        startdato: dateToISODate(new Date()),
        harForståttRettigheterOgPlikter,
    };
};
