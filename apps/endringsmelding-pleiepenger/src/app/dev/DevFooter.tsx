import './devFooter.scss';

import { CogIcon } from '@navikt/aksel-icons';
import { Button, Modal } from '@navikt/ds-react';
import { useEffectOnce } from '@sif/hooks';
import React, { useState } from 'react';

import { getScenarioFromLocalStorage } from './scenarioer';
import { ScenarioSelector } from './ScenarioSelector';

const DevFooter: React.FunctionComponent = () => {
    const [showModal, setShowModal] = useState(false);
    const scenario = getScenarioFromLocalStorage();

    useEffectOnce(() => {
        document.addEventListener('keydown', (e) => {
            if (e.shiftKey && e.ctrlKey && e.code === 'KeyB') {
                setShowModal(!showModal);
            }
        });
    });
    return (
        <>
            <div className="settingsWrapper" style={{ position: 'fixed', bottom: '1rem', right: '1rem', zIndex: 50 }}>
                <Button
                    type="button"
                    size="small"
                    variant="secondary"
                    onClick={() => setShowModal(true)}
                    icon={<CogIcon role="presentation" aria-hidden={true} />}>
                    {scenario.name}
                </Button>
            </div>
            <Modal
                open={showModal}
                portal={true}
                onClose={() => setShowModal(false)}
                header={{
                    heading: 'Velg scenario',
                }}
                className="scenario-modal"
                style={{ width: '100%' }}>
                <Modal.Body>
                    <ScenarioSelector />
                </Modal.Body>
            </Modal>
        </>
    );
};

export default DevFooter;
