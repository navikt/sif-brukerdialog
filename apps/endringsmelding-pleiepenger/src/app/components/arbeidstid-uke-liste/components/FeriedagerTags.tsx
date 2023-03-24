import { Tag } from '@navikt/ds-react';
import React from 'react';
import { getFeriedagerIUkeTekst } from '../../../utils/ferieUtils';
import FerieTag from '../../tags/FerieTag';

interface Props {
    dagerMedFerie: Date[] | undefined;
    dagerMedFjernetFerie?: Date[] | undefined;
    visDagNavn?: boolean;
}

const FeriedagerTags = ({ dagerMedFerie = [], dagerMedFjernetFerie = [], visDagNavn }: Props) => {
    if (dagerMedFjernetFerie.length + dagerMedFerie.length > 0) {
        return (
            <>
                {dagerMedFerie?.length > 0 && (
                    <FerieTag dager={dagerMedFerie} style={{ marginRight: '.5rem', marginBottom: '.25rem' }}>
                        {visDagNavn ? `Ferie: ${getFeriedagerIUkeTekst(dagerMedFerie)}` : 'Ferie registrert'}
                    </FerieTag>
                )}
                {dagerMedFjernetFerie?.length > 0 && (
                    <Tag variant="error" size="small">
                        Ferie fjernet
                    </Tag>
                )}
            </>
        );
    }
    return null;
};

export default FeriedagerTags;
