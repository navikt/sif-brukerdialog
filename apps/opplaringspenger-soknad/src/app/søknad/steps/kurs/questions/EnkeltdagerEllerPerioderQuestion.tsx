import { getRequiredFieldValidator } from '@navikt/sif-validation';
import { EnkeltdagEllerPeriode, KursFormComponents, KursFormFields } from '../KursStep';

const EnkeltdagerEllerPerioderQuestion = () => {
    return (
        <KursFormComponents.RadioGroup
            name={KursFormFields.enkeltdagEllerPeriode}
            legend="Gjelder søknaden enkeltdag eller periode?"
            description="Legg til dag og antall timer du er på opplæring, og reisetid til og fra opplæringen."
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
