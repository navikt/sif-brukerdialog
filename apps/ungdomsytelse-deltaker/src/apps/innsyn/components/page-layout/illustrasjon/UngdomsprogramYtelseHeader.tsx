import { Bleed, Box, Hide, Show, VStack } from '@navikt/ds-react';
import Money from './money';

const UngdomsprogramYtelseHeader = () => {
    return (
        <VStack style={{ color: '#002060', fontWeight: 'bold', lineHeight: '1.5rem', fontSize: '3.65rem' }}>
            <div role="heading" aria-level={1} aria-label="Din ungdomsprogramytelse">
                <Show below="sm">
                    <Box>
                        <span
                            className="inline-block rounded-xl p-3 pt-6 pb-6 relative z-1"
                            style={{
                                backgroundColor: '#CCE9F2',
                                fontWeight: 'bold',
                                lineHeight: '3rem',
                                fontSize: '3rem',
                            }}>
                            Din ungdoms&shy;program&shy;ytelse
                        </span>
                    </Box>
                </Show>
                <Hide below="sm">
                    <div aria-hidden="true">
                        <Box>
                            <span
                                className="inline-block rounded-xl p-3 pt-6 pb-6 relative z-1"
                                style={{ backgroundColor: '#CCE9F2', fontWeight: 'bold' }}>
                                Din ungdoms
                                <span style={{ position: 'absolute', left: '100%', top: '-1rem' }} aria-hidden="true">
                                    <Money />
                                </span>
                            </span>
                        </Box>
                        <Bleed marginBlock="3">
                            <span
                                className="inline-block rounded-xl p-3 pb-6 pt-6"
                                style={{ backgroundColor: '#CCE9F2', paddingRight: '1.5rem' }}>
                                programytelse
                            </span>
                        </Bleed>
                    </div>
                </Hide>
            </div>
        </VStack>
    );
};

export default UngdomsprogramYtelseHeader;
