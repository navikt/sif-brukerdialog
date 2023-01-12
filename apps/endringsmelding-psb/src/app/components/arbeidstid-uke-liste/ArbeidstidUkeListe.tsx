import { Alert, Button, Checkbox, Table } from '@navikt/ds-react';
import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { AddCircle, Edit } from '@navikt/ds-icons';
import DurationText from '@navikt/sif-common-core-ds/lib/components/duration-text/DurationText';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import { dateFormatter, DateRange, Duration, ISODateRange } from '@navikt/sif-common-utils/lib';
import dayjs from 'dayjs';
import ArbeidstidUkeInfo from './components/ArbeidstidUkeInfo';
import EditButton from './components/EditButton';
import PeriodeTekst from './components/PeriodeTekst';
import './arbeidstidUkeList.scss';

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
    antallDager: number;
    opprinnelig: {
        faktisk: Duration;
        normalt: Duration;
    };
    endret?: {
        endretProsent?: number;
        faktisk: Duration;
    };
}

export type ArbeidstidUkeListeItem = PeriodeSøktForListeItem | PeriodeIkkeSøktForListeItem;

interface Props {
    arbeidsuker: ArbeidstidUkeListeItem[];
    visNormaltid?: boolean;
    paginering?: {
        antall: number;
    };
    arbeidstidKolonneTittel?: string;
    onEndreUker?: (uke: ArbeidstidUkeListeItem[]) => void;
}

const ArbeidstidUkeListe: React.FunctionComponent<Props> = ({
    arbeidsuker,
    visNormaltid,
    paginering = {
        antall: 10,
    },
    arbeidstidKolonneTittel = 'Arbeidstid',
    onEndreUker,
}) => {
    const antallUkerTotalt = arbeidsuker.length;
    const [antallSynlig, setAntallSynlig] = useState<number | undefined>(
        paginering ? Math.min(antallUkerTotalt, paginering.antall) : undefined
    );
    const [valgteUker, setValgteUker] = useState<string[]>([]);
    const compactTable = useMediaQuery({ minWidth: 736 }) === false;

    const onToggleUke = (id: string, selected: boolean) => {
        if (selected) {
            setValgteUker(valgteUker.filter((ukeId) => ukeId !== id));
        } else {
            setValgteUker([...valgteUker, id]);
        }
    };

    const synligeUker = antallSynlig ? arbeidsuker.slice(0, antallSynlig) : arbeidsuker;

    const endreFlereUker = () => {
        if (!onEndreUker) {
            return;
        }
        onEndreUker(arbeidsuker.filter((uke) => valgteUker.includes(uke.isoDateRange)));
    };

    const renderEditButton = (uke: PeriodeSøktForListeItem) => {
        if (!onEndreUker || !uke.kanEndres) {
            return undefined;
        }

        const disabled =
            valgteUker.length > 1 && valgteUker.some((valgtUke) => valgtUke === uke.isoDateRange) === false;

        return (
            <EditButton
                onClick={() => (valgteUker.length > 1 ? endreFlereUker() : onEndreUker([uke]))}
                disabled={disabled}
            />
        );
    };

    return (
        <div className="arbeidstidUkeList">
            {onEndreUker && (
                <>
                    <p>Marker ukene du ønsker å endre lik arbeidstid for</p>
                    <FormBlock margin="l" paddingBottom="m">
                        <Button
                            icon={<Edit />}
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
                        {onEndreUker && (
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
                                {visNormaltid && <Table.HeaderCell>Normal arbeidstid</Table.HeaderCell>}
                            </>
                        )}

                        <Table.HeaderCell>{arbeidstidKolonneTittel}</Table.HeaderCell>
                        {onEndreUker && <Table.HeaderCell>Endre</Table.HeaderCell>}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {synligeUker.map((uke) => {
                        const ukenummer = dayjs(uke.periode.from).isoWeek();
                        const selected = onEndreUker !== undefined && valgteUker.includes(uke.isoDateRange);
                        if (uke.søktFor === false) {
                            return (
                                <Table.Row key={uke.isoDateRange} className="arbeidstidUkeList__ikkeSøktForPeriode">
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
                                {onEndreUker && (
                                    <Table.DataCell style={{ width: '0' }}>
                                        {uke.kanEndres && (
                                            <Checkbox
                                                hideLabel
                                                checked={selected}
                                                onChange={() => {
                                                    onToggleUke(uke.isoDateRange, selected);
                                                }}
                                                aria-labelledby={`id-${uke.isoDateRange}`}>
                                                {' '}
                                            </Checkbox>
                                        )}
                                    </Table.DataCell>
                                )}
                                {compactTable && (
                                    <Table.DataCell style={{ minWidth: '12rem' }}>
                                        <div id={`id-${uke.isoDateRange}`}>
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
                                            <div id={`id-${uke.isoDateRange}`}>
                                                <PeriodeTekst periode={uke.periode} />
                                            </div>
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
                                <Table.DataCell style={{ width: '0' }}>{renderEditButton(uke)}</Table.DataCell>
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
                            icon={<AddCircle />}
                            type="button"
                            onClick={() =>
                                setAntallSynlig(Math.min(antallSynlig + paginering?.antall, antallUkerTotalt))
                            }>
                            Last inn flere uker
                        </Button>
                    </div>
                </FormBlock>
            )}
            {onEndreUker && (
                <FormBlock margin="l" paddingBottom="m">
                    <Button
                        icon={<Edit />}
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

export default ArbeidstidUkeListe;
