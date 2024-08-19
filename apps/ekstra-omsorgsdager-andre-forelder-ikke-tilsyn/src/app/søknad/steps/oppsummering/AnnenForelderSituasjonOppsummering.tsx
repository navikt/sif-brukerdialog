import { FormSummary } from '@navikt/ds-react';
import bemUtils from '@navikt/sif-common-core-ds/src/utils/bemUtils';
import { EditStepLink } from '@navikt/sif-common-soknad-ds';
import { JaNeiSvar, TextareaSvar } from '@navikt/sif-common-ui';
import { ISODateToDate, prettifyDateExtended } from '@navikt/sif-common-utils';
import { AppText, useAppIntl } from '../../../i18n';
import { AnnenForelderApiData } from '../../../types/søknadApiData/SøknadApiData';

const bem = bemUtils('utenlandsoppholdSummaryItem');
interface Props {
    annenForelder: AnnenForelderApiData;
    onEdit?: () => void;
}

const AnnenForelderSituasjonOppsummering = ({ annenForelder, onEdit }: Props) => {
    const { text } = useAppIntl();

    const renderPeriodeAnnenForelderenKanIkkeHaTilsyn = (fraOgMed: string, tilOgMed?: string) => (
        <div className={bem.block}>
            <span className={bem.element('dates')}>
                {prettifyDateExtended(ISODateToDate(fraOgMed))} -{' '}
                {tilOgMed && prettifyDateExtended(ISODateToDate(tilOgMed))}
                {!tilOgMed && text('step.oppsummering.annenForelderensSituasjon.VetIkkeHvorLengePerioden')}
            </span>
        </div>
    );

    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <AppText id="step.oppsummering.annenForelderensSituasjon.header" />
                </FormSummary.Heading>
                {onEdit && <EditStepLink onEdit={onEdit} />}
            </FormSummary.Header>
            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <AppText id="step.oppsummering.annenForelderensSituasjon.tittel" />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        <AppText id={`grunn.${annenForelder.situasjon}`} />
                    </FormSummary.Value>
                </FormSummary.Answer>
                {annenForelder.situasjonBeskrivelse && (
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <AppText id="step.oppsummering.annenForelderensSituasjon.beskrivelse" />
                        </FormSummary.Label>
                        <FormSummary.Value>
                            <TextareaSvar text={annenForelder.situasjonBeskrivelse} />
                        </FormSummary.Value>
                    </FormSummary.Answer>
                )}
                {annenForelder.periodeFraOgMed && (
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <AppText id="step.oppsummering.annenForelderensSituasjon.periode.header" />
                        </FormSummary.Label>
                        <FormSummary.Value>
                            {renderPeriodeAnnenForelderenKanIkkeHaTilsyn(
                                annenForelder.periodeFraOgMed,
                                annenForelder.periodeTilOgMed,
                            )}
                        </FormSummary.Value>
                    </FormSummary.Answer>
                )}
                {!annenForelder.periodeTilOgMed && (
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <AppText id="step.oppsummering.annenForelderensSituasjon.erVarighetMerEnn6Maneder" />
                        </FormSummary.Label>
                        <FormSummary.Value>
                            <JaNeiSvar harSvartJa={annenForelder.periodeOver6Måneder} />
                        </FormSummary.Value>
                    </FormSummary.Answer>
                )}
            </FormSummary.Answers>
        </FormSummary>
    );
};

export default AnnenForelderSituasjonOppsummering;
