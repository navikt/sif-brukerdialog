import { Alert, Heading, Loader } from '@navikt/ds-react';
import useSWR from 'swr';
import SøknaderListe from '../søknader-liste/SøknaderListe';
import axios from 'axios';
import { Søknad } from '../../types/Søknad';

const fetcher = (url: string) => axios.get<Søknad[]>(url).then((res) => res.data);

const DineSøknader = () => {
    const { data, error, isLoading } = useSWR('/dine-pleiepenger/api/soknader', fetcher);

    if (error) {
        return <Alert variant="error">Henting av data feilet</Alert>;
    }

    return (
        <>
            <Heading level="2" size="medium" className="text-deepblue-800" spacing={true}>
                Dine søknader
            </Heading>

            {isLoading ? (
                <Loader title="Henter informasjon" size="2xlarge" />
            ) : (
                <SøknaderListe søknader={(Array.isArray(data) ? data : []).slice(0, 5)} />
            )}
        </>
    );
};

export default DineSøknader;
