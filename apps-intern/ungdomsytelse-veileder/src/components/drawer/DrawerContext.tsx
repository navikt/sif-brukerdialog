import { Bleed, Button, Heading, HStack, Modal } from '@navikt/ds-react';
import { createContext, ReactNode, useContext, useState } from 'react';
import { ExpandIcon, ShrinkIcon } from '@navikt/aksel-icons';

type DrawerOptions = {
    title?: string;
    position?: 'left' | 'right';
    width?: DrawerWidth;
    portalContainer?: HTMLElement | null;
};

type DrawerContextValue = {
    openDrawer: (content: ReactNode, options?: DrawerOptions) => void;
    closeDrawer: () => void;
    setWidth: (width: DrawerWidth) => void;
};

export enum DrawerWidth {
    NARROW = 'narrow',
    WIDE = 'wide',
}

export const DrawerContext = createContext<DrawerContextValue | undefined>(undefined);

interface Props {
    children: ReactNode;
    initialTitle?: string;
    initialContent?: ReactNode;
    initialOpen?: boolean;
}

export const DrawerProvider = ({ children, initialTitle, initialOpen = true, initialContent = undefined }: Props) => {
    const [isOpen, setIsOpen] = useState(initialOpen);
    const [content, setContent] = useState<ReactNode>(initialContent);
    const [title, setTitle] = useState<string | undefined>(initialTitle);
    const [width, setWidth] = useState<DrawerWidth | undefined>(DrawerWidth.NARROW);

    const openDrawer = (drawerContent: ReactNode, options?: DrawerOptions) => {
        if (!isOpen) {
            setIsOpen(true);
            setContent(drawerContent);
            setTitle(options?.title || title);
            setWidth(options?.width || DrawerWidth.NARROW);
        }
    };

    const closeDrawer = () => {
        setIsOpen(false);
    };

    return (
        <DrawerContext.Provider value={{ openDrawer, closeDrawer, setWidth: () => null }}>
            {children}
            <Modal
                className={`drawer-dialog drawer-dialog-${width}`}
                open={isOpen === true}
                onClose={closeDrawer}
                aria-label="Dialog">
                <Modal.Header>
                    <HStack gap="space-16" align="center">
                        <Bleed marginBlock="space-8" marginInline="space-8">
                            <Button
                                variant="tertiary-neutral"
                                type="button"
                                title="Utvid eller reduser bredde"
                                aria-label={width === DrawerWidth.NARROW ? 'Gjør bredere' : 'Gjør smalere'}
                                onClick={() => {
                                    setWidth(width === DrawerWidth.NARROW ? DrawerWidth.WIDE : DrawerWidth.NARROW);
                                }}
                                icon={width === DrawerWidth.NARROW ? <ExpandIcon /> : <ShrinkIcon />}
                            />
                        </Bleed>
                        <Heading level="2" size="xsmall">
                            {title}
                        </Heading>
                    </HStack>
                </Modal.Header>
                <Modal.Body className={`drawer-body drawer-body-${width}`}>{content}</Modal.Body>
            </Modal>
        </DrawerContext.Provider>
    );
};

export const useDrawer = (): DrawerContextValue => {
    const context = useContext(DrawerContext);
    if (!context) {
        throw new Error('useDrawer må brukes innenfor en <DrawerProvider>');
    }
    return context;
};
