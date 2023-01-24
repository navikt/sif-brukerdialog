import { Alert, BodyShort, Button, Checkbox, Table, Tooltip } from '@navikt/ds-react';
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { AddCircle, Edit } from '@navikt/ds-icons';
import DurationText from '@navikt/sif-common-core-ds/lib/components/duration-text/DurationText';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import { dateFormatter, DateRange, Duration, ISODateRange } from '@navikt/sif-common-utils/lib';
import dayjs from 'dayjs';
import { ArbeidsukeMetaData } from '../../types/K9Sak';
import ArbeidstidUkeInfo from './components/ArbeidstidUkeInfo';
import EditButton from './components/EditButton';
import { getPeriodeTekst } from './components/PeriodeTekst';
import './arbeidstidUkeTabell.scss';

export interface PeriodeIkkeSøktForListeItem {
    søktFor: false;
    isoDateRange: ISODateRange;
    periode: DateRange;
}
export interface PeriodeSøktForListeItem {
    søktFor: true;
    kanEndres: boolean;
    isoDateRange: ISODateRange;
    periode: DateRange;
    meta: ArbeidsukeMetaData;
    opprinnelig: {
        faktisk: Duration;
        normalt: Duration;
    };
    endret?: {
        endretProsent?: number;
        faktisk: Duration;
    };
}

export type ArbeidstidUkeTabellItem = PeriodeSøktForListeItem | PeriodeIkkeSøktForListeItem;

interface Props {
    listItems: ArbeidstidUkeTabellItem[];
    visNormaltid?: boolean;
    paginering?: {
        antall: number;
    };
    arbeidstidKolonneTittel?: string;
    triggerClearValgteUker?: number;
    onEndreUker?: (uke: ArbeidstidUkeTabellItem[]) => void;
}

