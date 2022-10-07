import React from 'react';
import SøknadSteg from '../../SøknadSteg';
import { SøknadStegID } from '../../søknadStepsConfig';

const OppsummeringSteg = () => {
    return <SøknadSteg stegID={SøknadStegID.OPPSUMMERING}>Oppsummering</SøknadSteg>;
};

export default OppsummeringSteg;
