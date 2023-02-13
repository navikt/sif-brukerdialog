import { Alert, BodyShort, Button, Checkbox, Table, Tooltip } from '@navikt/ds-react';
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { AddCircle, Edit, InformationColored } from '@navikt/ds-icons';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import DurationText from '@navikt/sif-common-core-ds/lib/components/duration-text/DurationText';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import { dateFormatter, DateRange, Duration, ISODateRange } from '@navikt/sif-common-utils/lib';
import dayjs from 'dayjs';
import ArbeidstidUkeInfo from './components/ArbeidstidUkeInfo';
import EditButton from './components/EditButton';
import { getPeriodeTekst } from '../periode-tekst/PeriodeTekst';
import './arbeidstidUkeTabell.scss';
import { erHelArbeidsuke } from '../../utils/arbeidsukeUtils';
import { getDagerPeriode } from '../endre-arbeidstid-form/EndreArbeidstimerFormPart';

export interface ArbeidstidUkeTabellItem {
    kanEndres: boolean;
    kanVelges: boolean;
    isoDateRange: ISODateRange;
    periode: DateRange;
    antallDagerMedArbeidstid: number;
    opprinnelig: {
        faktisk: Duration;
        normalt: Duration;
    };
    endret?: {
        endretProsent?: number;
        faktisk: Duration;
    };
}

interface Props {
    listItems: ArbeidstidUkeTabellItem[];
    visNormaltid?: boolean;
    paginering?: {
        antall: number;
    };
    arbeidstidKolonneTittel?: string;
    triggerResetValg?: number;
    onEndreUker?: (uke: ArbeidstidUkeTabellItem[]) => void;
}

