import { Alert } from '@navikt/ds-react';
import useSWR from 'swr';
import { søknaderFetcher } from '../../pages/api/soknader.api';
import { browserEnv } from '../../utils/env';
import ComponentLoader from '../component-loader/ComponentLoader';
import DineSøknader from './DineSøknader';

const DineSøknaderLoader = () => {
    const { data, error, isLoading } = useSWR(`${browserEnv.NEXT_PUBLIC_BASE_PATH}/api/soknader`, søknaderFetcher, {
        errorRetryCount: 0,
    });
    if (isLoading) {
        return <ComponentLoader />;
    }
    if (error) {
        return <Alert variant="error">Henting av data feilet</Alert>;
    }

    return <DineSøknader søknader={Array.isArray(data) ? data : []} />;
};

export default DineSøknaderLoader;
