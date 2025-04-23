import { Alert, BodyShort, Box, Button, HStack, Popover, VStack } from '@navikt/ds-react';
import { getToDo, ToDoKeys } from './ToDos';
import { useToDoContext } from './ToDo/ToDoContext';
import { useRef, useState } from 'react';
import { CheckmarkCircleFillIcon, CircleIcon, QuestionmarkCircleFillIcon } from '@navikt/aksel-icons';

interface Props {
    id: ToDoKeys;
}

const ToDo = ({ id }: Props) => {
    const { isToDosVisible } = useToDoContext();
    const triggerRef = useRef<HTMLButtonElement>(null);
    const [isOpen, setIsOpen] = useState<boolean>(isToDosVisible);

    if (!isToDosVisible) {
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
                                <HStack key={index} align={'center'} gap="2">
                                    {typeof c === 'string' ? (
                                        <>
                                            <CircleIcon />
                                            <BodyShort size="small">{c}</BodyShort>
                                        </>
                                    ) : (
                                        <>
                                            {c.type === 'checked' ? (
                                                <CheckmarkCircleFillIcon
                                                    width={'1.5rem'}
                                                    height={'1.5rem'}
                                                    color="#06893A"
                                                />
                                            ) : (
                                                <>-</>
                                            )}
                                            <BodyShort size="small">{c.text}</BodyShort>
                                        </>
                                    )}
                                </HStack>
                            ))}
                        </VStack>
                    )}
                </Alert>
            </Popover>
        </Box>
    );
};

export default ToDo;
