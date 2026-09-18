import { ClockDashedIcon } from '@navikt/aksel-icons';
import { Alert, Heading, InlineMessage, VStack } from '@navikt/ds-react';
import { ActionLink } from '@navikt/sif-common-ui';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import { StepOppsummering } from '../../../../components/step-oppsummering/StepOppsummering';
import EndretTag from '../../../../components/tags/EndretTag';
import { AppText } from '../../../../i18n';
import { ArbeidsgiverMedAnsettelseperioder, ArbeidstidApiData } from '../../../../types';
import { getSøknadStepRoute } from '../../../config/SøknadRoutes';
import { StepId } from '../../../config/StepId';
import ArbeidstidArbeidsforholdOppsummering from './ArbeidstidArbeidsforholdOppsummering';

interface Props {
    arbeidstid?: ArbeidstidApiData;
    arbeidsgivere: ArbeidsgiverMedAnsettelseperioder[];
    arbeidstidErEndret: boolean;
    harGyldigArbeidstid: boolean;
    brukAccordion?: boolean;
}

const getArbeidstidEndringerOppsummering = (apiData: ArbeidstidApiData) => {
    const tags = Array<ReactNode>();
    apiData.arbeidstakerList.forEach((arbeidstaker) => {
        tags.push(<EndretTag>{arbeidstaker.organisasjonsnavn}</EndretTag>);
    });
    if (apiData.frilanserArbeidstidInfo) {
        tags.push(<EndretTag>Frilans</EndretTag>);
    }
    if (apiData.selvstendigNæringsdrivendeArbeidstidInfo) {
        tags.push(<EndretTag>Selvstendig næringsdrivende</EndretTag>);
    }
    return tags;
};

const ArbeidstidOppsummering = ({
    arbeidsgivere,
    arbeidstid,
    arbeidstidErEndret,
    harGyldigArbeidstid,
    brukAccordion,
}: Props) => {
    const navigate = useNavigate();

    if (brukAccordion) {
        return (
            <StepOppsummering
                tittel="Arbeidstid"
                stepId={StepId.ARBEIDSTID}
                endret={arbeidstidErEndret}
                icon={<ClockDashedIcon aria-hidden fontSize="3rem" />}
                endreLinkTekst="Gå til endring av arbeidstid"
                endringer={
                    arbeidstidErEndret && arbeidstid ? getArbeidstidEndringerOppsummering(arbeidstid) : undefined
                }>
                {arbeidstid && (
                    <ArbeidstidArbeidsforholdOppsummering arbeidstid={arbeidstid} arbeidsgivere={arbeidsgivere} />
                )}
            </StepOppsummering>
        );
    }

    return (
        <VStack gap="space-16">
            <Heading level="2" size="medium">
                <AppText id="oppsummeringStep.arbeidstid.tittel" />
            </Heading>
            {arbeidstid && arbeidstidErEndret ? (
                <VStack gap="space-16">
                    <ArbeidstidArbeidsforholdOppsummering arbeidstid={arbeidstid} arbeidsgivere={arbeidsgivere} />
                    {!harGyldigArbeidstid && (
                        <Alert variant="error">
                            <AppText id="oppsummeringStep.arbeidstid.flereTimerEnnTilgjengelig" />
                        </Alert>
                    )}
                    <ActionLink onClick={() => navigate(getSøknadStepRoute(StepId.ARBEIDSTID))}>
                        Gå til endring av arbeidstid
                    </ActionLink>
                </VStack>
            ) : (
                <VStack gap="space-16">
                    <InlineMessage status="info">
                        <AppText id="oppsummeringStep.arbeidstid.ingenEndringer" />
                    </InlineMessage>
                    <ActionLink onClick={() => navigate(getSøknadStepRoute(StepId.ARBEIDSTID))}>
                        Gå til endring av arbeidstid
                    </ActionLink>
                </VStack>
            )}
        </VStack>
    );
};

export default ArbeidstidOppsummering;
