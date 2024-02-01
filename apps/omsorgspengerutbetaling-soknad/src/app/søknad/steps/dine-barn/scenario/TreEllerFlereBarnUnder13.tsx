import { Alert } from '@navikt/ds-react';
import React from 'react';
import HarDekketTiFørsteDagerSelvSpørsmål from '../spørsmål/HarDekketTiFørsteDagerSelvSpørsmål';

interface Props {}

const TreEllerFlereBarnUnder13: React.FunctionComponent<Props> = ({}) => {
    return (
        <HarDekketTiFørsteDagerSelvSpørsmål
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
