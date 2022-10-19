import React from 'react';
import SøknadSteg from '../../SøknadSteg';
import { StegID } from '../../søknadStegConfig';

const OppsummeringSteg = () => {
    return <SøknadSteg stegID={StegID.OPPSUMMERING}>Oppsummering</SøknadSteg>;
};

export default OppsummeringSteg;
