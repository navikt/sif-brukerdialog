import { KontonummerInfo } from '@navikt/k9-brukerdialog-prosessering-api';

export type SøknadApiData = {
    språk: string;
    søkerNorskIdent: string;
    barnErRiktig: boolean;
    kontonummerInfo: KontonummerInfo;
    harBekreftetOpplysninger: boolean;
    harForståttRettigheterOgPlikter: boolean;
};
