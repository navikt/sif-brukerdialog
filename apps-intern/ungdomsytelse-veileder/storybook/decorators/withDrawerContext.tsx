import { DrawerProvider } from '../../src/components/drawer/DrawerContext';
import DrawerArticles from '../../src/pages/info-page/DrawerArticles';

export const withDrawerContext = (Story) => (
    <DrawerProvider initialContent={<DrawerArticles />} initialOpen={false} initialTitle="Hjelp og informasjon">
        <Story />
    </DrawerProvider>
);
