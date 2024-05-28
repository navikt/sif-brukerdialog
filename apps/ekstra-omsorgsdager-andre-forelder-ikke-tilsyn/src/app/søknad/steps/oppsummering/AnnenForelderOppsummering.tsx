import { SummaryBlock, SummarySection } from '@navikt/sif-common-ui';
import { AppText, useAppIntl } from '../../../i18n';
import { AnnenForelderApiData } from '../../../types/søknadApiData/SøknadApiData';

interface Props {
    annenForelder: AnnenForelderApiData;
}

const OmAnnenForelderOppsummering = ({ annenForelder }: Props) => {
    const { text } = useAppIntl();

    return (
        <SummarySection header={text('step.oppsummering.annenForelder.header')}>
            <SummaryBlock header={annenForelder.navn}>
                <AppText id="step.oppsummering.annenForelder.fnr" values={{ fødselsnummer: annenForelder.fnr }} />
            </SummaryBlock>
        </SummarySection>
    );
};

export default OmAnnenForelderOppsummering;
