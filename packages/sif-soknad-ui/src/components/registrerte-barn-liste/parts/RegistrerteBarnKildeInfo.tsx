import { HelpText } from '@navikt/ds-react';

import { SifSoknadUiText, useSifSoknadUiIntl } from '../../../i18n';

const RegistrerteBarnKildeInfo = () => {
    const { text } = useSifSoknadUiIntl();
    return (
        <HelpText title={text('registrerteBarnKildeInfo.helpTextTooltip')}>
            <SifSoknadUiText id="registrerteBarnKildeInfo.kilde" />
        </HelpText>
    );
};

export default RegistrerteBarnKildeInfo;
