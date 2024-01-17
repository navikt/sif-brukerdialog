import { useSoknadIntl } from '../../hooks/useSoknadIntl';

interface Props {
    harSvartJa?: boolean;
}

const JaNeiSvar = ({ harSvartJa }: Props) => {
    const { text } = useSoknadIntl();
    return harSvartJa ? text('scs.jaNeiSvar.ja') : text('scs.jaNeiSvar.nei');
};

export default JaNeiSvar;
