import { DateRange } from '@navikt/sif-common-formik-ds';
import dayjs from 'dayjs';
import { ArbeidSelvstendigSøknadsdata } from '../../../../types/søknadsdata/ArbeidSelvstendigSøknadsdata';

/**
 *
 * @param periode
 * @param frilans_startdato
 * @param frilans_sluttdato
 * @param frilans_jobberFortsattSomFrilans
 * @returns DateRange
 *
 * Avkort periode med startdato for virksomhet
 * Returnerer undefined hvis start er etter periodes start
 */

export const getPeriodeSomSelvstendigInnenforPeriode = (
    periode: DateRange,
    arbeidSelvstendigSøknadsdata?: ArbeidSelvstendigSøknadsdata,
): DateRange | undefined => {
    if (arbeidSelvstendigSøknadsdata && arbeidSelvstendigSøknadsdata.type === 'erSN') {
        const virksomhet = arbeidSelvstendigSøknadsdata.virksomhet;
        if (virksomhet === undefined || dayjs(virksomhet.fom).isAfter(periode.to, 'day')) {
            return undefined;
        }
        return {
            from: dayjs.max([dayjs(periode.from), dayjs(virksomhet.fom)])!.toDate(),
            to: periode.to,
        };
    }
};
