import { Page } from '@playwright/test';

export const frilansSvar = {
    erFrilanser: async (page: Page, erFrilanser: boolean) =>
        await page
            .getByRole('group', { name: 'Jobber du som frilanser eller mottar du honorar?' })
            .getByLabel(erFrilanser ? 'Ja' : 'Nei')
            .check(),
};

// const erIkkeFrilanser = async (page: Page) => {
//     besvar.erFrilanser(page, false);
//     await page
//         .getByRole('group', { name: 'Jobber du som frilanser eller mottar du honorar?' })
//         .getByLabel('Nei')
//         .check();
// };

// const erFrilanserOgMottarHonorar = async (page: Page) => {
//     await page
//         .getByRole('group', { name: 'Jobber du som frilanser eller mottar du honorar?' })
//         .getByLabel('Ja')
//         .check();
//     await page.getByLabel('Jeg jobber både som frilanser og mottar honorar').check();
//     await page.getByRole('group', { name: 'Startet du som frilanser før' }).getByLabel('Ja').check();
//     await page.getByRole('group', { name: 'Jobber du fortsatt som frilanser?' }).getByLabel('Ja').check();
//     await page
//         .getByLabel('Hvor mange timer jobbet du vanligvis som frilanser? Oppgi tiden i et snitt per uke:')
//         .fill('5');
// };

// const varFrilanser = async (page: Page, søknadsperiode: DateRange) => {
//     const frilansperiode: DateRange = {
//         from: addDays(søknadsperiode.from, 3),
//         to: addDays(søknadsperiode.from, 5),
//     };
//     await page.getByLabel('Jeg jobber både som frilanser og mottar honorar').check();
//     await page.getByRole('group', { name: 'Startet du som frilanser før' }).getByLabel('Ja').check();
//     await page.getByRole('group', { name: 'Jobber du fortsatt som frilanser?' }).getByLabel('Nei').check();
//     await page.getByLabel('Når sluttet du å jobbe som frilanser?').fill(formatInputDate(frilansperiode.from));
//     await page
//         .getByLabel('Hvor mange timer jobbet du vanligvis som frilanser? Oppgi tiden i et snitt per uke:')
//         .fill('5');
// };

// const starterSomFrilanserIPerioden = async (page: Page, søknadsperiode: DateRange) => {
//     const frilansperiode: DateRange = {
//         from: addDays(søknadsperiode.from, 3),
//         to: addDays(søknadsperiode.from, 5),
//     };
//     await page.getByLabel('Jeg jobber både som frilanser og mottar honorar').check();
//     await page.getByRole('group', { name: 'Startet du som frilanser før' }).getByLabel('Nei').check();
//     await page.getByRole('group', { name: 'Jobber du fortsatt som frilanser?' }).getByLabel('Ja').check();
//     await page.getByLabel('Når sluttet du å jobbe som frilanser?').fill(formatInputDate(frilansperiode.from));
//     await page
//         .getByLabel('Hvor mange timer jobbet du vanligvis som frilanser? Oppgi tiden i et snitt per uke:')
//         .fill('5');
// };

// export const fyllUtArbeidssituasjonFrilanserKunHonorarMisterIkkeHonorar = () => {
//     selectRadioYes('frilans.harHattInntektSomFrilanser');
//     selectRadioByLabel('Jeg mottar honorar');
//     selectRadioNo('frilans.misterHonorar');
// };

// const erFrilanserUtenOppdrag = () => {
//     beforeEach('er frilanser uten oppdrag', () => {
//         cy.intercept(`/oppslag/arbeidsgiver**`, { ...cyApiMockData.arbeidsgivereMock, frilansoppdrag: [] }).as(
//             'getArbeidsgivere',
//         );
//     });

//     it('er frilanser uten oppdrag', () => {
//         fyllUtArbeidssituasjonFrilanser();
//         gåTilOppsummeringFraArbeidssituasjon();

//         const el = getTestElement('arbeidssituasjon-frilanser');
//         el.should('contain', 'Jobber som frilanser');
//         el.should('contain', 'Startet som frilanser før');
//         el.should('contain', 'Jobber normalt 5 timer per uke');
//     });
// };

