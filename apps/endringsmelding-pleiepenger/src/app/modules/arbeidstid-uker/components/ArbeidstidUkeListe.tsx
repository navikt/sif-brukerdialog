import { BodyShort, Box, Heading, HStack } from '@navikt/ds-react';
import React, { ReactElement } from 'react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { getDateRangeText } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import { SelectableListType } from '../../../hooks/useSelectableList';
import { AppText } from '../../../i18n';
import { ArbeidstidUkerItem } from '../types/ArbeidstidUkerItem';
import ArbeidstidUkeInfoListe from './ArbeidstidUkeInfoListe';
import UkeTags from './UkeTags';
import VelgArbeidsukeItem from './VelgArbeidsukeItem';
import { useIntl } from 'react-intl';
import { getKortUkeTooltipText } from './UkeInfoTooltip';

interface Props {
    uker: ArbeidstidUkerItem[];
    selectableList: SelectableListType<ArbeidstidUkerItem>;
    visEndringSomOpprinnelig?: boolean;
    renderEditButton: (uke: ArbeidstidUkerItem, ukenummer: number, renderLabel: boolean) => ReactElement | undefined;
}

const ArbeidstidUkeListe: React.FunctionComponent<Props> = ({
    uker,
    visEndringSomOpprinnelig,
    selectableList,
    renderEditButton,
}) => {
    const intl = useIntl();
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
                                <Heading level="3" size="xsmall">
                                    <AppText id="arbeidstidUkeListe.heading" values={{ ukenummer }} />
                                </Heading>

                                <BodyShort as="div">
                                    <HStack gap="4">
                                        <Box>{getDateRangeText(uke.periode, intl.locale)}</Box>
                                    </HStack>
                                    <Block margin="s">
                                        <UkeTags
                                            kortUkeTooltip={getKortUkeTooltipText(uke.periode)}
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
