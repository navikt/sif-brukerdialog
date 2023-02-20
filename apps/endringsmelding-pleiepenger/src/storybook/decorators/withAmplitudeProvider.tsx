import React from 'react';
import { AmplitudeProvider } from '@navikt/sif-common-amplitude/lib';

export const withAmplitudeProvider = (Story: any) => (
    <AmplitudeProvider applicationKey={'ab'} isActive={false}>
        <Story />
    </AmplitudeProvider>
);
