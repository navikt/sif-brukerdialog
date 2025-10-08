import { getRequiredFieldValidator } from '@navikt/sif-validation';
import { EnkeltdagEllerPeriode, KursFormComponents, KursFormFields } from '../KursStep';
import { useAppIntl } from '../../../../i18n';

const EnkeltdagerEllerPerioderQuestion = () => {
    const { text } = useAppIntl();
    return (
        <KursFormComponents.RadioGroup
            name={KursFormFields.enkeltdagEllerPeriode}
            legend={text('steg.kurs.enkeltdagEllerPeriode.spm')}
            description={text('steg.kurs.enkeltdagEllerPeriode.description')}
            validate={getRequiredFieldValidator()}
            radios={[
                {
                    label: text('steg.kurs.enkeltdagEllerPeriode.enkeltdag'),
                    value: EnkeltdagEllerPeriode.ENKELTDAG,
                },
                {
                    label: text('steg.kurs.enkeltdagEllerPeriode.periode'),
                    value: EnkeltdagEllerPeriode.PERIODE,
                },
            ]}
        />
    );
};

export default EnkeltdagerEllerPerioderQuestion;
