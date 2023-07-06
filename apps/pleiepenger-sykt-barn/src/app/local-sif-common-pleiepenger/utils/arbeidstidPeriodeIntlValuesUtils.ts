import { IntlShape } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { dateFormatter } from '@navikt/sif-common-utils';
import { DateRange } from '@navikt/sif-common-utils/lib';
import { ArbeidIPeriodeIntlValues } from '../types';

export const getArbeidstidIPeriodeIntlValues = (
    intl: IntlShape,
    info: {
        periode: DateRange;
        jobberNormaltTimer: number;
        arbeidsgiverNavn?: string;
    }
): ArbeidIPeriodeIntlValues => {
    return {
        arbeidsgiverNavn: info.arbeidsgiverNavn,
        timer: intlHelper(intl, 'arbeidstidPeriode.timer', { timer: info.jobberNormaltTimer }),
        fra: dateFormatter.full(info.periode.from),
        til: dateFormatter.full(info.periode.to),
    };
};
