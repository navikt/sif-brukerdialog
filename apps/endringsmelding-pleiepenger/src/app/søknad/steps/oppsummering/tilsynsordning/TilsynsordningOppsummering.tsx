import { TilsynsordningApiData } from '@app/types';
import { Accordion, Heading, VStack } from '@navikt/ds-react';
import { DateDurationMap, dateFormatter, dateToISODate } from '@navikt/sif-common-utils';

import { getMånederMedDagerEndretTilsyn } from '../oppsummeringStepUtils';
import EndretTilsynTabell from './EndretTilsynTabell';

interface Props {
    tilsynsordning: TilsynsordningApiData;
    tidOpprinnelig?: DateDurationMap;
}

const TilsynsordningOppsummering = ({ tilsynsordning, tidOpprinnelig }: Props) => {
    const månederMedDager = getMånederMedDagerEndretTilsyn(tilsynsordning, tidOpprinnelig);

    return (
        <VStack gap="space-16">
            <Heading level="3" size="small" spacing={true}>
                Endringer i omsorgstilbud
            </Heading>
            <Accordion>
                {månederMedDager.map(({ måned, dagerMedEndretTilsyn }) => {
                    const antallDagerEndret = dagerMedEndretTilsyn.length;
                    return (
                        <Accordion.Item key={dateToISODate(måned)}>
                            <Accordion.Header>
                                <div className="capsFirstLetter">
                                    {dateFormatter.monthFullYear(måned)} - {antallDagerEndret} dager endret
                                </div>
                            </Accordion.Header>
                            <Accordion.Content>
                                <EndretTilsynTabell dagerMedEndretTilsyn={dagerMedEndretTilsyn} />
                            </Accordion.Content>
                        </Accordion.Item>
                    );
                })}
            </Accordion>
        </VStack>
    );
};

export default TilsynsordningOppsummering;
