import { dateFormatter, dateToISODate } from '@navikt/sif-common-utils';

import { Pleietrengende, SakerMetadata } from '../../types';

export interface SakInfo {
    saksnummer: string;
    fagsakYtelseType: string;
    førsteInnsendingTidspunkt?: Date;
    sisteInnsendingTidspunkt?: Date;
}

export interface PleietrengendeMedSaker {
    pleietrengende: Pleietrengende & { navn: string };
    saker: SakerMetadata[];
}

/**
 * Utleder navn på pleietrengende.
 * For anonymiserte: "Pleietrengende født [fødselsdato]"
 * For ikke-anonymiserte: "[fornavn] [etternavn]"
 */
const utledNavn = (pleietrengende: Pleietrengende): string => {
    if (pleietrengende.anonymisert) {
        return `Pleietrengende født ${dateFormatter.compact(pleietrengende.fødselsdato)}`;
    }
    return `${pleietrengende.fornavn} ${pleietrengende.etternavn}`;
};

/**
 * Lager en unik nøkkel for gruppering av pleietrengende.
 * Bruker fødselsdato + navn for ikke-anonymiserte, kun fødselsdato for anonymiserte.
 */
const lagGrupperingsnøkkel = (pleietrengende: SakerMetadata['pleietrengende']): string => {
    const fødselsdato = dateToISODate(pleietrengende.fødselsdato);
    if (pleietrengende.anonymisert) {
        return fødselsdato;
    }
    return `${fødselsdato}-${pleietrengende.fornavn}-${pleietrengende.etternavn}`;
};

/**
 * Grupperer saker på pleietrengende og sorterer sakene med nyeste først.
 */
export const grupperSakerPåPleietrengende = (sakerMetadata: SakerMetadata[]): PleietrengendeMedSaker[] => {
    const gruppertMap = new Map<string, PleietrengendeMedSaker>();

    for (const sak of sakerMetadata) {
        const { pleietrengende, saksnummer, fagsakYtelseType, førsteInnsendingTidspunkt, sisteInnsendingTidspunkt } =
            sak;
        const nøkkel = lagGrupperingsnøkkel(pleietrengende);

        if (!gruppertMap.has(nøkkel)) {
            gruppertMap.set(nøkkel, {
                pleietrengende: { ...pleietrengende, navn: utledNavn(pleietrengende) },
                saker: [],
            });
        }

        gruppertMap.get(nøkkel)!.saker.push({
            saksnummer,
            fagsakYtelseType,
            førsteInnsendingTidspunkt,
            sisteInnsendingTidspunkt,
            pleietrengende,
        });
    }

    // Sorter saker innenfor hver gruppe på sisteInnsendingTidspunkt (nyeste først)
    const resultat = Array.from(gruppertMap.values());

    for (const gruppe of resultat) {
        gruppe.saker.sort((a, b) => {
            const tidA = a.sisteInnsendingTidspunkt?.getTime() ?? 0;
            const tidB = b.sisteInnsendingTidspunkt?.getTime() ?? 0;
            return tidB - tidA;
        });
    }

    return resultat;
};
