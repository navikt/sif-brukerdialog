import IkkeAnsattMelding from '@app/components/ikke-ansatt-melding/IkkeAnsattMelding';
import { AppText } from '@app/i18n';
import { ArbeidsgiverMedAnsettelseperioder } from '@app/types';
import { FormSummary, Heading, VStack } from '@navikt/ds-react';
import { DurationText, JaNeiSvar } from '@navikt/sif-common-ui';
import { ISODurationToDuration } from '@navikt/sif-common-utils';

import { NyttArbeidsforhold } from '../oppsummeringStepUtils';

interface Props {
    nyeArbeidsforhold: NyttArbeidsforhold[];
}

const getTestKey = (arbeidsgiver: ArbeidsgiverMedAnsettelseperioder, key: string) =>
    `ukjentArbeidsforhold_${arbeidsgiver.key}_${key}`;

const NyttArbeidsforholdOppsummering = ({ nyeArbeidsforhold }: Props) => (
    <VStack gap="space-32">
        {nyeArbeidsforhold.map(({ arbeidsgiver, arbeidsforhold }) => (
            <VStack gap="space-8" key={arbeidsgiver.key}>
                <Heading level="3" size="small">
                    {arbeidsgiver.navn}
                </Heading>
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
                                        duration={ISODurationToDuration(arbeidsforhold.normalarbeidstid.timerPerUke)}
                                    />
                                </div>
                            </FormSummary.Value>
                        </FormSummary.Answer>
                    )}
                </FormSummary.Answers>
            </VStack>
        ))}
    </VStack>
);

export default NyttArbeidsforholdOppsummering;
