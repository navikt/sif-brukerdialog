import SummaryList from '@navikt/sif-common-soknad-ds/lib/components/summary-list/SummaryList';
import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { ApiBarn, RegistrertBarnTypeApi } from '../../../../types/søknadApiData/SøknadApiData';
import { BarnType } from '@navikt/sif-common-forms-ds/lib/forms/annet-barn/types';
import { SummarySection } from '@navikt/sif-common-soknad-ds';

interface Props {
    barn: ApiBarn[];
}

const DineBarnOppsummering = ({ barn }: Props) => {
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
        </SummarySection>
    );
};

export default DineBarnOppsummering;
