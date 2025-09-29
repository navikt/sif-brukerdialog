import { BodyShort, BodyShortProps } from '@navikt/ds-react';
import { fødselsnummerFormatter } from '../utils/formaterFødselsnummer';

interface Props extends Omit<BodyShortProps, 'children'> {
    fnr: string;
}

const FødselsnummerInline = ({ fnr, ...rest }: Props) => (
    <BodyShort className="text-nowrap inline" {...rest}>
        {fødselsnummerFormatter.applyFormat(fnr)}
    </BodyShort>
);
export default FødselsnummerInline;
