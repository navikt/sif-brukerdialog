import { BodyShort } from '@navikt/ds-react';
import { AppText } from '@shared/i18n';
import { RegistrertBarn } from '@sif/api/k9-prosessering';

import BarnList from './BarnList';

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
