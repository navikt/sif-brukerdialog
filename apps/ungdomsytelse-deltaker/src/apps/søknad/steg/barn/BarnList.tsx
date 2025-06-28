import { List } from '@navikt/ds-react';
import { RegistrertBarn } from '@navikt/sif-common-api';
import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';

interface Props {
    barn: RegistrertBarn[];
}

const BarnList = ({ barn }: Props) => (
    <List>
        {barn.map((b, index) => (
            <List.Item key={index}>{formatName(b)}</List.Item>
        ))}
    </List>
);

export default BarnList;
