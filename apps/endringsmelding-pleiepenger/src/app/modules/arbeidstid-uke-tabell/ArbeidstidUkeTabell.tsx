import { BodyShort, Button, Checkbox, Heading, Table, Tooltip } from '@navikt/ds-react';
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { AddCircle } from '@navikt/ds-icons';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import DurationText from '@navikt/sif-common-core-ds/lib/components/duration-text/DurationText';
import { dateFormatter, DateRange, Duration, getDateRangeText, ISODateRange } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import EditButton from '../../components/buttons/EditButton';
import { usePagination } from '../../hooks/usePagination';
import { useSelectableList } from '../../hooks/useSelectableList';
import ArbeidstidUkeInfo from './components/ArbeidstidUkeInfo';
import ArbeidstidUkeInfoListe from './components/ArbeidstidUkeInfoListe';
import EndreUkerFooter from './components/EndreUkerFooter';
import EndreUkerHeader from './components/EndreUkerHeader';
import UkeInfoIkon from './components/UkeInfo';
import UkeTags from './components/UkeTags';
import './arbeidstidUkeTabell.scss';

export interface ArbeidstidUkeTabellItem {
    id: string;
    kanEndres: boolean;
    kanVelges: boolean;
    isoDateRange: ISODateRange;
    periode: DateRange;
    antallDagerMedArbeidstid: number;
    erKortUke: boolean;
    harFeriedager?: boolean;
    harFjernetFeriedager?: boolean;
    ferie?: {
        dagerMedFerie: Date[];
        dagerMedFjernetFerie: Date[];
    };
    opprinnelig: {
        faktisk?: Duration;
        normalt: Duration;
    };
    endret?: {
        endretProsent?: number;
        faktisk: Duration;
    };
}

interface Props {
    arbeidsaktivitetKey: string;
    listItems: ArbeidstidUkeTabellItem[];
    visNormaltid?: boolean;
    paginering?: {
        antall: number;
    };
    periode?: DateRange;
    arbeidstidKolonneTittel?: string;
    triggerResetValg?: number;
    visEndringSomOpprinnelig?: boolean;
    onEndreUker?: (uke: ArbeidstidUkeTabellItem[]) => void;
}

