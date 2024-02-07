import { Box, Heading } from '@navikt/ds-react';
import { InnsendtSøknad } from '../../types/Søknad';
import InnsendtSøknadListe from '../innsendt-søknad-liste/InnsendtSøknadListe';

interface Props {
    søknader: InnsendtSøknad[];
}

const DineInnsendteSøknader: React.FunctionComponent<Props> = ({ søknader }) => {
    return (
        <Box data-testid="søknadsliste">
            <Heading level="2" size="medium" className="text-deepblue-800" spacing={true}>
                Dine søknader, endringer og ettersendelser
            </Heading>
            <InnsendtSøknadListe søknader={søknader} />
        </Box>
    );
};

export default DineInnsendteSøknader;
