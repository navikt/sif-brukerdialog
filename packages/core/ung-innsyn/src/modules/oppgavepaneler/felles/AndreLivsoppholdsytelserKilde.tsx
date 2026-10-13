import { ReadMore } from '@navikt/ds-react';
import { AndreLivsoppholdsytelserAvklaringKildeType } from '@navikt/ung-brukerdialog-api';

import Fritekst from '../../../components/fritekst/Fritekst';
import { UngInnsynText, useUngInnsynIntl } from '../../../i18n';

interface Props {
    kilde: AndreLivsoppholdsytelserAvklaringKildeType;
    kildeFritekst?: string;
}

export const AndreLivsoppholdsytelserKilde = ({ kilde, kildeFritekst }: Props) => {
    const { text } = useUngInnsynIntl();

    switch (kilde) {
        case AndreLivsoppholdsytelserAvklaringKildeType.ANNET:
            return (
                <ReadMore header={text('@ungInnsyn.andreLivsoppholdsytelserKilde.header')}>
                    <Fritekst
                        text={kildeFritekst?.trim() || text('@ungInnsyn.andreLivsoppholdsytelserKilde.FRITEKST_FALLBACK')}
                    />
                </ReadMore>
            );

        case AndreLivsoppholdsytelserAvklaringKildeType.BRUKER:
            return (
                <ReadMore header={text('@ungInnsyn.andreLivsoppholdsytelserKilde.header')}>
                    <UngInnsynText id="@ungInnsyn.andreLivsoppholdsytelserKilde.BRUKER" />
                </ReadMore>
            );
        case AndreLivsoppholdsytelserAvklaringKildeType.NAV:
            return (
                <ReadMore header={text('@ungInnsyn.andreLivsoppholdsytelserKilde.header')}>
                    <UngInnsynText id="@ungInnsyn.andreLivsoppholdsytelserKilde.NAV" />
                </ReadMore>
            );
        default:
            return null;
    }
};
