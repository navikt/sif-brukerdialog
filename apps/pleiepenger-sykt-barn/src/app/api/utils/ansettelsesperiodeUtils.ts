import { ISODate, ISODateToDate } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import { groupBy } from 'lodash';

import { Ansettelsesperiode } from '../getArbeidsgivereRemoteData';

export type AAregOrganisasjon = {
    organisasjonsnummer: string;
    navn: string;
    ansattFom?: ISODate | null;
    ansattTom?: ISODate | null;
    ansettelsesperioder: Ansettelsesperiode[];
};

const sorterPåAnsattFom = (a: AAregOrganisasjon, b: AAregOrganisasjon): number =>
    (a.ansattFom ?? '').localeCompare(b.ansattFom ?? '');

const dagenEtter = (dato: ISODate): string => dayjs(dato).add(1, 'day').format('YYYY-MM-DD');

/** Manglende ansattFom/ansattTom betyr åpen start/slutt, og dekker alt før/etter seg. */
const erSammenhengende = (periode: AAregOrganisasjon, nestePeriode: AAregOrganisasjon): boolean =>
    !periode.ansattTom || !nestePeriode.ansattFom || nestePeriode.ansattFom <= dagenEtter(periode.ansattTom);

const senesteSluttdato = (
    ansattTom: ISODate | null | undefined,
    annenAnsattTom: ISODate | null | undefined,
): ISODate | undefined => {
    if (!ansattTom || !annenAnsattTom) {
        return undefined;
    }
    return ansattTom > annenAnsattTom ? ansattTom : annenAnsattTom;
};

const slåSammenSammenhengendePerioder = (perioder: AAregOrganisasjon[]): AAregOrganisasjon[] => {
    const resultat: AAregOrganisasjon[] = [];
    [...perioder].sort(sorterPåAnsattFom).forEach((periode) => {
        const forrigePeriode = resultat.at(-1);
        if (forrigePeriode && erSammenhengende(forrigePeriode, periode)) {
            forrigePeriode.ansattTom = senesteSluttdato(forrigePeriode.ansattTom, periode.ansattTom);
        } else {
            resultat.push({ ...periode });
        }
    });
    return resultat;
};

const tilAnsettelsesperioder = (perioder: AAregOrganisasjon[]): Ansettelsesperiode[] =>
    perioder.map(({ ansattFom, ansattTom }) => ({
        from: ansattFom ? ISODateToDate(ansattFom) : undefined,
        to: ansattTom ? ISODateToDate(ansattTom) : undefined,
    }));

/**
 * AAreg returnerer én oppføring per ansettelsesperiode. Perioder uten opphold mellom seg
 * slås sammen til én. Er det fortsatt flere perioder igjen for en organisasjon, har bruker
 * hatt ansettelsesforhold med opphold mellom seg, og perioden med tidligste ansattFom brukes.
 */
export const slåSammenAnsettelsesperioder = (
    organisasjoner: AAregOrganisasjon[],
): { organisasjoner: AAregOrganisasjon[]; harDuplikater: boolean } => {
    const perioderPerOrganisasjon = Object.values(
        groupBy(organisasjoner, (organisasjon) => organisasjon.organisasjonsnummer),
    ).map(slåSammenSammenhengendePerioder);

    return {
        /** Sett første periode for hver organisasjon */
        organisasjoner: perioderPerOrganisasjon.map((perioder) => ({
            ...perioder[0],
            ansettelsesperioder: tilAnsettelsesperioder(perioder),
        })),
        /** Har bruker flere perioder for noen organisasjoner? */
        harDuplikater: perioderPerOrganisasjon.some((perioder) => perioder.length > 1),
    };
};
