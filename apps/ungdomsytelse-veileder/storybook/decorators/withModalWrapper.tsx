import { Heading, Modal } from '@navikt/ds-react';

export const withModalWrapper = (Story, args) => (
    <ModalWrapper {...args}>
        <Story />
    </ModalWrapper>
);

export const ModalWrapper = ({ header, children }: { header: string; children: React.ReactNode }) => (
    <Modal open={true} aria-labelledby="oppgave-modal-heading" width="800px" onClose={() => {}}>
        <Modal.Header>
            <Heading level="1" size="large" id="oppgave-modal-heading">
                {header}
            </Heading>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
    </Modal>
);
