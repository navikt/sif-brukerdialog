import * as React from 'react';
import TilArbeidsgiverDokument from './TilArbeidsgiverDokument';
import { Søker } from '../../../types/Søker';
import { ArbeidsgiverDetaljer } from '../../../types/søknadApiData/SøknadApiData';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import { formatName } from '@navikt/sif-common-core-ds/lib/utils/personUtils';

interface Props {
    søker: Søker;
    arbeidsgivere: ArbeidsgiverDetaljer[];
}

const TilArbeidsgiverDokumentListe: React.FC<Props> = ({ søker, arbeidsgivere }: Props): JSX.Element => {
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
