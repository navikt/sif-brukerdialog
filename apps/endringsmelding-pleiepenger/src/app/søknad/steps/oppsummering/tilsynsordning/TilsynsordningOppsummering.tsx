import { TilsynsordningApiData } from '@app/types';
import { HandHeartIcon } from '@navikt/aksel-icons';
import { BodyShort, ExpansionCard, Heading, VStack } from '@navikt/ds-react';
import { DateDurationMap, dateFormatter, dateToISODate } from '@navikt/sif-common-utils';

import { StepOppsummering } from '../../../../components/step-oppsummering/StepOppsummering';
import EndretTag from '../../../../components/tags/EndretTag';
import { AppText } from '../../../../i18n';
import { StepId } from '../../../config/StepId';
import { getMånederMedDagerEndretTilsyn } from '../oppsummeringStepUtils';
import EndretTilsynTabell from './EndretTilsynTabell';

interface Props {
    tilsynsordning?: TilsynsordningApiData;
    tidOpprinnelig?: DateDurationMap;

    brukExpansionCard?: boolean;
}

const TilsynsordningOppsummering = ({ tilsynsordning, tidOpprinnelig, brukExpansionCard }: Props) => {
    const månederMedDager = tilsynsordning ? getMånederMedDagerEndretTilsyn(tilsynsordning, tidOpprinnelig) : [];
    const dagerEndretTotalt = månederMedDager
        .flatMap(({ dagerMedEndretTilsyn }) => dagerMedEndretTilsyn)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .reduce((acc, _) => acc + 1, 0);

    const content = (
        <VStack gap="space-8">
            {dagerEndretTotalt > 0 && (
                <Heading level="4" size="small">
                    Måneder med endring
                </Heading>
            )}
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

    if (brukExpansionCard) {
        return (
            <StepOppsummering
                tittel="Tid i omsorgstilbud"
                endret={månederMedDager.length > 0}
                stepId={StepId.TILSYNSORDNING}
                icon={<HandHeartIcon aria-hidden fontSize="3rem" />}
                endringer={
                    månederMedDager.length > 0 ? (
                        <EndretTag>{dagerEndretTotalt} dager endret</EndretTag>
                    ) : (
                        'Ingen endringer'
                    )
                }
                endreLinkTekst="Gå til endring av tid i omsorgstilbud">
                {content}
            </StepOppsummering>
        );
    }

    return <>{content}</>;
};

export default TilsynsordningOppsummering;
