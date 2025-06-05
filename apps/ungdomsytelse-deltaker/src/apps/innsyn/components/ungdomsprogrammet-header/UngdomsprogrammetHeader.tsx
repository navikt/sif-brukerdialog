import { Bleed, Box, Heading, Hide, Show, VStack } from '@navikt/ds-react';
import MannSvg from '../../atoms/svg/Mann';

const UngdomsprogrammetHeader = () => {
    return (
        <>
            <Hide above="sm">
                <Heading level="2" size="large">
                    Ungdoms&shy;programmet
                </Heading>
            </Hide>
            <Show above="sm">
                <VStack
                    style={{
                        color: '#002060',
                        fontWeight: 'bold',
                        lineHeight: '1.125rem',
                        fontSize: '3.5rem',
                        paddingBottom: '1rem',
                    }}
                    gap="2">
                    <div role="heading" aria-level={1} aria-label="Ungdomsprogrammet ">
                        <div aria-hidden="true">
                            <Box>
                                <span
                                    className="inline-block rounded-xl p-3 pt-6 pb-6 relative z-1 "
                                    style={{ backgroundColor: '#D7E6F0', fontWeight: '900' }}>
                                    Ungdoms-
                                    <span
                                        style={{ position: 'absolute', left: '100%', top: '-1rem' }}
                                        aria-hidden="true">
                                        <MannSvg />
                                    </span>
                                </span>
                            </Box>
                            <Bleed marginBlock="3">
                                <span
                                    className="inline-block rounded-xl p-3 pb-6 pt-6"
                                    style={{ backgroundColor: '#D7E6F0', paddingRight: '1.5rem' }}>
                                    programmet
                                </span>
                            </Bleed>
                        </div>
                    </div>
                </VStack>
            </Show>
        </>
    );
};

export default UngdomsprogrammetHeader;
