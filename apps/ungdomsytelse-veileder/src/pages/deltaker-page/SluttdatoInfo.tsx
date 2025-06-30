import { BodyLong, ReadMore } from '@navikt/ds-react';

// Splitte tekst
interface Props {
    gjelderEndring?: boolean;
}
const EndreStartdatoInfo = ({ gjelderEndring }: Props) => {
    return gjelderEndring ? (
        <ReadMore header="Les om å endre sluttdato">
            <BodyLong>
                Når sluttdatoen endres frem i tid, får deltakeren en etterbetaling. Når sluttdatoen endres tilbake i
                tid, kan det føre til en feilutbetaling.
            </BodyLong>
        </ReadMore>
    ) : (
        <ReadMore header="Les om å sette sluttdato">
            <BodyLong>
                Når det settes en sluttdato, så blir denne brukt til å opphøre ungdomsprogramytelsen. Deretter kan ikke
                deltakeren gis en ny periode.
            </BodyLong>
        </ReadMore>
    );
};

export default EndreStartdatoInfo;
