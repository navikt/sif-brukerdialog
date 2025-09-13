import { prettifyDateExtended } from '@navikt/sif-common-utils';
import { AppText } from '../../i18n';

interface Props {
    from: Date;
    to?: Date;
}

const ArbeidsperiodeTekst = ({ from, to }: Props) => {
    if (from && to) {
        return (
            <AppText
                id="arbeidsperiode.avsluttet"
                values={{ fra: prettifyDateExtended(from), til: prettifyDateExtended(to) }}
            />
        );
    }

    return <AppText id="arbeidsperiode.pågående" values={{ fra: prettifyDateExtended(from) }} />;
};

export default ArbeidsperiodeTekst;