const ArbeidstidUkeTabell: React.FunctionComponent<Props> = ({
    listItems,
    visNormaltid = true,
    paginering = {
        antall: 10,
    },
    arbeidstidKolonneTittel,
    triggerClearValgteUker,
    onEndreUker,
}) => {
    const antallUkerTotalt = listItems.length;
    const [antallSynlig, setAntallSynlig] = useState<number | undefined>(
        paginering ? Math.min(antallUkerTotalt, paginering.antall) : undefined
    );
    const [valgteUker, setValgteUker] = useState<string[]>([]);
    const renderAsList = useMediaQuery({ minWidth: 500 }) === false;
    const renderCompactTable = useMediaQuery({ minWidth: 736 }) === false && renderAsList === false;
    const kanVelgeFlereUker = onEndreUker !== undefined;

    useEffect(() => {
        setValgteUker([]);
    }, [triggerClearValgteUker]);

    const onToggleUke = (id: string, selected: boolean) => {
        if (selected) {
            setValgteUker(valgteUker.filter((ukeId) => ukeId !== id));
        } else {
            setValgteUker([...valgteUker, id]);
        }
    };

    const synligeUker = antallSynlig ? listItems.slice(0, antallSynlig) : listItems;

    const endreFlereUker = () => {
        if (!onEndreUker) {
            return;
        }
        onEndreUker(listItems.filter((uke) => valgteUker.includes(uke.isoDateRange)));
    };

    const renderEditButton = (uke: PeriodeSøktForListeItem, ukenummer: number) => {
        if (!onEndreUker || !uke.kanEndres) {
            return undefined;
        }

        const disabled =
            valgteUker.length > 1 && valgteUker.some((valgtUke) => valgtUke === uke.isoDateRange) === false;

        const title =
            valgteUker.length > 1 ? 'Endre valgte uker' : `Endre uke ${ukenummer} (${getPeriodeTekst(uke.periode)})`;

        return (
            <EditButton
                data-testid="endre-button"
                onClick={() => (valgteUker.length > 1 ? endreFlereUker() : onEndreUker([uke]))}
                disabled={disabled}
                title={title}
                aria-label={title}
            />
        );
    };

    const renderEndreUkerHeader = () => (
        <>
            <p>
                Dersom du skal endre lik arbeidstid for flere uker, kan du velge ukene i listen, og deretter velge
                &quot;Endre valgte uker&quot;.
            </p>
            <FormBlock margin="l" paddingBottom="m">
                <Button
                    data-testid="endre-flere-uker-button"
                    icon={<Edit role="presentation" aria-hidden={true} />}
                    variant="secondary"
                    type="button"
                    size="small"
                    disabled={valgteUker.length === 0}
                    onClick={endreFlereUker}>
                    Endre valgte uker
                </Button>
            </FormBlock>
        </>
    );

    const renderEndreUkerFooter = () => (
        <FormBlock margin="l" paddingBottom="m">
            <Button
                icon={<Edit role="presentation" aria-hidden={true} />}
                variant="secondary"
                type="button"
                size="small"
                disabled={valgteUker.length === 0}
                onClick={endreFlereUker}>
                Endre valgte uker
            </Button>
        </FormBlock>
    );

    if (renderAsList) {
        return (
            <>
                {kanVelgeFlereUker && renderEndreUkerHeader()}

                <ol className="arbeidstidUkeListe">
                    {synligeUker.map((uke) => {
                        const ukenummer = dayjs(uke.periode.from).isoWeek();
                        const ukePeriodeTekstId = `id-${uke.isoDateRange}`;
                        const selected = onEndreUker !== undefined && valgteUker.includes(uke.isoDateRange);

                        if (uke.søktFor === false) {
                            return <li key={uke.isoDateRange}>Periode ikke søkt for</li>;
                        }
                        return (
                            <li key={uke.isoDateRange}>
                                <div className="arbeidstidUke">
                                    {kanVelgeFlereUker && (
                                        <div className="arbeidstidUke__velgUke">
                                            <Checkbox
                                                hideLabel
                                                checked={selected}
                                                onChange={() => {
                                                    onToggleUke(uke.isoDateRange, selected);
                                                }}
                                                aria-labelledby={ukePeriodeTekstId}>
                                                {' '}
                                            </Checkbox>
                                        </div>
                                    )}
                                    <div className="arbeidstidUke__info" id={ukePeriodeTekstId}>
                                        <BodyShort>
                                            Uke {ukenummer}: {dateFormatter.compact(uke.periode.from)} - {` `}
                                            {dateFormatter.compact(uke.periode.to)}
                                        </BodyShort>
                                        <div style={{ padding: '.5rem 0' }}>
                                            <ArbeidstidUkeInfo uke={uke} visOpprinneligTid={true} medLabels={true} />
                                        </div>
                                        {visNormaltid && (
                                            <BodyShort size="small">
                                                Normalarbeidstid:{` `}
                                                <span style={{ whiteSpace: 'nowrap' }}>
                                                    <DurationText duration={uke.opprinnelig.normalt} />
                                                </span>
                                            </BodyShort>
                                        )}
                                    </div>
                                    <div className="arbeidstidUke__endre">{renderEditButton(uke, ukenummer)}</div>
                                </div>
                            </li>
                        );
                    })}
                </ol>
                {kanVelgeFlereUker && renderEndreUkerFooter()}
            </>
        );
    }

    return (
        <div className="arbeidstidUkeTabell">
            {kanVelgeFlereUker && renderEndreUkerHeader()}

            <Table>
                <Table.Header>
                    <Table.Row>
                        {kanVelgeFlereUker && (
                            <Table.DataCell>
                                <Checkbox
                                    checked={valgteUker.length === synligeUker.length}
                                    indeterminate={valgteUker.length > 0 && valgteUker.length !== synligeUker.length}
                                    onChange={() => {
                                        valgteUker.length
                                            ? setValgteUker([])
                                            : setValgteUker(
                                                  synligeUker
                                                      .filter((uke) => uke.søktFor && uke.kanEndres)
                                                      .map(({ isoDateRange }) => isoDateRange)
                                              );
                                    }}
                                    hideLabel>
                                    Velg alle uker i tabellen
                                </Checkbox>
                            </Table.DataCell>
                        )}
                        {renderCompactTable && <Table.HeaderCell>Periode</Table.HeaderCell>}
                        {!renderCompactTable && (
                            <>
                                <Table.HeaderCell style={{ width: '0' }}>Uke</Table.HeaderCell>
                                <Table.HeaderCell>Periode</Table.HeaderCell>
                                {visNormaltid && (
                                    <Table.HeaderCell>
                                        <Tooltip content="Hvor mye du jobber normalt når du ikke har pleiepenger">
                                            <span>Normal arbeidstid</span>
                                        </Tooltip>
                                    </Table.HeaderCell>
                                )}
                            </>
                        )}

                        <Table.HeaderCell>
                            {arbeidstidKolonneTittel || (
                                <>
                                    <Tooltip content="Hvor mye du faktisk jobber når du har pleiepenger">
                                        <span>Faktisk arbeidstid</span>
                                    </Tooltip>
                                </>
                            )}
                        </Table.HeaderCell>
                        {onEndreUker && <Table.HeaderCell>Endre</Table.HeaderCell>}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {synligeUker.map((uke) => {
                        const ukenummer = dayjs(uke.periode.from).isoWeek();
                        const ukePeriodeTekstId = `id-${uke.isoDateRange}`;

                        const selected = onEndreUker !== undefined && valgteUker.includes(uke.isoDateRange);
                        if (uke.søktFor === false) {
                            return (
                                <Table.Row key={uke.isoDateRange} className="arbeidstidUkeTabell__ikkeSøktForPeriode">
                                    <Table.DataCell colSpan={10}>
                                        <Alert variant="info" inline={false}>
                                            Det er ikke søkt om pleiepenger i periode fra{' '}
                                            {dateFormatter.dayDateMonthYear(uke.periode.from)} til{' '}
                                            {dateFormatter.dayDateMonthYear(uke.periode.to)}.
                                        </Alert>
                                    </Table.DataCell>
                                </Table.Row>
                            );
                        }

                        return (
                            <Table.Row
                                key={uke.isoDateRange}
                                selected={selected}
                                style={{ verticalAlign: 'top' }}
                                data-testid={`uke_${ukenummer}`}>
                                {kanVelgeFlereUker && (
                                    <Table.DataCell style={{ width: '0' }}>
                                        {uke.kanEndres && (
                                            <Checkbox
                                                hideLabel
                                                checked={selected}
                                                onChange={() => {
                                                    onToggleUke(uke.isoDateRange, selected);
                                                }}
                                                aria-labelledby={ukePeriodeTekstId}>
                                                {' '}
                                            </Checkbox>
                                        )}
                                    </Table.DataCell>
                                )}
                                {renderCompactTable && (
                                    <Table.DataCell>
                                        <div id={ukePeriodeTekstId}>
                                            Uke {ukenummer}
                                            <br />
                                            {dateFormatter.compact(uke.periode.from)} - {` `}
                                            {dateFormatter.compact(uke.periode.to)}
                                        </div>
                                        {visNormaltid && (
                                            <div>
                                                Normal arbeidstid:{` `}
                                                <DurationText duration={uke.opprinnelig.normalt} />
                                            </div>
                                        )}
                                    </Table.DataCell>
                                )}
                                {!renderCompactTable && (
                                    <>
                                        <Table.DataCell data-testid="ukenummer">{ukenummer}</Table.DataCell>
                                        <Table.DataCell style={{ minWidth: '15rem' }} data-testid="periode">
                                            <div id={ukePeriodeTekstId}>{getPeriodeTekst(uke.periode)}</div>
                                        </Table.DataCell>
                                        {visNormaltid && (
                                            <Table.DataCell data-testid="normalt-timer">
                                                <DurationText duration={uke.opprinnelig.normalt} />
                                            </Table.DataCell>
                                        )}
                                    </>
                                )}
                                <Table.DataCell data-testid="arbeidstid-faktisk">
                                    <ArbeidstidUkeInfo uke={uke} />
                                </Table.DataCell>
                                <Table.DataCell style={{ width: '0' }}>
                                    {renderEditButton(uke, ukenummer)}
                                </Table.DataCell>
                            </Table.Row>
                        );
                    })}
                </Table.Body>
            </Table>
            {paginering && antallSynlig !== undefined && antallSynlig < antallUkerTotalt && (
                <FormBlock margin="m">
                    <div style={{ textAlign: 'center' }}>
                        <Button
                            variant="tertiary"
                            icon={<AddCircle role="presentation" aria-hidden={true} />}
                            type="button"
                            onClick={() =>
                                setAntallSynlig(Math.min(antallSynlig + paginering?.antall, antallUkerTotalt))
                            }>
                            Last inn flere uker
                        </Button>
                    </div>
                </FormBlock>
            )}
            {kanVelgeFlereUker && renderEndreUkerFooter()}
        </div>
    );
};

export default ArbeidstidUkeTabell;
