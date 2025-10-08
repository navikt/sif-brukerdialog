import { getRequiredFieldValidator } from '@navikt/sif-validation';
import { EnkeltdagEllerPeriode, KursFormComponents, KursFormFields } from '../KursStep';

const EnkeltdagerEllerPerioderQuestion = () => {
    return (
        <KursFormComponents.RadioGroup
            name={KursFormFields.enkeltdagEllerPeriode}
            legend="Gjelder søknaden enkeltdag eller periode?"
            description="Du kan legge til flere enkeltdager eller perioder etter du har valgt. "
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
