import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { SummaryBlock, SummaryList, SummarySection } from '@navikt/sif-common-ui';
import { SøknadApiData } from '../../../../types/søknadApiData/SøknadApiData';
import { renderUtenlandsoppholdIPeriodenSummary } from './renderUtenlandsoppholdSummary';
import ValgteDagerMedPleie from './ValgteDagerMedPleie';
import { AppText, useAppIntl } from '../../../../i18n';

interface Props {
    dagerMedPleie: Date[];
    apiData: SøknadApiData;
}

const TidsromOppsummering = ({ apiData, dagerMedPleie }: Props) => {
    const { text } = useAppIntl();

    return (
        <SummarySection header={text('steg.oppsummering.tidsrom.header')}>
            <SummaryBlock
                header={`${dagerMedPleie.length} ${dagerMedPleie.length === 1 ? 'dag' : 'dager'} med pleiepenger`}>
                <ValgteDagerMedPleie dagerMedPleie={dagerMedPleie} />
            </SummaryBlock>

            <SummaryBlock header={text('steg.oppsummering.pleierDuDenSykeHjemme.header')}>
                <AppText id={apiData.pleierDuDenSykeHjemme ? 'Ja' : 'Nei'} />
            </SummaryBlock>

            <SummaryBlock header={text('steg.oppsummering.skalJobbeOgPleieSammeDag.header')}>
                <AppText id={apiData.skalJobbeOgPleieSammeDag ? 'Ja' : 'Nei'} />
            </SummaryBlock>

            {apiData.utenlandsoppholdIPerioden && (
                <>
                    <SummaryBlock header={text('steg.oppsummering.utenlandsoppholdIPerioden.header')}>
                        <AppText
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
