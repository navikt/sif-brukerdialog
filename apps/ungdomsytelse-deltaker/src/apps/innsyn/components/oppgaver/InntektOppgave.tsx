import { Alert, BodyShort } from '@navikt/ds-react';
import { useState } from 'react';
import { dateFormatter, dateRangeFormatter } from '@navikt/sif-common-utils';
import { Rapporteringsperiode } from '@navikt/ung-common';
import InntektForm from '../inntekt-form/InntektForm';
import { getFristForRapporteringsperiode } from '../../utils/deltakelseUtils';
import { useDeltakerContext } from '../../../../hooks/useDeltakerContext';
import PageOppgaveLayout from './PageOppgaveLayout';
import { useAppIntl } from '../../../../i18n';
import { useNavigate } from 'react-router-dom';

interface Props {
    rapporteringsperiode: Rapporteringsperiode;
}

const InntektOppgave = ({ rapporteringsperiode }: Props) => {
    const { intl } = useAppIntl();
    const { periode } = rapporteringsperiode;
    const [periodeErOppdatert, setPeriodeErOppdatert] = useState(false);
    const { refetchDeltakelser } = useDeltakerContext();
    const navigate = useNavigate();

    const månedNavn = dateFormatter.month(periode.from);

    const fristForRapportering = getFristForRapporteringsperiode(periode);

    return (
        <PageOppgaveLayout
            svarfrist={fristForRapportering}
            tittel={`Perioden ${dateRangeFormatter.getDateRangeText(periode, intl.locale)}`}
            beskrivelse={
                <BodyShort>
                    Hvis du har inntekt i {månedNavn}, må du oppgi denne innen utgangen av{' '}
                    <strong>{dateFormatter.dayDateMonth(fristForRapportering)}</strong>. Hvis du ikke har noe inntekt
                    denne måneden, trenger du ikke melde fra.
                </BodyShort>
            }>
            {periodeErOppdatert ? (
                <Alert variant="success">Inntekt er oppdatert</Alert>
            ) : (
                <InntektForm
                    periode={periode}
                    onSuccess={() => {
                        setPeriodeErOppdatert(true);
                        refetchDeltakelser().then(() => {
                            navigate('kvittering');
                        });
                    }}
                    onCancel={() => {}}
                />
            )}
        </PageOppgaveLayout>
    );
};

export default InntektOppgave;
