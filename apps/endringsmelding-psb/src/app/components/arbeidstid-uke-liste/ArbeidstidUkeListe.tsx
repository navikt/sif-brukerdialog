import { Alert, Button, Checkbox, Table } from '@navikt/ds-react';
import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { AddCircle, Edit } from '@navikt/ds-icons';
import DurationText from '@navikt/sif-common-core-ds/lib/components/duration-text/DurationText';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import { dateFormatter, DateRange, Duration, durationUtils, ISODateRange } from '@navikt/sif-common-utils/lib';
import dayjs from 'dayjs';
import './arbeidstidUkeList.scss';

export interface PeriodeIkkeSøktForListeItem {
    søktFor: false;
    isoDateRange: ISODateRange;
    periode: DateRange;
}
export interface PeriodeSøktForListeItem {
    søktFor: true;
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

type OnVelgUkeType = (uke: ArbeidstidUkeListeItem) => void;
type OnVelgUkerType = (uke: ArbeidstidUkeListeItem[]) => void;

interface Props {
    arbeidsuker: ArbeidstidUkeListeItem[];
    visNormaltid?: boolean;
    paginering?: {
        antall: number;
    };

    arbeidstidKolonneTittel?: string;
    onVelgUke?: OnVelgUkeType;
    onVelgUker?: OnVelgUkerType;
}

const ArbeidstidUkeListe: React.FunctionComponent<Props> = ({
    arbeidsuker,
    visNormaltid = true,
    paginering = {
        antall: 10,
    },

    arbeidstidKolonneTittel = 'Arbeid i periode',
    onVelgUke,
    onVelgUker,
}) => {
    const antallUkerTotalt = arbeidsuker.length;
    const [antallSynlig, setAntallSynlig] = useState<number | undefined>(
        paginering ? Math.min(antallUkerTotalt, paginering.antall) : undefined
    );
    const [valgteUker, setValgteUker] = useState<string[]>([]);

    const isWide = useMediaQuery({ minWidth: 736 });
    const compactTable = isWide === false;

    const onToggleUke = (id: string, selected: boolean) => {
        if (selected) {
            setValgteUker(valgteUker.filter((ukeId) => ukeId !== id));
        } else {
            setValgteUker([...valgteUker, id]);
        }
    };

    const synligeUker = antallSynlig ? arbeidsuker.slice(0, antallSynlig) : arbeidsuker;
    const visUkeEditButton: boolean = onVelgUker === undefined || valgteUker.length === 0;
    const visEndreValgteUkerButton = onVelgUker !== undefined;

    return (
        <div className="arbeidstidUkeList">
            {onVelgUker && (
                <>
                    <p>Marker ukene du ønsker å endre lik arbeidstid for</p>
                    {visEndreValgteUkerButton && (
                        <FormBlock margin="l" paddingBottom="m">
                            <EndreValgteUkerButton
                                arbeidsuker={arbeidsuker}
                                valgteUker={valgteUker}
                                onVelgUker={onVelgUker}
                            />
                        </FormBlock>
                    )}
                </>
            )}

            <Table>
                <Table.Header>
                    {compactTable && (
                        <Table.Row>
                            {onVelgUker && (
                                <Table.DataCell>
                                    <VelgUkeHeader
                                        valgteUker={valgteUker}
                                        synligeUker={synligeUker}
                                        setValgteUker={setValgteUker}
                                    />
                                </Table.DataCell>
                            )}
                            <Table.HeaderCell>Periode</Table.HeaderCell>
                            <Table.HeaderCell>{arbeidstidKolonneTittel}</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                    )}
                    {compactTable === false && (
                        <Table.Row>
                            {onVelgUker && (
                                <Table.DataCell>
                                    <VelgUkeHeader
                                        valgteUker={valgteUker}
                                        synligeUker={synligeUker}
                                        setValgteUker={setValgteUker}
                                    />
                                </Table.DataCell>
                            )}
                            <Table.HeaderCell style={{ width: '0' }}>Uke</Table.HeaderCell>
                            <Table.HeaderCell>Periode</Table.HeaderCell>

                            {visNormaltid && <Table.HeaderCell>Normal arbeidstid</Table.HeaderCell>}
                            <Table.HeaderCell>{arbeidstidKolonneTittel}</Table.HeaderCell>
                            {onVelgUke && <Table.HeaderCell>Endre</Table.HeaderCell>}
                        </Table.Row>
                    )}
                </Table.Header>
                <Table.Body>
                    {synligeUker.map((uke) => {
                        const ukenummer = dayjs(uke.periode.from).isoWeek();
                        const selected = onVelgUker !== undefined && valgteUker.includes(uke.isoDateRange);
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
                        const ukeHarNormaltimer = durationUtils.durationIsGreatherThanZero(uke.opprinnelig.normalt);
                        return (
                            <Table.Row key={uke.isoDateRange} selected={selected} style={{ verticalAlign: 'top' }}>
                                {compactTable && (
                                    <>
                                        {onVelgUker && (
                                            <Table.DataCell style={{ width: '0' }}>
                                                <VelgUke uke={uke} selected={selected} onToggle={onToggleUke} />
                                            </Table.DataCell>
                                        )}
                                        <Table.DataCell style={{ minWidth: '12rem' }}>
                                            <PeriodeInfo uke={uke} ukenummer={ukenummer} kompakt={true} />
                                            {visNormaltid && (
                                                <div>
                                                    Normal arbeidstid:{` `}
                                                    <DurationText duration={uke.opprinnelig.normalt} />
                                                </div>
                                            )}
                                        </Table.DataCell>
                                        <Table.DataCell>
                                            <Arbeidstid uke={uke} />
                                        </Table.DataCell>
                                        <Table.DataCell style={{ width: '0' }}>
                                            {onVelgUke && ukeHarNormaltimer && (
                                                <EndreUke uke={uke} onVelgUke={onVelgUke} enabled={visUkeEditButton} />
                                            )}
                                        </Table.DataCell>
                                    </>
                                )}
                                {!compactTable && (
                                    <>
                                        {onVelgUker && (
                                            <Table.DataCell style={{ width: '0' }}>
                                                <VelgUke uke={uke} selected={selected} onToggle={onToggleUke} />
                                            </Table.DataCell>
                                        )}
                                        <Table.DataCell>{ukenummer}</Table.DataCell>
                                        <Table.DataCell style={{ minWidth: '15rem' }}>
                                            <PeriodeInfo uke={uke} ukenummer={ukenummer} kompakt={false} />
                                        </Table.DataCell>

                                        {visNormaltid && (
                                            <Table.DataCell>
                                                <DurationText duration={uke.opprinnelig.normalt} />
                                            </Table.DataCell>
                                        )}
                                        <Table.DataCell>
                                            <Arbeidstid uke={uke} />
                                        </Table.DataCell>
                                        <Table.DataCell style={{ width: '0' }}>
                                            {onVelgUke && ukeHarNormaltimer && (
                                                <EndreUke uke={uke} onVelgUke={onVelgUke} enabled={visUkeEditButton} />
                                            )}
                                        </Table.DataCell>
                                    </>
                                )}
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
            {onVelgUker && visEndreValgteUkerButton && (
                <FormBlock margin="l" paddingBottom="m">
                    <EndreValgteUkerButton arbeidsuker={arbeidsuker} valgteUker={valgteUker} onVelgUker={onVelgUker} />
                </FormBlock>
            )}
        </div>
    );
};

export default ArbeidstidUkeListe;

export const VelgUkeHeader = ({
    valgteUker,
    synligeUker,
    setValgteUker,
}: {
    valgteUker: string[];
    synligeUker: ArbeidstidUkeListeItem[];
    setValgteUker: (uker: string[]) => void;
}) => {
    return (
        <Checkbox
            checked={valgteUker.length === synligeUker.length}
            indeterminate={valgteUker.length > 0 && valgteUker.length !== synligeUker.length}
            onChange={() => {
                valgteUker.length
                    ? setValgteUker([])
                    : setValgteUker(synligeUker.filter((uke) => uke.søktFor).map(({ isoDateRange }) => isoDateRange));
            }}
            hideLabel>
            Velg alle rader
        </Checkbox>
    );
};

interface UkeDataCellProps {
    uke: PeriodeSøktForListeItem;
}

const VelgUke = ({
    uke,
    selected,
    onToggle: onChange,
}: UkeDataCellProps & { selected: boolean; onToggle: (id: string, selected: boolean) => void }) => {
    return (
        <Checkbox
            hideLabel
            checked={selected}
            onChange={() => {
                onChange(uke.isoDateRange, selected);
            }}
            aria-labelledby={`id-${uke.isoDateRange}`}>
            {' '}
        </Checkbox>
    );
};

const EndreUke = ({
    uke,
    enabled: visUkeEditButton,
    onVelgUke,
}: UkeDataCellProps & { enabled: boolean; onVelgUke: OnVelgUkeType }) => {
    return (
        <Button
            disabled={!visUkeEditButton}
            icon={<Edit aria-label={`Endre`} />}
            type="button"
            variant="primary"
            size="small"
            onClick={() => onVelgUke(uke)}
        />
    );
};

const PeriodeInfo = ({ uke, ukenummer, kompakt }: UkeDataCellProps & { ukenummer: number; kompakt: boolean }) => {
    return kompakt ? (
        <div id={`id-${uke.isoDateRange}`}>
            Uke {ukenummer}
            <br />
            {dateFormatter.compact(uke.periode.from)} - {` `}
            {dateFormatter.compact(uke.periode.to)}
        </div>
    ) : (
        <div id={`id-${uke.isoDateRange}`}>
            <PeriodeTekst uke={uke} />
        </div>
    );
};

const Arbeidstid = ({ uke }: { uke: PeriodeSøktForListeItem }) => {
    if (uke.endret === undefined) {
        return <DurationText duration={uke.opprinnelig.faktisk} />;
    }
    const { faktisk, endretProsent } = uke.endret;
    return (
        <div className="endretArbeidstid">
            <div className="endretArbeidstid__faktisk">
                <DurationText duration={faktisk} />{' '}
                {endretProsent && (
                    <span className="endretArbeidstid__prosent" style={{ whiteSpace: 'nowrap' }}>
                        ({endretProsent} %)
                    </span>
                )}
            </div>
            <div className="endretArbeidstid__opprinnelig">
                <DurationText duration={uke.opprinnelig.faktisk} />
            </div>
        </div>
    );
};

const PeriodeTekst = ({
    uke: {
        periode: { from, to },
    },
}: {
    uke: PeriodeSøktForListeItem;
}) => {
    const sammeDato = dayjs(from).isSame(to, 'date');
    if (sammeDato) {
        return <>{dateFormatter.compact(from)}</>;
    }
    return (
        <>
            {dateFormatter.compact(from)} - {dateFormatter.compact(to)}
        </>
    );
};

const EndreValgteUkerButton = ({
    onVelgUker,
    arbeidsuker,
    valgteUker,
}: {
    onVelgUker: OnVelgUkerType;
    arbeidsuker: ArbeidstidUkeListeItem[];
    valgteUker: string[];
}) => {
    return (
        <Button
            icon={<Edit />}
            variant="secondary"
            type="button"
            size="small"
            disabled={valgteUker.length === 0}
            onClick={() => {
                onVelgUker(arbeidsuker.filter((uke) => valgteUker.includes(uke.isoDateRange)));
            }}>
            Endre valgte uker
        </Button>
    );
};
