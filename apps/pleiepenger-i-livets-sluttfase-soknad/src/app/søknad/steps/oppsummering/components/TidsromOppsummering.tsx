import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { SummaryBlock, SummaryList, SummarySection } from '@navikt/sif-common-soknad-ds';
import { FormattedMessage, useIntl } from 'react-intl';
import { SøknadApiData } from '../../../../types/søknadApiData/SøknadApiData';
import ValgteDagerMedPleie from './ValgteDagerMedPleie';
import { renderUtenlandsoppholdIPeriodenSummary } from './renderUtenlandsoppholdSummary';

interface Props {
    dagerMedPleie: Date[];
    apiData: SøknadApiData;
}

const TidsromOppsummering = ({ apiData, dagerMedPleie }: Props) => {
    const intl = useIntl();

    return (
        <SummarySection header={intlHelper(intl, 'steg.oppsummering.tidsrom.header')}>
            <SummaryBlock
                header={`${dagerMedPleie.length} ${dagerMedPleie.length === 1 ? 'dag' : 'dager'} med pleiepenger`}>
                <ValgteDagerMedPleie dagerMedPleie={dagerMedPleie} />
            </SummaryBlock>

            <SummaryBlock header={intlHelper(intl, 'steg.oppsummering.pleierDuDenSykeHjemme.header')}>
                <FormattedMessage id={apiData.pleierDuDenSykeHjemme ? 'Ja' : 'Nei'} />
            </SummaryBlock>

            <SummaryBlock header={intlHelper(intl, 'steg.oppsummering.skalJobbeOgPleieSammeDag.header')}>
                <FormattedMessage id={apiData.skalJobbeOgPleieSammeDag ? 'Ja' : 'Nei'} />
            </SummaryBlock>

            {apiData.utenlandsoppholdIPerioden && (
                <>
                    <SummaryBlock header={intlHelper(intl, 'steg.oppsummering.utenlandsoppholdIPerioden.header')}>
                        <FormattedMessage
                            id={apiData.utenlandsoppholdIPerioden.skalOppholdeSegIUtlandetIPerioden ? 'Ja' : 'Nei'}
                        />
                    </SummaryBlock>

                    {apiData.utenlandsoppholdIPerioden.opphold.length > 0 && (
                        <Block>
                            <SummaryList
                                items={apiData.utenlandsoppholdIPerioden.opphold}
                                itemRenderer={renderUtenlandsoppholdIPeriodenSummary}
                            />
                        </Block>
                    )}
                </>
            )}
        </SummarySection>
    );
};

export default TidsromOppsummering;
