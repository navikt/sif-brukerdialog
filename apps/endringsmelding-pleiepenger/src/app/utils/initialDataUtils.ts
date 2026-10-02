import { ISODateToDate, MaybeDateRange } from '@navikt/sif-common-utils';

import { AARegArbeidsgiverOrganisasjon } from '../api/endpoints/arbeidsgivereEndpoint';
import { ArbeidsgiverMedAnsettelseperioder } from '../types';
import { getArbeidsgiverKey } from './arbeidsgiverUtils';

export const getArbeidsgivereFromArbeidsgiverOrganisasjoner = (
    organisasjoner: AARegArbeidsgiverOrganisasjon[],
): ArbeidsgiverMedAnsettelseperioder[] => {
    const aaArbeidsgivereMap = new Map<string, ArbeidsgiverMedAnsettelseperioder>();
    (organisasjoner || []).forEach((a) => {
        const ansettelsesperiode: MaybeDateRange = {
            from: a.ansattFom ? ISODateToDate(a.ansattFom) : undefined,
            to: a.ansattTom ? ISODateToDate(a.ansattTom) : undefined,
        };

        if (aaArbeidsgivereMap.has(a.organisasjonsnummer)) {
            aaArbeidsgivereMap.get(a.organisasjonsnummer)!.ansettelsesperioder.push(ansettelsesperiode);
        } else {
            aaArbeidsgivereMap.set(a.organisasjonsnummer, {
                key: getArbeidsgiverKey(a.organisasjonsnummer),
                organisasjonsnummer: a.organisasjonsnummer,
                navn: a.navn,
                ansettelsesperioder: [ansettelsesperiode],
            });
        }
    });

    return Array.from(aaArbeidsgivereMap.values());
};
