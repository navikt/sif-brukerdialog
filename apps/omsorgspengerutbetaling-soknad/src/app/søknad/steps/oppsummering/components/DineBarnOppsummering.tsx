import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { BarnType } from '@navikt/sif-common-forms-ds/src/forms/annet-barn/types';
import { JaNeiSvar, SummaryBlock, SummaryList, SummarySection } from '@navikt/sif-common-ui';
import { ApiBarn, RegistrertBarnTypeApi } from '../../../../types/søknadApiData/SøknadApiData';

interface Props {
    barn: ApiBarn[];
    harSyktBarn?: boolean;
    harAleneomsorg?: boolean;
    harDekketTiFørsteDagerSelv?: boolean;
}

const DineBarnOppsummering = ({ barn, harSyktBarn, harAleneomsorg, harDekketTiFørsteDagerSelv }: Props) => {
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
            {harSyktBarn !== undefined && (
                <SummaryBlock
                    header={intlHelper(
                        intl,
                        barn.length === 1
                            ? 'step.dineBarn.utvidetRettSykdom.spm.ettBarn'
                            : 'step.dineBarn.utvidetRettSykdom.spm',
                    )}>
                    <JaNeiSvar harSvartJa={harSyktBarn} />
                </SummaryBlock>
            )}
            {harAleneomsorg !== undefined && (
                <SummaryBlock header={intlHelper(intl, 'step.dineBarn.utvidetRettAleneomsorg.spm')}>
                    <JaNeiSvar harSvartJa={harAleneomsorg} />
                </SummaryBlock>
            )}
            {harDekketTiFørsteDagerSelv !== undefined && (
                <SummaryBlock header={intlHelper(intl, 'step.dineBarn.bekrefterDektTiDagerSelv.spm')}>
                    <JaNeiSvar harSvartJa={harDekketTiFørsteDagerSelv} />
                </SummaryBlock>
            )}
        </SummarySection>
    );
};

export default DineBarnOppsummering;
