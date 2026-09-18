import { AppText, useAppIntl } from '@app/i18n';
import { LovbestemtFerieApiData } from '@app/types';
import { getLovbestemtFerieOppsummeringInfo } from '@app/utils';
import { AirplaneIcon } from '@navikt/aksel-icons';
import { Heading, InlineMessage, VStack } from '@navikt/ds-react';
import { ActionLink } from '@navikt/sif-common-ui';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import { StepOppsummering } from '../../../../components/step-oppsummering/StepOppsummering';
import FerieTag from '../../../../components/tags/FerieTag';
import { getSøknadStepRoute } from '../../../config/SøknadRoutes';
import { StepId } from '../../../config/StepId';
import { FerieendringerList } from './FeriendringerList';

interface Props {
    lovbestemtFerie?: LovbestemtFerieApiData;
    lovbestemtFerieErEndret: boolean;
    brukExpansionCard?: boolean;
}

export const getEndringerOppsummering = (perioderLagtTil: any[], perioderFjernet: any[]) => {
    const fjernet = perioderFjernet.length;
    const lagtTil = perioderLagtTil.length;

    if (fjernet === 0 && lagtTil === 0) {
        return 'Ingen endringer registrert';
    }

    if (fjernet > 0 && lagtTil === 0) {
        return `Ferieperioder fjernet: ${fjernet}`;
    }
    if (fjernet === 0 && lagtTil > 0) {
        return `Ferieperioder lagt til: ${lagtTil}`;
    }
    if (fjernet > 0 && lagtTil > 0) {
        return `Ferieperioder fjernet: ${fjernet}, lagt til: ${lagtTil}`;
    }
};
const getEndringerOppsummeringTags = ({
    perioderLagtTil,
    perioderFjernet,
}: {
    perioderLagtTil: number;
    perioderFjernet: number;
}) => {
    const tags = Array<ReactNode>();

    if (perioderFjernet === 0 && perioderLagtTil === 0) {
        return null;
    }

    if (perioderFjernet > 0) {
        tags.push(<FerieTag type="fjernet">Perioder fjernet</FerieTag>);
    }
    if (perioderLagtTil > 0) {
        tags.push(<FerieTag>Perioder lagt til</FerieTag>);
    }
    return tags;
};

const LovbestemtFerieOppsummering = ({ lovbestemtFerie, lovbestemtFerieErEndret, brukExpansionCard }: Props) => {
    const navigate = useNavigate();
    const { text } = useAppIntl();

    const { perioderFjernet = [], perioderLagtTil = [] } = lovbestemtFerie
        ? getLovbestemtFerieOppsummeringInfo(lovbestemtFerie)
        : {};

    const perioderLagtTilInfo = (
        <FerieendringerList title={text('oppsummeringStep.ferie.lagtTil')} perioder={perioderLagtTil} />
    );
    const perioderFjernetInfo = (
        <FerieendringerList title={text('oppsummeringStep.ferie.fjernet')} perioder={perioderFjernet} />
    );

    const endringerOppsummering = getEndringerOppsummeringTags({
        perioderFjernet: perioderFjernet.length,
        perioderLagtTil: perioderLagtTil.length,
    });

    if (brukExpansionCard) {
        return (
            <StepOppsummering
                tittel="Ferie"
                endret={perioderFjernet.length + perioderLagtTil.length > 0}
                stepId={StepId.LOVBESTEMT_FERIE}
                icon={<AirplaneIcon aria-hidden fontSize="3rem" />}
                endringer={endringerOppsummering}
                endreLinkTekst="Gå til endring av ferie">
                <VStack gap="space-16">
                    {perioderLagtTilInfo}
                    {perioderFjernetInfo}
                </VStack>
            </StepOppsummering>
        );
    }

    return (
        <VStack gap="space-16">
            <Heading level="2" size="medium">
                <AppText id="oppsummeringStep.ferie.tittel" />
            </Heading>
            {lovbestemtFerie !== undefined && lovbestemtFerieErEndret ? (
                <VStack gap="space-16">
                    <VStack gap="space-16">
                        {perioderLagtTilInfo}
                        {perioderFjernetInfo}
                        <ActionLink onClick={() => navigate(getSøknadStepRoute(StepId.LOVBESTEMT_FERIE))}>
                            Endre ferie
                        </ActionLink>
                    </VStack>
                </VStack>
            ) : (
                <VStack gap="space-16">
                    <InlineMessage status="info">
                        <AppText id="oppsummeringStep.ferie.ingenEndringer" />
                    </InlineMessage>
                    <ActionLink onClick={() => navigate(getSøknadStepRoute(StepId.LOVBESTEMT_FERIE))}>
                        Gå til endring av ferie
                    </ActionLink>
                </VStack>
            )}
        </VStack>
    );
};

export default LovbestemtFerieOppsummering;
