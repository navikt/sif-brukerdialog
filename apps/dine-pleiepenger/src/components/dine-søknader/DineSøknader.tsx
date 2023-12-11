import { Box, Heading } from '@navikt/ds-react';
import { Søknad } from '../../types/Søknad';
import SøknadListe from '../søknad-liste/SøknadListe';

interface Props {
    søknader: Søknad[];
}

const DineSøknader: React.FunctionComponent<Props> = ({ søknader }) => {
    return (
        <Box data-testid="søknadsliste">
            <Heading level="2" size="medium" className="text-deepblue-800" spacing={true}>
                Dine søknader, endringer og ettersendelser
            </Heading>
            <SøknadListe søknader={søknader} />
        </Box>
    );
};

export default DineSøknader;
