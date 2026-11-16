import { ReadMore } from '@navikt/ds-react';
import { AktivitetsavklaringKildeType } from '@sif/ung-brukerdialog-api';

import Fritekst from '../../../components/fritekst/Fritekst';
import { UngInnsynText, useUngInnsynIntl } from '../../../i18n';

interface Props {
    kilde: AktivitetsavklaringKildeType;
    kildeFritekst?: string;
}

export const AktivitetKilde = ({ kilde, kildeFritekst }: Props) => {
    const { text } = useUngInnsynIntl();

    switch (kilde) {
        case AktivitetsavklaringKildeType.ANNET:
            return (
                <ReadMore header={text('@ungInnsyn.aktivitetKilde.header')}>
                    <Fritekst text={kildeFritekst?.trim() || text('@ungInnsyn.aktivitetKilde.FRITEKST_FALLBACK')} />
                </ReadMore>
            );
        case AktivitetsavklaringKildeType.BRUKER:
            return (
                <ReadMore header={text('@ungInnsyn.aktivitetKilde.header')}>
                    <UngInnsynText id="@ungInnsyn.aktivitetKilde.BRUKER" />
                </ReadMore>
            );
        case AktivitetsavklaringKildeType.NAV:
            return (
                <ReadMore header={text('@ungInnsyn.aktivitetKilde.header')}>
                    <UngInnsynText id="@ungInnsyn.aktivitetKilde.NAV" />
                </ReadMore>
            );
        default:
            return null;
    }
};
