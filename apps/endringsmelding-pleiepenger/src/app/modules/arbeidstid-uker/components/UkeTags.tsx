import FerieTag from '@app/components/tags/FerieTag';
import KortUkeTag from '@app/components/tags/KortUkeTag';
import TagsContainer from '@app/components/tags/tags-container/TagsContainer';
import { AppText, useAppIntl } from '@app/i18n';
import { getFeriedagerIUkeTekst } from '@app/utils';
import { Tooltip } from '@navikt/ds-react';

interface Props {
    kortUkeTooltip?: string;
    erKortUke?: boolean;
    dagerMedFerie: Date[] | undefined;
    dagerMedFjernetFerie?: Date[] | undefined;
    visDagNavn?: boolean;
}

const UkeTags = ({ dagerMedFerie = [], dagerMedFjernetFerie = [], visDagNavn, erKortUke, kortUkeTooltip }: Props) => {
    const { text } = useAppIntl();
    if (!erKortUke && dagerMedFerie.length === 0 && dagerMedFjernetFerie.length === 0) {
        return null;
    }

    return (
        <TagsContainer>
            {erKortUke && <KortUkeTag tooltip={kortUkeTooltip} />}
            {dagerMedFerie.length > 0 && (
                <Tooltip content={text('ukeTags.ferieTooltip', { dager: getFeriedagerIUkeTekst(dagerMedFerie) })}>
                    <FerieTag>
                        {visDagNavn ? (
                            <AppText id="ukeTags.ferie" values={{ dager: getFeriedagerIUkeTekst(dagerMedFerie) }} />
                        ) : (
                            <AppText id="ukeTags.feriedager" values={{ antall: dagerMedFerie.length }} />
                        )}
                    </FerieTag>
                </Tooltip>
            )}
            {dagerMedFjernetFerie.length > 0 && (
                <Tooltip
                    content={text('ukeTags.ferieFjernetTooltip', {
                        dager: getFeriedagerIUkeTekst(dagerMedFjernetFerie),
                    })}>
                    <FerieTag type="fjernet" size="small">
                        <AppText id="ukeTags.ferieFjernet" />
                    </FerieTag>
                </Tooltip>
            )}
        </TagsContainer>
    );
};

export default UkeTags;
