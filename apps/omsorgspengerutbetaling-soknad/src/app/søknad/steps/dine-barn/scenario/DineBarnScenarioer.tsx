import { RegistrertBarn } from '@navikt/sif-common-api';
import { DineBarnScenario } from '../../../../types/DineBarnScenario';
import { DineBarnFormValues } from '../DineBarnStep';
import { getBarnAlderInfo, getDineBarnScenario, getHarUtvidetRett } from '../dineBarnStepUtils';
import EttEllerToBarnUnder13 from './EttEllerToBarnUnder13';
import KunBarnOver13 from './KunBarnOver13';
import TreEllerFlereBarnUnder13 from './TreEllerFlereBarnUnder13';

interface Props {
    registrerteBarn: RegistrertBarn[];
    formValues: Partial<DineBarnFormValues>;
}

const DineBarnScenarioer: React.FunctionComponent<Props> = ({ registrerteBarn, formValues }) => {
    const { andreBarn = [], harAleneomsorg, harSyktBarn } = formValues;
    const barn = [...registrerteBarn, ...andreBarn];
    const barnAlderInfo = getBarnAlderInfo(barn);
    const scenario = getDineBarnScenario(barn);
    const harUtvidetRett = getHarUtvidetRett(barn, formValues.harSyktBarn, formValues.harAleneomsorg);

    switch (scenario) {
        case DineBarnScenario.ETT_ELLER_TO_UNDER_13:
            return (
                <EttEllerToBarnUnder13
                    harAleneomsorg={harAleneomsorg}
                    harSyktBarn={harSyktBarn}
                    harUtvidetRett={harUtvidetRett}
                />
            );
        case DineBarnScenario.TRE_ELLER_FLERE_UNDER_13:
            return <TreEllerFlereBarnUnder13 />;
        case DineBarnScenario.KUN_OVER_13:
            return (
                <KunBarnOver13
                    antallBarn={barnAlderInfo.under13}
                    harSyktBarn={harSyktBarn}
                    harUtvidetRett={harUtvidetRett}
                />
            );
    }
};

export default DineBarnScenarioer;
