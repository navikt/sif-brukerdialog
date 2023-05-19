import { BodyShort, Checkbox, Heading } from '@navikt/ds-react';
import React from 'react';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import { dateFormatter } from '@navikt/sif-common-utils/lib';
import dayjs from 'dayjs';
import { SelectableListType } from '../../../hooks/useSelectableList';
import { ArbeidstidUkerItem } from '../ArbeidstidUkerItem';
import ArbeidstidUkeInfoListe from './ArbeidstidUkeInfoListe';
import UkeTags from './UkeTags';

interface Props {
    uker: ArbeidstidUkerItem[];
    arbeidsaktivitetKey: string;
    selectableList: SelectableListType<ArbeidstidUkerItem>;
    visEndringSomOpprinnelig?: boolean;
    renderEditButton: (uke: ArbeidstidUkerItem, ukenummer: number, renderLabel: boolean) => JSX.Element | undefined;
}

const ArbeidstidUkeListe: React.FunctionComponent<Props> = ({
    uker,
    arbeidsaktivitetKey,
    visEndringSomOpprinnelig,
    selectableList,
    renderEditButton,
}) => {
    const {
        isItemSelected,
        setItemSelected,
        listState: { itemsAreSelectable, singleSelectEnabled },
    } = selectableList;
    return (
        <ol className="arbeidstidUkeListe">
            {uker.map((uke) => {
                const ukenummer = dayjs(uke.periode.from).isoWeek();
                const ukePeriodeTekstId = `${arbeidsaktivitetKey}_${uke.isoDateRange}`;
                const selected = isItemSelected(uke);

                return (
                    <li key={uke.isoDateRange} className={`${selected ? 'arbeidstidUke--valgt' : ''}`}>
                        <div className={`arbeidstidUke${itemsAreSelectable ? ' arbeidstidUke--velgUker' : ''}`}>
                            {itemsAreSelectable && (
                                <div className="arbeidstidUke__velgUke">
                                    {uke.kanEndres && uke.kanVelges && (
                                        <Checkbox
                                            hideLabel
                                            checked={selected}
                                            onChange={() => {
                                                setItemSelected(uke, selected);
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
                            {singleSelectEnabled && (
                                <div className="arbeidstidUke__endre">{renderEditButton(uke, ukenummer, true)}</div>
                            )}
                        </div>
                    </li>
                );
            })}
        </ol>
    );
};

export default ArbeidstidUkeListe;
