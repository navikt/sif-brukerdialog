import React from 'react';
import { Link } from 'react-router-dom';
import { SøknadRoutes } from '../../types/SøknadRoutes';

const IntroPage = () => {
    return (
        <>
            Intro
            <p>
                <Link to={SøknadRoutes.INNLOGGET_ROOT}>Gå til søknad</Link>
            </p>
        </>
    );
};

export default IntroPage;
