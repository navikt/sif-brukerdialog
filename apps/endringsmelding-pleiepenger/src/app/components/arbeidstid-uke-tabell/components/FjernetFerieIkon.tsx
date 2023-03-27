import { Tooltip } from '@navikt/ds-react';
import React from 'react';
import { WarningColored } from '@navikt/ds-icons';
import { ArbeidstidUkeTabellItem } from '../ArbeidstidUkeTabell';

interface Props {
    uke: ArbeidstidUkeTabellItem;
}

const FjernetFerieIkon: React.FunctionComponent<Props> = ({ uke }) => {
    return (
        <Tooltip content={`Feriedager er fjernet denne uken`}>
            <WarningColored aria-label="Feriedager er fjernet denne uken" />
        </Tooltip>
    );
};

export default FjernetFerieIkon;
