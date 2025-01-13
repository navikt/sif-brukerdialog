import { ReactElement } from 'react';
import { Søker } from '@navikt/sif-common-api';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';
import { ArbeidsgiverDetaljer } from '../../../types/søknadApiData/SøknadApiData';
import TilArbeidsgiverDokument from './TilArbeidsgiverDokument';

interface Props {
    søker: Søker;
    arbeidsgivere: ArbeidsgiverDetaljer[];
}

const TilArbeidsgiverDokumentListe: React.FC<Props> = ({ søker, arbeidsgivere }: Props): ReactElement => {
    const { fornavn, mellomnavn, etternavn } = søker;
    const søkersNavn: string | undefined =
        fornavn && etternavn ? formatName(fornavn, etternavn, mellomnavn || undefined) : 'UKJENT BRUKER';
    const søknadsNavn = 'omsorgspenger';

    return (
        <Block margin="xl">
            {arbeidsgivere.map((arbeidsgiverDetaljer, index) => {
                return (
                    <TilArbeidsgiverDokument
                        arbeidsgiverDetaljer={arbeidsgiverDetaljer}
                        key={index}
                        søkersNavn={søkersNavn}
                        søknadNavn={søknadsNavn}
                    />
                );
            })}
        </Block>
    );
};

export default TilArbeidsgiverDokumentListe;
