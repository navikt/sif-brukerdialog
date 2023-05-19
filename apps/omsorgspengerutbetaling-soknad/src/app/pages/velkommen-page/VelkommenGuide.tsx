import React from 'react';
import { FormattedMessage } from 'react-intl';
import CounsellorPanel from '@navikt/sif-common-core/lib/components/counsellor-panel/CounsellorPanel';
import { Systemtittel, Ingress } from 'nav-frontend-typografi';
import Box from '@navikt/sif-common-core/lib/components/box/Box';
import FormattedHtmlMessage from '@navikt/sif-common-core/lib/components/formatted-html-message/FormattedHtmlMessage';
import Lenke from 'nav-frontend-lenker';
import getLenker from '../../../lenker';

interface Props {
    navn: string;
}

const VelkommenGuide: React.FunctionComponent<Props> = ({ navn }) => (
    <CounsellorPanel>
        <Systemtittel tag="h1">
            <FormattedMessage id="page.velkommen.guide.tittel" values={{ navn }} />
        </Systemtittel>
        <Box margin="l">
            <Ingress>
                <FormattedMessage id="page.velkommen.guide.ingress" />
            </Ingress>
        </Box>
        <p>
            <FormattedHtmlMessage id="page.velkommen.guide.tekst.1.1" />
            <strong>
                <FormattedHtmlMessage id="page.velkommen.guide.tekst.1.2" />
            </strong>
            <FormattedHtmlMessage id="page.velkommen.guide.tekst.1.3" />
        </p>
        <p>
            <FormattedHtmlMessage id="page.velkommen.guide.tekst.2.1" />
            <Lenke href={getLenker().inntektsmelding}>
                <FormattedHtmlMessage id="page.velkommen.guide.tekst.2.2" />
            </Lenke>
            <FormattedHtmlMessage id="page.velkommen.guide.tekst.2.3" />
        </p>
    </CounsellorPanel>
);

export default VelkommenGuide;
