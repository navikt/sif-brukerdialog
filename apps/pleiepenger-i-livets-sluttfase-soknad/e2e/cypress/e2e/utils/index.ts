import dayjs = require('dayjs');
import { DateRange } from '@navikt/sif-common-utils';
const testDate = dayjs('2023-10-04').toDate();

export const setDate = () => {
    cy.clock(testDate);
};

export const getTilgjengeligEndringsperiode = (): DateRange => {
    return {
        from: dayjs(testDate).startOf('month').subtract(3, 'months').toDate(),
        to: dayjs().add(4, 'weeks').toDate(),
    };
};
