import { Alert, BodyShort, Box, Button, HGrid, Popover, VStack } from '@navikt/ds-react';
import { getToDo, ToDoKeys } from './ToDos';
import { useDevContext } from './dev-context/DevContext';
import { useRef, useState } from 'react';
import { CheckmarkCircleFillIcon, CircleIcon, QuestionmarkCircleFillIcon } from '@navikt/aksel-icons';

interface Props {
    id: ToDoKeys;
}

const ToDo = ({ id }: Props) => {
    const { todosVisible: isTodosVisible } = useDevContext();
    const triggerRef = useRef<HTMLButtonElement>(null);
    const [isOpen, setIsOpen] = useState<boolean>(isTodosVisible);

    if (!isTodosVisible) {
        return null;
    }

    const todo = getToDo(id);
    if (!todo) {
        return null;
    }
    const { title = 'TODO', text, comment } = todo;
    return (
        <Box as="span">
            <Button
                icon={<QuestionmarkCircleFillIcon />}
                type="button"
                variant="danger"
                ref={triggerRef}
                onClick={() => setIsOpen(!isOpen)}
                size="small"
                className="rounded-full">
                {title}
            </Button>
            <Popover
                open={isOpen}
                anchorEl={triggerRef.current}
                onClose={() => setIsOpen(false)}
                style={{ minWidth: '20rem' }}
                className="p-5 bg-orange-50">
                <Alert variant="warning" inline={true} className="text-gray-900" style={{ minWidth: '20rem' }}>
                    <BodyShort spacing weight="semibold">
                        {title}
                    </BodyShort>

                    <Box>{text}</Box>
                    {comment && comment.length > 0 && (
                        <VStack gap="2" className="mt-2 pt-2 mb-2">
                            {comment.map((c, index) => (
                                <HGrid columns="1.5rem auto" gap="2" key={index}>
                                    {typeof c === 'string' ? (
                                        <>
                                            <CircleIcon />
                                            <BodyShort size="small">{c}</BodyShort>
                                        </>
                                    ) : (
                                        <>
                                            {c.type === 'checked' ? (
                                                <CheckmarkCircleFillIcon
                                                    width="1.5rem"
                                                    height="1.5rem"
                                                    color="#06893A"
                                                />
                                            ) : (
                                                <>
                                                    <CircleIcon />
                                                </>
                                            )}
                                            <BodyShort size="small">{c.text}</BodyShort>
                                        </>
                                    )}
                                </HGrid>
                            ))}
                        </VStack>
                    )}
                </Alert>
            </Popover>
        </Box>
    );
};

export default ToDo;
