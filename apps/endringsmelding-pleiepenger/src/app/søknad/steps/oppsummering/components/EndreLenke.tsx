import { PencilFillIcon } from '@navikt/aksel-icons';
import { HStack } from '@navikt/ds-react';
import { ActionLink } from '@navikt/sif-common-ui';

interface EndreLenkeProps {
    label: string;
    onClick: () => void;
}

const EndreLenke = ({ label, onClick }: EndreLenkeProps) => (
    <ActionLink onClick={onClick}>
        <HStack gap="space-8" align="center">
            <PencilFillIcon aria-hidden="true" />
            {label}
        </HStack>
    </ActionLink>
);

export default EndreLenke;
