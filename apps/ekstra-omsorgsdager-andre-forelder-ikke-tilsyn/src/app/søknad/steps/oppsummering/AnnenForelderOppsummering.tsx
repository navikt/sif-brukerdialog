import { FormattedMessage, useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { SummaryBlock, SummarySection } from '@navikt/sif-common-soknad-ds';
import { AnnenForelderApiData } from '../../../types/søknadApiData/SøknadApiData';

interface Props {
    annenForelder: AnnenForelderApiData;
}

const OmAnnenForelderOppsummering = ({ annenForelder }: Props) => {
    const intl = useIntl();

    return (
        <SummarySection header={intlHelper(intl, 'step.oppsummering.annenForelder.header')}>
            <SummaryBlock header={annenForelder.navn}>
                <FormattedMessage
                    id="step.oppsummering.annenForelder.fnr"
                    values={{ fødselsnummer: annenForelder.fnr }}
                />
            </SummaryBlock>
        </SummarySection>
    );
};

export default OmAnnenForelderOppsummering;
