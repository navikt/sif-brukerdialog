import { SanityConfig } from '@navikt/appstatus-react-ds';
import React from 'react';
interface Props {
    applicationKey: string;
    sanityConfig: SanityConfig;
    contentRenderer: () => React.ReactNode;
    unavailableContentRenderer?: () => React.ReactNode;
}
declare const AppStatusWrapper: ({ applicationKey, contentRenderer, sanityConfig, unavailableContentRenderer }: Props) => JSX.Element;
export default AppStatusWrapper;
