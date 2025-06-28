export const formaterNavn = ({
    fornavn,
    mellomnavn,
    etternavn,
}: {
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
}) => {
    return `${fornavn} ${mellomnavn ? mellomnavn : ''} ${etternavn}`;
};
