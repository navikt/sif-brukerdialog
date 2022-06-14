import React from 'react';
import { ApiStringDate } from '@navikt/sif-common-core/lib/types/ApiStringDate';
import { apiStringDateToDate, prettifyDateExtended } from '@navikt/sif-common-core/lib/utils/dateUtils';

interface Props {
    apiDato: ApiStringDate;
}
export const prettifyApiDate = (apiDato: ApiStringDate): string => prettifyDateExtended(apiStringDateToDate(apiDato));

const DatoSvar = ({ apiDato }: Props) => <>{prettifyApiDate(apiDato)}</>;

export default DatoSvar;
