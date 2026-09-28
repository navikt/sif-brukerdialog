import { Feature } from '@app/utils/featureToggleUtils';
import { Page } from '@playwright/test';

/**
 * Overstyrer en feature-toggle i app settings som er inlinet i index.html.
 * Må kalles før første page.goto.
 */
const setFeatureToggle = async (page: Page, feature: Feature, value: 'on' | 'off') => {
    await page.route(
        (url) => url.pathname.startsWith('/familie/sykdom-i-familien/soknad/endringsmelding-pleiepenger'),
        async (route) => {
            if (route.request().resourceType() !== 'document') {
                await route.fallback();
                return;
            }
            const response = await route.fetch();
            const body = (await response.text()).replace(
                new RegExp(`"${feature}":"(on|off)"`),
                `"${feature}":"${value}"`,
            );
            await route.fulfill({ response, body });
        },
    );
};

export const featureToggleUtils = {
    setFeatureToggle,
};
