import React from 'react';
import { ApiStringDate } from '@navikt/sif-common-core/lib/types/ApiStringDate';
import { apiStringDateToDate, prettifyDate } from '@navikt/sif-common-core/lib/utils/dateUtils';

interface Props {
    apiDato: ApiStringDate;
}
export const prettifyApiDate = (apiDato: ApiStringDate): string => prettifyDate(apiStringDateToDate(apiDato));

const DatoSvar: React.FunctionComponent<Props> = ({ apiDato }) => <>{prettifyApiDate(apiDato)}</>;

export default DatoSvar;
