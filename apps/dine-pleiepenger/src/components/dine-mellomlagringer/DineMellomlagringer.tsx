import { Alert, Heading } from '@navikt/ds-react';
import useSWR from 'swr';
import ComponentLoader from '../component-loader/ComponentLoader';
import { SøknadListeSkeleton } from '../søknad-liste/SøknadListe';
import { mellomlagringFetcher } from '../../pages/api/mellomlagring.api';
import MellomlagringInfo from './MellomlagringInfo';

const DineMellomlagringer = () => {
    const { data, error, isLoading } = useSWR('/dine-pleiepenger/api/mellomlagring', mellomlagringFetcher);

    if (error) {
        return <Alert variant="error">Henting av data feilet</Alert>;
    }

    if (!data?.endring && !data?.søknad) {
        return null;
    }

    return (
        <div>
            <Heading level="2" size="medium" className="text-deepblue-800" spacing={true}>
                Vil du fortsette der du slapp?
            </Heading>

            {isLoading ? (
                <ComponentLoader
                    title="Vent litt mens vi ser om du har en påbegynt søknad eller endring ..."
                    fallback={<SøknadListeSkeleton rows={1} />}
                />
            ) : (
                <MellomlagringInfo søknad={data.søknad} endring={data.endring} />
            )}
        </div>
    );
};

export default DineMellomlagringer;
