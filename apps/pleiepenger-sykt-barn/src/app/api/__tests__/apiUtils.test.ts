/* eslint-disable @typescript-eslint/no-non-null-assertion */
import axios from 'axios';
import { ResourceType } from '../../types/ResourceType';
import { getApiUrlByResourceType, multipartConfig, sendMultipartPostRequest } from '../utils/apiUtils';
import { vi } from 'vitest';

const mockedApiUrl = 'mockedApiUrl';

vi.mock('@navikt/sif-common-core-ds/src/utils/envUtils', () => {
    return {
        getEnvironmentVariable: () => 'mockedApiUrl',
        getEnvVariableOrDefault: () => 'mockedApiUrl',
        getCommitShaFromEnv: () => 'abc',
    };
});

vi.mock('@navikt/sif-common-api/src/env/commonEnv', () => {
    return {
        getEnvironmentVariable: () => 'mockedApiUrl',
        getEnvVariableOrDefault: () => 'mockedApiUrl',
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

    describe('getApiUrlByResourceType', () => {
        it('should return correct URL for ResourceType.ARBEIDSGIVER', () => {
            expect(getApiUrlByResourceType(ResourceType.ARBEIDSGIVER)).toEqual(
                `${mockedApiUrl}/${ResourceType.ARBEIDSGIVER}`,
            );
        });

        it('should return correct URL for ResourceType.BARN', () => {
            expect(getApiUrlByResourceType(ResourceType.BARN)).toEqual(`${mockedApiUrl}/${ResourceType.BARN}`);
        });

        it('should return correct URL for ResourceType.SEND_SØKNAD', () => {
            expect(getApiUrlByResourceType(ResourceType.SEND_SØKNAD)).toEqual(
                `${mockedApiUrl}/${ResourceType.SEND_SØKNAD}`,
            );
        });

        it('should return correct URL for ResourceType.SØKER', () => {
            expect(getApiUrlByResourceType(ResourceType.SØKER)).toEqual(`${mockedApiUrl}/${ResourceType.SØKER}`);
        });

        it('should return correct URL for ResourceType.VEDLEGG', () => {
            expect(getApiUrlByResourceType(ResourceType.VEDLEGG)).toEqual(`${mockedApiUrl}/${ResourceType.VEDLEGG}`);
        });
    });
});
