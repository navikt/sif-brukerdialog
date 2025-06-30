import { BodyLong, List, ReadMore } from '@navikt/ds-react';

const EndreStartdatoInfo = () => {
    return (
        <ReadMore header="Les mer om å registrere/endre sluttdato">
            <BodyLong spacing>
                Når det settes en sluttdato, så blir denne brukt til å opphøre ungdomsprogramytelsen. Deretter kan ikke
                deltakeren gis en ny periode.
            </BodyLong>
            <BodyLong className="pb-4">Dersom sluttdatoen er satt feil, kan denne endres:</BodyLong>
            <List>
                <List.Item>Når sluttdatoen endres frem i tid, får deltakeren en etterbetaling.</List.Item>
                <List.Item>Når sluttdatoen endres tilbake i tid, kan det føre til en feilutbetaling.</List.Item>
            </List>
        </ReadMore>
    );
};

export default EndreStartdatoInfo;
