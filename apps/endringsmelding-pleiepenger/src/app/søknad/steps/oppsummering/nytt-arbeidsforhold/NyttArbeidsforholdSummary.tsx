import { FormSummary, Heading, VStack } from '@navikt/ds-react';
import { ActionLink, DurationText, JaNeiSvar } from '@navikt/sif-common-ui';
import { ISODurationToDuration } from '@navikt/sif-common-utils';
import { useNavigate } from 'react-router-dom';

import IkkeAnsattMelding from '../../../../components/ikke-ansatt-melding/IkkeAnsattMelding';
import { AppText } from '../../../../i18n';
import { ArbeidsgiverMedAnsettelseperioder, UkjentArbeidsforholdApiData } from '../../../../types';
import { getSøknadStepRoute } from '../../../config/SøknadRoutes';
import { StepId } from '../../../config/StepId';

interface Props {
    arbeidsgivereIkkeISak: ArbeidsgiverMedAnsettelseperioder[];
    ukjenteArbeidsforhold: UkjentArbeidsforholdApiData[];
}

const getTestKey = (arbeidsgiver: ArbeidsgiverMedAnsettelseperioder, key: string) =>
    `ukjentArbeidsforhold_${arbeidsgiver.key}_${key}`;

const NyttArbeidsforholdSummary = ({ arbeidsgivereIkkeISak, ukjenteArbeidsforhold }: Props) => {
    const navigate = useNavigate();
    const nyeArbeidsforhold = arbeidsgivereIkkeISak
        .map((arbeidsgiver) => {
            const arbeidsforhold = ukjenteArbeidsforhold.find(
                (u) => u.organisasjonsnummer === arbeidsgiver.organisasjonsnummer,
            );
            return arbeidsforhold ? { arbeidsgiver, arbeidsforhold } : undefined;
        })
        .filter((item) => item !== undefined);

    if (nyeArbeidsforhold.length === 0) {
        return null;
    }

    return (
        <VStack gap="space-16">
            <Heading level="2" size="medium">
                <AppText id="oppsummeringStep.nyttArbeidsforhold.tittel" />
            </Heading>
            {nyeArbeidsforhold.map(({ arbeidsgiver, arbeidsforhold }) => (
                <FormSummary key={arbeidsgiver.key}>
                    <FormSummary.Header>
                        <FormSummary.Heading level="3">
                            <Heading as="span" size="small">
                                {arbeidsgiver.navn}
                            </Heading>
                        </FormSummary.Heading>
                    </FormSummary.Header>
                    <FormSummary.Answers>
                        <FormSummary.Answer>
                            <FormSummary.Label>
                                <AppText
                                    id="oppsummeringStep.arbeidsgiver.erAnsatt"
                                    values={{ arbeidsgivernavn: arbeidsgiver.navn }}
                                />
                            </FormSummary.Label>
                            <FormSummary.Value>
                                <VStack gap="space-12">
                                    <div data-testid={getTestKey(arbeidsgiver, 'erAnsatt')}>
                                        <JaNeiSvar harSvartJa={arbeidsforhold.erAnsatt} />
                                    </div>
                                    {arbeidsforhold.erAnsatt === false && <IkkeAnsattMelding />}
                                </VStack>
                            </FormSummary.Value>
                        </FormSummary.Answer>
                        {arbeidsforhold.erAnsatt && (
                            <FormSummary.Answer>
                                <FormSummary.Label>
                                    <AppText
                                        id="oppsummeringStep.arbeidsgiver.normalarbeidstid"
                                        values={{ arbeidsgivernavn: arbeidsgiver.navn }}
                                    />
                                </FormSummary.Label>
                                <FormSummary.Value>
                                    <div data-testid={getTestKey(arbeidsgiver, 'timerPerUke')}>
                                        <DurationText
                                            duration={ISODurationToDuration(
                                                arbeidsforhold.normalarbeidstid.timerPerUke,
                                            )}
                                        />
                                    </div>
                                </FormSummary.Value>
                            </FormSummary.Answer>
                        )}
                    </FormSummary.Answers>
                </FormSummary>
            ))}
            <VStack gap="space-16">
                <ActionLink onClick={() => navigate(getSøknadStepRoute(StepId.UKJENT_ARBEIDSFOHOLD))}>
                    Gå til endring av arbeidstid
                </ActionLink>
            </VStack>
        </VStack>
    );
};

export default NyttArbeidsforholdSummary;
