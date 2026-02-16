import { TilsynsordningApiData } from '@app/types';
import { BodyShort, ExpansionCard, VStack } from '@navikt/ds-react';
import { DateDurationMap, dateFormatter, dateToISODate } from '@navikt/sif-common-utils';

import { AppText } from '../../../../i18n';
import { getMånederMedDagerEndretTilsyn } from '../oppsummeringStepUtils';
import EndretTilsynTabell from './EndretTilsynTabell';

interface Props {
    tilsynsordning: TilsynsordningApiData;
    tidOpprinnelig?: DateDurationMap;
}

const TilsynsordningOppsummering = ({ tilsynsordning, tidOpprinnelig }: Props) => {
    const månederMedDager = getMånederMedDagerEndretTilsyn(tilsynsordning, tidOpprinnelig);

    return (
        <VStack gap="space-8">
            {månederMedDager.map(({ måned, dagerMedEndretTilsyn }) => {
                const tittelId = `tittel-${dateToISODate(måned)}`;
                const antallDagerEndret = dagerMedEndretTilsyn.length;

                return (
                    <ExpansionCard aria-labelledby={tittelId} key={tittelId} size="small">
                        <ExpansionCard.Header>
                            <ExpansionCard.Title size="small" id={tittelId}>
                                <div className="capsFirstLetter">
                                    {`${dateFormatter.monthFullYear(måned)}`}
                                    <BodyShort as="span" weight="regular">
                                        {' '}
                                        <AppText
                                            id="oppsummeringStep.tilsynsordning.dagerEndret"
                                            values={{ antall: antallDagerEndret }}
                                        />
                                    </BodyShort>
                                </div>
                            </ExpansionCard.Title>
                        </ExpansionCard.Header>
                        <ExpansionCard.Content>
                            <EndretTilsynTabell dagerMedEndretTilsyn={dagerMedEndretTilsyn} />
                        </ExpansionCard.Content>
                    </ExpansionCard>
                );
            })}
        </VStack>
    );
};

export default TilsynsordningOppsummering;
