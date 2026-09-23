/**
 * Brukes kun i vite-config (Node), ikke i browser-koden.
 *
 * JSON.stringify escaper ikke `<`, så en verdi som inneholder `</script>` ville
 * avsluttet script-elementet den skrives inn i. Vi escaper derfor tegnene som
 * kan bryte ut av et <script type="text/json">-element, samt linjeseparatorene
 * U+2028/U+2029 som ikke er gyldige i JavaScript-strenger.
 *
 * JSON.stringify returnerer undefined for verdier uten JSON-representasjon
 * (undefined, funksjoner og symboler). Resultatet skrives inn i JSON-kontekst i
 * HTML-en, så vi faller tilbake til "null" for å unngå ugyldig JSON i nettleseren.
 */
export const toHtmlSafeJson = (value: unknown): string => {
    const json = JSON.stringify(value);
    if (json === undefined) {
        return 'null';
    }
    return json
        .replace(/</g, '\\u003c')
        .replace(/>/g, '\\u003e')
        .replace(/&/g, '\\u0026')
        .replace(/\u2028/g, '\\u2028')
        .replace(/\u2029/g, '\\u2029');
};
