/* eslint-disable @typescript-eslint/no-non-null-assertion */
import axios from 'axios';
import { multipartConfig, sendMultipartPostRequest } from '../utils/apiUtils';
import { vi } from 'vitest';

vi.mock('@navikt/sif-common-env', () => {
    return {
        getRequiredEnv: () => 'mockedApiUrl',
        getEnv: () => 'mockedApiUrl',
        getCommitShaFromEnv: () => 'mockedCommitSha',
        getSifInnsynBrowserEnv: () => {},
        commonEnv: {},
    };
});

vi.mock('axios');

describe('apiUtils', () => {
    describe('sendMultipartPostRequest', () => {
        it('should use axios to send a multipart post request', () => {
            const formData = new FormData();
            formData.set('foo', 'bar');
            sendMultipartPostRequest('nav.no', formData);
            expect(axios.post).toHaveBeenCalledWith('nav.no', formData, multipartConfig);
        });
    });
});
