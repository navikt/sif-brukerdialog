import { ReadMore } from '@navikt/ds-react';
import { BistandsavklaringKildeType } from '@sif/ung-brukerdialog-api';

import Fritekst from '../../../components/fritekst/Fritekst';
import { UngInnsynText, useUngInnsynIntl } from '../../../i18n';

interface Props {
    kilde: BistandsavklaringKildeType;
    kildeFritekst?: string;
}

export const BistandKilde = ({ kilde, kildeFritekst }: Props) => {
    const { text } = useUngInnsynIntl();

    switch (kilde) {
        case BistandsavklaringKildeType.ANNET:
            return (
                <ReadMore header={text('@ungInnsyn.bistandKilde.header')}>
                    <Fritekst text={kildeFritekst?.trim() || text('@ungInnsyn.bistandKilde.FRITEKST_FALLBACK')} />
                </ReadMore>
            );
        case BistandsavklaringKildeType.BRUKER:
            return (
                <ReadMore header={text('@ungInnsyn.bistandKilde.header')}>
                    <UngInnsynText id="@ungInnsyn.bistandKilde.BRUKER" />
                </ReadMore>
            );
        case BistandsavklaringKildeType.NAV:
            return (
                <ReadMore header={text('@ungInnsyn.bistandKilde.header')}>
                    <UngInnsynText id="@ungInnsyn.bistandKilde.NAV" />
                </ReadMore>
            );
        default:
            return null;
    }
};
