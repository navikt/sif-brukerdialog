import sanityClient from '@sanity/client';
import { SanityConfig } from '../types';

const API_VERSION = '2022-03-07';

export const getAppSanityClient = ({ projectId, dataset, token = '' }: SanityConfig) => {
    return sanityClient({
        projectId,
        dataset,
        token,
        useCdn: false,
        apiVersion: API_VERSION,
    });
};
