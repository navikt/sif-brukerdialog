import { Table } from '@navikt/ds-react';
import React from 'react';
import { dateFormatter } from '@navikt/sif-common-utils/lib';
import { Arbeidsuke } from '../../types/K9Sak';
import DurationText from '../duration-text/DurationText';
import dayjs from 'dayjs';
import './arbeidstidUkeListe.css';

interface Props {
    arbeidsuker: Arbeidsuke[];
    visNormaltid?: boolean;
}

const ArbeidstidUkeListe: React.FunctionComponent<Props> = ({ arbeidsuker, visNormaltid = false }) => {
    // const uker = Object.keys(arbeidsuker).map((key) => arbeidsuker[key]);
    const renderDato = (date: Date) => {
        return (
            <span style={{ textTransform: 'capitalize' }}>
                {dateFormatter.day(date).substring(0, 3)}. {dateFormatter.compact(date)}
            </span>
        );
    };
    return (
        <div className="arbeidstidUkeList">
            <Table zebraStripes={true}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Uke</Table.HeaderCell>
                        <Table.HeaderCell>Periode</Table.HeaderCell>
                        <Table.HeaderCell>Dager</Table.HeaderCell>
                        {visNormaltid && <Table.HeaderCell>Normalt</Table.HeaderCell>}
                        <Table.HeaderCell>Arbeidstid</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {arbeidsuker.map((uke, idx) => {
                        return (
                            <Table.Row key={idx}>
                                <Table.DataCell>{dayjs(uke.periode.from).isoWeek()}</Table.DataCell>
                                <Table.DataCell>
                                    {renderDato(uke.periode.from)} - {` `}
                                    {renderDato(uke.periode.to)}
                                </Table.DataCell>
                                <Table.DataCell>{Object.keys(uke.days).length}</Table.DataCell>
                                {visNormaltid && (
                                    <Table.DataCell>
                                        <DurationText duration={uke.normalt} />
                                    </Table.DataCell>
                                )}
                                <Table.DataCell>
                                    <DurationText duration={uke.faktisk} />
                                </Table.DataCell>
                            </Table.Row>
                        );
                    })}
                </Table.Body>
            </Table>
        </div>
    );
};

export default ArbeidstidUkeListe;
