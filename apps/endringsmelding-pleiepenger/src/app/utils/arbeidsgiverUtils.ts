export const getArbeidsgiverKey = (orgnr: string) => `a_${orgnr}`;
export const getOrgNummerFromArbeidsgiverKey = (key: string) => key.replace(`a_`, '');
