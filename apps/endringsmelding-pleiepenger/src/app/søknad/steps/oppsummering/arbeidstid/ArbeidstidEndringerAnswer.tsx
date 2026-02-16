import { FormSummary } from '@navikt/ds-react';

import { AppText, useAppIntl } from '../../../../i18n';
import ArbeidstidUker from '../../../../modules/arbeidstid-uker/ArbeidstidUker';
import { ArbeidstidPeriodeApiDataMap } from '../../../../types';
import { oppsummeringStepUtils } from '../oppsummeringStepUtils';

interface Props {
    perioder: ArbeidstidPeriodeApiDataMap;
    visEndringSomOpprinnelig?: boolean;
}

const ArbeidstidEndringerAnswer = ({ perioder, visEndringSomOpprinnelig }: Props) => {
    const { text } = useAppIntl();
    return (
        <FormSummary.Answer>
            <FormSummary.Label>
                <AppText id="oppsummeringStep.arbeidstid.endringerIArbeidstid" />
            </FormSummary.Label>
            <FormSummary.Value>
                <ArbeidstidUker
                    listItems={oppsummeringStepUtils.getArbeidstidUkerItems(perioder)}
                    arbeidstidKolonneTittel={text('oppsummeringStep.arbeidstid.kolonne.endretArbeidstid')}
                    visEndringSomOpprinnelig={visEndringSomOpprinnelig}
                />
            </FormSummary.Value>
        </FormSummary.Answer>
    );
};

export default ArbeidstidEndringerAnswer;
