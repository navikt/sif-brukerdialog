import { getEnvironmentVariable } from '@navikt/sif-common-core-ds/lib/utils/envUtils';
import { Arbeidsgiver } from '../types/Arbeidsgiver';
import { IngenTilgangÅrsak } from '../types/IngenTilgangÅrsak';
import { K9Sak } from '../types/K9Sak';
import { getArbeidsgivereIK9Sak } from './k9SakUtils';

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
            årsak: IngenTilgangÅrsak.harIngenSaker,
        };
    }

    const kanVelgeSak = getEnvironmentVariable('VELG_SAK') === 'on';
    if (saker.length > 1 && kanVelgeSak === false) {
        return {
            kanBrukeSøknad: false,
            årsak: IngenTilgangÅrsak.harMerEnnEnSak,
        };
    }

    if (saker.some((sak) => harArbeidsforholdUtenArbeidstid(sak, arbeidsgivere))) {
        return {
            kanBrukeSøknad: false,
            årsak: IngenTilgangÅrsak.arbeidsforholdUtenArbeidstid,
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

const harArbeidsforholdUtenArbeidstid = (sak: K9Sak, arbeidsgivere: Arbeidsgiver[]) => {
    const arbeidsgivereISak = getArbeidsgivereIK9Sak(arbeidsgivere, sak);
    return arbeidsgivere.some(
        (a) => arbeidsgivereISak.find((aISak) => aISak.organisasjonsnummer === a.organisasjonsnummer) === undefined
    );
};

const harArbeidstidSomSelvstendigNæringsdrivende = (sak: K9Sak) => {
    const { selvstendigNæringsdrivendeArbeidstidInfo: sn } = sak.ytelse.arbeidstid;
    return sn !== undefined && sn.perioder && Object.keys(sn.perioder).length > 0;
};
