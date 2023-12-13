import React from 'react';
import { IntlShape, useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { InputTime } from '@navikt/sif-common-formik-ds/lib';

export const formatTimerOgMinutter = (intl: IntlShape, time: Partial<InputTime>): string => {
    const timer = time.hours || '0';
    const minutter = time.minutes || '0';
    if (minutter === '0') {
        return intlHelper(intl, 'timer', { timer });
    }
    if (timer === '0') {
        return intlHelper(intl, 'minutter', { minutter });
    }
    return intlHelper(intl, 'timerOgMinutter', { timer, minutter });
};

interface Props {
    timer?: string | number;
    minutter?: string | number;
}

const TimerOgMinutter: React.FunctionComponent<Props> = ({ timer, minutter }) => {
    const intl = useIntl();
    const numTimer = parseInt(`${timer}`, 10);
    const numMinutter = minutter ? parseInt(`${minutter}`, 10) : 0;
    return <span>{formatTimerOgMinutter(intl, { hours: `${numTimer}`, minutes: `${numMinutter}` })}</span>;
};

export default TimerOgMinutter;
