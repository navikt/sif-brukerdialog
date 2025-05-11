// import { Page } from '@playwright/test';
// import { setupMockRoutes } from './setupMockApi';

// const rootUrl = 'http://localhost:8080/ungdomsytelse-deltaker/';

// const gotoRoute = async (page: Page, route: SøknadRoutes) => {
//     await page.goto(getRouteUrl(route));
// };

// const getRouteUrl = (route: SøknadRoutes): string => {
//     return `${rootUrl}${route}`;
// };

// const resumeFromRoute = async (page: Page, route: SøknadRoutes, søknadsdata?: any) => {
//     const mellomlagringToUse = {
//         ...mellomlagring,
//         søknadRoute: route,
//         søknadsdata: {
//             ...mellomlagring.søknadsdata,
//             ...søknadsdata,
//         },
//     };

//     await setupMockRoutes(page, {
//         mellomlagring: mellomlagringToUse,
//     });

//     await page.goto(getRouteUrl(SøknadRoutes.VELKOMMEN));
//     await page.waitForURL(`**${route}`);
// };

// export const routeUtils = {
//     gotoRoute,
//     resumeFromRoute,
//     getRouteUrl,
// };
