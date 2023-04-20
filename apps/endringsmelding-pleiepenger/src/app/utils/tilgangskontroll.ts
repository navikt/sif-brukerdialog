import { DateRange } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { Arbeidsgiver } from '../types/Arbeidsgiver';
import { IngenTilgangÅrsak } from '../types/IngenTilgangÅrsak';
import { K9Sak, K9SakArbeidstaker } from '../types/K9Sak';
import { getSamletDateRangeForK9Saker } from './k9SakUtils';

dayjs.extend(isSameOrAfter);

type TilgangNektet = {
    kanBrukeSøknad: false;
    årsak: IngenTilgangÅrsak;
};

type TilgangTillatt = {
    kanBrukeSøknad: true;
};

export type TilgangKontrollResultat = TilgangNektet | TilgangTillatt;

export const tilgangskontroll = (
    saker: K9Sak[],
    arbeidsgivere: Arbeidsgiver[],
    tillattEndringsperiode: DateRange
): TilgangKontrollResultat => {
    /** Har ingen saker */
    if (saker.length === 0) {
        return {
            kanBrukeSøknad: false,
            årsak: IngenTilgangÅrsak.harIngenSak,
        };
    }

    /** Har flere saker */
    if (saker.length > 1) {
        return {
            kanBrukeSøknad: false,
            årsak: IngenTilgangÅrsak.harMerEnnEnSak,
        };
    }

    /** Har én sak, men søknadsperiode er før tillatt endringsperiode */
    if (!harSøknadsperiodeInnenforTillattEndringsperiode(getSamletDateRangeForK9Saker(saker), tillattEndringsperiode)) {
        return {
            kanBrukeSøknad: false,
            årsak: IngenTilgangÅrsak.søknadsperioderUtenforTillattEndringsperiode,
        };
    }
    /**
     * Bruker har arbeidsgiver i aareg som ikke har informasjon i sak
     */
    if (
        saker.some((sak) => harArbeidsgiverUtenArbeidsaktivitet(arbeidsgivere, sak.ytelse.arbeidstid.arbeidstakerList))
    ) {
        return {
            kanBrukeSøknad: false,
            årsak: IngenTilgangÅrsak.harArbeidsgiverUtenArbeidsaktivitet,
        };
    }

    if (
        saker.some((sak) => harArbeidsaktivitetUtenArbeidsgiver(sak.ytelse.arbeidstid.arbeidstakerList, arbeidsgivere))
    ) {
        return {
            kanBrukeSøknad: false,
            årsak: IngenTilgangÅrsak.harArbeidsaktivitetUtenArbeidsgiver,
        };
    }

    if (saker.some((sak) => harArbeidstidSomSelvstendigNæringsdrivende(sak))) {
        return {
            kanBrukeSøknad: false,
            årsak: IngenTilgangÅrsak.harArbeidstidSomSelvstendigNæringsdrivende,
        };
    }

    return {
        kanBrukeSøknad: true,
    };
};

const harArbeidsgiverUtenArbeidsaktivitet = (
    arbeidsgivere: Arbeidsgiver[],
    arbeidsaktiviteter: K9SakArbeidstaker[] = []
): boolean => {
    return arbeidsgivere.some((arbeidsgiver) => {
        return finnesArbeidsgiverISak(arbeidsgiver, arbeidsaktiviteter) === false;
    });
};

const harArbeidsaktivitetUtenArbeidsgiver = (
    arbeidsaktiviteter: K9SakArbeidstaker[] = [],
    arbeidsgivere: Arbeidsgiver[]
) => {
    return arbeidsaktiviteter
        .map(getArbeidsaktivitetId)
        .some((id) => arbeidsgivere.some((aISak) => aISak.organisasjonsnummer === id) === false);
};

const finnesArbeidsgiverISak = (arbeidsgiver: Arbeidsgiver, arbeidsgivereISak: K9SakArbeidstaker[]): boolean => {
    return arbeidsgivereISak.map(getArbeidsaktivitetId).some((id) => id === arbeidsgiver.organisasjonsnummer);
};

const harArbeidstidSomSelvstendigNæringsdrivende = (sak: K9Sak) => {
    const { selvstendigNæringsdrivendeArbeidstidInfo: sn } = sak.ytelse.arbeidstid;
    return sn !== undefined && sn.perioder && Object.keys(sn.perioder).length > 0;
};

const getArbeidsaktivitetId = (arbeidsaktivitet: K9SakArbeidstaker): string => {
    return arbeidsaktivitet.norskIdentitetsnummer || arbeidsaktivitet.organisasjonsnummer;
};

const harSøknadsperiodeInnenforTillattEndringsperiode = (
    samletSøknadsperiode: DateRange | undefined,
    tillattEndringsperiode: DateRange
): boolean => {
    return samletSøknadsperiode
        ? dayjs(samletSøknadsperiode.to).isSameOrAfter(tillattEndringsperiode.from, 'day')
        : false;
};

export const tilgangskontrollUtils = {
    harArbeidsgiverUtenArbeidsaktivitet,
    harArbeidsaktivitetUtenArbeidsgiver,
    harSøknadsperiodeInnenforTillattEndringsperiode,
};
