import { FormSummary, Heading } from '@navikt/ds-react';
import AttachmentList from '@navikt/sif-common-core-ds/src/components/attachment-list/AttachmentList';
import { Attachment } from '@navikt/sif-common-core-ds/src/types/Attachment';
import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { JaNeiSvar } from '@navikt/sif-common-ui';
import { AppText, useAppIntl } from '../../../../i18n';
import { Utbetalingsårsak } from '../../../../types/ArbeidsforholdTypes';
import { ArbeidsgiverDetaljer } from '../../../../types/søknadApiData/SøknadApiData';
import { ArbeidforholdSøknadsdata, SituasjonSøknadsdata } from '../../../../types/søknadsdata/SituasjonSøknadsdata';
import { Søknadsdata } from '../../../../types/søknadsdata/Søknadsdata';
import UtbetalingsperioderSummaryView from './UtbetalingsperioderSummaryView';

const getArbeidsforholdAttachments = (organisasjonsnummer: string, situasjon?: SituasjonSøknadsdata) => {
    if (!situasjon) {
        return undefined;
    }
    const forhold = situasjon[organisasjonsnummer];

    if (forhold.type === 'harHattFraværUtenLønnKonfliktMedArbeidsgiver') {
        return forhold.dokumenter;
    }

    return undefined;
};

interface Props {
    listeAvArbeidsforhold: ArbeidsgiverDetaljer[];
    søknadsdata: Søknadsdata;
}

