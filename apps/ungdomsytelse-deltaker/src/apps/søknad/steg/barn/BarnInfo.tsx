import { BodyShort } from '@navikt/ds-react';
import { RegistrertBarn } from '@navikt/sif-common-api';
import BarnList from './BarnList';
import { AppText } from '../../../../i18n';

interface Props {
    barn: RegistrertBarn[];
}

const BarnInfo = ({ barn }: Props) =>
    barn.length > 0 ? (
        <BarnList barn={barn} />
    ) : (
        <BodyShort>
            <AppText id="barnSteg.barnInfo.ingenBarn" />
        </BodyShort>
    );

export default BarnInfo;
