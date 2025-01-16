import { ArbeidsgiverOrganisasjon } from '@navikt/sif-common-api';
import { DateRange, MaybeDateRange } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import { Arbeidsgiver } from '../types';
import { getArbeidsgiverKey } from './arbeidsgiverUtils';

export const getPeriodeForArbeidsgiverOppslag = (
    dateRangeAlleSaker: DateRange,
    tillattEndringsperiode: DateRange,
): DateRange | undefined => {
    const dateRange = {
        from: dayjs.max(dayjs(dateRangeAlleSaker.from), dayjs(tillattEndringsperiode.from))!.toDate(),
        to: dayjs.min(dayjs(dateRangeAlleSaker.to), dayjs(tillattEndringsperiode.to))!.toDate(),
    };
    if (dayjs(dateRange.to).isBefore(dateRange.from)) {
        return undefined;
    }
    return dateRange;
};

export const getArbeidsgivereFromArbeidsgiverOrganisasjoner = (
    organisasjoner: ArbeidsgiverOrganisasjon[],
): Arbeidsgiver[] => {
    const aaArbeidsgivereMap = new Map<string, Arbeidsgiver>();
    (organisasjoner || []).forEach((a) => {
        const ansettelsesperiode: MaybeDateRange = {
            from: a.ansattFom ? a.ansattFom : undefined,
            to: a.ansattTom ? a.ansattTom : undefined,
        };

        if (aaArbeidsgivereMap.has(a.organisasjonsnummer)) {
            aaArbeidsgivereMap.get(a.organisasjonsnummer)!.ansettelsesperioder!.push(ansettelsesperiode);
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
