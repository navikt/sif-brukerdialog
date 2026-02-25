import { FormLayout } from '@navikt/sif-common-ui';
import { useAppIntl } from '@shared/i18n';
import SøknadSteg from '@søknad/components/søknad-steg/SøknadSteg';
import SkjemaFooter from '@søknad/components/steg-skjema/SkjemaFooter';
import { useSøknadNavigation } from '@søknad/hooks/utils/useSøknadNavigation';
import { Spørsmål, Steg } from '@søknad/types';
import { getNextSteg } from '../../utils/stegUtils';
import { Alert, Radio, RadioGroup } from '@navikt/ds-react';
import { useState } from 'react';
import { useSøknadContext } from '../../hooks/context/useSøknadContext';
import { YesOrNo } from '@navikt/sif-common-core-ds';
import { getYesOrNoValidator } from '@navikt/sif-validation';

const BostedSteg = () => {
    const { text } = useAppIntl();
    const { setSpørsmålSvar, svar } = useSøknadContext();
    const { gotoSteg } = useSøknadNavigation();
    const [error, setError] = useState<string | undefined>(undefined);
    const borITrondheim = svar[Spørsmål.BOSTED];

    const handleOnSubmit = () => {
        const err = getYesOrNoValidator()(borITrondheim);
        if (err) {
            setError('Du må svare på spørsmålet');
            return;
        }
        setError(undefined);
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
                    <RadioGroup
                        legend="Bor du i Trondheim?"
                        error={error}
                        value={borITrondheim}
                        onChange={(value: YesOrNo) => {
                            setError(undefined);
                            setSpørsmålSvar(Spørsmål.BOSTED, value);
                        }}>
                        <Radio value={YesOrNo.YES} checked={borITrondheim === YesOrNo.YES}>
                            Ja
                        </Radio>
                        <Radio value={YesOrNo.NO} checked={borITrondheim === YesOrNo.NO}>
                            Nei
                        </Radio>
                    </RadioGroup>
                    {borITrondheim === YesOrNo.NO && (
                        <FormLayout.QuestionBleedTop>
                            <Alert variant="warning" className="mt-4">
                                Siden du ikke bor i Trondheim, kan du ikke søke om aktivitetspenger. Du kan fortsette
                                med å sende inn søknaden, men du vil få avslag.
                            </Alert>
                        </FormLayout.QuestionBleedTop>
                    )}

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
