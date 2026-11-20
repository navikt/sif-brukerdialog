import { SelectableListType } from '@app/hooks/useSelectableList';
import { AppText, useAppIntl } from '@app/i18n';
import { Box, Checkbox, HStack, Table } from '@navikt/ds-react';
import AriaText from '@navikt/sif-common-core-ds/src/atoms/aria-text/AriaText';
import { DurationText } from '@navikt/sif-common-ui';
import { getDateRangeText } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import { ReactElement } from 'react';

import { ArbeidstidUkerItem } from '../../types/ArbeidstidUkerItem';
import UkeInfoTooltip, { getKortUkeTooltipText } from '../UkeInfoTooltip';
import UkeTags from '../UkeTags';
import VelgArbeidsukeItem from '../VelgArbeidsukeItem';
import ArbeidstidUkeInfo from './ArbeidstidUkeInfo';

interface Props {
    uker: ArbeidstidUkerItem[];
    selectableList: SelectableListType<ArbeidstidUkerItem>;
    visEndringSomOpprinnelig?: boolean;
    visNormalarbeidstid?: boolean;
    renderCompactTable: boolean;
    arbeidstidKolonneTittel?: string;
    renderEditButton: (uke: ArbeidstidUkerItem, ukenummer: number, renderLabel: boolean) => ReactElement | undefined;
}

interface UkeCellsProps {
    uke: ArbeidstidUkerItem;
    ukenummer: number;
    visNormalarbeidstid: boolean;
}

const ArbeidstidUkeTabell = ({
    uker,
    visEndringSomOpprinnelig,
    selectableList,
    arbeidstidKolonneTittel,
    renderCompactTable,
    visNormalarbeidstid = false,
    renderEditButton,
}: Props) => {
    const {
        isItemSelected,
        setItemSelected,
        setShowSelectItemsMessage,
        setSelectedItems,
        listState: { itemsAreSelectable, singleSelectEnabled, selectedItems },
    } = selectableList;

    const toggleAlleUker = () => {
        setShowSelectItemsMessage(false);
        setSelectedItems(selectedItems.length > 0 ? [] : uker.filter((uke) => uke.kanEndres && uke.kanVelges));
    };

    return (
        <Table className="arbeidstidUkeTabell">
            <Table.Header>
                <Table.Row>
                    {itemsAreSelectable && (
                        <Table.HeaderCell>
                            <AriaText>
                                <AppText id="arbeidstidUkeTabell.aria.velgUke" />
                            </AriaText>
                            <Checkbox
                                checked={selectedItems.length === uker.length}
                                indeterminate={selectedItems.length > 0 && selectedItems.length !== uker.length}
                                onChange={toggleAlleUker}
                                hideLabel>
                                <AppText id="arbeidstidUkeTabell.velgAlleUker.cb" />
                            </Checkbox>
                        </Table.HeaderCell>
                    )}
                    {renderCompactTable ? (
                        <Table.HeaderCell>Uke</Table.HeaderCell>
                    ) : (
                        <>
                            <Table.HeaderCell className="arbeidstidUkeTabell__ukenummer">
                                <AppText id="arbeidstidUkeTabell.header.uke" />
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                <AppText id="arbeidstidUkeTabell.header.dato" />
                            </Table.HeaderCell>
                            {visNormalarbeidstid && (
                                <Table.HeaderCell>
                                    <AppText id="arbeidstidUkeTabell.header.normalt.title" />
                                </Table.HeaderCell>
                            )}
                        </>
                    )}
                    <Table.HeaderCell className="arbeidstidUkeTabell__arbeidstid">
                        {arbeidstidKolonneTittel || <AppText id="arbeidstidUkeTabell.header.arbeidstid.title" />}
                    </Table.HeaderCell>
                    {singleSelectEnabled && (
                        <Table.HeaderCell className="arbeidstidUkeTabell__endre" align="right">
                            <AppText id="arbeidstidUkeTabell.header.endre" />
                        </Table.HeaderCell>
                    )}
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {uker.map((uke) => {
                    const ukenummer = dayjs(uke.periode.from).isoWeek();
                    const selected = isItemSelected(uke);
                    const UkeCells = renderCompactTable ? KompakteUkeCeller : UkeCeller;

                    return (
                        <Table.Row key={uke.isoDateRange} selected={selected} data-testid={`uke_${ukenummer}`}>
                            {itemsAreSelectable && (
                                <Table.DataCell>
                                    <VelgArbeidsukeItem
                                        uke={uke}
                                        selected={selected}
                                        onChange={() => setItemSelected(uke, selected)}
                                    />
                                </Table.DataCell>
                            )}
                            <UkeCells uke={uke} ukenummer={ukenummer} visNormalarbeidstid={visNormalarbeidstid} />
                            <Table.DataCell data-testid="arbeidstid-faktisk">
                                <ArbeidstidUkeInfo uke={uke} visEndringSomOpprinnelig={visEndringSomOpprinnelig} />
                            </Table.DataCell>
                            {singleSelectEnabled && (
                                <Table.DataCell className="arbeidstidUkeTabell__endre" align="right">
                                    {renderEditButton(uke, ukenummer, false)}
                                </Table.DataCell>
                            )}
                        </Table.Row>
                    );
                })}
            </Table.Body>
        </Table>
    );
};

