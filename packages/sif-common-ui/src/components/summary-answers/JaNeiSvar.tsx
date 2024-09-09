import { useSoknadIntl } from '../../hooks/useUiIntl';

interface Props {
    harSvartJa?: boolean;
}

const JaNeiSvar = ({ harSvartJa }: Props) => {
    const { text } = useSoknadIntl();
    return harSvartJa ? text('@ui.jaNeiSvar.Ja') : text('@ui.jaNeiSvar.Nei');
};

export default JaNeiSvar;
