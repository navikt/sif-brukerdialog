import { Box, Heading } from '@navikt/ds-react';
import InfoForsinkelse from './InfoForsinkelse';

interface Props {
    tittel?: string;
}

const StatusISakHeading = ({ tittel }: Props) => {
    return (
        <>
            {tittel ? (
                <>
                    <Heading level="2" size="medium">
                        {tittel}
                    </Heading>
                    <Box className="pb-2">
                        <InfoForsinkelse />
                    </Box>
                </>
            ) : null}
        </>
    );
};

export default StatusISakHeading;