const ArbeidsforholdSummaryView: React.FC<Props> = ({
    listeAvArbeidsforhold,
    søknadsdata,
}: Props): React.ReactElement => {
    const { text } = useAppIntl();

    const arbeidsgivereUtenFravær = søknadsdata.situasjon
        ? Object.values(søknadsdata.situasjon).filter(
              (forhold) => forhold.type === 'harIkkeHattFravær' || forhold.type === 'harHattFraværMedLønn',
          )
        : [];

    return (
        <>
            <FormSummary>
                <FormSummary.Header>
                    <FormSummary.Heading level="2">
                        <AppText id="step.oppsummering.arbeidsforhold.tittel" />
                    </FormSummary.Heading>
                </FormSummary.Header>

                {listeAvArbeidsforhold.map((arbeidsforhold: ArbeidsgiverDetaljer, index: number) => {
                    const orgInfo = {
                        navn: arbeidsforhold.navn,
                        organisasjonsnummer: arbeidsforhold.organisasjonsnummer,
                    };

                    const maybeListOfAttachments: Attachment[] | undefined = getArbeidsforholdAttachments(
                        arbeidsforhold.organisasjonsnummer,
                        søknadsdata.situasjon,
                    );

                    return (
                        <FormSummary.Answers key={index}>
                            <FormSummary.Answer>
                                <FormSummary.Label>
                                    <Heading level="3" size="small" spacing={true}>
                                        {orgInfo.navn}{' '}
                                        {orgInfo.organisasjonsnummer && (
                                            <>(organisasjonsnummer: {orgInfo.organisasjonsnummer})</>
                                        )}
                                    </Heading>
                                </FormSummary.Label>
                                <FormSummary.Value>
                                    <FormSummary.Answers>
                                        <FormSummary.Answer>
                                            <FormSummary.Label>
                                                <AppText id="step.oppsummering.arbeidsforhold.harHattFravær.spm" />
                                            </FormSummary.Label>
                                            <FormSummary.Value>
                                                <JaNeiSvar harSvartJa={arbeidsforhold.harHattFraværHosArbeidsgiver} />
                                            </FormSummary.Value>
                                        </FormSummary.Answer>

                                        {arbeidsforhold.harHattFraværHosArbeidsgiver && (
                                            <FormSummary.Answer>
                                                <FormSummary.Label>
                                                    <AppText id="step.oppsummering.arbeidsforhold.harArbeidsgiverUtbetaltDegLønnForOmsorgsdagene.spm" />
                                                </FormSummary.Label>
                                                <FormSummary.Value>
                                                    <JaNeiSvar
                                                        harSvartJa={arbeidsforhold.arbeidsgiverHarUtbetaltLønn}
                                                    />
                                                </FormSummary.Value>
                                            </FormSummary.Answer>
                                        )}

                                        <FormSummary.Answer>
                                            <FormSummary.Label>
                                                <AppText id="step.oppsummering.arbeidsforhold.utbetalingsårsak.spm" />
                                            </FormSummary.Label>
                                            <FormSummary.Value>
                                                <AppText
                                                    id={`step.oppsummering.arbeidsforhold.utbetalingsårsak.${arbeidsforhold.utbetalingsårsak}`}
                                                />
                                            </FormSummary.Value>
                                        </FormSummary.Answer>

                                        {arbeidsforhold.utbetalingsårsak ===
                                            Utbetalingsårsak.nyoppstartetHosArbeidsgiver &&
                                            arbeidsforhold.årsakNyoppstartet && (
                                                <FormSummary.Answer>
                                                    <FormSummary.Label>
                                                        <AppText id="step.oppsummering.arbeidsforhold.årsakMinde4Uker.spm" />
                                                    </FormSummary.Label>
                                                    <FormSummary.Value>
                                                        <AppText
                                                            id={`step.oppsummering.arbeidsforhold.årsakMinde4Uker.${arbeidsforhold.årsakNyoppstartet}`}
                                                        />
                                                    </FormSummary.Value>
                                                </FormSummary.Answer>
                                            )}

                                        {arbeidsforhold.utbetalingsårsak ===
                                            Utbetalingsårsak.konfliktMedArbeidsgiver && (
                                            <>
                                                <FormSummary.Answer>
                                                    <FormSummary.Label>
                                                        <AppText id="step.oppsummering.arbeidsforhold.konflikt.forklaringTittel" />
                                                    </FormSummary.Label>
                                                    <FormSummary.Value>
                                                        <p>{arbeidsforhold.konfliktForklaring}</p>
                                                    </FormSummary.Value>
                                                </FormSummary.Answer>
                                                <FormSummary.Answer>
                                                    <FormSummary.Label>
                                                        <AppText id="step.oppsummering.arbeidsforhold.konflikt.dokumenter.header" />
                                                    </FormSummary.Label>
                                                    <FormSummary.Value>
                                                        {maybeListOfAttachments && maybeListOfAttachments.length > 0 ? (
                                                            <AttachmentList attachments={maybeListOfAttachments} />
                                                        ) : (
                                                            <i>
                                                                {text(
                                                                    'step.oppsummering.arbeidsforhold.konflikt.dokumenter.ikkelastetopp',
                                                                )}
                                                            </i>
                                                        )}
                                                    </FormSummary.Value>
                                                </FormSummary.Answer>
                                            </>
                                        )}

                                        <UtbetalingsperioderSummaryView utbetalingsperioder={arbeidsforhold.perioder} />
                                    </FormSummary.Answers>
                                </FormSummary.Value>
                            </FormSummary.Answer>
                        </FormSummary.Answers>
                    );
                })}

                {arbeidsgivereUtenFravær.length > 0 &&
                    arbeidsgivereUtenFravær.map(
                        (arbeidsforholdsøknadsdata: ArbeidforholdSøknadsdata, index: number) => {
                            const { navn, organisasjonsnummer, harHattFraværHosArbeidsgiver, type } =
                                arbeidsforholdsøknadsdata;

                            return (
                                <FormSummary.Answers key={index}>
                                    <FormSummary.Answer>
                                        <FormSummary.Label>
                                            <Heading level="3" size="small" spacing={true}>
                                                {navn}{' '}
                                                {organisasjonsnummer && (
                                                    <>(organisasjonsnummer: {organisasjonsnummer})</>
                                                )}
                                            </Heading>
                                        </FormSummary.Label>
                                        <FormSummary.Value>
                                            <FormSummary.Answers>
                                                <FormSummary.Answer>
                                                    <FormSummary.Label>
                                                        <AppText id="step.oppsummering.arbeidsforhold.harHattFravær.spm" />
                                                    </FormSummary.Label>
                                                    <FormSummary.Value>
                                                        <JaNeiSvar
                                                            harSvartJa={harHattFraværHosArbeidsgiver === YesOrNo.YES}
                                                        />
                                                    </FormSummary.Value>
                                                </FormSummary.Answer>

                                                {type === 'harHattFraværMedLønn' && (
                                                    <FormSummary.Answer>
                                                        <FormSummary.Label>
                                                            <AppText id="step.oppsummering.arbeidsforhold.harArbeidsgiverUtbetaltDegLønnForOmsorgsdagene.spm" />
                                                        </FormSummary.Label>
                                                        <FormSummary.Value>
                                                            <JaNeiSvar
                                                                harSvartJa={
                                                                    arbeidsforholdsøknadsdata.arbeidsgiverHarUtbetaltLønn ===
                                                                    YesOrNo.YES
                                                                }
                                                            />
                                                        </FormSummary.Value>
                                                    </FormSummary.Answer>
                                                )}
                                            </FormSummary.Answers>
                                        </FormSummary.Value>
                                    </FormSummary.Answer>
                                </FormSummary.Answers>
                            );
                        },
                    )}
            </FormSummary>
        </>
    );
};

export default ArbeidsforholdSummaryView;
