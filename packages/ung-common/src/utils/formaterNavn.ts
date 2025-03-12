import { Navn } from '@navikt/ung-deltakelse-opplyser-api';

export const formaterNavn = ({ fornavn, mellomnavn, etternavn }: Navn) => {
    return `${fornavn} ${mellomnavn ? mellomnavn : ''} ${etternavn}`;
};
