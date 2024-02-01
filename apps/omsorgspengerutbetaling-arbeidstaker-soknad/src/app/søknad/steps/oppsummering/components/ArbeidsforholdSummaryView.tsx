import { FormattedMessage, useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import AttachmentList from '@navikt/sif-common-core-ds/src/components/attachment-list/AttachmentList';
import { Attachment } from '@navikt/sif-common-core-ds/src/types/Attachment';
import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { JaNeiSvar, SummaryBlock } from '@navikt/sif-common-ui';
import { Utbetalingsårsak } from '../../../../types/ArbeidsforholdTypes';
import { ArbeidsgiverDetaljer } from '../../../../types/søknadApiData/SøknadApiData';
import { ArbeidforholdSøknadsdata, SituasjonSøknadsdata } from '../../../../types/søknadsdata/SituasjonSøknadsdata';
import { Søknadsdata } from '../../../../types/søknadsdata/Søknadsdata';
import UtbetalingsperioderSummaryView from './UtbetalingsperioderSummaryView';
import './arbeidsforholdSummary.css';

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
    const intl = useIntl();

    const arbeidsgivereUtenFravær = søknadsdata.situasjon
        ? Object.values(søknadsdata.situasjon).filter(
              (forhold) => forhold.type === 'harIkkeHattFravær' || forhold.type === 'harHattFraværMedLønn',
          )
        : [];

    return (
        <>
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
                    <Block key={index} margin="l">
                        {/* Title */}
                        <div className={'arbeidsforholdSummary__org'}>
                            {orgInfo.navn}{' '}
                            {orgInfo.organisasjonsnummer && <>(organisasjonsnummer: {orgInfo.organisasjonsnummer})</>}
                        </div>
                        {/* Content */}
                        <div className={'arbeidsforholdSummaryContent'}>
                            <Block margin={'s'}>
                                <SummaryBlock
                                    header={intlHelper(intl, 'step.oppsummering.arbeidsforhold.harHattFravær.spm')}>
                                    <JaNeiSvar harSvartJa={arbeidsforhold.harHattFraværHosArbeidsgiver} />
                                </SummaryBlock>
                            </Block>
                            {arbeidsforhold.harHattFraværHosArbeidsgiver && (
                                <Block margin={'s'}>
                                    <SummaryBlock
                                        header={intlHelper(
                                            intl,
                                            'step.oppsummering.arbeidsforhold.harArbeidsgiverUtbetaltDegLønnForOmsorgsdagene.spm',
                                        )}>
                                        <JaNeiSvar harSvartJa={arbeidsforhold.arbeidsgiverHarUtbetaltLønn} />
                                    </SummaryBlock>
                                </Block>
                            )}
                            <Block margin={'s'}>
                                <SummaryBlock
                                    header={intlHelper(intl, 'step.oppsummering.arbeidsforhold.utbetalingsårsak.spm')}>
                                    <FormattedMessage
                                        id={`step.oppsummering.arbeidsforhold.utbetalingsårsak.${arbeidsforhold.utbetalingsårsak}`}
                                    />
                                </SummaryBlock>
                            </Block>
                            {arbeidsforhold.utbetalingsårsak === Utbetalingsårsak.nyoppstartetHosArbeidsgiver &&
                                arbeidsforhold.årsakNyoppstartet && (
                                    <Block margin={'s'}>
                                        <SummaryBlock
                                            header={intlHelper(
                                                intl,
                                                'step.oppsummering.arbeidsforhold.årsakMinde4Uker.spm',
                                            )}>
                                            <FormattedMessage
                                                id={`step.oppsummering.arbeidsforhold.årsakMinde4Uker.${arbeidsforhold.årsakNyoppstartet}`}
                                            />
                                        </SummaryBlock>
                                    </Block>
                                )}

                            {arbeidsforhold.utbetalingsårsak === Utbetalingsårsak.konfliktMedArbeidsgiver && (
                                <Block margin={'s'}>
                                    <Block margin={'s'}>
                                        <SummaryBlock
                                            header={intlHelper(
                                                intl,
                                                'step.oppsummering.arbeidsforhold.konflikt.forklaringTittel',
                                            )}>
                                            <p>{arbeidsforhold.konfliktForklaring}</p>
                                        </SummaryBlock>
                                    </Block>
                                    <SummaryBlock
                                        header={intlHelper(
                                            intl,
                                            'step.oppsummering.arbeidsforhold.konflikt.dokumenter.header',
                                        )}>
                                        {maybeListOfAttachments && maybeListOfAttachments.length > 0 ? (
                                            <AttachmentList attachments={maybeListOfAttachments} />
                                        ) : (
                                            <i>
                                                {intlHelper(
                                                    intl,
                                                    'step.oppsummering.arbeidsforhold.konflikt.dokumenter.ikkelastetopp',
                                                )}
                                            </i>
                                        )}
                                    </SummaryBlock>
                                </Block>
                            )}

                            {/* Periode */}
                            <UtbetalingsperioderSummaryView utbetalingsperioder={arbeidsforhold.perioder} />
                        </div>
                    </Block>
                );
            })}
            {arbeidsgivereUtenFravær.length > 0 &&
                arbeidsgivereUtenFravær.map((arbeidsforholdsøknadsdata: ArbeidforholdSøknadsdata, index: number) => {
                    const { navn, organisasjonsnummer, harHattFraværHosArbeidsgiver, type } = arbeidsforholdsøknadsdata;

                    return (
                        <Block key={index} margin="l">
                            {/* Title */}
                            <div className={'arbeidsforholdSummary__org'}>
                                {navn} {organisasjonsnummer && <>(organisasjonsnummer: {organisasjonsnummer})</>}
                            </div>
                            {/* Content */}
                            <div className={'arbeidsforholdSummaryContent'}>
                                <Block margin={'s'}>
                                    <SummaryBlock
                                        header={intlHelper(intl, 'step.oppsummering.arbeidsforhold.harHattFravær.spm')}>
                                        <JaNeiSvar harSvartJa={harHattFraværHosArbeidsgiver === YesOrNo.YES} />
                                    </SummaryBlock>
                                </Block>
                                {type === 'harHattFraværMedLønn' && (
                                    <Block margin={'s'}>
                                        <SummaryBlock
                                            header={intlHelper(
                                                intl,
                                                'step.oppsummering.arbeidsforhold.harArbeidsgiverUtbetaltDegLønnForOmsorgsdagene.spm',
                                            )}>
                                            <JaNeiSvar
                                                harSvartJa={
                                                    arbeidsforholdsøknadsdata.arbeidsgiverHarUtbetaltLønn ===
                                                    YesOrNo.YES
                                                }
                                            />
                                        </SummaryBlock>
                                    </Block>
                                )}
                            </div>
                        </Block>
                    );
                })}
        </>
    );
};

export default ArbeidsforholdSummaryView;
