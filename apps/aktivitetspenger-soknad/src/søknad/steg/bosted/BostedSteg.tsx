import { FormLayout } from '@navikt/sif-common-ui';
import { useAppIntl } from '@shared/i18n';
import SøknadSteg from '@søknad/components/søknad-steg/SøknadSteg';
import SkjemaFooter from '@søknad/components/steg-skjema/SkjemaFooter';
import { useSøknadNavigation } from '@søknad/hooks/utils/useSøknadNavigation';
import { Steg } from '@søknad/types';
import { getNextSteg } from '../../utils/stegUtils';

const BostedSteg = () => {
    const { text } = useAppIntl();

    const { gotoSteg } = useSøknadNavigation();

    const handleOnSubmit = () => {
        gotoSteg(getNextSteg(Steg.BOSTED));
    };

    return (
        <SøknadSteg tittel="Bosted" steg={Steg.BOSTED}>
            <FormLayout.Guide>Bosted</FormLayout.Guide>
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
                            onClick: () => gotoSteg(Steg.KONTONUMMER),
                        }}
                    />
                </FormLayout.Questions>
            </form>
        </SøknadSteg>
    );
};

export default BostedSteg;
