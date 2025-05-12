import { BodyShort } from '@navikt/ds-react';
import { RegistrertBarn } from '@navikt/sif-common-api';
import BarnList from './BarnList';

interface Props {
    barn: RegistrertBarn[];
}

const BarnInfo = ({ barn }: Props) =>
    barn.length > 0 ? <BarnList barn={barn} /> : <BodyShort>Vi har ikke registrert at du har barn.</BodyShort>;

export default BarnInfo;
