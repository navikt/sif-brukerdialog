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

    if (saker.some((sak) => harArbeidsgiverSomIkkeErISak(sak, arbeidsgivere))) {
        return {
            kanBrukeSøknad: false,
            årsak: IngenTilgangÅrsak.harArbeidsgiverSomIkkeErISak,
        };
    }

    if (saker.some((sak) => harUkjentArbeidsforhold(sak, arbeidsgivere))) {
        return {
            kanBrukeSøknad: false,
            årsak: IngenTilgangÅrsak.harUkjentArbeidsforhold,
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

const harArbeidsgiverSomIkkeErISak = (sak: K9Sak, arbeidsgivere: Arbeidsgiver[]) => {
    const arbeidsgivereISak = getArbeidsgivereIK9Sak(arbeidsgivere, sak);
    return arbeidsgivereISak.some(
        (a) => arbeidsgivereISak.find((aISak) => aISak.organisasjonsnummer === a.organisasjonsnummer) === undefined
    );
};

const harUkjentArbeidsforhold = (sak: K9Sak, arbeidsgivere: Arbeidsgiver[]) => {
    const arbeidsgiverID = (sak.ytelse.arbeidstid.arbeidstakerList || []).map(
        (a) => a.norskIdentitetsnummer || a.organisasjonsnummer
    );
    return arbeidsgiverID.some((id) => arbeidsgivere.find((a) => a.organisasjonsnummer === id) === undefined);
};

const harArbeidstidSomSelvstendigNæringsdrivende = (sak: K9Sak) => {
    const { selvstendigNæringsdrivendeArbeidstidInfo: sn } = sak.ytelse.arbeidstid;
    return sn !== undefined && sn.perioder && Object.keys(sn.perioder).length > 0;
};
