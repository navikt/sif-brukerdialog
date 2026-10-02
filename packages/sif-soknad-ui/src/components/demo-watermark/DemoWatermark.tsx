import './demoWatermark.css';

import { ReactNode } from 'react';

interface Props {
    /** Når false rendres barna uten vannmerke. */
    enabled?: boolean;
    children: ReactNode;
}

/** Legger et diagonalt «DEMO»-vannmerke bak innholdet. */
export const DemoWatermark = ({ enabled = true, children }: Props) => (
    <div className={enabled ? 'demoWatermark' : undefined}>{children}</div>
);
