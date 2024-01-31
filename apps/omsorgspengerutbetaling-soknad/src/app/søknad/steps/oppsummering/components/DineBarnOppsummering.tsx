import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { BarnType } from '@navikt/sif-common-forms-ds/src/forms/annet-barn/types';
import { JaNeiSvar, SummaryBlock, SummaryList, SummarySection } from '@navikt/sif-common-ui';
import { ApiBarn, RegistrertBarnTypeApi } from '../../../../types/søknadApiData/SøknadApiData';

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
                itemRenderer={({ identitetsnummer, navn, utvidetRett, type }: ApiBarn) => {
                    const fnr = identitetsnummer ? identitetsnummer : '';
                    const harUtvidetRett = utvidetRett
                        ? intlHelper(intl, 'step.oppsummering.dineBarn.listItem.utvidetRett')
                        : '';
                    const barnType =
                        type !== BarnType.annet && type !== RegistrertBarnTypeApi.fraOppslag
                            ? intlHelper(intl, `step.oppsummering.dineBarn.listItem.årsak.${type}`)
                            : '';
                    const punktum = type === RegistrertBarnTypeApi.fraOppslag && utvidetRett ? '.' : '';
                    return <>{`${navn}${punktum} ${fnr} ${barnType} ${harUtvidetRett}`}</>;
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
