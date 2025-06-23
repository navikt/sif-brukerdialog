import { List } from '@navikt/ds-react';
import { RegistrertBarn } from '@navikt/sif-common-api';
import { formaterNavn } from '@navikt/ung-common';

interface Props {
    barn: RegistrertBarn[];
}

const BarnList = ({ barn }: Props) => (
    <List>
        {barn.map((b, index) => (
            <List.Item key={index}>{formaterNavn(b)}</List.Item>
        ))}
    </List>
);

export default BarnList;
