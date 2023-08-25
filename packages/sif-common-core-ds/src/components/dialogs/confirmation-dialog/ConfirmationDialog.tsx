import { BodyLong, Button, Modal, ModalProps } from '@navikt/ds-react';
import { useIntl } from 'react-intl';
import ButtonRow from '../../../atoms/button-row/ButtonRow';
import intlHelper from '../../../utils/intlUtils';
import './confirmationDialog.scss';
import { createPortal } from 'react-dom';

export interface Props extends Omit<ModalProps, 'onClose'> {
    title: string;
    onConfirm: () => void;
    onCancel: () => void;
    okLabel?: string;
    cancelLabel?: string;
}

const ConfirmationDialog: React.FunctionComponent<Props> = (props: Props) => {
    const intl = useIntl();
    const { title, onCancel, onConfirm: onOk, cancelLabel, okLabel, children, ...modalProps } = props;
    return props.open
        ? createPortal(
              <Modal
                  {...modalProps}
                  onClose={onCancel}
                  open={props.open}
                  header={{
                      closeButton: false,
                      heading: title,
                  }}>
                  {props.open && (
                      <Modal.Body className="confirmationDialog">
                          <BodyLong as="div" className="confirmationDialog__content">
                              {children}
                          </BodyLong>

                          <ButtonRow align="left">
                              <Button
                                  variant="primary"
                                  onClick={() => onOk()}
                                  className="ConfirmationDialog__bekreftKnapp">
                                  {okLabel || intlHelper(intl, 'komponent.ConfirmationDialog.bekreftLabel')}
                              </Button>
                              <Button variant="tertiary" onClick={onCancel} className="ConfirmationDialog__avbrytKnapp">
                                  {cancelLabel || intlHelper(intl, 'komponent.ConfirmationDialog.avbrytLabel')}
                              </Button>
                          </ButtonRow>
                      </Modal.Body>
                  )}
              </Modal>,
              document.body
          )
        : null;
};
export default ConfirmationDialog;
