import React from 'react';
import { ISODate, ISODateToDate, prettifyDate } from '@navikt/sif-common-utils';

interface Props {
    isoDate: ISODate;
}
export const prettifyApiDate = (isoDate: ISODate): string => prettifyDate(ISODateToDate(isoDate));

const DatoSvar: React.FunctionComponent<Props> = ({ isoDate }) => <>{prettifyApiDate(isoDate)}</>;

export default DatoSvar;
