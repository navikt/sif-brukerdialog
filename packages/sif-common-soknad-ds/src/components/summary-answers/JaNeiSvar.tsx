import { useSoknadIntl } from '../../hooks/useSoknadIntl';

interface Props {
    harSvartJa?: boolean;
}

const JaNeiSvar = ({ harSvartJa }: Props) => {
    const { text } = useSoknadIntl();
    return harSvartJa ? text('scs.jaNeiSvar.Ja') : text('scs.jaNeiSvar.Nei');
};

export default JaNeiSvar;
