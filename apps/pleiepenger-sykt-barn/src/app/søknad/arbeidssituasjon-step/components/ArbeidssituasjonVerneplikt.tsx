import { FormattedMessage, useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import ExpandableInfo from '@navikt/sif-common-core-ds/lib/components/expandable-info/ExpandableInfo';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { getYesOrNoValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import { SøknadFormField } from '../../../types/_SøknadFormValues';
import SøknadFormComponents from '../../SøknadFormComponents';

const ArbeidssituasjonVerneplikt = () => {
    const intl = useIntl();
    return (
        <FormBlock>
            <SøknadFormComponents.YesOrNoQuestion
                name={SøknadFormField.harVærtEllerErVernepliktig}
                legend={intlHelper(intl, 'steg.arbeidssituasjon.verneplikt.spm')}
                validate={getYesOrNoValidator()}
                description={
                    <ExpandableInfo title={intlHelper(intl, 'steg.arbeidssituasjon.verneplikt.info.tittel')}>
                        <FormattedMessage id="steg.arbeidssituasjon.verneplikt.info.tekst" />
                    </ExpandableInfo>
                }
                data-testid="verneplikt"
            />
        </FormBlock>
    );
};

export default ArbeidssituasjonVerneplikt;
