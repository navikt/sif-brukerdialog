import axios from 'axios';
import { vi } from 'vitest';

import { ResourceType } from '../../types/ResourceType';
import { StepID } from '../../types/StepID';
import { getArbeidsgiver, getPersistUrl, persist, sendApplication } from '../api';
import { axiosJsonConfig } from '../utils/apiUtils';

vi.mock('@navikt/sif-common-env', () => {
    return {
        getRequiredEnv: () => 'mockedApiUrl',
        getMaybeEnv: () => 'mockedApiUrl',

        getCommonEnv: () => ({}),
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

vi.mock('axios');

describe('api', () => {
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

    describe('mellomlagring', () => {
        const stepID: StepID = 'fakeStepID' as any;
        const persistApiUrl = getPersistUrl(stepID);
        it('should call axios.post when no formData', () => {
            persist({ lastStepID: stepID });
            expect(axios.post).toHaveBeenCalledWith(persistApiUrl, {}, axiosJsonConfig);
        });
    });
});
