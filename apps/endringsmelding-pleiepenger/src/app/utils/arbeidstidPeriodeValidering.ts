import { ISODateRange } from '@navikt/sif-common-utils';

import { ArbeidstidSøknadsdata, Sak } from '../types';

export type UgyldigArbeidstidPeriode = {
    org: string;
    ugyldigPeriode: ISODateRange[];
};

/** Validerer mellomlagrede endringer mot arbeidsukene i K9-saken. Hopper over arbeidsgivere utenfor K9-saken. */
export const getUgyldigeArbeidstidPerioder = (
    arbeidstid: ArbeidstidSøknadsdata | undefined,
    sak: Pick<Sak, 'arbeidsaktiviteter' | 'arbeidsgivereIkkeISak'>,
): UgyldigArbeidstidPeriode[] => {
    if (!arbeidstid) {
        return [];
    }

    return Object.entries(arbeidstid.arbeidsaktivitet).flatMap(([arbeidsaktivitetKey, { endringer }]) => {
        const erArbeidstaker = arbeidsaktivitetKey.startsWith('a_');
        const erFrilanser = arbeidsaktivitetKey === 'frilanser';
        const erSelvstendigNæringsdrivende = arbeidsaktivitetKey === 'selvstendigNæringsdrivende';
        if (!erArbeidstaker && !erFrilanser && !erSelvstendigNæringsdrivende) {
            return [];
        }
        if (Object.keys(endringer).length === 0) {
            return [];
        }

        const erArbeidsgiverIkkeISak =
            erArbeidstaker && sak.arbeidsgivereIkkeISak.some(({ key }) => key === arbeidsaktivitetKey);
        if (erArbeidsgiverIkkeISak) {
            return [];
        }
        const arbeidsaktivitet = erArbeidstaker
            ? sak.arbeidsaktiviteter.arbeidstakerAktiviteter.find(({ key }) => key === arbeidsaktivitetKey)
            : erFrilanser
              ? sak.arbeidsaktiviteter.frilanser
              : sak.arbeidsaktiviteter.selvstendigNæringsdrivende;
        if (!arbeidsaktivitet) {
            return [{ org: arbeidsaktivitetKey.replace(/^a_/, ''), ugyldigPeriode: Object.keys(endringer) }];
        }

        const arbeidsukerResult = Object.assign(
            {},
            ...arbeidsaktivitet.perioderMedArbeidstid.map(({ arbeidsuker }) => arbeidsuker),
        );
        const ugyldigePerioder = Object.keys(endringer).filter((periode) => arbeidsukerResult[periode] === undefined);

        return ugyldigePerioder.length > 0
            ? [
                  {
                      org:
                          'arbeidsgiver' in arbeidsaktivitet
                              ? arbeidsaktivitet.arbeidsgiver.organisasjonsnummer
                              : arbeidsaktivitet.key,
                      ugyldigPeriode: ugyldigePerioder,
                  },
              ]
            : [];
    });
};
