import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Box from '@navikt/sif-common-core/lib/components/box/Box';
import Lenke from 'nav-frontend-lenker';
import { Ingress, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import getLenker from '../../../lenker';

const getText = (part: string) => <FormattedMessage id={`modal.personopplysninger.${part}`} />;

const BehandlingAvPersonopplysningerContent: React.FunctionComponent = () => {
    const intl = useIntl();
    return (
        <>
            <Systemtittel>{getText('tittel')}</Systemtittel>

            <Box margin="l">
                <Normaltekst>{getText('intro.1')}</Normaltekst>
            </Box>
            <Box margin="xl">
                <Ingress>{getText('opplysninger.tittel')}</Ingress>
                <Normaltekst>{getText('opplysninger.part1')}</Normaltekst>
                <ul>
                    <li>
                        <Normaltekst>{getText('opplysninger.1')}</Normaltekst>
                    </li>
                    <li>
                        <Normaltekst>{getText('opplysninger.2')}</Normaltekst>
                    </li>
                    <li>
                        <Normaltekst>{getText('opplysninger.4')}</Normaltekst>
                    </li>
                    <li>
                        <Normaltekst>{getText('opplysninger.5')}</Normaltekst>
                    </li>
                    <li>
                        <Normaltekst>{getText('opplysninger.6')}</Normaltekst>
                    </li>
                    <li>
                        <Normaltekst>{getText('opplysninger.7')}</Normaltekst>
                    </li>
                </ul>
            </Box>

            <Box margin="xl">
                <Ingress>{getText('svar.tittel')}</Ingress>
                <Normaltekst>{getText('svar.part1')}</Normaltekst>
            </Box>

            <Box margin="xl">
                <Normaltekst>
                    {getText('personvern.part1a')}{' '}
                    <Lenke href={getLenker(intl.locale).personvern} target="_blank">
                        {getText('personvern.part1b')}
                    </Lenke>
                    .
                </Normaltekst>
            </Box>
        </>
    );
};

export default BehandlingAvPersonopplysningerContent;
