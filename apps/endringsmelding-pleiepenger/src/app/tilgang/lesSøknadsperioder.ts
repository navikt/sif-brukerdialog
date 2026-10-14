import { DateRange, isISODateRange,ISODateRangeToDateRange } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';

/**
 * Leser kun søknadsperiodene fra en rå sak i k9-format.
 *
 * Bevisst uavhengig av verifyK9Format. Den fulle valideringen kaster på første
 * feil den finner, og sjekker barn før ytelse — en sak med feil i barn-objektet
 * får derfor aldri lest periodene sine. Uten denne funksjonen må alle saker med
 * ugyldig format behandles som aktuelle, også de som er for gamle til å kunne
 * endres uansett.
 *
 * Kaster ikke. Returnerer undefined når periodene ikke kan leses trygt.
 */
export const lesSøknadsperioder = (sak: unknown): DateRange[] | undefined => {
    const søknadsperiode = (sak as any)?.søknad?.ytelse?.søknadsperiode;

    if (!Array.isArray(søknadsperiode) || søknadsperiode.length === 0) {
        return undefined;
    }
    if (!søknadsperiode.every((periode) => typeof periode === 'string' && isISODateRange(periode))) {
        return undefined;
    }
    return søknadsperiode.map(ISODateRangeToDateRange);
};

/**
 * Sann når ingen av søknadsperiodene strekker seg inn i endringsperioden.
 *
 * Dette er den ene definisjonen av «eldre sak». Kalleren bruker den til å dele
 * sakene i to bøtter — aktuelle og eldre — før vurderSaker kjøres. Eldre saker
 * blokkerer ikke, de teller heller ikke med når vi vurderer om bruker har flere
 * saker.
 *
 * En sak uten søknadsperioder er ikke eldre. Den er mangelfull, og skal få sin
 * egen årsak (harIngenPerioder) i stedet for å forsvinne i eldre-bøtta.
 */
export const erSakEldreEnnEndringsperiode = (
    søknadsperioder: DateRange[],
    tillattEndringsperiode: DateRange,
): boolean =>
    søknadsperioder.length > 0 &&
    søknadsperioder.every((periode) => dayjs(periode.to).isBefore(tillattEndringsperiode.from, 'day'));
