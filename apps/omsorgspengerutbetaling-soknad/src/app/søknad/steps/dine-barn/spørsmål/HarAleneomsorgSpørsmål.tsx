import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import { FormikYesOrNoQuestion } from '@navikt/sif-common-formik-ds';
import { getYesOrNoValidator } from '@navikt/sif-validation';
import { AppText, useAppIntl } from '../../../../i18n';
import { DineBarnFormFields } from '../DineBarnStep';

const HarAleneomsorgSpørsmål = () => {
    const { text } = useAppIntl();
    return (
        <FormBlock>
            <FormikYesOrNoQuestion
                name={DineBarnFormFields.harAleneomsorg}
                legend={text('step.dineBarn.utvidetRettAleneomsorg.spm')}
                validate={getYesOrNoValidator()}
                description={
                    <ExpandableInfo title={text('step.dineBarn.utvidetRettAleneomsorg.info.tittel')}>
                        <p>
                            <AppText id="step.dineBarn.utvidetRettAleneomsorg.info.tekst.1" />
                        </p>
                        <p>
                            <AppText id="step.dineBarn.utvidetRettAleneomsorg.info.tekst.2" />
                        </p>
                        <p>
                            <AppText id="step.dineBarn.utvidetRettAleneomsorg.info.tekst.3" />
                        </p>
                    </ExpandableInfo>
                }
            />
        </FormBlock>
    );
};

export default HarAleneomsorgSpørsmål;
