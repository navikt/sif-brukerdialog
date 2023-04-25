import { ISODate, ISODateToDate, prettifyDateExtended } from '@navikt/sif-common-utils';

interface Props {
    apiDato: ISODate;
}
export const prettifyApiDate = (apiDato: ISODate): string => prettifyDateExtended(ISODateToDate(apiDato));

const DatoSvar = ({ apiDato }: Props) => <>{prettifyApiDate(apiDato)}</>;

export default DatoSvar;
