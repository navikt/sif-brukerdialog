import { IngenTilgangÅrsak, K9Sak } from '@app/types';
import { DateRange } from '@navikt/sif-common-utils';

export type TilgangAvslag = {
    kanBruke: false;
    årsak: IngenTilgangÅrsak[];
};

export type TilgangTillatt = {
    kanBruke: true;
};

export type TilgangResultat = TilgangAvslag | TilgangTillatt;

/**
 * Resultat av fase 1 (sak-nivå). Når saken kan brukes, returneres også perioden
 * arbeidsgivere skal hentes for. Oppslagsperioden er en del av regelsettet, ikke
 * noe kalleren skal utlede selv — da vil frontend og backend uunngåelig sprike.
 */
export type SakVurdering =
    | TilgangAvslag
    | {
          kanBruke: true;
          sak: K9Sak;
          oppslagsperiode: DateRange;
      };