/** Uke, periode, normalarbeidstid og tagger samlet i én celle */
const KompakteUkeCeller = ({ uke, ukenummer, visNormalarbeidstid }: UkeCellsProps) => {
    const { intl } = useAppIntl();
    return (
        <Table.DataCell>
            <div>
                <AppText id="arbeidstidUkeTabell.compact.uke" values={{ ukenummer }} />
                <div>{getDateRangeText(uke.periode, intl.locale)}</div>
            </div>
            {visNormalarbeidstid && (
                <div>
                    <AppText
                        id="arbeidstidUkeTabell.compact.normalarbeidstid"
                        values={{
                            Varighet: () => (
                                <span className="arbeidstidUkeTabell__varighet">
                                    <DurationText duration={uke.opprinnelig.normalt} />
                                </span>
                            ),
                        }}
                    />
                </div>
            )}
            {(uke.harFeriedager || uke.harFjernetFeriedager || uke.erKortUke) && (
                <Box marginBlock="space-0 space-16">
                    <UkeTags
                        kortUkeTooltip={getKortUkeTooltipText(uke.periode)}
                        dagerMedFerie={uke.ferie?.dagerMedFerie}
                        dagerMedFjernetFerie={uke.ferie?.dagerMedFjernetFerie}
                        erKortUke={uke.erKortUke}
                    />
                </Box>
            )}
        </Table.DataCell>
    );
};

const UkeCeller = ({ uke, ukenummer, visNormalarbeidstid }: UkeCellsProps) => {
    const { intl } = useAppIntl();
    return (
        <>
            <Table.DataCell data-testid="ukenummer" className="arbeidstidUkeTabell__ukenummer">
                <AriaText>
                    <AppText id="arbeidstidUkeTabell.aria.uke" />
                </AriaText>{' '}
                {ukenummer}
            </Table.DataCell>
            <Table.DataCell data-testid="periode">
                <HStack justify="space-between" gap="space-8" wrap={false}>
                    <div>
                        {getDateRangeText(uke.periode, intl.locale)}
                        {(uke.harFeriedager || uke.harFjernetFeriedager) && (
                            <Box marginBlock="space-4">
                                <UkeTags
                                    dagerMedFerie={uke.ferie?.dagerMedFerie}
                                    dagerMedFjernetFerie={uke.ferie?.dagerMedFjernetFerie}
                                />
                            </Box>
                        )}
                    </div>
                    {uke.erKortUke && <UkeInfoTooltip uke={uke} />}
                </HStack>
            </Table.DataCell>
            {visNormalarbeidstid && (
                <Table.DataCell data-testid="normalt-timer">
                    <DurationText duration={uke.opprinnelig.normalt} />
                </Table.DataCell>
            )}
        </>
    );
};

export default ArbeidstidUkeTabell;
