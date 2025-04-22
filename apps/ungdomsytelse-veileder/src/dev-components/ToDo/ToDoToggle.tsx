import { Switch } from '@navikt/ds-react';
import { useToDoContext } from './ToDoContext';

const ToDoToggle = () => {
    const { isToDosVisible, setIsToDosVisible } = useToDoContext();

    return (
        <Switch checked={isToDosVisible} size="small" onChange={(e) => setIsToDosVisible(e.target.checked)}>
            <span style={{ fontSize: '0.8rem' }}>Vis TODOs</span>
        </Switch>
    );
};

export default ToDoToggle;
