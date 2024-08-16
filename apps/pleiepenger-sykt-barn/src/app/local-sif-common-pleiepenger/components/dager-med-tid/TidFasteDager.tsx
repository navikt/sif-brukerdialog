import React from 'react';
import { ISODuration, ISODurationToDuration } from '@navikt/sif-common-utils';
import { Time } from '../../../types/Time';
import { AppIntlShape, AppMessageKeys, AppText, useAppIntl } from '../../../i18n';
import { List } from '@navikt/ds-react';

enum Dager {
    'mandag' = 'mandag',
    'tirsdag' = 'tirsdag',
    'onsdag' = 'onsdag',
    'torsdag' = 'torsdag',
    'fredag' = 'fredag',
}

interface TidFasteDagerType {
    [Dager.mandag]?: ISODuration;
    [Dager.tirsdag]?: ISODuration;
    [Dager.onsdag]?: ISODuration;
    [Dager.torsdag]?: ISODuration;
    [Dager.fredag]?: ISODuration;
}

interface Props {
    fasteDager?: TidFasteDagerType;
}

const formatTime = ({ text }: AppIntlShape, time: Partial<Time>): string => {
    const timer = time.hours || '0';
    const minutter = time.minutes || '0';
    return text('psb.timerOgMinutter', { timer, minutter });
};

const getDagCapsIntlKey = (dag: Dager): AppMessageKeys => {
    switch (dag) {
        case Dager.mandag:
            return 'mandag.caps';
        case Dager.tirsdag:
            return 'tirsdag.caps';
        case Dager.onsdag:
            return 'onsdag.caps';
        case Dager.torsdag:
            return 'torsdag.caps';
        case Dager.fredag:
            return 'fredag.caps';
    }
};

const TidFasteDager: React.FunctionComponent<Props> = ({ fasteDager }) => {
    const appIntl = useAppIntl();
    const { text } = appIntl;

    if (fasteDager) {
        const days = Object.keys(fasteDager).filter((day) => (fasteDager as any)[day] !== undefined) as Dager[];
        if (days.length > 0) {
            return (
                <List>
                    {days.map((day, idx) => {
                        const time = ISODurationToDuration((fasteDager as any)[day]);
                        return (
                            <List.Item key={idx}>
                                {`${text(getDagCapsIntlKey(day))}: ${time ? formatTime(appIntl, time) : 0}`}
                            </List.Item>
                        );
                    })}
                </List>
            );
        }
    }
    return <AppText id="dagerMedTid.ingenDagerRegistrert" />;
};

export default TidFasteDager;
