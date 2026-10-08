import { InformationSquareIcon } from '@navikt/aksel-icons';
import { BodyLong, InfoCard } from '@navikt/ds-react';
import { dateFormatter, ISODate } from '@sif/utils';
import React from 'react';

import { SanityNotice } from '../../types/sanityObjects';

export interface PlannedDowntimeInfo {
    date: ISODate;
    /** HH:mm */
    from: string;
    /** HH:mm */
    to: string;
}

export interface NoticeRenderers {
    /** Overstyrer standardteksten for planlagt nedetid */
    plannedDowntime?: (info: PlannedDowntimeInfo) => React.ReactNode;
}

interface Props {
    notice: SanityNotice;
    renderers?: NoticeRenderers;
}

const DefaultPlannedDowntimeMessage = ({ date, from, to }: PlannedDowntimeInfo) => (
    <BodyLong>
        På grunn av oppdateringer vil tjenesten være utilgjengelig {dateFormatter.dayDateMonthYear(date)} klokken {from}{' '}
        - {to}. Hvis du har begynt å bruke tjenesten er det greit å vite at du må sende inn før{' '}
        {dateFormatter.day(date)} klokken {from}, hvis ikke kan det være du må starte på nytt.
    </BodyLong>
);

export const AppStatusNotice = ({ notice, renderers }: Props) => {
    switch (notice._type) {
        case 'plannedDowntimeNotice': {
            const info: PlannedDowntimeInfo = { date: notice.date, from: notice.from, to: notice.to };
            return (
                <InfoCard>
                    <InfoCard.Message icon={<InformationSquareIcon aria-hidden />}>
                        {renderers?.plannedDowntime ? (
                            renderers.plannedDowntime(info)
                        ) : (
                            <DefaultPlannedDowntimeMessage {...info} />
                        )}
                    </InfoCard.Message>
                </InfoCard>
            );
        }
        default:
            return null;
    }
};
