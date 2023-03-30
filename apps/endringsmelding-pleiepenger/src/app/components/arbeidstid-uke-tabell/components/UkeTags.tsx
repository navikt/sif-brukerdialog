import React from 'react';
import { getFeriedagerIUkeTekst } from '../../../utils/ferieUtils';
import FerieTag from '../../tags/FerieTag';
import KortUkeTag from '../../tags/KortUkeTag';
import TagsContainer from '../../tags/TagsContainer';

interface Props {
    erKortUke?: boolean;
    dagerMedFerie: Date[] | undefined;
    dagerMedFjernetFerie?: Date[] | undefined;
    visDagNavn?: boolean;
}

const UkeTags = ({ dagerMedFerie = [], dagerMedFjernetFerie = [], visDagNavn, erKortUke }: Props) => {
    const tags = [];
    if (erKortUke) {
        tags.push(<KortUkeTag style={{ marginRight: '.5rem', marginBottom: '.25rem' }} />);
    }
    if (dagerMedFerie?.length > 0) {
        tags.push(
            <FerieTag style={{ marginRight: '.5rem', marginBottom: '.25rem' }}>
                {visDagNavn
                    ? `Ferie: ${getFeriedagerIUkeTekst(dagerMedFerie)}`
                    : dagerMedFerie?.length === 1
                    ? 'Feriedag'
                    : 'Feriedager'}
            </FerieTag>
        );
    }
    if (dagerMedFjernetFerie?.length > 0) {
        tags.push(
            <FerieTag type="fjernet" size="small">
                Ferie fjernet
            </FerieTag>
        );
    }

    if (dagerMedFjernetFerie.length + dagerMedFerie.length > 0 || erKortUke) {
        return (
            <>
                <TagsContainer>
                    {erKortUke && <KortUkeTag />}
                    {dagerMedFerie?.length > 0 && (
                        <FerieTag>
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
                </TagsContainer>
            </>
        );
    }
    return null;
};

export default UkeTags;
