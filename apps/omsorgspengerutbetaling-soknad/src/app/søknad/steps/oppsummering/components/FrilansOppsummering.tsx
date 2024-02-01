import React from 'react';
import { useIntl } from 'react-intl';
import { FrilansApiData } from '../../../../types/søknadApiData/FrilansApiData';
import { DatoSvar, JaNeiSvar, SummaryBlock, SummarySection } from '@navikt/sif-common-ui';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';

interface Props {
    frilans?: FrilansApiData;
}

const FrilansOppsummering: React.FC<Props> = ({ frilans }) => {
    const intl = useIntl();

    return (
        <SummarySection header={intlHelper(intl, 'frilanser.summary.header')}>
            <SummaryBlock header={intlHelper(intl, 'frilanser.summary.harDuHattInntekt.header')}>
                <JaNeiSvar harSvartJa={frilans !== undefined} />
            </SummaryBlock>

            {frilans && (
                <>
                    <SummaryBlock header={intlHelper(intl, 'frilanser.summary.nårStartet.header')}>
                        <DatoSvar isoDato={frilans.startdato} />
                    </SummaryBlock>
                    <SummaryBlock header={intlHelper(intl, 'frilanser.summary.jobberFortsatt.header')}>
                        <JaNeiSvar harSvartJa={frilans.jobberFortsattSomFrilans} />
                    </SummaryBlock>
                    {frilans.jobberFortsattSomFrilans === false && frilans.sluttdato && (
                        <SummaryBlock header={intlHelper(intl, 'frilanser.summary.nårSluttet.header')}>
                            <DatoSvar isoDato={frilans.sluttdato} />
                        </SummaryBlock>
                    )}
                </>
            )}
        </SummarySection>
    );
};

export default FrilansOppsummering;
