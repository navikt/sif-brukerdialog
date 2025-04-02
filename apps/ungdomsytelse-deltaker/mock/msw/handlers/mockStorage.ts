import { Deltakelse } from '@navikt/ung-common';

const deltakelseStorageKey = 'ung-deltakelse-mock';

export const deltakelseMockStorage = {
    oppdater: () => {},
    reset: () => {},
    hent: (): Deltakelse => {
        const data = localStorage.getItem(deltakelseStorageKey);
        const jsonData = JSON.parse(JSON.stringify(data) || '{}');
        return jsonData;
    },
};
