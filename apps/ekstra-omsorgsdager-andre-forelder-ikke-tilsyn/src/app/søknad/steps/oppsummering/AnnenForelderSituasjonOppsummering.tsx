import { FormattedMessage, useIntl } from 'react-intl';
import bemUtils from '@navikt/sif-common-core-ds/src/utils/bemUtils';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { JaNeiSvar, SummaryBlock, SummarySection, TextareaSvar } from '@navikt/sif-common-soknad-ds';
import { ISODateToDate, prettifyDateExtended } from '@navikt/sif-common-utils';
import { AnnenForelderApiData } from '../../../types/søknadApiData/SøknadApiData';

const bem = bemUtils('utenlandsoppholdSummaryItem');
interface Props {
    annenForelder: AnnenForelderApiData;
}

const AnnenForelderSituasjonOppsummering = ({ annenForelder }: Props) => {
    const intl = useIntl();

    const renderPeriodeAnnenForelderenKanIkkeHaTilsyn = (fraOgMed: string, tilOgMed?: string) => (
        <div className={bem.block}>
            <span className={bem.element('dates')}>
                {prettifyDateExtended(ISODateToDate(fraOgMed))} -{' '}
                {tilOgMed && prettifyDateExtended(ISODateToDate(tilOgMed))}
                {!tilOgMed && intlHelper(intl, 'step.oppsummering.annenForelderensSituasjon.VetIkkeHvorLengePerioden')}
            </span>
        </div>
    );

    return (
        <SummarySection header={intlHelper(intl, 'step.oppsummering.annenForelderensSituasjon.header')}>
            <SummaryBlock header={intlHelper(intl, 'step.oppsummering.annenForelderensSituasjon.tittel')}>
                <FormattedMessage id={`grunn.${annenForelder.situasjon}`} />
            </SummaryBlock>

            {annenForelder.situasjonBeskrivelse && (
                <SummaryBlock header={intlHelper(intl, 'step.oppsummering.annenForelderensSituasjon.beskrivelse')}>
                    <TextareaSvar text={annenForelder.situasjonBeskrivelse} />
                </SummaryBlock>
            )}

            {annenForelder.periodeFraOgMed && (
                <SummaryBlock header={intlHelper(intl, 'step.oppsummering.annenForelderensSituasjon.periode.header')}>
                    {renderPeriodeAnnenForelderenKanIkkeHaTilsyn(
                        annenForelder.periodeFraOgMed,
                        annenForelder.periodeTilOgMed,
                    )}
                </SummaryBlock>
            )}
            {!annenForelder.periodeTilOgMed && (
                <SummaryBlock
                    header={intlHelper(intl, 'step.oppsummering.annenForelderensSituasjon.erVarighetMerEnn6Maneder')}>
                    <JaNeiSvar harSvartJa={annenForelder.periodeOver6Måneder} />
                </SummaryBlock>
            )}
        </SummarySection>
    );
};

export default AnnenForelderSituasjonOppsummering;
