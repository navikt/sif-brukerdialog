import { Box, FormSummary } from '@navikt/ds-react';
import { MedlemskapAktivitetspenger } from '@navikt/k9-brukerdialog-prosessering-api';
import { JaNeiSvar } from '@sif/soknad-ui';
import { useStepNavigation } from '@sif/soknad-app';

import { SøknadStepId } from '../../../types/SoknadStepId';
import { AppText } from '../../../i18n';
import { ArbeidUtlandList } from '@sif/soknad-forms';
import { ISODate } from '@sif/utils';
import { getMedlemskapSynlighet } from '../../medlemskap/medlemskapSynlighet';

interface Props {
    medlemskap: MedlemskapAktivitetspenger;
}

export const MedlemskapOppsummering = ({ medlemskap }: Props) => {
    const { navigateToStep } = useStepNavigation();
    const { harBoddINorge, arbeidsstederUtenforNorge, harJobbetINorge, bostederUtenforNorge, harJobbetUtenforNorge } =
        medlemskap;

    /* API-typen har allerede boolean-svar, og kan sendes rett inn */
    const synlig = getMedlemskapSynlighet(medlemskap);

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

                {/* Jobbet i Norge */}
                {synlig.harJobbetINorge && (
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <AppText id="medlemskapSteg.spørsmål.harJobbetINorge" />
                        </FormSummary.Label>
                        <FormSummary.Value>
                            <JaNeiSvar harSvartJa={harJobbetINorge} />
                        </FormSummary.Value>
                    </FormSummary.Answer>
                )}

                {/* Jobbet utenfor Norge */}
                {synlig.harJobbetUtenforNorge && (
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <AppText id="medlemskapSteg.spørsmål.harJobbetUtenforNorge" />
                        </FormSummary.Label>
                        <FormSummary.Value>
                            <JaNeiSvar harSvartJa={harJobbetUtenforNorge} />
                        </FormSummary.Value>
                    </FormSummary.Answer>
                )}

                {synlig.bostederUtenforNorge && bostederUtenforNorge && bostederUtenforNorge.length > 0 && (
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <AppText id="oppsummeringSteg.medlemskap.bostederUtenforNorge" />
                        </FormSummary.Label>
                        <FormSummary.Value>
                            <Box marginBlock="space-12">
                                <ArbeidUtlandList
                                    arbeidUtlandVariant="generell"
                                    variant="summary"
                                    arbeidssteder={bostederUtenforNorge.map((a, index) => ({
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

                {synlig.arbeidsstederUtenforNorge &&
                    arbeidsstederUtenforNorge &&
                    arbeidsstederUtenforNorge.length > 0 && (
                        <FormSummary.Answer>
                            <FormSummary.Label>
                                <AppText id="oppsummering.medlemskap.arbeidstederUtenforNorge" />
                            </FormSummary.Label>
                            <FormSummary.Value>
                                <Box marginBlock="space-12">
                                    <ArbeidUtlandList
                                        arbeidUtlandVariant="periodeMedJobb"
                                        variant="summary"
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
