import { AppText, useAppIntl } from '../../i18n';
import { SoknadVelkommenGuide } from '@navikt/sif-common-soknad-ds';

interface Props {
    navn: string;
}

const VelkommenGuide = ({ navn }: Props) => {
    const { text } = useAppIntl();
    return (
        <SoknadVelkommenGuide title={text('page.velkommen.guide.tittel', { navn })}>
            <AppText id="page.velkommen.guide.ingress" />
        </SoknadVelkommenGuide>
    );
};

export default VelkommenGuide;
