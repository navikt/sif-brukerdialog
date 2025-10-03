import { getRequiredFieldValidator } from '@navikt/sif-validation';
import { EnkeltdagEllerPeriode, KursFormComponents, KursFormFields } from '../KursStep';

const EnkeltdagerEllerPerioderQuestion = () => {
    return (
        <KursFormComponents.RadioGroup
            name={KursFormFields.enkeltdagEllerPeriode}
            legend="Enkeltdag eller periode"
            validate={getRequiredFieldValidator()}
            radios={[
                {
                    label: 'Enkeltdag',
                    value: EnkeltdagEllerPeriode.ENKELTDAG,
                },
                {
                    label: 'Periode',
                    value: EnkeltdagEllerPeriode.PERIODE,
                },
            ]}
        />
    );
};

export default EnkeltdagerEllerPerioderQuestion;
