import { FormSummary, VStack } from '@navikt/ds-react';
import { DurationText, JaNeiSvar } from '@navikt/sif-common-ui';
import { ISODurationToDuration } from '@navikt/sif-common-utils';

import IkkeAnsattMelding from '../../../../components/ikke-ansatt-melding/IkkeAnsattMelding';
import { AppText } from '../../../../i18n';
import { Arbeidsgiver, UkjentArbeidsforholdApiData } from '../../../../types';

interface Props {
    arbeidsgivereIkkeISak: Arbeidsgiver[];
    ukjenteArbeidsforhold: UkjentArbeidsforholdApiData[];
}

const getTestKey = (arbeidsgiver: Arbeidsgiver, key: string) => `ukjentArbeidsforhold_${arbeidsgiver.key}_${key}`;

const NyttArbeidsforholdSummary = ({ arbeidsgivereIkkeISak, ukjenteArbeidsforhold }: Props) => {
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
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <AppText id="oppsummeringStep.nyttArbeidsforhold.tittel" />
                </FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                {nyeArbeidsforhold.map(({ arbeidsgiver, arbeidsforhold }) => (
                    <FormSummary.Answer key={arbeidsgiver.key}>
                        <FormSummary.Label>{arbeidsgiver.navn}</FormSummary.Label>
                        <FormSummary.Value>
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
                        </FormSummary.Value>
                    </FormSummary.Answer>
                ))}
            </FormSummary.Answers>
        </FormSummary>
    );
};

export default NyttArbeidsforholdSummary;
