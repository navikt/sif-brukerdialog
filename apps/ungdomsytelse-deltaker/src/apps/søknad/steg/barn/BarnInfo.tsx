import { BodyShort, List } from '@navikt/ds-react';
import { RegistrertBarn } from '@navikt/sif-common-api';
import { formaterNavn } from '@navikt/ung-common';

interface Props {
    barn: RegistrertBarn[];
}

const BarnInfo = ({ barn }: Props) =>
    barn.length > 0 ? (
        <List>
            {barn.map((b, index) => (
                <List.Item key={index}>{formaterNavn(b)}</List.Item>
            ))}
        </List>
    ) : (
        <BodyShort>Vi har ikke registrert at du har barn.</BodyShort>
    );

export default BarnInfo;
