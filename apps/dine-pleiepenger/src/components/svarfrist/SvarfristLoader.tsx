import useSWR from 'swr';
import { svarfristFetcher } from '../../pages/api/svarfrist.api';
import ComponentLoader from '../component-loader/ComponentLoader';
import Svarfrist from './Svarfrist';

interface Props {}

const SvarfristLoader: React.FunctionComponent<Props> = () => {
    const { data, isLoading } = useSWR('/dine-pleiepenger/api/svarfrist', svarfristFetcher, {
        errorRetryCount: 0,
    });
    if (isLoading) {
        return <ComponentLoader />;
    }
    return <Svarfrist frist={data?.frist} />;
};

export default SvarfristLoader;
