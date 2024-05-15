import bemUtils from '@navikt/sif-common-core-ds/src/utils/bemUtils';
import { JaNeiSvar, SummaryBlock, SummarySection, TextareaSvar } from '@navikt/sif-common-ui';
import { ISODateToDate, prettifyDateExtended } from '@navikt/sif-common-utils';
import { AppText, useAppIntl } from '../../../i18n';
import { AnnenForelderApiData } from '../../../types/søknadApiData/SøknadApiData';

const bem = bemUtils('utenlandsoppholdSummaryItem');
interface Props {
    annenForelder: AnnenForelderApiData;
}

const AnnenForelderSituasjonOppsummering = ({ annenForelder }: Props) => {
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
        <SummarySection header={text('step.oppsummering.annenForelderensSituasjon.header')}>
            <SummaryBlock header={text('step.oppsummering.annenForelderensSituasjon.tittel')}>
                <AppText id={`grunn.${annenForelder.situasjon}`} />
            </SummaryBlock>

            {annenForelder.situasjonBeskrivelse && (
                <SummaryBlock header={text('step.oppsummering.annenForelderensSituasjon.beskrivelse')}>
                    <TextareaSvar text={annenForelder.situasjonBeskrivelse} />
                </SummaryBlock>
            )}

            {annenForelder.periodeFraOgMed && (
                <SummaryBlock header={text('step.oppsummering.annenForelderensSituasjon.periode.header')}>
                    {renderPeriodeAnnenForelderenKanIkkeHaTilsyn(
                        annenForelder.periodeFraOgMed,
                        annenForelder.periodeTilOgMed,
                    )}
                </SummaryBlock>
            )}
            {!annenForelder.periodeTilOgMed && (
                <SummaryBlock header={text('step.oppsummering.annenForelderensSituasjon.erVarighetMerEnn6Maneder')}>
                    <JaNeiSvar harSvartJa={annenForelder.periodeOver6Måneder} />
                </SummaryBlock>
            )}
        </SummarySection>
    );
};

export default AnnenForelderSituasjonOppsummering;
