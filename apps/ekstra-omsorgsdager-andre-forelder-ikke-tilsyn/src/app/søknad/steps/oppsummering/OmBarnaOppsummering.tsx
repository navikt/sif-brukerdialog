import { useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { SummarySection } from '@navikt/sif-common-ui';
import { ApiBarn } from '../../../types/søknadApiData/SøknadApiData';
import BarnSummaryList from './BarnSummaryList';

interface Props {
    barn: ApiBarn[];
}

const OmBarnaOppsummering = ({ barn }: Props) => {
    const intl = useIntl();

    return (
        <SummarySection header={intlHelper(intl, 'step.oppsummering.omBarna.header')}>
            <Block margin="l">
                <BarnSummaryList barn={barn} />
            </Block>
        </SummarySection>
    );
};

export default OmBarnaOppsummering;
