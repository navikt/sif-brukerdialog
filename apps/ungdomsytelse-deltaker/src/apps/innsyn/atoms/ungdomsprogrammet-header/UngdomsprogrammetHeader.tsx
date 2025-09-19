import { Bleed, Box, Heading, Hide, Show } from '@navikt/ds-react';

import { AppText, useAppIntl } from '../../../../i18n';
import MannSvg from '../svg/Mann';

const UngdomsprogrammetHeader = () => {
    const { text } = useAppIntl();
    return (
        <>
            <Hide above="sm">
                <Heading level="2" size="large">
                    <AppText id="ungdomsprogrammetHeader.heading" />
                </Heading>
            </Hide>
            <Show above="sm">
                <h2 aria-label={text('ungdomsprogrammetHeader.ariaLabel')}>
                    <div
                        aria-hidden="true"
                        style={{
                            color: '#002060',
                            fontWeight: 'bold',
                            lineHeight: '1.125rem',
                            fontSize: '3.5rem',
                            paddingBottom: '1rem',
                        }}>
                        <Box>
                            <span
                                className="inline-block rounded-xl p-3 pt-6 pb-6 relative z-1 "
                                style={{ backgroundColor: '#D7E6F0', fontWeight: '900' }}>
                                <AppText id="ungdomsprogrammetHeader.poster.ungdoms" />
                                {/* */}
                                <span style={{ position: 'absolute', left: '100%', top: '-1rem' }} aria-hidden="true">
                                    <MannSvg />
                                </span>
                            </span>
                        </Box>
                        <Bleed marginBlock="3">
                            <span
                                className="inline-block rounded-xl p-3 pb-6 pt-6"
                                style={{ backgroundColor: '#D7E6F0', paddingRight: '1.5rem' }}>
                                <AppText id="ungdomsprogrammetHeader.poster.programmet" />
                            </span>
                        </Bleed>
                    </div>
                </h2>
            </Show>
        </>
    );
};

export default UngdomsprogrammetHeader;
