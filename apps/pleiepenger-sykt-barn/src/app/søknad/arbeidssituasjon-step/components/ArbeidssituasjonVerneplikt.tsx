import { useAppIntl } from '@i18n/index';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import { getYesOrNoValidator } from '@navikt/sif-validation';

import { AppText } from '../../../i18n';
import { SøknadFormField } from '../../../types/søknad-form-values/SøknadFormValues';
import SøknadFormComponents from '../../SøknadFormComponents';

const ArbeidssituasjonVerneplikt = () => {
    const { text } = useAppIntl();
    return (
        <SøknadFormComponents.YesOrNoQuestion
            name={SøknadFormField.harVærtEllerErVernepliktig}
            legend={text('steg.arbeidssituasjon.verneplikt.spm')}
            validate={getYesOrNoValidator()}
            description={
                <ExpandableInfo title={text('steg.arbeidssituasjon.verneplikt.info.tittel')}>
                    <AppText id="steg.arbeidssituasjon.verneplikt.info.tekst" />
                </ExpandableInfo>
            }
            data-testid="verneplikt"
        />
    );
};

export default ArbeidssituasjonVerneplikt;
