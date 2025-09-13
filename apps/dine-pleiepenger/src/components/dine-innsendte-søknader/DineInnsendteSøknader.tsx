import { Box, Heading } from '@navikt/ds-react';
import { AppText } from '../../i18n';
import { InnsendtSøknad } from '../../types/InnsendtSøknad';
import InnsendtSøknadListe from '../innsendt-søknad-liste/InnsendtSøknadListe';

interface Props {
    søknader: InnsendtSøknad[];
}

const DineInnsendteSøknader: React.FunctionComponent<Props> = ({ søknader }) => {
    return (
        <Box data-testid="søknadsliste">
            <Heading level="2" size="medium" spacing={true}>
                <AppText id="dineInnsendteSøknader.tittel" />
            </Heading>
            <InnsendtSøknadListe søknader={søknader} />
        </Box>
    );
};

export default DineInnsendteSøknader;
