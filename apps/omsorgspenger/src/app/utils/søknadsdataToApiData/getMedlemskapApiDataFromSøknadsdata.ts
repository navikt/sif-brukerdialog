import { MedlemskapApiData } from '../../types/søknadApiData/SøknadApiData';
import { MedlemskapSøknadsdata } from '../../types/søknadsdata/Søknadsdata';

export const getMedlemskapApiDataFromSøknadsdata = (medlemskap: MedlemskapSøknadsdata): MedlemskapApiData => {
    switch (medlemskap.type) {
        case 'harBoddSkalBo':
            return {
                harBoddIUtlandetSiste12Mnd: true,
                skalBoIUtlandetNeste12Mnd: true,
                utenlandsoppholdNeste12Mnd: [],
                utenlandsoppholdSiste12Mnd: [],
            };
        case 'harBodd':
            return {
                harBoddIUtlandetSiste12Mnd: true,
                skalBoIUtlandetNeste12Mnd: false,
                utenlandsoppholdNeste12Mnd: [],
                utenlandsoppholdSiste12Mnd: [],
            };
        case 'skalBo':
            return {
                harBoddIUtlandetSiste12Mnd: false,
                skalBoIUtlandetNeste12Mnd: true,
                utenlandsoppholdNeste12Mnd: [],
                utenlandsoppholdSiste12Mnd: [],
            };
        case 'harIkkeBoddSkalIkkeBo':
            return {
                harBoddIUtlandetSiste12Mnd: false,
                skalBoIUtlandetNeste12Mnd: false,
                utenlandsoppholdNeste12Mnd: [],
                utenlandsoppholdSiste12Mnd: [],
            };
    }
};
