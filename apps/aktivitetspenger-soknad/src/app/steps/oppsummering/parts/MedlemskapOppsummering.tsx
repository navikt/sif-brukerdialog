import { Box, FormSummary, VStack } from '@navikt/ds-react';
import { MedlemskapAktivitetspenger } from '@navikt/k9-brukerdialog-prosessering-api';
import { JaNeiSvar } from '@sif/soknad-ui';
import { useStepNavigation } from '@sif/soknad-app';

import { SøknadStepId } from '../../../types/SoknadStepId';
import { AppText } from '../../../i18n';
import { ArbeidUtlandList, BostedUtlandList } from '@sif/soknad-forms';
import { ISODate } from '@sif/utils';

interface Props {
    medlemskap: MedlemskapAktivitetspenger;
}

export const MedlemskapOppsummering = ({
    medlemskap: {
        harBoddINorge,
        arbeidsstederUtenforNorge,
        harJobbetINorge,
        bostederUtenforNorge,
        harJobbetUtenforNorge,
    },
}: Props) => {
    const { navigateToStep } = useStepNavigation();
    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <AppText id="step.medlemskap.title" />
                </FormSummary.Heading>
            </FormSummary.Header>

            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <AppText id="medlemskapSteg.spørsmål.harBoddINorge" />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        <JaNeiSvar harSvartJa={harBoddINorge} />
                    </FormSummary.Value>
                </FormSummary.Answer>

                {harBoddINorge && (
                    <>
                        {/* Har jobbet utenfor Norge */}
                        <FormSummary.Answer>
                            <FormSummary.Label>
                                <AppText id="medlemskapSteg.spørsmål.harJobbetUtenforNorge" />
                            </FormSummary.Label>
                            <FormSummary.Value>
                                <JaNeiSvar harSvartJa={harJobbetUtenforNorge} />
                            </FormSummary.Value>
                        </FormSummary.Answer>
                    </>
                )}

                {harBoddINorge === false && (
                    <>
                        {/* Jobbet i Norge */}
                        <FormSummary.Answer>
                            <FormSummary.Label>
                                <AppText id="medlemskapSteg.spørsmål.harJobbetINorge" />
                            </FormSummary.Label>
                            <FormSummary.Value>
                                <VStack gap="space-12">
                                    <JaNeiSvar harSvartJa={harJobbetINorge} />
                                </VStack>
                            </FormSummary.Value>
                        </FormSummary.Answer>
                        {harJobbetINorge && (
                            <FormSummary.Answer>
                                <FormSummary.Label>
                                    <AppText id="medlemskapSteg.spørsmål.harJobbetUtenforNorge" />
                                </FormSummary.Label>
                                <FormSummary.Value>
                                    <VStack gap="space-12">
                                        <JaNeiSvar harSvartJa={harJobbetUtenforNorge} />
                                    </VStack>
                                </FormSummary.Value>
                            </FormSummary.Answer>
                        )}
                    </>
                )}

                {bostederUtenforNorge && bostederUtenforNorge?.length > 0 && (
                    <FormSummary.Answer>
                        <FormSummary.Label>Bosteder utenfor Norge siste 5 år</FormSummary.Label>
                        <FormSummary.Value>
                            <Box marginBlock="space-12">
                                <BostedUtlandList
                                    bosteder={bostederUtenforNorge.map((a, index) => ({
                                        ...a,
                                        id: `${index}`,

                                        periode: {
                                            from: a.fraOgMed as ISODate,
                                            to: a.tilOgMed as ISODate,
                                        },
                                    }))}
                                />
                            </Box>
                        </FormSummary.Value>
                    </FormSummary.Answer>
                )}
                {arbeidsstederUtenforNorge && arbeidsstederUtenforNorge?.length > 0 && (
                    <FormSummary.Answer>
                        <FormSummary.Label>Jobb utenfor Norge siste 5 år</FormSummary.Label>
                        <FormSummary.Value>
                            <Box marginBlock="space-12">
                                <ArbeidUtlandList
                                    arbeidssteder={arbeidsstederUtenforNorge.map((a, index) => ({
                                        ...a,
                                        id: `${index}`,
                                        identitetsnummer: a.identitetsnummer,
                                        periode: {
                                            from: a.fraOgMed as ISODate,
                                            to: a.tilOgMed as ISODate,
                                        },
                                    }))}
                                />
                            </Box>
                        </FormSummary.Value>
                    </FormSummary.Answer>
                )}
            </FormSummary.Answers>

            <FormSummary.Footer>
                <FormSummary.EditLink
                    href="#"
                    onClick={(evt) => {
                        evt.preventDefault();
                        evt.stopPropagation();
                        navigateToStep(SøknadStepId.MEDLEMSKAP);
                    }}
                />
            </FormSummary.Footer>
        </FormSummary>
    );
};
