import { HStack } from '@navikt/ds-react';
import UngdomsprogramYtelseHeader from '../illustrasjon/UngdomsprogramYtelseHeader';

interface Props {
    title?: string;
    titleTag?: React.ReactNode;
    byline?: React.ReactNode;
    documentTitle?: string;
}

const PageHeader: React.FunctionComponent<Props> = () => {
    return (
        <div className="bg-(--a-deepblue-50)">
            <div className="text-left">
                <HStack gap="6" align="center">
                    <UngdomsprogramYtelseHeader />
                </HStack>
            </div>
        </div>
    );
};

export default PageHeader;
