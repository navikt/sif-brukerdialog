import { RegistrertBarn } from '../../../../types/RegistrertBarn';
import { DineBarnFormValues } from '../DineBarnStep';
import {
    DineBarnScenario as DineBarnScenario,
    getBarnAlderInfo,
    getDineBarnScenario,
    getHarUtvidetRett,
} from '../dineBarnStepUtils';
import EttEllerToBarnUnder13 from './EttEllerToBarnUnder13';
import KunBarnOver13 from './KunBarnOver13';
import OverOgUnder13 from './OverOgUnder13';
import TreEllerFlereBarnUnder13 from './TreEllerFlereBarnUnder13';

interface Props {
    registrerteBarn: RegistrertBarn[];
    formValues: Partial<DineBarnFormValues>;
}

const DineBarnScenarioer: React.FunctionComponent<Props> = ({ registrerteBarn, formValues }) => {
    const { andreBarn = [], harAleneomsorg, harSyktBarn } = formValues;

    const barnAlderInfo = getBarnAlderInfo(registrerteBarn, andreBarn);
    const scenario = getDineBarnScenario(registrerteBarn, andreBarn);

    const harUtvidetRett = getHarUtvidetRett(
        registrerteBarn,
        andreBarn,
        formValues.harSyktBarn,
        formValues.harAleneomsorg,
    );

    switch (scenario) {
        case DineBarnScenario.ETT_ELLER_TO_UNDER_13:
            return (
                <EttEllerToBarnUnder13
                    antallBarn={barnAlderInfo.under13}
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
        case DineBarnScenario.OVER_OG_UNDER_13: {
            return (
                <OverOgUnder13
                    antallBarn={barnAlderInfo.under13}
                    harAleneomsorg={harAleneomsorg}
                    harSyktBarn={harSyktBarn}
                    harUtvidetRett={harUtvidetRett}
                />
            );
        }
        case DineBarnScenario.INGEN_BARN:
            return null;
    }
};

export default DineBarnScenarioer;
