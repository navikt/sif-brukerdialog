import { Button, Table } from '@navikt/ds-react';
import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Edit, Add } from '@navikt/ds-icons';
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
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';

interface Props {
    arbeidsuker: ArbeidsukeMedEndring[];
    visNormaltid?: boolean;
    paginering?: {
        antall: number;
    };
    onVelgUke: (uke: Arbeidsuke) => void;
}

const ArbeidstidUkeListe: React.FunctionComponent<Props> = ({
    arbeidsuker,
    visNormaltid = false,
    onVelgUke,
    paginering = {
        antall: 10,
    },
}) => {
    const antallUkerTotalt = arbeidsuker.length;
    const [antallSynlig, setAntallSynlig] = useState<number | undefined>(
        paginering ? Math.min(antallUkerTotalt, paginering.antall) : undefined
    );
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

    const synligeUker = antallSynlig ? arbeidsuker.slice(0, antallSynlig) : arbeidsuker;

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
                    {synligeUker.map((uke) => {
                        const rowKey = dateRangeToISODateRange(uke.periode);
                        const ukenummer = dayjs(uke.periode.from).isoWeek();
                        return (
                            <Table.Row key={rowKey}>
                                {compactTable && (
                                    <>
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
                                    </>
                                )}
                                {!compactTable && (
                                    <>
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
                                    </>
                                )}
                            </Table.Row>
                        );
                    })}
                </Table.Body>
            </Table>
            {/* <p>
                Viser {antallSynlig} av {antallUkerTotalt} uker
            </p> */}
            {paginering && antallSynlig !== undefined && antallSynlig < antallUkerTotalt && (
                <FormBlock margin="m">
                    <Button
                        variant="tertiary"
                        icon={<Add />}
                        type="button"
                        onClick={() => setAntallSynlig(Math.min(antallSynlig + paginering?.antall, antallUkerTotalt))}>
                        Vis flere uker
                    </Button>
                </FormBlock>
            )}
        </div>
    );
};

export default ArbeidstidUkeListe;
