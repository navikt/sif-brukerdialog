import { IntlShape } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';

interface InputType {
    hours: string;
    minutes: string;
}

export const formatTimerOgMinutter = (intl: IntlShape, time: Partial<InputType>): string => {
    const timer = time.hours || '0';
    const minutter = time.minutes || '0';
    if (minutter === '0') {
        return intlHelper(intl, 'psb.timer', { timer });
    }
    if (timer === '0') {
        return intlHelper(intl, 'psb.minutter', { minutter });
    }
    return intlHelper(intl, 'psb.timerOgMinutter', { timer, minutter });
};
