import { ReadMore } from '@navikt/ds-react';
import { BostedsavklaringKildeType } from '@navikt/ung-brukerdialog-api';

import Fritekst from '../../../components/fritekst/Fritekst';
import { UngInnsynText, useUngInnsynIntl } from '../../../i18n';

interface Props {
    kilde: BostedsavklaringKildeType;
    kildeFritekst?: string;
}

export const BostedKilde = ({ kilde, kildeFritekst }: Props) => {
    const { text } = useUngInnsynIntl();

    switch (kilde) {
        case BostedsavklaringKildeType.ANNET:
            return (
                <ReadMore header={text('@ungInnsyn.bostedKilde.header')}>
                    <Fritekst text={kildeFritekst?.trim() || text('@ungInnsyn.bostedKilde.FRITEKST_FALLBACK')} />
                </ReadMore>
            );

        case BostedsavklaringKildeType.BRUKER:
            return (
                <ReadMore header={text('@ungInnsyn.bostedKilde.header')}>
                    <UngInnsynText id="@ungInnsyn.bostedKilde.BRUKER" />
                </ReadMore>
            );
        case BostedsavklaringKildeType.FOLKEREGISTER:
            return (
                <ReadMore header={text('@ungInnsyn.bostedKilde.header')}>
                    <UngInnsynText id="@ungInnsyn.bostedKilde.FOLKEREGISTER" />
                </ReadMore>
            );
        default:
            return null;
    }
};
