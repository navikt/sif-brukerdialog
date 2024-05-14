import { Box, Heading } from '@navikt/ds-react';
import { Msg } from '../../i18n';
import { InnsendtSøknad } from '../../types/InnsendtSøknad';
import InnsendtSøknadListe from '../innsendt-søknad-liste/InnsendtSøknadListe';

interface Props {
    søknader: InnsendtSøknad[];
}

const DineInnsendteSøknader: React.FunctionComponent<Props> = ({ søknader }) => {
    return (
        <Box data-testid="søknadsliste">
            <Heading level="2" size="medium" className="text-deepblue-800" spacing={true}>
                <Msg id="dineInnsendteSøknader.tittel" />
            </Heading>
            <InnsendtSøknadListe søknader={søknader} />
        </Box>
    );
};

export default DineInnsendteSøknader;
