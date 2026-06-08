import { List } from '@navikt/ds-react';
import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';
import { RegistrertBarn } from '@sif/api/k9-prosessering';

interface Props {
    barn: RegistrertBarn[];
}

const BarnList = ({ barn }: Props) => (
    <List>
        {barn.map((b) => (
            <List.Item key={b.aktørId}>{formatName(b)}</List.Item>
        ))}
    </List>
);

export default BarnList;
