import { BodyShort } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';

interface Props {
    dato: Date;
    semibold?: boolean;
    large?: boolean;
}

const Dato = ({ dato, semibold = true, large }: Props) => (
    <BodyShort as="span" size={large ? 'large' : 'medium'} weight={semibold ? 'semibold' : 'regular'}>
        {dateFormatter.compact(dato)}
    </BodyShort>
);

export default Dato;
