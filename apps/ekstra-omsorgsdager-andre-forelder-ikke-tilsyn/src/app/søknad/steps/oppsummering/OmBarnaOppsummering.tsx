import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { SummarySection } from '@navikt/sif-common-ui';
import { useAppIntl } from '../../../i18n';
import { ApiBarn } from '../../../types/søknadApiData/SøknadApiData';
import BarnSummaryList from './BarnSummaryList';

interface Props {
    barn: ApiBarn[];
}

const OmBarnaOppsummering = ({ barn }: Props) => {
    const { text } = useAppIntl();

    return (
        <SummarySection header={text('step.oppsummering.omBarna.header')}>
            <Block margin="l">
                <BarnSummaryList barn={barn} />
            </Block>
        </SummarySection>
    );
};

export default OmBarnaOppsummering;
