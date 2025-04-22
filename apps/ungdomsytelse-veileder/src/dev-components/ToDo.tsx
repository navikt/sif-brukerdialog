import { Alert, BodyShort, Box, Button, Popover } from '@navikt/ds-react';
import { getToDo, ToDoKeys } from './ToDos';
import { useToDoContext } from './ToDo/ToDoContext';
import { useRef, useState } from 'react';
import { LightBulbFillIcon } from '@navikt/aksel-icons';

interface Props {
    todo: ToDoKeys;
}

const ToDo = ({ todo }: Props) => {
    const { isToDosVisible } = useToDoContext();
    const triggerRef = useRef<HTMLButtonElement>(null);
    const [isOpen, setIsOpen] = useState<boolean>(isToDosVisible);

    if (!isToDosVisible) {
        return null;
    }
    return (
        <div style={{ position: 'relative' }}>
            <Button
                icon={<LightBulbFillIcon />}
                type="button"
                variant="danger"
                ref={triggerRef}
                onClick={() => setIsOpen(!isOpen)}
                size="small"
                className="rounded-full">
                TODO
            </Button>
            <Popover
                open={isOpen}
                anchorEl={triggerRef.current}
                onClose={() => setIsOpen(false)}
                style={{ minWidth: '20rem' }}
                className="p-5">
                <Alert
                    variant="warning"
                    size="small"
                    inline={true}
                    className="text-gray-900"
                    style={{ minWidth: '20rem' }}>
                    <BodyShort size="small" spacing>
                        TODO:
                    </BodyShort>
                    <Box>{getToDo(todo)}</Box>
                </Alert>
            </Popover>
        </div>
    );
};

export default ToDo;
