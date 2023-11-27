import { BodyLong, Box, Heading, Link } from '@navikt/ds-react';
import useSWR from 'swr';
import { svarfristFetcher } from '../../pages/api/svarfrist.api';
import ComponentLoader from '../component-loader/ComponentLoader';
import { dateFormatter } from '@navikt/sif-common-utils/lib';

interface Props {}

const Svarfrist: React.FunctionComponent<Props> = ({}) => {
    const { data, isLoading } = useSWR('/dine-pleiepenger/api/svarfrist', svarfristFetcher, {
        errorRetryCount: 0,
    });

    const renderContent = () => {
        if (isLoading) {
            return <ComponentLoader />;
        }

        const frist = data?.frist;
        return (
            <>
                {frist ? (
                    <p className="mb-2">
                        Du kan forvente svar innen: <br />
                        <span className="block font-bold first-letter:uppercase">
                            {dateFormatter.dayDateMonthYear(frist)}
                        </span>
                    </p>
                ) : (
                    <p className="mb-2">TODO: Skrive tekst for når vi ikke får noen dato fra backend</p>
                )}
                <div>
                    <Link href="https://www.nav.no/saksbehandlingstider" className="text-deepblue-800">
                        Se saksbehandlingstider
                    </Link>
                </div>{' '}
            </>
        );
    };
    return (
        <Box>
            <Heading size="medium" level="2" className="text-deepblue-800" spacing={true}>
                Saksbehandlingstid
            </Heading>
            <BodyLong as="div" className="bg-deepblue-100 pt-4 pl-6 pr-6 pb-6 rounded">
                {renderContent()}
            </BodyLong>
        </Box>
    );
};

export default Svarfrist;
