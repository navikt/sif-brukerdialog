import { List, VStack } from '@navikt/ds-react';
import { RegistrertBarn } from '@navikt/sif-common-api';

interface Props {
    barn: RegistrertBarn[];
}

const BarnList = ({ barn }: Props) => {
    return (
        <VStack gap="2">
            Barn vi har registrert på deg:
            <List>
                {barn.map((b) => (
                    <List.Item key={b.aktørId}>
                        {b.fornavn} {b.etternavn}
                    </List.Item>
                ))}
            </List>
        </VStack>
    );
};

export default BarnList;
