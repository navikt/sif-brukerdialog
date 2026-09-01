import { ISODateRange } from '@navikt/sif-common-utils';

import { ArbeidstidSøknadsdata, Sak } from '../types';

export type UgyldigArbeidstidPeriode = {
    org: string;
    ugyldigPeriode: ISODateRange[];
};

/** Validerer mellomlagrede endringer — hopper over frilans/SN og arbeidsgivere utenfor K9-saken. */
export const getUgyldigeArbeidstidPerioder = (
    arbeidstid: ArbeidstidSøknadsdata | undefined,
    sak: Pick<Sak, 'arbeidsaktiviteter' | 'arbeidsgivereIkkeISak'>,
): UgyldigArbeidstidPeriode[] => {
    if (!arbeidstid) {
        return [];
    }

    return Object.entries(arbeidstid.arbeidsaktivitet).flatMap(([arbeidsaktivitetKey, { endringer }]) => {
        if (!arbeidsaktivitetKey.startsWith('a_')) {
            return [];
        }
        if (Object.keys(endringer).length === 0) {
            return [];
        }

        const erArbeidsgiverIkkeISak = sak.arbeidsgivereIkkeISak.some(({ key }) => key === arbeidsaktivitetKey);
        if (erArbeidsgiverIkkeISak) {
            return [];
        }
        const arbeidsaktivitet = sak.arbeidsaktiviteter.arbeidstakerAktiviteter.find(
            ({ key }) => key === arbeidsaktivitetKey,
        );
        if (!arbeidsaktivitet) {
            return [{ org: arbeidsaktivitetKey.replace(/^a_/, ''), ugyldigPeriode: Object.keys(endringer) }];
        }

        const arbeidsukerResult = Object.assign(
            {},
            ...arbeidsaktivitet.perioderMedArbeidstid.map(({ arbeidsuker }) => arbeidsuker),
        );
        const ugyldigePerioder = Object.keys(endringer).filter((periode) => arbeidsukerResult[periode] === undefined);

        return ugyldigePerioder.length > 0
            ? [{ org: arbeidsaktivitet.arbeidsgiver.organisasjonsnummer, ugyldigPeriode: ugyldigePerioder }]
            : [];
    });
};
