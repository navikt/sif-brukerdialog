import { SummaryList } from '@navikt/sif-common-ui';
import { useAppIntl } from '../../../i18n';
import { ApiBarn } from '../../../types/søknadApiData/SøknadApiData';

interface Props {
    barn: ApiBarn[];
}

const BarnSummaryList = ({ barn }: Props) => {
    const { text } = useAppIntl();
    return (
        <SummaryList
            items={barn}
            itemRenderer={({ norskIdentifikator: identitetsnummer, navn }: ApiBarn): string => {
                const fnr = identitetsnummer ? text('step.oppsummering.omBarna.listItem', { identitetsnummer }) : '';
                return `${navn}${fnr}`;
            }}
        />
    );
};

export default BarnSummaryList;
