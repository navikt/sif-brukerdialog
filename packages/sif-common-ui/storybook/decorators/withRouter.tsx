import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';

export const withRouterProvider = (Story: any) => (
    <BrowserRouter>
        <Story />
    </BrowserRouter>
);
