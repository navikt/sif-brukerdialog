import { Heading } from '@navikt/ds-react';
import useSWR from 'swr';
import { mellomlagringFetcher } from '../../pages/api/mellomlagring.api';
import { browserEnv } from '../../utils/env';
import ComponentLoader from '../component-loader/ComponentLoader';
import { SøknadListeSkeleton } from '../innsendt-søknad-liste/InnsendtSøknadListe';
import DineMellomlagringer from './DineMellomlagringer';

const DineMellomlagringerLoader = () => {
    const { data, error, isLoading } = useSWR(
        `${browserEnv.NEXT_PUBLIC_BASE_PATH}/api/mellomlagring`,
        mellomlagringFetcher,
        {
            errorRetryCount: 0,
        },
    );

    if (isLoading) {
        return <ComponentLoader title="Henter påbegynte søknader" />;
    }

    if (error || (!data?.endring && !data?.søknad)) {
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
                <DineMellomlagringer søknad={data.søknad} endring={data.endring} />
            )}
        </div>
    );
};

export default DineMellomlagringerLoader;
