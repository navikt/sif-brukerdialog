import { FraværSøknadsdata } from '../../types/søknadsdata/FraværSøknadsdata';

export const getUtbetalingsperioderApiDataFromSøknadsdata = (dineBarnSøknadsdata: FraværSøknadsdata): ApiBarn[] => {
    if (dineBarnSøknadsdata === undefined) {
        throw Error('dineBarnSøknadsdata undefined');
    }
    const { andreBarn, type } = dineBarnSøknadsdata;

    switch (type) {
        case 'minstEtt12årEllerYngre':
            return [
                ...andreBarn.map((barn) => mapAndreBarnToApiBarn(barn, dineBarnSøknadsdata.harDekketTiFørsteDagerSelv)),
                ...registrertBarn.map((barn) =>
                    mapRegistrertBarnToApiBarn(barn, dineBarnSøknadsdata.harDekketTiFørsteDagerSelv)
                ),
            ];
        case 'alleBarnEldre12år':
            return [
                ...andreBarn.map((barn) =>
                    mapAndreBarnToApiBarn(barn, undefined, dineBarnSøknadsdata.harUtvidetRettFor)
                ),
                ...registrertBarn.map((barn) =>
                    mapRegistrertBarnToApiBarn(barn, undefined, dineBarnSøknadsdata.harUtvidetRettFor)
                ),
            ];
    }
};
