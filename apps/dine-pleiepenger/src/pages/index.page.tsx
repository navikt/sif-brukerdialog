/* eslint-disable @typescript-eslint/no-extra-non-null-assertion */

import DineSøknader from '../components/dine-søknader/DineSøknader';
import DefaultPage from '../components/layout/default-page/DefaultPage';
import SvarFrist from '../components/svarfrist/SvarFrist';

import { withAuthenticatedPage } from '../auth/withAuthentication';
import { ReactElement } from 'react';
import Head from 'next/head';
import DineMellomlagringer from '../components/dine-mellomlagringer/DineMellomlagringer';
import { VStack } from '@navikt/ds-react';

function DinePleiepengerPage(): ReactElement {
    return (
        <DefaultPage>
            <Head>
                <title>Dine pleiepenger</title>
            </Head>
            <VStack gap="10">
                <DineMellomlagringer />
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div className="flex-grow a-left">
                        <DineSøknader />
                    </div>
                    <div className="flex-none">
                        <SvarFrist />
                    </div>
                </div>
            </VStack>
        </DefaultPage>
    );
}

export const getServerSideProps = withAuthenticatedPage();

export default DinePleiepengerPage;
