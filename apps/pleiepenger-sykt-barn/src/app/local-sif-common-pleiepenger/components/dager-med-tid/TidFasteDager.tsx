import React from 'react';
import { ISODuration, ISODurationToDuration } from '@navikt/sif-common-utils';
import { Time } from '../../../types/Time';
import { AppIntlShape, useAppIntl } from '../../../i18n';

interface TidFasteDagerType {
    mandag?: ISODuration;
    tirsdag?: ISODuration;
    onsdag?: ISODuration;
    torsdag?: ISODuration;
    fredag?: ISODuration;
}

interface Props {
    fasteDager?: TidFasteDagerType;
}

const formatTime = ({ text }: AppIntlShape, time: Partial<Time>): string => {
    const timer = time.hours || '0';
    const minutter = time.minutes || '0';
    return text('psb.timerOgMinutter', { timer, minutter });
};

const TidFasteDager: React.FunctionComponent<Props> = ({ fasteDager }) => {
    const appIntl = useAppIntl();
    const { text } = appIntl;

    if (fasteDager) {
        const days = Object.keys(fasteDager).filter((day) => (fasteDager as any)[day] !== undefined);
        if (days.length > 0) {
            return (
                <ul style={{ marginTop: 0 }}>
                    {days.map((day, idx) => {
                        const time = ISODurationToDuration((fasteDager as any)[day]);
                        return (
                            <li key={idx} style={{ marginBottom: '.25rem' }}>
                                {`${text(`${day}er.caps` as any)}: ${time ? formatTime(appIntl, time) : 0}`}
                            </li>
                        );
                    })}
                </ul>
            );
        }
    }
    return <>{text('dagerMedTid.ingenDagerRegistrert')}</>;
};

export default TidFasteDager;
