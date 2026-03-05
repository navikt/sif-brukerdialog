import { SanityConfig } from '@navikt/appstatus-react-ds';
import { BodyShort, GuidePanel } from '@navikt/ds-react';
import { AktivitetspengerApp } from '@navikt/sif-app-register';

import {
    AppStatusWrapper,
    AppStatusWrapperProps,
} from '../../../common/components/app-status-wrapper/AppStatusWrapper';
import { getAppEnv } from '../../env/appEnv';

type Props = Pick<AppStatusWrapperProps, 'contentRenderer'> & { active: boolean };

const getSanityConfig = (): SanityConfig => {
    const env = getAppEnv();
    return {
        projectId: env.SIF_PUBLIC_APPSTATUS_PROJECT_ID,
        dataset: env.SIF_PUBLIC_APPSTATUS_DATASET,
    };
};

export const SøknadTilgjengeligGuard = (props: Props) =>
    props.active ? (
        <AppStatusWrapper
            applicationKey={AktivitetspengerApp.key}
            sanityConfig={getSanityConfig()}
            contentRenderer={props.contentRenderer}
            unavailableContentRenderer={() => (
                <GuidePanel>
                    <BodyShort className="pt-4" size="large">
                        Sidene for aktivitetspenger er midlertidig utilgjengelige. Vi regner med å være ferdige snart,
                        så prøv gjerne igjen om en liten stund.
                    </BodyShort>
                </GuidePanel>
            )}
        />
    ) : (
        props.contentRenderer()
    );
