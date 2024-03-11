import { Button, Modal, ModalProps } from '@navikt/ds-react';
import { useIntl } from 'react-intl';
import bemUtils from '@navikt/sif-common-core-ds/src/utils/bemUtils';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import classnames from 'classnames';
import Knapperad from '../knapperad/Knapperad';
import './bekreftDialog.less';

export interface Props extends Omit<ModalProps, 'onClose'> {
    tittel: string;
    /** Kalles når bruker klikker bekreft-knapp  */
    onBekreft: () => void;
    /** Kalles når bruker klikker avbryt. Dersom denne ikke settes */
    onAvbryt: () => void;
    /** Label for bekreft-knapp. Default hentes fra intl: komponent.bekreftDialog.bekreftLabel */
    bekreftLabel?: string;
    /** Label for avbryt-knapp. Default hentes fra intl: komponent.bekreftDialog.avbrytLabel */
    avbrytLabel?: string;
    /** Maks bredde */
    størrelse?: '30';
    onClose: React.ReactEventHandler<HTMLDialogElement>;
}
const bem = bemUtils('bekreftDialog');
const BekreftDialog = (props: Props) => {
    const intl = useIntl();
    const { tittel, onAvbryt, onBekreft, avbrytLabel, bekreftLabel, children, størrelse, ...modalProps } = props;
    return props.open ? (
        <Modal
            {...modalProps}
            aria-label={undefined}
            header={{
                heading: tittel,
                closeButton: true,
            }}
            portal={true}
            className={classnames(bem.block, størrelse ? bem.modifier(`size-${størrelse}`) : undefined)}>
            <Modal.Body>
                <div className="blokk-m">{children}</div>
                <Knapperad>
                    <Button
                        variant="primary"
                        type="button"
                        onClick={() => onBekreft()}
                        className="bekreftDialog__bekreftKnapp">
                        {bekreftLabel || intlHelper(intl, 'komponent.bekreftDialog.bekreftLabel')}
                    </Button>
                    <Button variant="tertiary" type="button" onClick={onAvbryt} className="bekreftDialog__avbrytKnapp">
                        {avbrytLabel || intlHelper(intl, 'komponent.bekreftDialog.avbrytLabel')}
                    </Button>
                </Knapperad>
            </Modal.Body>
        </Modal>
    ) : null;
};
export default BekreftDialog;
