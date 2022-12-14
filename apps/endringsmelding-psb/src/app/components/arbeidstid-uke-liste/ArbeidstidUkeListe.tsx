import { Button, Checkbox, Table } from '@navikt/ds-react';
import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Add, Edit } from '@navikt/ds-icons';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import { dateFormatter } from '@navikt/sif-common-utils/lib';
import dayjs from 'dayjs';
import { Arbeidsuke, ArbeidsukeMedEndring } from '../../types/K9Sak';
import { TimerEllerProsent } from '../../types/TimerEllerProsent';
import { beregnEndretArbeidstidEnkeltdag } from '../../utils/arbeidAktivitetUtils';
import DurationText from '../duration-text/DurationText';

interface Props {
    arbeidsuker: ArbeidsukeMedEndring[];
    visNormaltid?: boolean;
    paginering?: {
        antall: number;
    };
    onVelgUke: (uke: Arbeidsuke) => void;
    onVelgUker?: (uke: Arbeidsuke[]) => void;
}

const ArbeidstidUkeListe: React.FunctionComponent<Props> = ({
    arbeidsuker,
    visNormaltid = false,
    onVelgUke,
    onVelgUker,
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

    const [valgteUker, setValgteUker] = useState<string[]>([]);

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
        const nyTid = beregnEndretArbeidstidEnkeltdag(endring, uke.normalt);

        return (
            <>
                <div>
                    <strong>
                        {endring.type === TimerEllerProsent.PROSENT ? (
                            <>
                                {endring.prosent} {compactTable ? '%' : 'prosent'}
                            </>
                        ) : (
                            <DurationText duration={nyTid} />
                        )}
                    </strong>
                </div>
                <span style={{ textDecoration: 'line-through' }}>
                    <DurationText duration={uke.faktisk} />
                </span>
            </>
        );
    };

    const onToggleUke = (id: string, selected: boolean) => {
        if (selected) {
            setValgteUker(valgteUker.filter((ukeId) => ukeId !== id));
        } else {
            setValgteUker([...valgteUker, id]);
        }
    };

    const synligeUker = antallSynlig ? arbeidsuker.slice(0, antallSynlig) : arbeidsuker;

    const velgUkerHeaderCell = onVelgUker ? getVelgUkeHeaderCell(valgteUker, synligeUker, setValgteUker) : null;
    const visUkeEditButton: boolean = onVelgUker === undefined || valgteUker.length === 0;

    return (
        <div className="arbeidstidUkeList">
            <Table>
                <Table.Header>
                    {compactTable && (
                        <Table.Row>
                            {velgUkerHeaderCell}
                            <Table.HeaderCell>Periode</Table.HeaderCell>
                            {visNormaltid && <Table.HeaderCell>Normalt</Table.HeaderCell>}
                            <Table.HeaderCell colSpan={2}>Arbeidstid</Table.HeaderCell>
                        </Table.Row>
                    )}
                    {compactTable === false && (
                        <Table.Row>
                            {velgUkerHeaderCell}
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
                        const ukenummer = dayjs(uke.periode.from).isoWeek();
                        const selected = onVelgUker !== undefined && valgteUker.includes(uke.id);
                        return (
                            <Table.Row key={uke.id} selected={selected}>
                                {compactTable && (
                                    <>
                                        {onVelgUker && getVelgUkeDataCell(uke.id, selected, onToggleUke)}
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
                                            {visUkeEditButton && (
                                                <Button
                                                    disabled={!visUkeEditButton}
                                                    icon={<Edit />}
                                                    type="button"
                                                    variant="primary"
                                                    size="small"
                                                    onClick={() => onVelgUke(uke)}
                                                />
                                            )}
                                        </Table.DataCell>
                                    </>
                                )}
                                {!compactTable && (
                                    <>
                                        {onVelgUker && getVelgUkeDataCell(uke.id, selected, onToggleUke)}
                                        <Table.DataCell>{ukenummer}</Table.DataCell>
                                        <Table.DataCell>
                                            <>
                                                {renderDato(uke.periode.from)} - {` `}
                                                {renderDato(uke.periode.to)}
                                            </>
                                        </Table.DataCell>
                                        <Table.DataCell>{Object.keys(uke.dagerMap).length}</Table.DataCell>
                                        {visNormaltid && (
                                            <Table.DataCell>
                                                <DurationText duration={uke.normalt} />
                                            </Table.DataCell>
                                        )}
                                        <Table.DataCell>{getTid(uke)}</Table.DataCell>
                                        <Table.DataCell>
                                            <Button
                                                disabled={!visUkeEditButton}
                                                aria-label={`Endre uke ${ukenummer}`}
                                                icon={<Edit />}
                                                type="button"
                                                variant={'primary'}
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
            {onVelgUker && valgteUker.length > 0 && (
                <FormBlock margin="l" paddingBottom="m">
                    <Button
                        variant="primary"
                        type="button"
                        onClick={() => {
                            onVelgUker(arbeidsuker.filter((uke) => valgteUker.includes(uke.id)));
                        }}>
                        Endre valgte uker
                    </Button>
                </FormBlock>
            )}
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

export const getVelgUkeHeaderCell = (
    valgteUker: string[],
    synligeUker: Arbeidsuke[],
    setValgteUker: (uker: string[]) => void
) => {
    return (
        <Table.DataCell>
            <Checkbox
                checked={valgteUker.length === synligeUker.length}
                indeterminate={valgteUker.length > 0 && valgteUker.length !== synligeUker.length}
                onChange={() => {
                    valgteUker.length ? setValgteUker([]) : setValgteUker(synligeUker.map(({ id }) => id));
                }}
                hideLabel>
                Velg alle rader
            </Checkbox>
        </Table.DataCell>
    );
};

export const getVelgUkeDataCell = (
    id: string,
    selected: boolean,
    onChange: (id: string, selected: boolean) => void
) => {
    return (
        <Table.DataCell>
            <Checkbox
                hideLabel
                checked={selected}
                onChange={() => {
                    onChange(id, selected);
                }}
                aria-labelledby={`id-${id}`}>
                {' '}
            </Checkbox>
        </Table.DataCell>
    );
};
