import ActionLink from '@navikt/sif-common-core-ds/src/atoms/action-link/ActionLink';
import ItemList from '@navikt/sif-common-core-ds/src/components/lists/item-list/ItemList';
import { prettifyDateExtended } from '@navikt/sif-common-utils';
import { Kursperiode } from '../../../../types/Kursperiode';

interface Props {
    kursperiode: Kursperiode[];
    onEdit?: (opphold: Kursperiode) => void;
    onDelete?: (opphold: Kursperiode) => void;
}

const KursperiodeList = ({ kursperiode = [], onDelete, onEdit }: Props) => {
    const getDateTitleString = ({ periode }: Kursperiode) =>
        `${prettifyDateExtended(periode.from)} - ${prettifyDateExtended(periode.to)}`;

    const renderKursperiodeLabel = (uttak: Kursperiode): React.ReactNode => {
        const title = getDateTitleString(uttak);
        return (
            <>
                {onEdit && <ActionLink onClick={() => onEdit(uttak)}>{title}</ActionLink>}
                {!onEdit && <span>{title}</span>}
            </>
        );
    };

    return (
        <ItemList<Kursperiode>
            getItemId={(uttak) => uttak.id}
            getItemTitle={(uttak) => getDateTitleString(uttak)}
            onDelete={onDelete}
            onEdit={onEdit}
            labelRenderer={renderKursperiodeLabel}
            items={kursperiode.filter((uttak) => uttak.id !== undefined)}
        />
    );
};

export default KursperiodeList;