// const erFrilanserMedOppdrag = () => {
//     it('er frilanser med oppdrag', () => {
//         fyllUtArbeidssituasjonFrilanser();
//         gåTilOppsummeringFraArbeidssituasjon();

//         const el = getTestElement('arbeidssituasjon-frilanser');
//         el.should('contain', 'Jobber som frilanser');
//         el.should('contain', 'Startet som frilanser før');
//         el.should('contain', 'Jobber normalt 5 timer per uke');

//         el.should('contain', 'Frilansoppdrag registrert i søknadsperioden');
//         el.should('contain', 'Hurdal frilanssenter');
//     });
// };

// const erIkkeFrilanser = async (page: Page) => {
//     fyllUtErIkkeFrilanser(page);

//     gåTilOppsummeringFraArbeidssituasjon();

//     //     getTestElement('arbeidssituasjon-frilanser').should(
//     //         'contain',
//     //         'Er ikke frilanser og får ikke honorar i søknadsperioden',
//     //     );
//     // });
// };

// const cleanupFrilanser = () => {
//     /** Tømmer mellomlagring ved å si at en ikke er frilanser og så gå frem og tilbake */
//     selectRadioNo('frilans.harHattInntektSomFrilanser');
//     clickFortsett();
//     clickTilbake();
// };

// const erFrilanserKunHonorarMisterIkkeHonorar = () => {
//     it('er frilanser kun honorar mister ikke honorar', () => {
//         cleanupFrilanser();
//         fyllUtArbeidssituasjonFrilanserKunHonorarMisterIkkeHonorar();
//         gåTilOppsummeringFraArbeidssituasjon();
//         getTestElement('arbeidssituasjon-frilanser').should('contain', 'Mister ikke honorar i søknadsperioden');
//     });
// };

// const erFrilanserFrilansarbeidOgMottarHonorar = () => {
//     it('er frilanser med frilansarbeid og honorar', () => {
//         cleanupFrilanser();
//         fyllUtArbeidssituasjonErFrilanserOgMottarHonorar();
//         clickFortsett();
//         fyllUtArbeidIPeriodeFrilanser();
//         gåTilOppsummeringFraArbeidIPerioden();

//         /** Arbeidssituasjon */
//         const el = getTestElement('arbeidssituasjon-frilanser');
//         el.should('contain', 'Jobber som frilanser og mottar honorar');
//         el.should('contain.text', 'Jobber normalt 5 timer per uke');
//         el.should('contain', 'Startet som frilanser før ');
//         el.should('contain', 'Sluttet ');
//     });
// };

// const erFrilanserFrilansarbeidOgMottarHonorarStartetInnenforSisteTreHeleMåneder = () => {
//     it('er frilanser med frilansarbeid og honorar - startet innenfor siste tre hele måneder', () => {
//         cleanupFrilanser();
//         fyllUtArbeidssituasjonErFrilanserOgMottarHonorar(false);
//         clickFortsett();
//         fyllUtArbeidIPeriodeFrilanser();
//         gåTilOppsummeringFraArbeidIPerioden();

//         /** Arbeidssituasjon */
//         const el = getTestElement('arbeidssituasjon-frilanser');
//         el.should('contain', 'Jobber som frilanser og mottar honorar');
//         el.should('contain.text', 'Jobber normalt 5 timer per uke');
//         el.should('contain', 'Startet som frilanser ');
//         el.should('contain', 'Sluttet ');
//     });
// };

// export const testArbeidssituasjonFrilanser = async (page: Page) => {
//     await erIkkeFrilanser(page);
//     // erFrilanserUtenOppdrag();
//     // erFrilanserMedOppdrag();
//     // erFrilanserKunHonorarMisterIkkeHonorar();
//     // erFrilanserFrilansarbeidOgMottarHonorar();
//     // erFrilanserFrilansarbeidOgMottarHonorarStartetInnenforSisteTreHeleMåneder();
// };

// export const fyllUtFrilanserArbeidssituasjon = {
//     erIkkeFrilanser,
//     erFrilanserOgMottarHonorar,
//     varFrilanser,
//     starterSomFrilanserIPerioden,
// };
