import type { NextPage } from 'next';
import { Alert } from '@navikt/ds-react';
import DineSøknader from '../components/dine-søknader/DineSøknader';
import DefaultPage from '../components/layout/default-page/DefaultPage';
import EmptyPage from '../components/layout/empty-page/EmptyPage';
import SvarFrist from '../components/svarfrist/SvarFrist';
import { endpoints, isForbidden, isUnauthorized } from '../utils/apiUtils';

export async function getServerSideProps() {
    let bruker = null;
    let errorMessage: string | null = null;

    await fetch(endpoints.soker)
        .then(async (response) => {
            bruker = await response.json();
        })
        .catch((error) => {
            if (isUnauthorized(error)) {
                return {
                    redirect: {
                        destination: '/login',
                        permanent: false,
                    },
                };
            } else if (isForbidden(error)) {
                return {
                    redirect: {
                        destination: '/ingen-tilgang',
                        permanent: false,
                    },
                };
            } else {
                errorMessage = 'Request failed';
            }
        });

    return { props: { bruker, error: errorMessage } };
}

const DinePleiepenger: NextPage = (props) => {
    const { error } = props as any;
    return error ? (
        <EmptyPage>
            <Alert variant="error">Det oppstod en feil da vi hentet informasjon din</Alert>
        </EmptyPage>
    ) : (
        <DefaultPage>
            <div style={{ display: 'flex', gap: '1rem' }}>
                <div className="flex-grow a-left">
                    <DineSøknader />
                </div>
                <div style={{ minWidth: '15rem', maxWidth: '20rem' }}>
                    <SvarFrist />
                </div>
            </div>
        </DefaultPage>
    );
};

export default DinePleiepenger;
