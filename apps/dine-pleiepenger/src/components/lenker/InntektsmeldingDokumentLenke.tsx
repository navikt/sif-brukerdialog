import { ExternalLinkIcon } from '@navikt/aksel-icons';
import { HStack, Link } from '@navikt/ds-react';

import { browserEnv } from '../../utils/env';

interface Props {
    tekst: string;
    journalpostId: string;
}

const genererDokumentLenke = (journalpostId: string): string => {
    return `${browserEnv.NEXT_PUBLIC_MINSIDE_DOKUMENTOVERSIKT_URL}/${journalpostId}`;
};

const InntektsmeldingDokumentLenke = ({ tekst, journalpostId }: Props & {}) => {
    return (
        <Link href={genererDokumentLenke(journalpostId)}>
            <HStack gap="space-8">
                <span>{tekst}</span> <ExternalLinkIcon role="presentation" />
            </HStack>
        </Link>
    );
};

export default InntektsmeldingDokumentLenke;
