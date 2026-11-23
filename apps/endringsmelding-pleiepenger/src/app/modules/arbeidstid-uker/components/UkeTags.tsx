import FerieTag from '@app/components/tags/FerieTag';
import KortUkeTag from '@app/components/tags/KortUkeTag';
import TagsContainer from '@app/components/tags/tags-container/TagsContainer';
import { AppText } from '@app/i18n';
import { getFeriedagerIUkeTekst } from '@app/utils';
import React from 'react';

interface Props {
    kortUkeTooltip?: string;
    erKortUke?: boolean;
    dagerMedFerie: Date[] | undefined;
    dagerMedFjernetFerie?: Date[] | undefined;
    visDagNavn?: boolean;
}

const UkeTags = ({ dagerMedFerie = [], dagerMedFjernetFerie = [], visDagNavn, erKortUke, kortUkeTooltip }: Props) => {
    const tags: React.ReactNode[] = [];
    if (erKortUke) {
        tags.push(<KortUkeTag tooltip={kortUkeTooltip} style={{ marginRight: '.5rem', marginBottom: '.25rem' }} />);
    }
    if (dagerMedFerie?.length > 0) {
        tags.push(
            <FerieTag style={{ marginRight: '.5rem', marginBottom: '.25rem' }}>
                {visDagNavn ? (
                    <AppText id="ukeTags.ferie" values={{ dager: getFeriedagerIUkeTekst(dagerMedFerie) }} />
                ) : (
                    <AppText id="ukeTags.feriedager" values={{ antall: dagerMedFerie.length }} />
                )}
            </FerieTag>,
        );
    }
    if (dagerMedFjernetFerie?.length > 0) {
        tags.push(
            <FerieTag type="fjernet" size="small">
                <AppText id="ukeTags.ferieFjernet" />
            </FerieTag>,
        );
    }

    if (dagerMedFjernetFerie.length + dagerMedFerie.length > 0 || erKortUke) {
        return (
            <>
                <TagsContainer>
                    {erKortUke && <KortUkeTag tooltip={kortUkeTooltip} />}
                    {dagerMedFerie?.length > 0 && (
                        <FerieTag>
                            {visDagNavn ? (
                                <AppText id="ukeTags.ferie" values={{ dager: getFeriedagerIUkeTekst(dagerMedFerie) }} />
                            ) : (
                                <AppText id="ukeTags.feriedager" values={{ antall: dagerMedFerie.length }} />
                            )}
                        </FerieTag>
                    )}
                    {dagerMedFjernetFerie?.length > 0 && (
                        <FerieTag type="fjernet" size="small">
                            <AppText id="ukeTags.ferieFjernet" />
                        </FerieTag>
                    )}
                </TagsContainer>
            </>
        );
    }
    return null;
};

export default UkeTags;
