import { getEnvironmentVariable } from '@navikt/sif-common-core-ds/lib/utils/envUtils';
import { Arbeidsgiver } from '../types/Arbeidsgiver';
import { IngenTilgangÅrsak } from '../types/IngenTilgangÅrsak';
import { K9Sak, K9SakArbeidstaker } from '../types/K9Sak';

type TilgangNektet = {
    kanBrukeSøknad: false;
    årsak: IngenTilgangÅrsak;
};

type TilgangTillatt = {
    kanBrukeSøknad: true;
};

type TilgangKontrollResultet = TilgangNektet | TilgangTillatt;

export const tilgangskontroll = (saker: K9Sak[], arbeidsgivere: Arbeidsgiver[]): TilgangKontrollResultet => {
    if (saker.length === 0) {
        return {
            kanBrukeSøknad: false,
            årsak: IngenTilgangÅrsak.harIngenSak,
        };
    }

    const kanVelgeSak = getEnvironmentVariable('VELG_SAK') === 'on';
    if (saker.length > 1 && kanVelgeSak === false) {
        return {
            kanBrukeSøknad: false,
            årsak: IngenTilgangÅrsak.harMerEnnEnSak,
        };
    }

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
        return erArbeidsgiverISak(arbeidsgiver, arbeidsaktiviteter) === false;
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

const getArbeidsaktivitetId = (arbeidsaktivitet: K9SakArbeidstaker): string => {
    return arbeidsaktivitet.norskIdentitetsnummer || arbeidsaktivitet.organisasjonsnummer;
};

const erArbeidsgiverISak = (arbeidsgiver: Arbeidsgiver, arbeidsgivereISak: K9SakArbeidstaker[]): boolean => {
    return arbeidsgivereISak.map(getArbeidsaktivitetId).some((id) => id === arbeidsgiver.organisasjonsnummer);
};

const harArbeidstidSomSelvstendigNæringsdrivende = (sak: K9Sak) => {
    const { selvstendigNæringsdrivendeArbeidstidInfo: sn } = sak.ytelse.arbeidstid;
    return sn !== undefined && sn.perioder && Object.keys(sn.perioder).length > 0;
};
export const tilgangskontrollUtils = {
    harArbeidsgiverUtenArbeidstakerK9Sak: harArbeidsgiverUtenArbeidsaktivitet,
    harArbeidstakerISakUtenArbeidsforhold: harArbeidsaktivitetUtenArbeidsgiver,
};
