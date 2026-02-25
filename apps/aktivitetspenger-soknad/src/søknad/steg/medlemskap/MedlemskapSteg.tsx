import { FormLayout } from '@navikt/sif-common-ui';
import { useAppIntl } from '@shared/i18n';
import SøknadSteg from '@søknad/components/søknad-steg/SøknadSteg';
import SkjemaFooter from '@søknad/components/steg-skjema/SkjemaFooter';
import { useSøknadNavigation } from '@søknad/hooks/utils/useSøknadNavigation';
import { Steg } from '@søknad/types';

const MedlemskapSteg = () => {
    const { text } = useAppIntl();
    // const { setSpørsmålSvar, svar } = useSøknadContext();
    const { gotoSteg } = useSøknadNavigation();

    // const infoStemmer = svar[Spørsmål.MEDLEMSKAP];
    // const [error, setError] = useState<string | undefined>(undefined);

    const handleOnSubmit = () => {
        gotoSteg(Steg.BARN);
    };

    return (
        <SøknadSteg tittel="Medlemskap" steg={Steg.MEDLEMSKAP}>
            <FormLayout.Guide>medlemskap</FormLayout.Guide>
            <form
                onSubmit={(evt) => {
                    evt.preventDefault();
                    handleOnSubmit();
                }}>
                <FormLayout.Questions>
                    info
                    <SkjemaFooter
                        submit={{ tittel: text('søknadApp.nesteSteg.label'), erSendInn: false }}
                        forrige={{
                            tittel: text('søknadApp.forrigeSteg.label'),
                            onClick: () => gotoSteg(Steg.BOSTED),
                        }}
                    />
                </FormLayout.Questions>
            </form>
        </SøknadSteg>
    );
};

export default MedlemskapSteg;
