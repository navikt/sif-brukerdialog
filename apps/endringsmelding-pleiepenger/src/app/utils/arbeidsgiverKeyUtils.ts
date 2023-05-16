export const getArbeidsgiverKey = (orgnr: string) => `a_${orgnr}`;
export const getOrgnummerFromArbeidsgiverKey = (key: string) => key.replace('a_', '');
