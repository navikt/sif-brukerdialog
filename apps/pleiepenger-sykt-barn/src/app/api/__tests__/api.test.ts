import axios from 'axios';
import { vi } from 'vitest';
import { axiosConfigPsb } from '../../config/axiosConfig';
import { ResourceType } from '../../types/ResourceType';
import { StepID } from '../../types/StepID';
import {
    deleteFile,
    getArbeidsgiver,
    getBarn,
    getPersistUrl,
    getSøker,
    persist,
    sendApplication,
    uploadFile,
} from '../api';
import { axiosJsonConfig, sendMultipartPostRequest } from '../utils/apiUtils';

vi.mock('@navikt/sif-common-env', () => {
    return {
        getRequiredEnv: () => 'mockedApiUrl',
        getEnv: () => 'mockedApiUrl',
        getCommitShaFromEnv: () => 'mockedCommitSha',
        commonEnv: {},
    };
});

const mockedApiUrl = 'nav.no/api';

vi.mock('../utils/apiUtils', () => {
    return {
        getInnsynApiUrlByResourceType: vi.fn(() => mockedApiUrl),
        sendMultipartPostRequest: vi.fn(),
        axiosJsonConfig: {},
    };
});

vi.mock('../../utils/featureToggleUtils', () => {
    return {
        isFeatureEnabled: vi.fn(() => false),
        Feature: {},
    };
});

vi.mock('axios');

describe('api', () => {
    describe('getBarn', () => {
        it('should call axios.get with correct URL and axios config', () => {
            getBarn();
            expect(axios.get).toHaveBeenCalledWith(ResourceType.BARN, axiosJsonConfig);
        });
    });

    describe('getSøker', () => {
        it('should call axios.get with correct URL and axios config', () => {
            getSøker();
            expect(axios.get).toHaveBeenCalledWith(ResourceType.SØKER, axiosJsonConfig);
        });
    });

    describe('getArbeidsgiver', () => {
        it('should call axios.get with correct URL and axios config', () => {
            const date1 = 'some date';
            const date2 = 'some other date';
            getArbeidsgiver(date1, date2);
            const url = `${ResourceType.ARBEIDSGIVER}?fra_og_med=${date1}&til_og_med=${date2}&frilansoppdrag=true`;
            expect(axios.get).toHaveBeenCalledWith(url, axiosJsonConfig);
        });
    });

    describe('sendApplication', () => {
        it('should call axios.post with correct URL, specified api data and axios config', () => {
            const data = {} as any;
            sendApplication(data);
            expect(axios.post).toHaveBeenCalledWith(ResourceType.SEND_SØKNAD, data, axiosJsonConfig);
        });
    });

    describe('uploadFile', () => {
        it('should send a multipart request with the specified file in a FormData object', () => {
            const fileMock = new File([''], 'filename', { type: 'text/png' });
            uploadFile(fileMock);
            expect(sendMultipartPostRequest).toHaveBeenCalled();
        });
    });

    describe('deleteFile', () => {
        it('should call axios.delete on the specified url', () => {
            deleteFile(mockedApiUrl);
            expect(axios.delete).toHaveBeenCalledWith(mockedApiUrl, axiosConfigPsb);
        });
    });

    describe('mellomlagring', () => {
        const stepID: StepID = 'fakeStepID' as any;
        const persistApiUrl = getPersistUrl(stepID);
        it('should call axios.post when no formData', () => {
            persist({ lastStepID: stepID });
            expect(axios.post).toHaveBeenCalledWith(persistApiUrl, {}, axiosJsonConfig);
        });
    });
});
