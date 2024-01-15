import SummaryList from '@navikt/sif-common-soknad-ds/lib/components/summary-list/SummaryList';
import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { ApiFosterbarn } from '../../../../types/søknadApiData/SøknadApiData';
import { JaNeiSvar, SummaryBlock, SummarySection } from '@navikt/sif-common-soknad-ds';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';

interface Props {
    fosterbarn?: ApiFosterbarn[];
}

const FosterbarnOppsummering = ({ fosterbarn }: Props) => {
    const intl = useIntl();
    return (
        <SummarySection header={intlHelper(intl, 'step.oppsummering.fosterbarn')}>
            <Block margin={'s'}>
                <SummaryBlock header={intlHelper(intl, 'step.oppsummering.fosterbarn.harFosterbarn')}>
                    <JaNeiSvar harSvartJa={fosterbarn && fosterbarn.length > 0} />
                </SummaryBlock>
            </Block>
            {fosterbarn && fosterbarn.length > 0 && (
                <SummaryList
                    items={fosterbarn}
                    itemRenderer={({ identitetsnummer, navn }: ApiFosterbarn) => {
                        const fnr = identitetsnummer ? identitetsnummer : '';

                        return <>{`${navn} ${fnr} `}</>;
                    }}
                />
            )}
        </SummarySection>
    );
};

export default FosterbarnOppsummering;
