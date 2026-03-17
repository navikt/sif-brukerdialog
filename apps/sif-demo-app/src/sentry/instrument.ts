import * as Sentry from '@sentry/react';
import React from 'react';
import { createRoutesFromChildren, matchRoutes, useLocation, useNavigationType } from 'react-router';

Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    environment: import.meta.env.MODE,
    release: import.meta.env.VITE_APP_VERSION,

    sendDefaultPii: true,

    integrations: [
        Sentry.reactRouterV7BrowserTracingIntegration({
            useEffect: React.useEffect,
            useLocation,
            useNavigationType,
            matchRoutes,
            createRoutesFromChildren,
        }),
        Sentry.replayIntegration({
            maskAllText: true,
            blockAllMedia: true,
        }),
    ],

    tracesSampleRate: 1.0, // lower to 0.1–0.2 in production
    tracePropagationTargets: ['localhost', /^https:\/\/.*\.nav\.no/],

    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
});
