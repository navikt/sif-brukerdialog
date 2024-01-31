import { useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { JaNeiSvar, SummaryBlock, SummaryList, SummarySection } from '@navikt/sif-common-ui';
import { ApiFosterbarn } from '../../../../types/søknadApiData/SøknadApiData';

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
