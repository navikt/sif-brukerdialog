interface NameProps {
    fornavn: string;
    etternavn: string;
    mellomnavn?: string;
}

// Overload signatures
export function formatName(fornavn: string, etternavn: string, mellomnavn?: string): string;
export function formatName(props: NameProps): string;

// Implementation
export function formatName(fornavnOrProps: string | NameProps, etternavn?: string, mellomnavn?: string): string {
    if (typeof fornavnOrProps === 'string') {
        // Called with individual parameters
        const fornavn = fornavnOrProps;
        return mellomnavn ? `${fornavn} ${mellomnavn} ${etternavn}` : `${fornavn} ${etternavn}`;
    } else {
        // Called with props object
        const { fornavn, etternavn: etternavnProp, mellomnavn: mellomnavnProp } = fornavnOrProps;
        return mellomnavnProp ? `${fornavn} ${mellomnavnProp} ${etternavnProp}` : `${fornavn} ${etternavnProp}`;
    }
}
