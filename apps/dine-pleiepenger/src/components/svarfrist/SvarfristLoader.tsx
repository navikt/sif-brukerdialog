import useSWR from 'swr';
import { svarfristFetcher } from '../../pages/api/svarfrist.api';
import ComponentLoader from '../component-loader/ComponentLoader';
import Svarfrist from './Svarfrist';
import { browserEnv } from '../../utils/env';

interface Props {}

const SvarfristLoader: React.FunctionComponent<Props> = () => {
    const { data, isLoading } = useSWR(`${browserEnv.NEXT_PUBLIC_BASE_PATH}/api/svarfrist`, svarfristFetcher, {
        errorRetryCount: 0,
    });
    if (isLoading) {
        return <ComponentLoader />;
    }
    return <Svarfrist frist={data?.frist} />;
};

export default SvarfristLoader;
