import { ISODate, prettifyApiDate } from '@navikt/sif-common-utils';

interface Props {
    isoDato: ISODate;
}

const DatoSvar = ({ isoDato: apiDato }: Props) => <>{prettifyApiDate(apiDato)}</>;

export default DatoSvar;
