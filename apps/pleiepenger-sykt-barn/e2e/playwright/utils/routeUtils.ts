/* eslint-disable @typescript-eslint/no-unused-vars */
import { Page, expect } from '@playwright/test';
import { mellomlagring } from '../mock-data/mellomlagring';
import { StepID } from '../../../src/app/types/StepID';
import { setupMockApi } from './setupMockApi';

const rootUrl = 'http://localhost:8080/familie/sykdom-i-familien/soknad/pleiepenger/soknad/';

const getStepUrl = (step: StepID): string => {
    return `${rootUrl}${step}`;
};

const gotoStep = async (page: Page, route: StepID) => {
    await page.goto(getStepUrl(route));
};

const startOnStep = async (page: Page, step: StepID, formValues?: any) => {
    const mellomlagringToUse = {
        ...mellomlagring,
        formValues: {
            ...mellomlagring.formValues,
            ...formValues,
        },
        metadata: {
            ...mellomlagring.metadata,
            lastStepID: step,
        },
    };
    await setupMockApi(page, {
        mellomlagring: mellomlagringToUse,
    });
    await gotoStep(page, step);
    await expect(page).toHaveURL(getStepUrl(step));
};

export const routeUtils = {
    gotoStep,
    startOnStep,
    getStepUrl,
};
