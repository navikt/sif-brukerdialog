import { List } from '@navikt/ds-react';
import { RegistrertBarn } from '@navikt/sif-common-api';

interface Props {
    barn: RegistrertBarn[];
}

const BarnList = ({ barn }: Props) => {
    return (
        <List>
            {barn.map((b) => (
                <List.Item key={b.aktørId}>
                    {b.fornavn} {b.etternavn}
                </List.Item>
            ))}
        </List>
    );
};

export default BarnList;
