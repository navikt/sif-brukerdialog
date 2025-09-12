import { Box } from '@navikt/ds-react';

interface Props {
    panelId: string;
    mode?: undefined | 'demo';
}

const UxSignalsPanel = ({ panelId, mode }: Props) => {
    return (
        <Box
            borderRadius="large"
            style={{ backgroundColor: 'white' }}
            data-uxsignals-embed={`panel-${panelId}`}
            data-uxsignals-mode={mode || ''}></Box>
    );
};

export default UxSignalsPanel;
