import { Tag } from '@navikt/ds-react';
import React from 'react';
import { getFeriedagerIUkeTekst } from '../../../utils/ferieUtils';
import FerieTag from '../../tags/FerieTag';

interface Props {
    erKortUke?: boolean;
    dagerMedFerie: Date[] | undefined;
    dagerMedFjernetFerie?: Date[] | undefined;
    visDagNavn?: boolean;
}

const UkeTags = ({ dagerMedFerie = [], dagerMedFjernetFerie = [], visDagNavn, erKortUke }: Props) => {
    if (dagerMedFjernetFerie.length + dagerMedFerie.length > 0 || erKortUke) {
        return (
            <span className="ukeTags" style={{ display: 'flex', flexDirection: 'row' }}>
                {erKortUke && (
                    <Tag variant="info" size="small" style={{ marginRight: '.5rem', marginBottom: '.25rem' }}>
                        Kort uke
                    </Tag>
                )}
                {dagerMedFerie?.length > 0 && (
                    <FerieTag style={{ marginRight: '.5rem', marginBottom: '.25rem' }}>
                        {visDagNavn
                            ? `Ferie: ${getFeriedagerIUkeTekst(dagerMedFerie)}`
                            : dagerMedFerie?.length === 1
                            ? 'Feriedag'
                            : 'Feriedager'}
                    </FerieTag>
                )}
                {dagerMedFjernetFerie?.length > 0 && (
                    <FerieTag type="fjernet" size="small">
                        Ferie fjernet
                    </FerieTag>
                )}
            </span>
        );
    }
    return null;
};

export default UkeTags;