const ArbeidstidUkeTabell: React.FunctionComponent<Props> = ({
    listItems,
    visNormaltid = true,
    paginering = {
        antall: 10,
    },
    arbeidstidKolonneTittel,
    triggerResetValg,
    onEndreUker,
}) => {
    const antallUkerTotalt = listItems.length;
    const [visVelgUke, setVisVelgUke] = useState<boolean>(false);
    const [antallSynlig, setAntallSynlig] = useState<number | undefined>(
        paginering ? Math.min(antallUkerTotalt, paginering.antall) : undefined
    );
    const [valgteUker, setValgteUker] = useState<string[]>([]);
    const [visMeldingOmUkerMåVelges, setVisMeldingOmUkerMåVelges] = useState<boolean>(false);
    const renderAsList = useMediaQuery({ minWidth: 500 }) === false;
    const renderCompactTable = useMediaQuery({ minWidth: 736 }) === false && renderAsList === false;
    const kanVelgeFlereUker = onEndreUker !== undefined && antallUkerTotalt > 1;
    const kanEndreEnkeltuke = onEndreUker && visVelgUke !== true;
    const korteUker = listItems
        .filter((i, idx) => idx < (antallSynlig || 0) && erHelArbeidsuke(i.periode) === false)
        .map((uke) => dayjs(uke.periode.from).isoWeek());
    const harKorteUker = korteUker.length > 0;

    useEffect(() => {
        setValgteUker([]);
        setVisVelgUke(false);
    }, [triggerResetValg]);

    const onToggleUke = (id: string, selected: boolean) => {
        setVisMeldingOmUkerMåVelges(false);
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

    const renderEditButton = (uke: ArbeidstidUkeTabellItem, ukenummer: number) => {
        if (!onEndreUker || !uke.kanEndres) {
            return undefined;
        }

        const title =
            valgteUker.length > 1 ? 'Endre valgte uker' : `Endre uke ${ukenummer} (${getPeriodeTekst(uke.periode)})`;

        return (
            <EditButton
                data-testid="endre-button"
                onClick={() => {
                    valgteUker.length > 1 ? endreFlereUker() : onEndreUker([uke]);
                }}
                title={title}
                aria-label={title}
            />
        );
    };

    const renderEndreUkerHeader = () => (
        <>
            <Checkbox
                name="abc"
                checked={visVelgUke}
                data-testid="endre-flere-uker-cb"
                onChange={(evt) => {
                    setVisVelgUke(evt.target.checked);
                    setVisMeldingOmUkerMåVelges(false);
                    setValgteUker([]);
                }}>
                Jeg ønsker å endre flere uker samtidig
            </Checkbox>
            {visVelgUke && harKorteUker && (
                <Block margin="m" padBottom="l">
                    <Alert variant="info" inline={false}>
                        {korteUker.length === 1 ? (
                            <>
                                Uke {korteUker[0]} er en kort uke, og kan ikke endres sammen med de andre ukene. Denne
                                må endres for seg selv.
                            </>
                        ) : (
                            <>
                                Ukene {korteUker.join(' og ')} er korte uker, og kan ikke endres sammen med de andre
                                ukene. Disse må endres hver for seg.
                            </>
                        )}
                    </Alert>
                </Block>
            )}
        </>
    );

    const renderEndreUkerFooter = () => {
        if (kanVelgeFlereUker && visVelgUke) {
            return (
                <FormBlock margin="l" paddingBottom="m">
                    <div aria-relevant="additions removals" aria-live="polite">
                        {visMeldingOmUkerMåVelges && valgteUker.length === 0 && (
                            <Block padBottom="l">
                                <Alert variant="info">Du må velge uker først</Alert>
                            </Block>
                        )}
                    </div>
                    <Button
                        icon={<Edit role="presentation" aria-hidden={true} />}
                        variant="primary"
                        type="button"
                        size="small"
                        data-testid="endre-flere-uker-button"
                        onClick={() => {
                            if (valgteUker.length === 0) {
                                setVisMeldingOmUkerMåVelges(true);
                                return;
                            }
                            endreFlereUker();
                        }}>
                        Endre valgte uker
                    </Button>
                </FormBlock>
            );
        }
        return null;
    };

    if (renderAsList) {
        return (
            <>
                {kanVelgeFlereUker && renderEndreUkerHeader()}

                <ol className="arbeidstidUkeListe">
                    {synligeUker.map((uke) => {
                        const ukenummer = dayjs(uke.periode.from).isoWeek();
                        const ukePeriodeTekstId = `id-${uke.isoDateRange}`;
                        const selected = onEndreUker !== undefined && valgteUker.includes(uke.isoDateRange);

                        return (
                            <li key={uke.isoDateRange}>
                                <div className="arbeidstidUke">
                                    {visVelgUke && (
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
                                    {kanEndreEnkeltuke && (
                                        <div className="arbeidstidUke__endre">{renderEditButton(uke, ukenummer)}</div>
                                    )}
                                </div>
                            </li>
                        );
                    })}
                </ol>
                {renderEndreUkerFooter()}
            </>
        );
    }

    return (
        <div className="arbeidstidUkeTabell">
            {kanVelgeFlereUker && renderEndreUkerHeader()}

            <Table className="arbeidstidUkeTabell">
                <Table.Header>
                    <Table.Row>
                        {visVelgUke && (
                            <Table.DataCell className="arbeidstidUkeTabell__velgUke">
                                <Checkbox
                                    checked={valgteUker.length === synligeUker.length}
                                    indeterminate={valgteUker.length > 0 && valgteUker.length !== synligeUker.length}
                                    onChange={() => {
                                        valgteUker.length
                                            ? setValgteUker([])
                                            : setValgteUker(
                                                  synligeUker
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
                            <Table.HeaderCell className="arbeidstidUkeTabell__periode--kompakt">Uke</Table.HeaderCell>
                        )}
                        {!renderCompactTable && (
                            <>
                                <Table.HeaderCell className="arbeidstidUkeTabell__ukenummer">Uke</Table.HeaderCell>
                                <Table.HeaderCell className="arbeidstidUkeTabell__periode">Dato</Table.HeaderCell>
                                {visNormaltid && (
                                    <Table.HeaderCell className="arbeidstidUkeTabell__normalt">
                                        <Tooltip content="Hvor mye du jobber normalt når du ikke har pleiepenger">
                                            <span>Normal arbeidstid</span>
                                        </Tooltip>
                                    </Table.HeaderCell>
                                )}
                            </>
                        )}

                        <Table.HeaderCell className="arbeidstidUkeTabell__faktisk">
                            {arbeidstidKolonneTittel || (
                                <>
                                    <Tooltip content="Hvor mye du faktisk jobber når du har pleiepenger">
                                        <span>Faktisk arbeidstid</span>
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
                    {synligeUker.map((uke) => {
                        const ukenummer = dayjs(uke.periode.from).isoWeek();
                        const ukePeriodeTekstId = `id-${uke.isoDateRange}`;

                        const selected = onEndreUker !== undefined && valgteUker.includes(uke.isoDateRange);

                        return (
                            <Table.Row
                                key={uke.isoDateRange}
                                selected={selected}
                                style={{ verticalAlign: 'top' }}
                                data-testid={`uke_${ukenummer}`}>
                                {visVelgUke && (
                                    <Table.DataCell className="arbeidstidUkeTabell__velgUke">
                                        {uke.kanEndres && uke.kanVelges && (
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
                                    </Table.DataCell>
                                )}
                                {!renderCompactTable && (
                                    <>
                                        <Table.DataCell
                                            data-testid="ukenummer"
                                            className="arbeidstidUkeTabell__ukenummer">
                                            {ukenummer}
                                        </Table.DataCell>
                                        <Table.DataCell data-testid="periode" className="arbeidstidUkeTabell__periode">
                                            <div id={ukePeriodeTekstId}>
                                                <div className="arbeidsukeTidsrom">
                                                    <span className="arbeidsukeTidsrom__tekst">
                                                        {getPeriodeTekst(uke.periode)}
                                                    </span>
                                                    <span className="arbeidsukeTidsrom__info">
                                                        {erHelArbeidsuke(uke.periode) ? undefined : (
                                                            <Tooltip
                                                                content={`Kort uke - ${getDagerPeriode(
                                                                    uke.periode,
                                                                    false
                                                                )}`}>
                                                                <InformationColored />
                                                            </Tooltip>
                                                        )}
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
                                    <ArbeidstidUkeInfo uke={uke} />
                                </Table.DataCell>
                                {kanEndreEnkeltuke && (
                                    <Table.DataCell className="arbeidstidUkeTabell__endre">
                                        {renderEditButton(uke, ukenummer)}
                                    </Table.DataCell>
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
