import { Rapporteringsperiode } from '../../../../api/types';
import { Heading, Modal } from '@navikt/ds-react';
import InntektForm from '../inntekt-form/InntektForm';
import { dateFormatter } from '@navikt/sif-common-utils';

interface Props {
    deltakelseId: string;
    rapporteringsperiode?: Rapporteringsperiode;
    onCancel: () => void;
}

const EndreInntektDialog = ({ rapporteringsperiode, deltakelseId, onCancel }: Props) => {
    if (!rapporteringsperiode) {
        return null;
    }
    const { periode } = rapporteringsperiode;
    return (
        <Modal aria-label="Endre inntekt" open={!!rapporteringsperiode} onClose={onCancel}>
            <Modal.Header>
                <Heading level="1" size="medium">
                    Endre inntekt for {dateFormatter.monthFullYear(periode.from)}
                </Heading>
            </Modal.Header>
            <Modal.Body>
                <InntektForm
                    periode={rapporteringsperiode?.periode}
                    deltakelseId={deltakelseId}
                    onCancel={onCancel}
                    variant="kompakt"
                />
            </Modal.Body>
        </Modal>
    );
};

export default EndreInntektDialog;
