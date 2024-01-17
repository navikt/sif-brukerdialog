import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { InputTime } from '@navikt/sif-common-formik-ds';
import { IntlShape } from 'react-intl';

export const formatTimerOgMinutter = (intl: IntlShape, time: Partial<InputTime>): string => {
    const timer = time.hours || '0';
    const minutter = time.minutes || '0';
    if (minutter === '0') {
        return intlHelper(intl, 'common.timer', { timer });
    }
    if (timer === '0') {
        return intlHelper(intl, 'common.minutter', { minutter });
    }
    return intlHelper(intl, 'common.timerOgMinutter', { timer, minutter });
};
