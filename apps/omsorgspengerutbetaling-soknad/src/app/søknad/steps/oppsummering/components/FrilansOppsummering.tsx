import React from 'react';
import { DatoSvar, JaNeiSvar, SummaryBlock, SummarySection } from '@navikt/sif-common-ui';
import { useAppIntl } from '../../../../i18n';
import { FrilansApiData } from '../../../../types/søknadApiData/FrilansApiData';

interface Props {
    frilans?: FrilansApiData;
}

const FrilansOppsummering: React.FC<Props> = ({ frilans }) => {
    const { text } = useAppIntl();

    return (
        <SummarySection header={text('frilanser.summary.header')}>
            <SummaryBlock header={text('frilanser.summary.harDuHattInntekt.header')}>
                <JaNeiSvar harSvartJa={frilans !== undefined} />
            </SummaryBlock>

            {frilans && (
                <>
                    <SummaryBlock header={text('frilanser.summary.nårStartet.header')}>
                        <DatoSvar isoDato={frilans.startdato} />
                    </SummaryBlock>
                    <SummaryBlock header={text('frilanser.summary.jobberFortsatt.header')}>
                        <JaNeiSvar harSvartJa={frilans.jobberFortsattSomFrilans} />
                    </SummaryBlock>
                    {frilans.jobberFortsattSomFrilans === false && frilans.sluttdato && (
                        <SummaryBlock header={text('frilanser.summary.nårSluttet.header')}>
                            <DatoSvar isoDato={frilans.sluttdato} />
                        </SummaryBlock>
                    )}
                </>
            )}
        </SummarySection>
    );
};

export default FrilansOppsummering;
