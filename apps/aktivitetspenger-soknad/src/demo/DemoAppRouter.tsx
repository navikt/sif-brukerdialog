import { ReactNode } from 'react';
import { HashRouter } from 'react-router-dom';

import DemoInfo from './DemoInfo';

/**
 * gh-pages har ingen server som kan rute på path, så demoen må bruke HashRouter
 * uten basename (i motsetning til BrowserRouter i AppRouter, som ruter på PUBLIC_PATH).
 */
const DemoAppRouter = ({ children }: { children: ReactNode }) => {
    return (
        <HashRouter>
            <div className="demoMode">
                <DemoInfo />
                {children}
            </div>
        </HashRouter>
    );
};

export default DemoAppRouter;
