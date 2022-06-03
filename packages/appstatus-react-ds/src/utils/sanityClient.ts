import sanityClient from '@sanity/client';
import { SanityConfig } from '../types';

export const getAppSanityClient = ({ projectId, dataset, token = '' }: SanityConfig) => {
    return sanityClient({
        projectId,
        dataset,
        token,
        useCdn: false,
    });
};
