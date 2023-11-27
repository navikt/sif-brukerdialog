import { BodyLong, Box, Heading, Link } from '@navikt/ds-react';

interface Props {}

const SvarFrist: React.FunctionComponent<Props> = ({}) => {
    return (
        <Box>
            <Heading size="medium" level="2" className="text-deepblue-800" spacing={true}>
                Saksbehandlingstid
            </Heading>
            <BodyLong as="div" className="bg-deepblue-100 pt-4 pl-6 pr-6 pb-6 rounded">
                <p className="mb-2">
                    Du kan forvente svar innen: <br />
                    <span className="font-bold">TODO</span>
                </p>
                <div>
                    <Link href="https://www.nav.no/saksbehandlingstider" className="text-deepblue-800">
                        Se saksbehandlingstider
                    </Link>
                </div>
            </BodyLong>
        </Box>
    );
};

export default SvarFrist;
