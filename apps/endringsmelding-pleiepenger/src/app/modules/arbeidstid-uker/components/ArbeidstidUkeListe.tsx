import { BodyShort, Heading, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import { ReactElement } from 'react';

import { SelectableListType } from '../../../hooks/useSelectableList';
import { AppText } from '../../../i18n';
import { ArbeidstidUkerItem } from '../types/ArbeidstidUkerItem';
import ArbeidstidUkeInfoListe from './ArbeidstidUkeInfoListe';
import UkeTags from './UkeTags';
import VelgArbeidsukeItem from './VelgArbeidsukeItem';

interface Props {
    uker: ArbeidstidUkerItem[];
    selectableList: SelectableListType<ArbeidstidUkerItem>;
    visEndringSomOpprinnelig?: boolean;
    renderEditButton: (uke: ArbeidstidUkerItem, ukenummer: number, renderLabel: boolean) => ReactElement | undefined;
}

const ArbeidstidUkeListe = ({ uker, visEndringSomOpprinnelig, selectableList, renderEditButton }: Props) => {
    const {
        isItemSelected,
        setItemSelected,
        listState: { itemsAreSelectable, singleSelectEnabled },
    } = selectableList;
    return (
        <ol className="arbeidstidUkeListe">
            {uker.map((uke) => {
                const ukenummer = dayjs(uke.periode.from).isoWeek();
                const selected = isItemSelected(uke);

                return (
                    <li key={uke.isoDateRange} className={`${selected ? 'arbeidstidUke--valgt' : ''}`}>
                        <div className={`arbeidstidUke${itemsAreSelectable ? ' arbeidstidUke--velgUker' : ''}`}>
                            {itemsAreSelectable && (
                                <div className="arbeidstidUke__velgUke">
                                    <VelgArbeidsukeItem
                                        uke={uke}
                                        selected={selected}
                                        onChange={() => setItemSelected(uke, selected)}
                                    />
                                </div>
                            )}
                            <div className="arbeidstidUke__info">
                                <VStack gap="2">
                                    <Heading level="3" size="xsmall">
                                        <AppText id="arbeidstidUkeListe.heading" values={{ ukenummer }} />
                                    </Heading>
                                    <BodyShort as="div">
                                        {dateFormatter.compact(uke.periode.from)} - {` `}
                                        {dateFormatter.compact(uke.periode.to)}
                                        <UkeTags
                                            erKortUke={uke.erKortUke}
                                            dagerMedFerie={uke.ferie?.dagerMedFerie}
                                            dagerMedFjernetFerie={uke.ferie?.dagerMedFjernetFerie}
                                        />
                                    </BodyShort>

                                    <ArbeidstidUkeInfoListe
                                        uke={uke}
                                        visEndringSomOpprinnelig={visEndringSomOpprinnelig}
                                    />
                                </VStack>
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
