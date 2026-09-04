import { BostedsavklaringKildeType } from '@navikt/ung-brukerdialog-api';
import { ReadMore } from '@navikt/ds-react';
import { UngInnsynText, useIngInnsynIntl } from '../../../i18n';
import Fritekst from '../../../components/fritekst/Fritekst';

interface Props {
    kilde: BostedsavklaringKildeType;
    kildeFritekst?: string;
}

export const BostedKilde = ({ kilde, kildeFritekst }: Props) => {
    const { text } = useIngInnsynIntl();
    switch (kilde) {
        case BostedsavklaringKildeType.ANNET:
            return (
                <ReadMore header={text('@ungInnsyn.bostedKilde.header')}>
                    <Fritekst text={kildeFritekst} />
                </ReadMore>
            );
        case BostedsavklaringKildeType.BRUKER:
            return (
                <ReadMore header={text('@ungInnsyn.bostedKilde.header')}>
                    {text('@ungInnsyn.bostedKilde.header')}
                    <UngInnsynText id="@ungInnsyn.bostedKilde.BRUKER" />
                </ReadMore>
            );
        case BostedsavklaringKildeType.FOLKEREGISTER:
            return (
                <ReadMore header={text('@ungInnsyn.bostedKilde.header')}>
                    <UngInnsynText id="@ungInnsyn.bostedKilde.FOLKEREGISTER" />
                </ReadMore>
            );
    }
};
