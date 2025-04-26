import { HStack, Switch } from '@navikt/ds-react';
import { useDevContext } from './DevContext';

const DevContextBar = () => {
    const { todosVisible, setTodosVisible } = useDevContext();

    return (
        <HStack gap="2">
            <Switch checked={todosVisible} size="small" onChange={(e) => setTodosVisible(e.target.checked)}>
                <span style={{ fontSize: '0.8rem' }}>Vis TODOs</span>
            </Switch>
        </HStack>
    );
};

export default DevContextBar;
