import { Feature } from '@app/utils/featureToggleUtils';
import { Page } from '@playwright/test';

/**
 * Overstyrer en feature-toggle i app settings som er inlinet i index.html (script#nav:appSettings).
 * Må kalles før første page.goto.
 */
const setFeatureToggle = async (page: Page, feature: Feature, value: 'on' | 'off') => {
    await page.addInitScript(
        ({ feature: toggleFeature, value: toggleValue }: { feature: string; value: 'on' | 'off' }) => {
            const patch = () => {
                const el = document.getElementById('nav:appSettings');
                if (!el) {
                    return false;
                }
                const settings = JSON.parse(el.textContent || '{}');
                settings[toggleFeature] = toggleValue;
                el.textContent = JSON.stringify(settings);
                return true;
            };
            if (patch()) {
                return;
            }
            const observer = new MutationObserver(() => {
                if (patch()) {
                    observer.disconnect();
                }
            });
            observer.observe(document, { childList: true, subtree: true });
        },
        { feature, value },
    );
};

export const featureToggleUtils = {
    setFeatureToggle,
};
