import { getRequiredFieldValidator, ValidateRequiredFieldError } from '@navikt/sif-common-formik-ds/src/validation';
import { useAppIntl } from '../../../../i18n';
import { BarnSammeAdresse } from '../../../../types/BarnSammeAdresse';
import { OmBarnetFormFields } from '../OmBarnetStep';
import { omBarnetFormComponents } from '../omBarnetFormComponents';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';

const { RadioGroup } = omBarnetFormComponents;

export const BorSammenMedBarnetErrorKeys = [ValidateRequiredFieldError.noValue];

const BorSammenMedBarnetSpørsmål = () => {
    const { text } = useAppIntl();
    return (
        <RadioGroup
            name={OmBarnetFormFields.sammeAdresse}
            legend={text('steg.omBarnet.spm.sammeAdresse.label')}
            radios={[
                {
                    label: text('steg.omBarnet.spm.sammeAdresse.ja'),
                    value: BarnSammeAdresse.JA,
                },
                {
                    label: text('steg.omBarnet.spm.sammeAdresse.jaDeltBosted'),
                    value: BarnSammeAdresse.JA_DELT_BOSTED,
                },
                {
                    label: text('steg.omBarnet.spm.sammeAdresse.nei'),
                    value: BarnSammeAdresse.NEI,
                },
            ]}
            validate={getRequiredFieldValidator()}
            description={
                <ExpandableInfo title={text('steg.omBarnet.spm.sammeAdresse.hvaBetyrDette')}>
                    {text('steg.omBarnet.spm.sammeAdresse.hvaBetyrDette.info')}
                </ExpandableInfo>
            }
        />
    );
};

export default BorSammenMedBarnetSpørsmål;
