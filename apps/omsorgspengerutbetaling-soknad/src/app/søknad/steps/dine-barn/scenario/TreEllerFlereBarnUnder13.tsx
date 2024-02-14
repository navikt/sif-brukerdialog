import { Alert, Heading } from '@navikt/ds-react';
import React from 'react';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import HarDekketTiFørsteDagerSelvSpørsmål from '../spørsmål/HarDekketTiFørsteDagerSelvSpørsmål';

interface Props {}

const TreEllerFlereBarnUnder13: React.FunctionComponent<Props> = ({}) => {
    return (
        <FormBlock>
            <Heading level="3" size="small" spacing={true}>
                Du må selv dekke omsorgsdagene dine
            </Heading>
            <Alert variant="info">
                Når du har barn som har fylt 12 år i år, eller er yngre, må du dekke de 10 første omsorgsdagene du
                bruker hvert kalenderår. Du kan søke om utbetaling fra NAV fra den 11. dagen.
            </Alert>
            <HarDekketTiFørsteDagerSelvSpørsmål />
        </FormBlock>
    );
};

export default TreEllerFlereBarnUnder13;
