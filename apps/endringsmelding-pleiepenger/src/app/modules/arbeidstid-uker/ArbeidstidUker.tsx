import './arbeidstidUker.scss';

import { AddCircle } from '@navikt/ds-icons';
import { Button, HStack, VStack } from '@navikt/ds-react';
import { usePrevious } from '@navikt/sif-common-hooks';
import { getDateRangeText } from '@navikt/sif-common-utils';
import { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

import EditButton from '../../components/buttons/EditButton';
import { usePagination } from '../../hooks/usePagination';
import { useSelectableList } from '../../hooks/useSelectableList';
import { AppText, useAppIntl } from '../../i18n';
import ArbeidstidUkeListe from './components/ArbeidstidUkeListe';
import ArbeidstidUkeTabell from './components/ArbeidstidUkeTabell';
import EndreUkerFooter from './components/EndreUkerFooter';
import EndreUkerHeader from './components/EndreUkerHeader';
import { ArbeidstidUkerItem } from './types/ArbeidstidUkerItem';

interface Props {
    listItems: ArbeidstidUkerItem[];
    paginering?: {
        antall: number;
    };
    arbeidstidKolonneTittel?: string;
    triggerResetValgCounter?: number;
    visEndringSomOpprinnelig?: boolean;
    onEndreUker?: (uke: ArbeidstidUkerItem[]) => void;
}

const ArbeidstidUker = ({
    listItems,
    paginering = {
        antall: 10,
    },
    arbeidstidKolonneTittel,
    triggerResetValgCounter,
    visEndringSomOpprinnelig,

    onEndreUker,
}: Props) => {
    const { text, intl } = useAppIntl();
    const { visibleItems, hasMoreItems, showMoreItems, showAllItems } = usePagination<ArbeidstidUkerItem>(
        listItems,
        10,
    );

    const selectableList = useSelectableList<ArbeidstidUkerItem>({ items: listItems, onEditItems: onEndreUker });
    const {
        listState: { itemsAreSelectable, selectedItems, multipleSelectEnabled, showSelectItemsMessage },
        setItemsAreSelectable,
        resetList,
        editItem,
        editSelectedItems,
    } = selectableList;

    const renderAsList = useMediaQuery({ minWidth: 500 }) === false;
    const renderCompactTable = useMediaQuery({ minWidth: 736 }) === false && renderAsList === false;

    const korteUker = visibleItems.filter((i) => i.erKortUke).map((uke) => uke.periode);
    const ukerMedFerie = visibleItems
        .filter((i) => i.ferie && i.ferie?.dagerMedFerie.length > 0)
        .map((uke) => uke.periode);

    const resetCount = usePrevious(triggerResetValgCounter);

    useEffect(() => {
        if (resetCount !== triggerResetValgCounter) {
            resetList();
        }
    }, [triggerResetValgCounter, resetCount, resetList]);

    const renderEditButton = (uke: ArbeidstidUkerItem, ukenummer: number, renderLabel: boolean) => {
        if (!onEndreUker || !uke.kanEndres) {
            return undefined;
        }

        const title =
            selectedItems.length > 1
                ? text('arbeidstidUker.editButton.endreValgteUker.title')
                : text('arbeidstidUker.editButton.endreEnkeltuke.title', {
                      ukenummer,
                      tidsrom: getDateRangeText(uke.periode, intl.locale),
                  });

        return (
            <EditButton
                className="endreArbeidstidUkeButton"
                data-testid="endre-button"
                onClick={() => {
                    editItem(uke);
                }}
                title={title}
                aria-label={title}>
                {renderLabel && <AppText id="arbeidstidUker.editButton.endreEnkeltuke.label" />}
            </EditButton>
        );
    };

    const renderEndreUkerHeader = () =>
        multipleSelectEnabled ? (
            <EndreUkerHeader
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
                <HStack gap="2">
                    <Button
                        variant="tertiary"
                        icon={<AddCircle role="presentation" aria-hidden={true} />}
                        type="button"
                        onClick={showMoreItems}>
                        <AppText id="arbeidstidUker.visMer.visFlereUker.label" />
                    </Button>
                    <Button
                        variant="tertiary"
                        icon={<AddCircle role="presentation" aria-hidden={true} />}
                        type="button"
                        onClick={showAllItems}>
                        <AppText id="arbeidstidUker.visMer.visAlleUker.label" />
                    </Button>
                </HStack>
            );
        }
        return null;
    };

    const renderUkerFooter = () => {
        return (
            <>
                {renderLastInnFlereUker()}
                {multipleSelectEnabled && itemsAreSelectable && (
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
            <VStack gap="4" className="arbeidstidUkeListeWrapper">
                {renderEndreUkerHeader()}
                <ArbeidstidUkeListe
                    uker={visibleItems}
                    selectableList={selectableList}
                    visEndringSomOpprinnelig={visEndringSomOpprinnelig}
                    renderEditButton={renderEditButton}
                />
                {renderUkerFooter()}
            </VStack>
        );
    }

    return (
        <VStack gap="4">
            {renderEndreUkerHeader()}

            <ArbeidstidUkeTabell
                uker={visibleItems}
                selectableList={selectableList}
                visEndringSomOpprinnelig={visEndringSomOpprinnelig}
                renderEditButton={renderEditButton}
                renderUkerFooter={renderUkerFooter}
                arbeidstidKolonneTittel={arbeidstidKolonneTittel}
                renderCompactTable={renderCompactTable}
            />
            {renderUkerFooter()}
        </VStack>
    );
};

export default ArbeidstidUker;
