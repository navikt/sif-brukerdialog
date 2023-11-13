import { DateRange } from '@navikt/sif-common-utils/lib';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { expect, Page } from '@playwright/test';
import { format } from 'date-fns';
import { StepID } from '../../../src/app/types/StepID';
import { mellomlagringEnkel } from '../mock-data/mellomlagring-enkel';
import { setupMockApi } from './setupMockApi';
import { mellomlagringKomplett } from '../mock-data/mellomlagring-komplett';

const rootUrl = 'http://localhost:8080/familie/sykdom-i-familien/soknad/pleiepenger/soknad/';

const getStepUrl = (step: StepID): string => {
    return `${rootUrl}${step}`;
};

const gotoStep = async (page: Page, route: StepID) => {
    await page.goto(getStepUrl(route));
};

const startOnStep = async (
    page: Page,
    step: StepID,
    søknadsperiode: DateRange,
    brukKomplettMellomlagring: boolean = false,
    formValues?: any,
) => {
    const periodeFra = format(søknadsperiode.from, 'yyyy-MM-dd');
    const periodeTil = format(søknadsperiode.to, 'yyyy-MM-dd');
    const mellomlagring = brukKomplettMellomlagring ? mellomlagringKomplett : mellomlagringEnkel;

    const mellomlagringToUse = {
        ...mellomlagring,
        formValues: {
            ...mellomlagring.formValues,
            periodeFra,
            periodeTil,
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
