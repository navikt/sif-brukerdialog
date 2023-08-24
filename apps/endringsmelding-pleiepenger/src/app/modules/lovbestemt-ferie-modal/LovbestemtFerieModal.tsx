import { Modal } from '@navikt/ds-react';
import React, { FunctionComponent } from 'react';
import { createPortal } from 'react-dom';
import './lovbestemtFerieModal.css';

interface Props {
    title: string;
    open?: boolean;
    children: React.ReactNode;
    onClose: () => void;
}

const LovbestemtFerieModal: FunctionComponent<Props> = ({ children, title, open = false, onClose }) => {
    return open
        ? createPortal(
              <Modal
                  open={open}
                  onClose={onClose}
                  className="lovbestemtFerieModal"
                  aria-label="Lovbestemt ferie"
                  header={{
                      heading: title,
                      closeButton: true,
                  }}>
                  <Modal.Body>
                      <div style={{ marginTop: 'var(--a-spacing-1)', paddingBottom: 'var(--a-spacing-2)' }}>
                          {children}
                      </div>
                  </Modal.Body>
              </Modal>,
              document.body
          )
        : null;
};

export default LovbestemtFerieModal;
