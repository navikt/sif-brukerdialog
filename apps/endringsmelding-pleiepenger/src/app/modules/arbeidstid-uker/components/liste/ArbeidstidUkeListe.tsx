import { SelectableListType } from '@app/hooks/useSelectableList';
import { AppText, useAppIntl } from '@app/i18n';
import { BodyShort, Box, Heading, VStack } from '@navikt/ds-react';
import { getDateRangeText } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import React, { ReactElement } from 'react';

import { ArbeidstidUkerItem } from '../../types/ArbeidstidUkerItem';
import { getKortUkeTooltipText } from '../UkeInfoTooltip';
import UkeTags from '../UkeTags';
import VelgArbeidsukeItem from '../VelgArbeidsukeItem';
import ArbeidstidUkeInfoListe from './ArbeidstidUkeInfoListe';

interface Props {
    uker: ArbeidstidUkerItem[];
    selectableList: SelectableListType<ArbeidstidUkerItem>;
    visEndringSomOpprinnelig?: boolean;
    visNormalarbeidstid?: boolean;
    renderEditButton: (uke: ArbeidstidUkerItem, ukenummer: number, renderLabel: boolean) => ReactElement | undefined;
}

const ArbeidstidUkeListe: React.FunctionComponent<Props> = ({
    uker,
    visEndringSomOpprinnelig,
    visNormalarbeidstid = false,
    selectableList,
    renderEditButton,
}) => {
    const { intl, text } = useAppIntl();
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

                const className = [
                    'arbeidstidUkeListe__uke',
                    itemsAreSelectable && 'arbeidstidUkeListe__uke--velgUker',
                    selected && 'arbeidstidUkeListe__uke--valgt',
                ]
                    .filter(Boolean)
                    .join(' ');

                return (
                    <li key={uke.isoDateRange} className={className}>
                        {itemsAreSelectable && (
                            <div className="arbeidstidUkeListe__velgUke">
                                <VelgArbeidsukeItem
                                    uke={uke}
                                    selected={selected}
                                    onChange={() => setItemSelected(uke, selected)}
                                />
                            </div>
                        )}
                        <div className="arbeidstidUkeListe__info">
                            <VStack gap="space-4">
                                <Heading level="3" size="xsmall">
                                    <AppText id="arbeidstidUkeListe.heading" values={{ ukenummer }} />
                                </Heading>

                                <BodyShort as="div">
                                    <Box>{getDateRangeText(uke.periode, intl.locale)}</Box>

                                    <Box marginBlock="space-8 space-0">
                                        <UkeTags
                                            kortUkeTooltip={getKortUkeTooltipText(uke.periode, text)}
                                            erKortUke={uke.erKortUke}
                                            dagerMedFerie={uke.ferie?.dagerMedFerie}
                                            dagerMedFjernetFerie={uke.ferie?.dagerMedFjernetFerie}
                                        />
                                    </Box>
                                </BodyShort>

                                <ArbeidstidUkeInfoListe
                                    uke={uke}
                                    visEndringSomOpprinnelig={visEndringSomOpprinnelig}
                                    visNormalarbeidstid={visNormalarbeidstid}
                                />
                            </VStack>
                        </div>
                        {singleSelectEnabled && (
                            <div className="arbeidstidUkeListe__endre">{renderEditButton(uke, ukenummer, true)}</div>
                        )}
                    </li>
                );
            })}
        </ol>
    );
};

export default ArbeidstidUkeListe;
