import { Alert, Button, Checkbox, Table, Tooltip } from '@navikt/ds-react';
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
    const compactTable = useMediaQuery({ minWidth: 736 }) === false;
    const kanVelgeFlereUker = onEndreUker && compactTable === false;

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
                onClick={() => (valgteUker.length > 1 ? endreFlereUker() : onEndreUker([uke]))}
                disabled={disabled}
                title={title}
                aria-label={title}
            />
        );
    };

    return (
        <div className="arbeidstidUkeTabell">
            {kanVelgeFlereUker && (
                <>
                    <p>Marker ukene du ønsker å endre lik arbeidstid for</p>
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
                </>
            )}

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
                        {compactTable && <Table.HeaderCell>Periode</Table.HeaderCell>}
                        {!compactTable && (
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
                            <Table.Row key={uke.isoDateRange} selected={selected} style={{ verticalAlign: 'top' }}>
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
                                {compactTable && (
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
                                {!compactTable && (
                                    <>
                                        <Table.DataCell>{ukenummer}</Table.DataCell>
                                        <Table.DataCell style={{ minWidth: '15rem' }}>
                                            <div id={ukePeriodeTekstId}>{getPeriodeTekst(uke.periode)}</div>
                                        </Table.DataCell>
                                        {visNormaltid && (
                                            <Table.DataCell>
                                                <DurationText duration={uke.opprinnelig.normalt} />
                                            </Table.DataCell>
                                        )}
                                    </>
                                )}
                                <Table.DataCell>
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
            {kanVelgeFlereUker && (
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
            )}
        </div>
    );
};

export default ArbeidstidUkeTabell;
