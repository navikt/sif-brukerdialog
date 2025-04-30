import { Alert, BodyLong, Heading, Radio, RadioGroup, VStack } from '@navikt/ds-react';
import SøknadSteg from '../../components/søknad-steg/SøknadSteg';
import { Steg } from '../../types/Steg';
import { useDeltakerContext } from '../../../../context/DeltakerContext';
import { useState } from 'react';
import SkjemaFooter from '../../components/steg-skjema/SkjemaFooter';
import { Spørsmål, useSøknadContext } from '../../context/søknadContext';
import { YesOrNo } from '@navikt/sif-common-core-ds/src';
import { getYesOrNoValidator } from '@navikt/sif-validation';
import { dateFormatter } from '@navikt/sif-common-utils';
import { useSøknadNavigation } from '../../hooks/useSøknadNavigation';

const OppstartSteg = () => {
    const { deltakelse } = useDeltakerContext();
    const { setSpørsmålSvar, svar } = useSøknadContext();
    const { gotoSteg } = useSøknadNavigation();

    const infoStemmer = svar[Spørsmål.OPPSTART];
    const [error, setError] = useState<string | undefined>(undefined);

    const handleOnSubmit = () => {
        const err = getYesOrNoValidator()(infoStemmer);
        if (err) {
            setError('Du må svare på spørsmålet');
            return;
        }
        setError(undefined);
        gotoSteg(Steg.BARN);
    };

    return (
        <SøknadSteg tittel="Oppstart" steg={Steg.OPPSTART}>
            <form
                onSubmit={(evt) => {
                    evt.preventDefault();
                    evt.stopPropagation();
                    handleOnSubmit();
                }}>
                <VStack gap="8">
                    <VStack gap="4">
                        <RadioGroup
                            name="barnOk"
                            legend={`Er det riktig at du starter i ungdomsprogrammet ${dateFormatter.dayDateMonthYear(deltakelse.programPeriode.from)}?`}
                            error={error}
                            value={infoStemmer}
                            onChange={(value: YesOrNo) => {
                                setError(undefined);
                                setSpørsmålSvar(Spørsmål.OPPSTART, value);
                            }}>
                            <Radio value={YesOrNo.YES} checked={infoStemmer === YesOrNo.YES}>
                                Ja
                            </Radio>
                            <Radio value={YesOrNo.NO} checked={infoStemmer === YesOrNo.NO}>
                                Nei
                            </Radio>
                        </RadioGroup>
                        {infoStemmer === YesOrNo.NO && (
                            <Alert variant="info">
                                <Heading level="3" size="small" spacing>
                                    Ta kontakt veilederen din
                                </Heading>
                                <BodyLong>
                                    Det er kun veilederen din som kan endre datoen for oppstart. Du kan fremdeles sende
                                    inn søknaden, og vil eventuelt få en ny oppgave på min side hvis veilederen din
                                    endrer startdatoen.
                                </BodyLong>
                            </Alert>
                        )}
                    </VStack>
                    <SkjemaFooter submit={{ tittel: 'Neste steg', erSendInn: false }} />
                </VStack>
            </form>
        </SøknadSteg>
    );
};

export default OppstartSteg;
