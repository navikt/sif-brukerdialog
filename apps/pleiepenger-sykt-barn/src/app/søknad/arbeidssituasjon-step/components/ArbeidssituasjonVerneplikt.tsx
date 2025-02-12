import { useAppIntl } from '@i18n/index';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import { getYesOrNoValidator } from '@navikt/sif-common-validation';
import { AppText } from '../../../i18n';
import { SøknadFormField } from '../../../types/søknad-form-values/SøknadFormValues';
import SøknadFormComponents from '../../SøknadFormComponents';

const ArbeidssituasjonVerneplikt = () => {
    const { text } = useAppIntl();
    return (
        <FormBlock>
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
        </FormBlock>
    );
};

export default ArbeidssituasjonVerneplikt;
