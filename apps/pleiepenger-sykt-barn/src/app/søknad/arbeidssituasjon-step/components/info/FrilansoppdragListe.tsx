import { List } from '@navikt/ds-react';
import React from 'react';
import ArbeidsperiodeTekst from '../../../../components/arbeidsperiode-tekst/ArbeidsperiodeTekst';
import FrilansIconSvg from '../../../../components/frilans-icon/FrilansIconSvg';
import { Arbeidsgiver } from '../../../../types';
import ArbeidssituasjonPanel from '../arbeidssituasjon-panel/ArbeidssituasjonPanel';
import { useAppIntl } from '../../../../i18n';

interface Props {
    frilansoppdrag: Arbeidsgiver[];
}

const FrilansoppdragListe: React.FunctionComponent<Props> = ({ frilansoppdrag }) => {
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
