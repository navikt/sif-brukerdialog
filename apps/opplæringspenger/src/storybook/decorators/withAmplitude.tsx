import { AmplitudeProvider } from '@navikt/sif-common-amplitude';

export const withAmplitudeProvider = (Story: any) => (
    <AmplitudeProvider applicationKey={'ab'} isActive={false}>
        <Story />
    </AmplitudeProvider>
);
