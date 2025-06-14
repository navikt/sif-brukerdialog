import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Drawer } from './Drawer';

type DrawerOptions = {
    title?: string;
    position?: 'left' | 'right';
    portalContainer?: HTMLElement | null;
};

type DrawerContextValue = {
    openDrawer: (content: ReactNode, options?: DrawerOptions) => void;
    closeDrawer: () => void;
};

export const DrawerContext = createContext<DrawerContextValue | undefined>(undefined);

export const DrawerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState<ReactNode>(null);
    const [title, setTitle] = useState<string | undefined>();
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
        <DrawerContext.Provider value={{ openDrawer, closeDrawer }}>
            {children}
            <Drawer
                isOpen={isOpen}
                onClose={closeDrawer}
                title={title}
                position={position}
                portalContainer={portalContainer}>
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
