import { Checkbox, Table, Tooltip } from '@navikt/ds-react';
import React from 'react';
import AriaText from '@navikt/sif-common-core-ds/src/atoms/aria-text/AriaText';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { DurationText } from '@navikt/sif-common-ui';
import { dateFormatter, getDateRangeText } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import { SelectableListType } from '../../../hooks/useSelectableList';
import { ArbeidstidUkerItem } from '../ArbeidstidUkerItem';
import ArbeidstidUkeInfo from './ArbeidstidUkeInfo';
import UkeInfoIkon from './UkeInfo';
import UkeTags from './UkeTags';
import VelgArbeidsukeItem from './VelgArbeidsukeItem';
import { useIntl } from 'react-intl';

interface Props {
    uker: ArbeidstidUkerItem[];
    selectableList: SelectableListType<ArbeidstidUkerItem>;
    visEndringSomOpprinnelig?: boolean;
    renderCompactTable: boolean;
    arbeidstidKolonneTittel?: string;
    renderEditButton: (uke: ArbeidstidUkerItem, ukenummer: number, renderLabel: boolean) => JSX.Element | undefined;
    renderUkerFooter: () => JSX.Element;
}

const ArbeidstidUkeTabell: React.FunctionComponent<Props> = ({
    uker,
    visEndringSomOpprinnelig,
    selectableList,
    arbeidstidKolonneTittel,
    renderCompactTable,
    renderEditButton,
}) => {
    const { locale } = useIntl();
    const {
        isItemSelected,
        setItemSelected,
        setShowSelectItemsMessage,
        setSelectedItems,
        listState: { itemsAreSelectable, singleSelectEnabled, selectedItems },
    } = selectableList;

    return (
        <Table className="arbeidstidUkeTabell">
            <Table.Header>
                <Table.Row>
                    {itemsAreSelectable && (
                        <Table.HeaderCell className="arbeidstidUkeTabell__velgUke">
                            <AriaText>Velg uke</AriaText>
                            <Checkbox
                                checked={selectedItems.length === uker.length}
                                indeterminate={selectedItems.length > 0 && selectedItems.length !== uker.length}
                                onChange={() => {
                                    setShowSelectItemsMessage(false);
                                    selectedItems.length
                                        ? setSelectedItems([])
                                        : setSelectedItems(uker.filter((uke) => uke.kanEndres && uke.kanVelges));
                                }}
                                hideLabel>
                                Velg alle uker i tabellen
                            </Checkbox>
                        </Table.HeaderCell>
                    )}
                    {renderCompactTable && <Table.HeaderCell>Uke</Table.HeaderCell>}
                    {!renderCompactTable && (
                        <>
                            <Table.HeaderCell className="arbeidstidUker__ukenummer">Uke</Table.HeaderCell>
                            <Table.HeaderCell className="arbeidstidUker__periode">Dato</Table.HeaderCell>
                            <Table.HeaderCell className="arbeidstidUker__normalt">
                                <Tooltip content="Hvor mye du jobber normalt når du ikke har pleiepenger">
                                    <span>Normalt</span>
                                </Tooltip>
                            </Table.HeaderCell>
                        </>
                    )}

                    <Table.HeaderCell className="arbeidstidUker__faktisk">
                        {arbeidstidKolonneTittel || (
                            <>
                                <Tooltip content="Hvor mye du jobber i pleiepengeperioden">
                                    <span>I perioden</span>
                                </Tooltip>
                            </>
                        )}
                    </Table.HeaderCell>

                    {singleSelectEnabled && (
                        <Table.HeaderCell className="arbeidstidUker__endre">Endre</Table.HeaderCell>
                    )}
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {uker.map((uke) => {
                    const ukenummer = dayjs(uke.periode.from).isoWeek();
                    const selected = isItemSelected(uke);

                    return (
                        <Table.Row
                            key={uke.isoDateRange}
                            selected={selected}
                            style={{ verticalAlign: 'top' }}
                            data-testid={`uke_${ukenummer}`}>
                            {itemsAreSelectable && (
                                <Table.DataCell className="arbeidstidUkeTabell__velgUke">
                                    <VelgArbeidsukeItem
                                        uke={uke}
                                        selected={selected}
                                        onChange={() => setItemSelected(uke, selected)}
                                    />
                                </Table.DataCell>
                            )}
                            {renderCompactTable && (
                                <Table.DataCell>
                                    <div>
                                        Uke {ukenummer}
                                        <div>
                                            {dateFormatter.compact(uke.periode.from)} - {` `}
                                            {dateFormatter.compact(uke.periode.to)}
                                        </div>
                                    </div>

                                    <div>
                                        Normal arbeidstid:{` `}
                                        <span style={{ whiteSpace: 'nowrap' }}>
                                            <DurationText duration={uke.opprinnelig.normalt} />
                                        </span>
                                    </div>

                                    {(uke.harFeriedager || uke.harFjernetFeriedager || uke.erKortUke) && (
                                        <Block margin="s">
                                            <UkeTags
                                                dagerMedFerie={uke.ferie?.dagerMedFerie}
                                                dagerMedFjernetFerie={uke.ferie?.dagerMedFjernetFerie}
                                                erKortUke={uke.erKortUke}
                                            />
                                        </Block>
                                    )}
                                </Table.DataCell>
                            )}
                            {!renderCompactTable && (
                                <>
                                    <Table.DataCell data-testid="ukenummer" className="arbeidstidUker__ukenummer">
                                        <AriaText>Uke</AriaText> {ukenummer}
                                    </Table.DataCell>
                                    <Table.DataCell data-testid="periode" className="arbeidstidUker__periode">
                                        <div>
                                            <div className="arbeidsukeTidsrom">
                                                <span className="arbeidsukeTidsrom__tekst">
                                                    {getDateRangeText(uke.periode, locale)}
                                                    {(uke.harFeriedager || uke.harFjernetFeriedager) && (
                                                        <Block margin="s">
                                                            <UkeTags
                                                                dagerMedFerie={uke.ferie?.dagerMedFerie}
                                                                dagerMedFjernetFerie={uke.ferie?.dagerMedFjernetFerie}
                                                            />
                                                        </Block>
                                                    )}
                                                </span>
                                                <span className="arbeidsukeTidsrom__info">
                                                    {uke.erKortUke && <UkeInfoIkon uke={uke} />}
                                                </span>
                                            </div>
                                        </div>
                                    </Table.DataCell>
                                    <Table.DataCell data-testid="normalt-timer" className="arbeidstidUker__normalt">
                                        <DurationText duration={uke.opprinnelig.normalt} />
                                    </Table.DataCell>
                                </>
                            )}
                            <Table.DataCell data-testid="arbeidstid-faktisk" className="arbeidstidUker__faktisk">
                                <ArbeidstidUkeInfo uke={uke} visEndringSomOpprinnelig={visEndringSomOpprinnelig} />
                            </Table.DataCell>
                            {singleSelectEnabled && (
                                <Table.DataCell className="arbeidstidUker__endre">
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

export default ArbeidstidUkeTabell;
