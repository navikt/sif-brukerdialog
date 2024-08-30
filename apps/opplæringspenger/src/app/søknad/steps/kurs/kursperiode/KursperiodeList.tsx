import ActionLink from '@navikt/sif-common-core-ds/src/atoms/action-link/ActionLink';
import ItemList from '@navikt/sif-common-core-ds/src/components/lists/item-list/ItemList';
import { prettifyDateExtended } from '@navikt/sif-common-utils';
import { Kursperiode } from '../../../../types/Kursperiode';
import { BodyShort, HStack, VStack } from '@navikt/ds-react';

interface Props {
    kursperioder: Kursperiode[];
    onEdit?: (kursperiode: Kursperiode) => void;
    onDelete?: (kursperiode: Kursperiode) => void;
}

const getDateTitleString = ({ periode }: Kursperiode) =>
    `${prettifyDateExtended(periode.from)} - ${prettifyDateExtended(periode.to)}`;

const renderKursperiodeLabel = (
    kursperiode: Kursperiode,
    onEdit?: (kursperiode: Kursperiode) => void,
): React.ReactNode => {
    const title = getDateTitleString(kursperiode);
    return (
        <VStack gap={'2'}>
            <div>
                {onEdit && <ActionLink onClick={() => onEdit(kursperiode)}>{title}</ActionLink>}
                {!onEdit && <span>{title}</span>}
            </div>

            <BodyShort size="small">
                <HStack gap={'5'}>
                    <span>Avreisedato: {prettifyDateExtended(kursperiode.avreise || kursperiode.periode.from)}</span>
                    <span>Hjemkomstdato: {prettifyDateExtended(kursperiode.hjemkomst || kursperiode.periode.to)}</span>
                </HStack>
            </BodyShort>
        </VStack>
    );
};

const KursperiodeList = ({ kursperioder = [], onDelete, onEdit }: Props) => {
    return (
        <ItemList<Kursperiode>
            getItemId={(kursperiode) => kursperiode.id}
            getItemTitle={(uttak) => getDateTitleString(uttak)}
            onDelete={onDelete}
            onEdit={onEdit}
            labelRenderer={(kursperiode: Kursperiode) => renderKursperiodeLabel(kursperiode, onEdit)}
            items={kursperioder.filter(({ id }) => id !== undefined)}
        />
    );
};

export default KursperiodeList;
