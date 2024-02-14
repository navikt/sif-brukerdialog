import React from 'react';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import HarDekketTiFørsteDagerSelvSpørsmål from '../spørsmål/HarDekketTiFørsteDagerSelvSpørsmål';

interface Props {}

const TreEllerFlereBarnUnder13: React.FunctionComponent<Props> = ({}) => {
    return (
        <FormBlock>
            <HarDekketTiFørsteDagerSelvSpørsmål />
        </FormBlock>
    );
};

export default TreEllerFlereBarnUnder13;
