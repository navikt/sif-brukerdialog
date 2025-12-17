import { List } from '@navikt/ds-react';

import ArbeidsperiodeTekst from '../../../../components/arbeidsperiode-tekst/ArbeidsperiodeTekst';
import FrilansIconSvg from '../../../../components/frilans-icon/FrilansIconSvg';
import { useAppIntl } from '../../../../i18n';
import { Arbeidsgiver } from '../../../../types';
import ArbeidssituasjonPanel from '../arbeidssituasjon-panel/ArbeidssituasjonPanel';

interface Props {
    frilansoppdrag: Arbeidsgiver[];
}

const FrilansoppdragListe = ({ frilansoppdrag }: Props) => {
    const { text } = useAppIntl();
    return (
        <ArbeidssituasjonPanel
            title={text('steg.arbeidssituasjon.frilansoppdragListe.tittel')}
            titleIcon={<FrilansIconSvg />}>
            <List>
                {frilansoppdrag.map((oppdrag) => (
                    <List.Item title={oppdrag.navn} key={oppdrag.id}>
                        {oppdrag.ansattFom && <ArbeidsperiodeTekst from={oppdrag.ansattFom} to={oppdrag.ansattTom} />}
                    </List.Item>
                ))}
            </List>
        </ArbeidssituasjonPanel>
    );
};

export default FrilansoppdragListe;
