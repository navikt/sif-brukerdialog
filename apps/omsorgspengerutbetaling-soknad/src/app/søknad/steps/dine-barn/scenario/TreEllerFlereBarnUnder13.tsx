import React from 'react';
import HarDekketFørste10DagerSelvSpørsmål from '../spørsmål/HarDekketFørste10DagerSelvSpørsmål';
import { Alert } from '@navikt/ds-react';

interface Props {}

const TreEllerFlereBarnUnder13: React.FunctionComponent<Props> = ({}) => {
    return (
        <HarDekketFørste10DagerSelvSpørsmål
            info={
                <Alert variant="info">
                    Når du har barn som har fylt 12 år i år, eller er yngre, må du dekke de 10 første omsorgsdagene du
                    bruker hvert kalenderår. Du kan søke om utbetaling fra NAV fra den 11. dagen.
                </Alert>
            }
        />
    );
};

export default TreEllerFlereBarnUnder13;
