import { Button, Table } from '@navikt/ds-react';
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Edit } from '@navikt/ds-icons';
import {
    dateFormatter,
    dateRangeToISODateRange,
    decimalDurationToDuration,
    durationToDecimalDuration,
} from '@navikt/sif-common-utils/lib';
import dayjs from 'dayjs';
import { TimerEllerProsent } from '../../søknad/steps/arbeidstid/arbeid-i-periode-form/ArbeidIPeriodeFormValues';
import { Arbeidsuke, ArbeidsukeMedEndring } from '../../types/K9Sak';
import DurationText from '../duration-text/DurationText';
import './arbeidstidUkeListe.css';

interface Props {
    arbeidsuker: ArbeidsukeMedEndring[];
    visNormaltid?: boolean;
    onVelgUke: (uke: Arbeidsuke) => void;
}

const ArbeidstidUkeListe: React.FunctionComponent<Props> = ({ arbeidsuker, visNormaltid = false, onVelgUke }) => {
    const isWide = useMediaQuery({ minWidth: 736 });
    const compactTable = isWide === false;

    const renderDato = (date: Date) => {
        return (
            <span style={{ textTransform: 'capitalize' }}>
                {dateFormatter.day(date).substring(0, 3)}. {dateFormatter.compact(date)}
            </span>
        );
    };
    const renderDatoKompakt = (date: Date) => {
        return <span style={{ textTransform: 'capitalize' }}>{dateFormatter.compact(date)}</span>;
    };

    const getTid = (uke: ArbeidsukeMedEndring) => {
        if (uke.endring === undefined) {
            return <DurationText duration={uke.faktisk} />;
        }
        const { endring } = uke.endring;
        const tid = durationToDecimalDuration(uke.normalt);
        const nyTid = endring.type === TimerEllerProsent.PROSENT ? (tid / 100) * endring.prosent : endring.timer;

        return (
            <>
                <div>
                    <strong>
                        {endring.type === TimerEllerProsent.PROSENT ? (
                            <>
                                {endring.prosent} {compactTable ? '%' : 'prosent'}
                            </>
                        ) : (
                            <DurationText duration={decimalDurationToDuration(nyTid)} />
                        )}
                    </strong>
                </div>
                <span style={{ textDecoration: 'line-through' }}>
                    <DurationText duration={uke.faktisk} />
                </span>
            </>
        );
    };

    return (
        <div className="arbeidstidUkeList">
            <Table zebraStripes={true}>
                <Table.Header>
                    {compactTable && (
                        <Table.Row>
                            <Table.HeaderCell>Periode</Table.HeaderCell>
                            {visNormaltid && <Table.HeaderCell>Normalt</Table.HeaderCell>}
                            <Table.HeaderCell colSpan={2}>Arbeidstid</Table.HeaderCell>
                        </Table.Row>
                    )}
                    {compactTable === false && (
                        <Table.Row>
                            <Table.HeaderCell>Uke</Table.HeaderCell>
                            <Table.HeaderCell>Periode</Table.HeaderCell>
                            <Table.HeaderCell>Dager</Table.HeaderCell>
                            {visNormaltid && <Table.HeaderCell>Normalt</Table.HeaderCell>}
                            <Table.HeaderCell colSpan={2}>Arbeidstid</Table.HeaderCell>
                        </Table.Row>
                    )}
                </Table.Header>
                <Table.Body>
                    {arbeidsuker.map((uke) => {
                        const rowKey = dateRangeToISODateRange(uke.periode);
                        const ukenummer = dayjs(uke.periode.from).isoWeek();
                        return (
                            <>
                                {compactTable && (
                                    <Table.Row key={rowKey}>
                                        <Table.DataCell>
                                            <>
                                                Uke {ukenummer}
                                                <br />
                                                <span style={{ textTransform: 'capitalize' }}>
                                                    {dateFormatter.day(uke.periode.from)} -{' '}
                                                    {dateFormatter.day(uke.periode.to)}
                                                </span>
                                                <br />
                                                {renderDatoKompakt(uke.periode.from)} - {` `}
                                                {renderDatoKompakt(uke.periode.to)}
                                            </>
                                        </Table.DataCell>
                                        {visNormaltid && (
                                            <Table.DataCell>
                                                <DurationText duration={uke.normalt} />
                                            </Table.DataCell>
                                        )}
                                        <Table.DataCell>{getTid(uke)}</Table.DataCell>
                                        <Table.DataCell>
                                            <Button
                                                icon={<Edit />}
                                                type="button"
                                                variant="primary"
                                                size="small"
                                                onClick={() => onVelgUke(uke)}
                                            />
                                        </Table.DataCell>
                                    </Table.Row>
                                )}
                                {!compactTable && (
                                    <Table.Row key={rowKey}>
                                        <Table.DataCell>{ukenummer}</Table.DataCell>
                                        <Table.DataCell>
                                            <>
                                                {renderDato(uke.periode.from)} - {` `}
                                                {renderDato(uke.periode.to)}
                                            </>
                                        </Table.DataCell>
                                        <Table.DataCell>{Object.keys(uke.days).length}</Table.DataCell>
                                        {visNormaltid && (
                                            <Table.DataCell>
                                                <DurationText duration={uke.normalt} />
                                            </Table.DataCell>
                                        )}
                                        <Table.DataCell>{getTid(uke)}</Table.DataCell>
                                        <Table.DataCell>
                                            <Button
                                                icon={<Edit />}
                                                type="button"
                                                variant="primary"
                                                size="small"
                                                onClick={() => onVelgUke(uke)}
                                            />
                                        </Table.DataCell>
                                    </Table.Row>
                                )}
                            </>
                        );
                    })}
                </Table.Body>
            </Table>
        </div>
    );
};

export default ArbeidstidUkeListe;
