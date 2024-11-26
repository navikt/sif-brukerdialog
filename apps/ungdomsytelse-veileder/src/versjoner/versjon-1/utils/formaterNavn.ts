import { Navn } from '../../../types/Navn';

export const formaterNavn = ({ fornavn, mellomnavn, etternavn }: Navn) => {
    return `${fornavn} ${mellomnavn ? mellomnavn : ''} ${etternavn}`;
};
