import { FormattedMessage, useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { SummaryBlock, SummaryList, SummarySection } from '@navikt/sif-common-soknad-ds';
import { SøknadApiData } from '../../../../types/søknadApiData/SøknadApiData';
import {
    renderFerieuttakIPeriodenSummary,
    renderUtenlandsoppholdIPeriodenSummary,
} from './renderUtenlandsoppholdSummary';
import ValgteDagerMedPleie from './ValgteDagerMedPleie';

interface Props {
    dagerMedPleie: Date[];
    apiData: SøknadApiData;
}

const TidsromOppsummering = ({ apiData, dagerMedPleie }: Props) => {
    const intl = useIntl();

    return (
        <SummarySection header={intlHelper(intl, 'steg.oppsummering.tidsrom.header')}>
            {/* <SummaryBlock header={intlHelper(intl, 'steg.oppsummering.søknadsperiode.header')}>
                <FormattedMessage
                    id="steg.oppsummering.tidsrom.fomtom"
                    values={{
                        fom: `${dayjs(ISODateToDate(apiData.fraOgMed)).format('D. MMMM YYYY')}`,
                        tom: `${dayjs(ISODateToDate(apiData.tilOgMed)).format('D. MMMM YYYY')}`,
                    }}
                />
            </SummaryBlock> */}
            <SummaryBlock header={`${dagerMedPleie.length} dager med pleiepenger`}>
                <ValgteDagerMedPleie dagerMedPleie={dagerMedPleie} />
            </SummaryBlock>

            <SummaryBlock header={intlHelper(intl, 'steg.oppsummering.flereSokere.header')}>
                <FormattedMessage id={`steg.oppsummering.${apiData.flereSokere}`} />
            </SummaryBlock>

            {/* Utenlandsopphold i perioden */}
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
            {/* Ferieuttak i perioden */}
            {apiData.ferieuttakIPerioden && (
                <>
                    <SummaryBlock header={intlHelper(intl, 'steg.oppsummering.ferieuttakIPerioden.header')}>
                        <FormattedMessage id={apiData.ferieuttakIPerioden.skalTaUtFerieIPerioden ? 'Ja' : 'Nei'} />
                    </SummaryBlock>
                    {apiData.ferieuttakIPerioden.ferieuttak.length > 0 && (
                        <Block margin="l">
                            <SummaryList
                                items={apiData.ferieuttakIPerioden.ferieuttak}
                                itemRenderer={renderFerieuttakIPeriodenSummary}
                            />
                        </Block>
                    )}
                </>
            )}
        </SummarySection>
    );
};

export default TidsromOppsummering;