const ArbeidstidUkeTabell: React.FunctionComponent<Props> = ({
    listItems,
    visNormaltid = true,
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
    const { visibleItems, totalItemsCount, visibleItemsCount, showMoreItems, showAllItems } =
        usePagination<ArbeidstidUkeTabellItem>(listItems, 3);

    const {
        listState: { showSelectItems, selectedItems },
        setShowSelectItems,
        setSelectedItems,
        setItemSelected,
        isItemSelected,
    } = useSelectableList<ArbeidstidUkeTabellItem>({ items: listItems });

    const [visMeldingOmUkerMåVelges, setVisMeldingOmUkerMåVelges] = useState<boolean>(false);
    const renderAsList = useMediaQuery({ minWidth: 500 }) === false;
    const renderCompactTable = useMediaQuery({ minWidth: 736 }) === false && renderAsList === false;
    const kanVelgeFlereUker = onEndreUker !== undefined && totalItemsCount > 1;
    const kanEndreEnkeltuke = onEndreUker && showSelectItems !== true;

    const korteUker = visibleItems.filter((i) => i.erKortUke).map((uke) => uke.periode);
    const ukerMedFerie = visibleItems
        .filter((i) => i.ferie && i.ferie?.dagerMedFerie.length > 0)
        .map((uke) => uke.periode);

    useEffect(() => {
        setSelectedItems([]);
        setShowSelectItems(false);
    }, [triggerResetValg, setSelectedItems, setShowSelectItems]);

    const onToggleUke = (uke: ArbeidstidUkeTabellItem, selected: boolean) => {
        setVisMeldingOmUkerMåVelges(false);
        setItemSelected(uke, selected);
    };

    const endreFlereUker = () => {
        if (!onEndreUker) {
            return;
        }
        onEndreUker(listItems.filter((uke) => selectedItems.includes(uke.isoDateRange)));
    };

    const renderEditButton = (uke: ArbeidstidUkeTabellItem, ukenummer: number, renderLabel: boolean) => {
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
                    selectedItems.length > 1 ? endreFlereUker() : onEndreUker([uke]);
                }}
                title={title}
                aria-label={title}>
                {renderLabel && <>Endre arbeidstid</>}
            </EditButton>
        );
    };

    const renderEndreUkerHeader = () => (
        <EndreUkerHeader
            periode={periode}
            onChange={(checked) => {
                setShowSelectItems(checked);
                setVisMeldingOmUkerMåVelges(false);
                setSelectedItems([]);
            }}
            checked={showSelectItems}
            visKorteUkerMelding={showSelectItems && (ukerMedFerie.length > 0 || korteUker.length > 0)}
        />
    );

    const renderLastInnFlereUker = () => {
        if (paginering && visibleItemsCount !== undefined && visibleItemsCount < totalItemsCount) {
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
                {kanVelgeFlereUker && showSelectItems && (
                    <EndreUkerFooter
                        antallValgteUker={selectedItems.length}
                        visVelgUkerMelding={visMeldingOmUkerMåVelges && selectedItems.length === 0}
                        onEndreUker={() => {
                            if (selectedItems.length === 0) {
                                setVisMeldingOmUkerMåVelges(true);
                                return;
                            }
                            endreFlereUker();
                        }}
                    />
                )}
            </>
        );
    };

    if (renderAsList) {
        return (
            <>
                {kanVelgeFlereUker && renderEndreUkerHeader()}

                <div className="arbeidstidUkeListeWrapper">
                    <ol className="arbeidstidUkeListe">
                        {visibleItems.map((uke) => {
                            const ukenummer = dayjs(uke.periode.from).isoWeek();
                            const ukePeriodeTekstId = `${arbeidsaktivitetKey}_${uke.isoDateRange}`;
                            const selected = onEndreUker !== undefined && isItemSelected(uke);

                            return (
                                <li key={uke.isoDateRange} className={`${selected ? 'arbeidstidUke--valgt' : ''}`}>
                                    <div
                                        className={`arbeidstidUke${showSelectItems ? ' arbeidstidUke--velgUker' : ''}`}>
                                        {showSelectItems && (
                                            <div className="arbeidstidUke__velgUke">
                                                {uke.kanEndres && uke.kanVelges && (
                                                    <Checkbox
                                                        hideLabel
                                                        checked={selected}
                                                        onChange={() => {
                                                            onToggleUke(uke, selected);
                                                        }}
                                                        aria-labelledby={ukePeriodeTekstId}>
                                                        {' '}
                                                    </Checkbox>
                                                )}
                                            </div>
                                        )}
                                        <div className="arbeidstidUke__info" id={ukePeriodeTekstId}>
                                            <Heading level="3" size="xsmall">
                                                Uke {ukenummer}{' '}
                                            </Heading>

                                            <BodyShort as="div">
                                                {dateFormatter.compact(uke.periode.from)} - {` `}
                                                {dateFormatter.compact(uke.periode.to)}
                                                <Block margin="s">
                                                    <UkeTags
                                                        erKortUke={uke.erKortUke}
                                                        dagerMedFerie={uke.ferie?.dagerMedFerie}
                                                        dagerMedFjernetFerie={uke.ferie?.dagerMedFjernetFerie}
                                                    />
                                                </Block>
                                            </BodyShort>
                                            <div style={{ padding: '.5rem 0' }}>
                                                <ArbeidstidUkeInfoListe
                                                    uke={uke}
                                                    visEndringSomOpprinnelig={visEndringSomOpprinnelig}
                                                />
                                            </div>
                                        </div>
                                        {kanEndreEnkeltuke && (
                                            <div className="arbeidstidUke__endre">
                                                {renderEditButton(uke, ukenummer, true)}
                                            </div>
                                        )}
                                    </div>
                                </li>
                            );
                        })}
                    </ol>
                    {renderUkerFooter()}
                </div>
            </>
        );
    }

    return (
        <div className="arbeidstidUkeTabell">
            {kanVelgeFlereUker && renderEndreUkerHeader()}

            <div className="arbeidstidUkeListeWrapper">
                <Table className="arbeidstidUkeTabell">
                    <Table.Header>
                        <Table.Row>
                            {showSelectItems && (
                                <Table.DataCell className="arbeidstidUkeTabell__velgUke">
                                    <Checkbox
                                        checked={selectedItems.length === visibleItems.length}
                                        indeterminate={
                                            selectedItems.length > 0 && selectedItems.length !== visibleItems.length
                                        }
                                        onChange={() => {
                                            selectedItems.length
                                                ? setSelectedItems([])
                                                : setSelectedItems(
                                                      visibleItems
                                                          .filter((uke) => uke.kanEndres && uke.kanVelges)
                                                          .map(({ isoDateRange }) => isoDateRange)
                                                  );
                                        }}
                                        hideLabel>
                                        Velg alle uker i tabellen
                                    </Checkbox>
                                </Table.DataCell>
                            )}
                            {renderCompactTable && (
                                <Table.HeaderCell className="arbeidstidUkeTabell__periode--kompakt">
                                    Uke
                                </Table.HeaderCell>
                            )}
                            {!renderCompactTable && (
                                <>
                                    <Table.HeaderCell className="arbeidstidUkeTabell__ukenummer">Uke</Table.HeaderCell>
                                    <Table.HeaderCell className="arbeidstidUkeTabell__periode">Dato</Table.HeaderCell>
                                    {visNormaltid && (
                                        <Table.HeaderCell className="arbeidstidUkeTabell__normalt">
                                            <Tooltip content="Hvor mye du jobber normalt når du ikke har pleiepenger">
                                                <span>Normalt</span>
                                            </Tooltip>
                                        </Table.HeaderCell>
                                    )}
                                </>
                            )}

                            <Table.HeaderCell className="arbeidstidUkeTabell__faktisk">
                                {arbeidstidKolonneTittel || (
                                    <>
                                        <Tooltip content="Hvor mye du jobber i pleiepengeperioden">
                                            <span>I perioden</span>
                                        </Tooltip>
                                    </>
                                )}
                            </Table.HeaderCell>
                            {kanEndreEnkeltuke && (
                                <Table.HeaderCell className="arbeidstidUkeTabell__endre">Endre</Table.HeaderCell>
                            )}
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {visibleItems.map((uke) => {
                            const ukenummer = dayjs(uke.periode.from).isoWeek();
                            const ukePeriodeTekstId = `id-${uke.isoDateRange}`;

                            const selected = onEndreUker !== undefined && selectedItems.includes(uke.isoDateRange);

                            return (
                                <Table.Row
                                    key={uke.isoDateRange}
                                    selected={selected}
                                    style={{ verticalAlign: 'top' }}
                                    data-testid={`uke_${ukenummer}`}>
                                    {showSelectItems && (
                                        <Table.DataCell className="arbeidstidUkeTabell__velgUke">
                                            {uke.kanEndres && uke.kanVelges && (
                                                <Checkbox
                                                    hideLabel
                                                    checked={selected}
                                                    onChange={() => {
                                                        onToggleUke(uke, selected);
                                                    }}
                                                    aria-labelledby={ukePeriodeTekstId}>
                                                    {' '}
                                                </Checkbox>
                                            )}
                                        </Table.DataCell>
                                    )}
                                    {renderCompactTable && (
                                        <Table.DataCell className="arbeidstidUkeTabell__periode--kompakt">
                                            <div id={ukePeriodeTekstId}>
                                                Uke {ukenummer}
                                                <br />
                                                {dateFormatter.compact(uke.periode.from)} - {` `}
                                                {dateFormatter.compact(uke.periode.to)}
                                            </div>
                                            {visNormaltid && (
                                                <div>
                                                    Normal arbeidstid:{` `}
                                                    <span style={{ whiteSpace: 'nowrap' }}>
                                                        <DurationText duration={uke.opprinnelig.normalt} />
                                                    </span>
                                                </div>
                                            )}

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
                                            <Table.DataCell
                                                data-testid="ukenummer"
                                                className="arbeidstidUkeTabell__ukenummer">
                                                {ukenummer}
                                            </Table.DataCell>
                                            <Table.DataCell
                                                data-testid="periode"
                                                className="arbeidstidUkeTabell__periode">
                                                <div id={ukePeriodeTekstId}>
                                                    <div className="arbeidsukeTidsrom">
                                                        <span className="arbeidsukeTidsrom__tekst">
                                                            {getDateRangeText(uke.periode)}
                                                            {(uke.harFeriedager || uke.harFjernetFeriedager) && (
                                                                <Block margin="s">
                                                                    <UkeTags
                                                                        dagerMedFerie={uke.ferie?.dagerMedFerie}
                                                                        dagerMedFjernetFerie={
                                                                            uke.ferie?.dagerMedFjernetFerie
                                                                        }
                                                                    />
                                                                </Block>
                                                            )}
                                                        </span>
                                                        <span className="arbeidsukeTidsrom__info">
                                                            {uke.erKortUke && <UkeInfoIkon uke={uke} />}
                                                            {/* {uke.harFjernetFeriedager && <FjernetFerieIkon uke={uke} />} */}
                                                        </span>
                                                    </div>
                                                </div>
                                            </Table.DataCell>
                                            {visNormaltid && (
                                                <Table.DataCell
                                                    data-testid="normalt-timer"
                                                    className="arbeidstidUkeTabell__normalt">
                                                    <DurationText duration={uke.opprinnelig.normalt} />
                                                </Table.DataCell>
                                            )}
                                        </>
                                    )}
                                    <Table.DataCell
                                        data-testid="arbeidstid-faktisk"
                                        className="arbeidstidUkeTabell__faktisk">
                                        <ArbeidstidUkeInfo
                                            uke={uke}
                                            visEndringSomOpprinnelig={visEndringSomOpprinnelig}
                                        />
                                    </Table.DataCell>
                                    {kanEndreEnkeltuke && (
                                        <Table.DataCell className="arbeidstidUkeTabell__endre">
                                            {renderEditButton(uke, ukenummer, false)}
                                        </Table.DataCell>
                                    )}
                                </Table.Row>
                            );
                        })}
                    </Table.Body>
                </Table>
                {renderUkerFooter()}
            </div>
        </div>
    );
};

export default ArbeidstidUkeTabell;
