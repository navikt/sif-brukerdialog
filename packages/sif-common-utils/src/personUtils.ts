interface NameProps {
    fornavn: string;
    etternavn: string;
    mellomnavn?: string;
}

export function formatName(fornavn: string, etternavn: string, mellomnavn?: string): string;
export function formatName(props: NameProps): string;

export function formatName(fornavnOrProps: string | NameProps, etternavn?: string, mellomnavn?: string): string {
    if (typeof fornavnOrProps === 'string') {
        const fornavn = fornavnOrProps;
        return mellomnavn ? `${fornavn} ${mellomnavn} ${etternavn}` : `${fornavn} ${etternavn}`;
    } else {
        const { fornavn, etternavn: etternavnProp, mellomnavn: mellomnavnProp } = fornavnOrProps;
        return mellomnavnProp ? `${fornavn} ${mellomnavnProp} ${etternavnProp}` : `${fornavn} ${etternavnProp}`;
    }
}
