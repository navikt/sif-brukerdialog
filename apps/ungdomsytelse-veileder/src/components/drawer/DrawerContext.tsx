import { createContext, useContext, useState, ReactNode } from 'react';
import { Drawer, DrawerWidth } from './Drawer';

type DrawerOptions = {
    title?: string;
    position?: 'left' | 'right';
    portalContainer?: HTMLElement | null;
};

type DrawerContextValue = {
    openDrawer: (content: ReactNode, options?: DrawerOptions) => void;
    closeDrawer: () => void;
    setWidth: (width: DrawerWidth) => void;
};

export const DrawerContext = createContext<DrawerContextValue | undefined>(undefined);

interface Props {
    children: ReactNode;
    initialTitle?: string;
    initialContent?: ReactNode;
    initialOpen?: boolean;
}

export const DrawerProvider = ({ children, initialTitle, initialContent = undefined, initialOpen = false }: Props) => {
    const [isOpen, setIsOpen] = useState(initialOpen);
    const [content, setContent] = useState<ReactNode>(initialContent);
    const [title, setTitle] = useState<string | undefined>(initialTitle);
    const [width, setWidth] = useState<DrawerWidth | undefined>(DrawerWidth.NARROW);
    const [position, setPosition] = useState<'left' | 'right'>('right');
    const [portalContainer, setPortalContainer] = useState<HTMLElement | null | undefined>(undefined);

    const openDrawer = (drawerContent: ReactNode, options?: DrawerOptions) => {
        setContent(drawerContent);
        setTitle(options?.title);
        setPosition(options?.position ?? 'right');
        setPortalContainer(options?.portalContainer);
        setIsOpen(true);
    };

    const closeDrawer = () => {
        setIsOpen(false);
        setTimeout(() => {
            setContent(null);
            setTitle(undefined);
            setPortalContainer(undefined);
        }, 300); // må matche lukke-animasjon
    };

    return (
        <DrawerContext.Provider value={{ openDrawer, closeDrawer, setWidth }}>
            {children}
            <Drawer
                isOpen={isOpen}
                onClose={closeDrawer}
                title={title}
                position={position}
                portalContainer={portalContainer}
                width={width}>
                {content}
            </Drawer>
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
