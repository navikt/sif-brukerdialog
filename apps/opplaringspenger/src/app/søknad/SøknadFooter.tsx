import { Button } from '@navikt/ds-react';
import React from 'react';
import actionsCreator from './context/action/actionCreator';
import { useSøknadContext } from './context/hooks/useSøknadContext';

const SøknadFooter = () => {
    const { dispatch } = useSøknadContext();
    return (
        <div>
            <Button
                type="button"
                onClick={() => {
                    dispatch(actionsCreator.avbrytSøknad());
                }}>
                Avbryt
            </Button>
        </div>
    );
};

export default SøknadFooter;
