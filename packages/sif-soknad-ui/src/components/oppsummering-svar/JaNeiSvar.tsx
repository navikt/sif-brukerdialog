import { useSifSoknadUiIntl } from '../../i18n';

interface Props {
    harSvartJa?: boolean;
}

export const JaNeiSvar = ({ harSvartJa }: Props) => {
    const { text } = useSifSoknadUiIntl();
    return harSvartJa ? text('@sifSoknadUi.jaNeiSvar.Ja') : text('@sifSoknadUi.jaNeiSvar.Nei');
};
