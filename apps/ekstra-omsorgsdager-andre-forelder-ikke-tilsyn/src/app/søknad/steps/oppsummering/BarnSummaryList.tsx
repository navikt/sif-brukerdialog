import SummaryList from '@navikt/sif-common-soknad-ds/src/components/summary-list/SummaryList';
import { ApiBarn } from '../../../types/søknadApiData/SøknadApiData';
import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';

interface Props {
    barn: ApiBarn[];
}

const BarnSummaryList = ({ barn }: Props) => {
    const intl = useIntl();
    return (
        <SummaryList
            items={barn}
            itemRenderer={({ norskIdentifikator: identitetsnummer, navn }: ApiBarn): string => {
                const fnr = identitetsnummer
                    ? intlHelper(intl, 'step.oppsummering.omBarna.listItem', { identitetsnummer })
                    : '';
                return `${navn}${fnr}`;
            }}
        />
    );
};

export default BarnSummaryList;
