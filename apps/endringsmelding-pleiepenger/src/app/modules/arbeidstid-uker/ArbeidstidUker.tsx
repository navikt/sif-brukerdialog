import { Button } from '@navikt/ds-react';
import React, { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { AddCircle } from '@navikt/ds-icons';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import { DateRange, getDateRangeText } from '@navikt/sif-common-utils';
import EditButton from '../../components/buttons/EditButton';
import { usePagination } from '../../hooks/usePagination';
import { useSelectableList } from '../../hooks/useSelectableList';
import { ArbeidstidUkerItem } from './ArbeidstidUkerItem';
import ArbeidstidUkeListe from './components/ArbeidstidUkeListe';
import ArbeidstidUkeTabell from './components/ArbeidstidUkeTabell';
import EndreUkerFooter from './components/EndreUkerFooter';
import EndreUkerHeader from './components/EndreUkerHeader';
import './arbeidstidUker.scss';

interface Props {
    arbeidsaktivitetKey: string;
    listItems: ArbeidstidUkerItem[];
    paginering?: {
        antall: number;
    };
    periode?: DateRange;
    arbeidstidKolonneTittel?: string;
    triggerResetValg?: number;
    visEndringSomOpprinnelig?: boolean;
    onEndreUker?: (uke: ArbeidstidUkerItem[]) => void;
}

const ArbeidstidUker: React.FunctionComponent<Props> = ({
    listItems,
    paginering = {
        antall: 10,
    },
    periode,
    arbeidstidKolonneTittel,
    triggerResetValg,
    visEndringSomOpprinnelig,
    arbeidsaktivitetKey,
    onEndreUker,
}) => {
    const { visibleItems, hasMoreItems, showMoreItems, showAllItems } = usePagination<ArbeidstidUkerItem>(
        listItems,
        10
    );

    const selectableList = useSelectableList<ArbeidstidUkerItem>({ items: listItems, onEditItems: onEndreUker });
    const {
        listState: { itemsAreSelectable, selectedItems, multipleSelectEnabled, showSelectItemsMessage },
        setItemsAreSelectable,
        setSelectedItems,
        editItem,
        editSelectedItems,
        setShowSelectItemsMessage,
    } = selectableList;

    const renderAsList = useMediaQuery({ minWidth: 500 }) === false;
    const renderCompactTable = useMediaQuery({ minWidth: 736 }) === false && renderAsList === false;

    const korteUker = visibleItems.filter((i) => i.erKortUke).map((uke) => uke.periode);
    const ukerMedFerie = visibleItems
        .filter((i) => i.ferie && i.ferie?.dagerMedFerie.length > 0)
        .map((uke) => uke.periode);

    useEffect(() => {
        setSelectedItems([]);
        setShowSelectItemsMessage(false);
    }, [triggerResetValg, setSelectedItems, setShowSelectItemsMessage]);

    const renderEditButton = (uke: ArbeidstidUkerItem, ukenummer: number, renderLabel: boolean) => {
        if (!onEndreUker || !uke.kanEndres) {
            return undefined;
        }

        const title =
            selectedItems.length > 1
                ? 'Endre valgte uker'
                : `Endre uke ${ukenummer} (${getDateRangeText(uke.periode)})`;

        return (
            <EditButton
                className="endreArbeidstidUkeButton"
                data-testid="endre-button"
                onClick={() => {
                    editItem(uke);
                }}
                title={title}
                aria-label={title}>
                {renderLabel && <>Endre arbeidstid</>}
            </EditButton>
        );
    };

    const renderEndreUkerHeader = () =>
        multipleSelectEnabled ? (
            <EndreUkerHeader
                periode={periode}
                onUkerKanVelgesChange={(checked) => {
                    setItemsAreSelectable(checked);
                }}
                ukerKanVelges={itemsAreSelectable}
                visKorteUkerMelding={itemsAreSelectable && (ukerMedFerie.length > 0 || korteUker.length > 0)}
            />
        ) : undefined;

    const renderLastInnFlereUker = () => {
        if (paginering && hasMoreItems) {
            return (
                <Block margin="m" style={{ gap: '.5rem', display: 'flex' }}>
                    <Button
                        variant="tertiary"
                        icon={<AddCircle role="presentation" aria-hidden={true} />}
                        type="button"
                        onClick={showMoreItems}>
                        Vis flere uker
                    </Button>
                    <Button
                        variant="tertiary"
                        icon={<AddCircle role="presentation" aria-hidden={true} />}
                        type="button"
                        onClick={showAllItems}>
                        Vis alle uker
                    </Button>
                </Block>
            );
        }
        return null;
    };

    const renderUkerFooter = () => {
        return (
            <>
                {renderLastInnFlereUker()}
                {multipleSelectEnabled && (
                    <EndreUkerFooter
                        antallValgteUker={selectedItems.length}
                        visVelgUkerMelding={showSelectItemsMessage}
                        onEndreUker={editSelectedItems}
                    />
                )}
            </>
        );
    };

    if (renderAsList) {
        return (
            <div className="arbeidstidUkeListeWrapper">
                {renderEndreUkerHeader()}
                <ArbeidstidUkeListe
                    arbeidsaktivitetKey={arbeidsaktivitetKey}
                    uker={visibleItems}
                    selectableList={selectableList}
                    visEndringSomOpprinnelig={visEndringSomOpprinnelig}
                    renderEditButton={renderEditButton}
                />
                {renderUkerFooter()}
            </div>
        );
    }

    return (
        <>
            {renderEndreUkerHeader()}
            <ArbeidstidUkeTabell
                arbeidsaktivitetKey={arbeidsaktivitetKey}
                uker={visibleItems}
                selectableList={selectableList}
                visEndringSomOpprinnelig={visEndringSomOpprinnelig}
                renderEditButton={renderEditButton}
                renderUkerFooter={renderUkerFooter}
                arbeidstidKolonneTittel={arbeidstidKolonneTittel}
                renderCompactTable={renderCompactTable}
            />
            {renderUkerFooter()}
        </>
    );
};

export default ArbeidstidUker;
