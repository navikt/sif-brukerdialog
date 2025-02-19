import { Heading, Modal } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { Rapporteringsperiode } from '@navikt/ung-common';
import InntektForm from '../inntekt-form/InntektForm';

interface Props {
    rapporteringsperiode?: Rapporteringsperiode;
    onCancel: () => void;
}

const EndreInntektDialog = ({ rapporteringsperiode, onCancel }: Props) => {
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
                    inntekt={rapporteringsperiode?.inntekt}
                    onCancel={onCancel}
                    variant="kompakt"
                />
            </Modal.Body>
        </Modal>
    );
};

export default EndreInntektDialog;
