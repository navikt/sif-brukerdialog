import { BodyShort, BodyShortProps } from '@navikt/ds-react';
import { fødselsnummerFormatter } from '@navikt/ung-common';

interface Props extends Omit<BodyShortProps, 'children'> {
    fnr: string;
}

const FødselsnummerInline = ({ fnr, ...rest }: Props) => (
    <BodyShort className="text-nowrap inline" {...rest}>
        {fødselsnummerFormatter.applyFormat(fnr)}
    </BodyShort>
);
export default FødselsnummerInline;
