import SummaryList from '@navikt/sif-common-soknad-ds/src/components/summary-list/SummaryList';
import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { ApiBarn, RegistrertBarnTypeApi } from '../../../../types/søknadApiData/SøknadApiData';
import { BarnType } from '@navikt/sif-common-forms-ds/src/forms/annet-barn/types';
import { JaNeiSvar, SummaryBlock, SummarySection } from '@navikt/sif-common-soknad-ds';

interface Props {
    barn: ApiBarn[];
    harDekketTiFørsteDagerSelv?: boolean;
}

const DineBarnOppsummering = ({ barn, harDekketTiFørsteDagerSelv }: Props) => {
    const intl = useIntl();
    return (
        <SummarySection header={intlHelper(intl, 'step.oppsummering.dineBarn')}>
            <SummaryList
                items={barn}
                itemRenderer={({ identitetsnummer, navn, type }: ApiBarn) => {
                    const fnr = identitetsnummer ? identitetsnummer : '';
                    const barnType =
                        type !== BarnType.annet && type !== RegistrertBarnTypeApi.fraOppslag
                            ? intlHelper(intl, `step.oppsummering.dineBarn.listItem.årsak.${type}`)
                            : '';
                    const punktum = type === RegistrertBarnTypeApi.fraOppslag ? '.' : '';
                    return <>{`${navn}${punktum} ${fnr} ${barnType}`}</>;
                }}
            />
            {harDekketTiFørsteDagerSelv && (
                <SummaryBlock header={intlHelper(intl, 'step.oppsummering.dineBarn.bekrefterDektTiDagerSelv')}>
                    <JaNeiSvar harSvartJa={harDekketTiFørsteDagerSelv} />
                </SummaryBlock>
            )}
        </SummarySection>
    );
};

export default DineBarnOppsummering;
