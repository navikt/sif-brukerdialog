import React from 'react';
import { FormattedMessage } from 'react-intl';
import CounsellorPanel from '@navikt/sif-common-core/lib/components/counsellor-panel/CounsellorPanel';
import { Systemtittel, Ingress } from 'nav-frontend-typografi';
import Box from '@navikt/sif-common-core/lib/components/box/Box';
import InfoList from './info-list/InfoList';

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
            <FormattedMessage id="page.velkommen.guide.tekst.1" />
        </p>
        <InfoList>
            <li>
                <FormattedMessage id="page.velkommen.guide.tekst.1.1" />
            </li>
            <li>
                <FormattedMessage id="page.velkommen.guide.tekst.1.2" />
            </li>
            <li>
                <FormattedMessage id="page.velkommen.guide.tekst.1.3" />
            </li>
            <li>
                <FormattedMessage id="page.velkommen.guide.tekst.1.4" />
            </li>
            <li>
                <FormattedMessage id="page.velkommen.guide.tekst.1.5" />
            </li>
        </InfoList>
        <p>
            <FormattedMessage id="page.velkommen.guide.tekst.2" />
        </p>
    </CounsellorPanel>
);

export default VelkommenGuide;
