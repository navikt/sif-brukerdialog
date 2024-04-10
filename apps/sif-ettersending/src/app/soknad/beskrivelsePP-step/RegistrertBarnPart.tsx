import { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { dateToISODate, prettifyDate } from '@navikt/sif-common-utils';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';

import { SoknadFormData, SoknadFormField } from '../../types/SoknadFormData';
import SoknadFormComponents from '../SoknadFormComponents';
import { getRequiredFieldValidator } from '@navikt/sif-common-formik-ds/src/validation';

import { BodyShort } from '@navikt/ds-react';
import getBarn from '../../api/getBarn';
import { RegistrertBarn } from '../../types/RegistrertBarn';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import { useFormikContext } from 'formik';

interface LoadState {
    isLoading: boolean;
    isLoaded: boolean;
}

interface Props {
    setHarRegistrerteBarn: (harRegistrerteBarn: boolean) => void;
}

const RegistrertBarnPart = ({ setHarRegistrerteBarn }: Props) => {
    const intl = useIntl();
    const {
        values: { legeerklæringGjelderEtAnnetBarn },
        setFieldValue,
    } = useFormikContext<SoknadFormData>();

    const [søkersBarn, setSøkersBarn] = useState<RegistrertBarn[]>([]);
    const [loadState, setLoadState] = useState<LoadState>({ isLoading: false, isLoaded: false });

    const { isLoading, isLoaded } = loadState;

    useEffectOnce(() => {
        const fetchData = async () => {
            const barn = await getBarn.fetch();
            setLoadState({ isLoading: false, isLoaded: true });
            setSøkersBarn(barn);
            setHarRegistrerteBarn(barn.length > 0);
        };
        if (!isLoaded && !isLoading) {
            setLoadState({ isLoading: true, isLoaded: false });
            fetchData();
        }
    });

    useEffect(() => {
        if (isLoaded && søkersBarn.length === 0 && !legeerklæringGjelderEtAnnetBarn) {
            setFieldValue(SoknadFormField.legeerklæringGjelderEtAnnetBarn, true);
        }
    }, [isLoaded, legeerklæringGjelderEtAnnetBarn, setFieldValue, søkersBarn.length]);

    return (
        <>
            {søkersBarn.length > 0 && (
                <>
                    <SoknadFormComponents.RadioGroup
                        name={SoknadFormField.registrertBarnAktørId}
                        legend={intlHelper(intl, 'step.beskrivelse_pp.registrertBarnPart.spm')}
                        radios={søkersBarn.map((barn) => {
                            const { fornavn, mellomnavn, etternavn, fødselsdato, aktørId } = barn;
                            const barnetsNavn = formatName(fornavn, etternavn, mellomnavn);
                            return {
                                value: aktørId,
                                key: aktørId,
                                label: (
                                    <BodyShort as="div">
                                        <div>{barnetsNavn}</div>
                                        <div>
                                            <FormattedMessage
                                                id="step.beskrivelse_pp.registrertBarnPart.hvilketBarn.født"
                                                values={{ dato: prettifyDate(fødselsdato) }}
                                            />
                                        </div>
                                    </BodyShort>
                                ),
                                disabled: legeerklæringGjelderEtAnnetBarn,
                            };
                        })}
                        afterOnChange={(value) => {
                            const valgteBarn = søkersBarn.find((barn) => barn.aktørId === value);
                            if (valgteBarn) {
                                setFieldValue(SoknadFormField.valgteRegistrertBarn, {
                                    aktørId: valgteBarn.aktørId,
                                    barnetsNavn: formatName(
                                        valgteBarn.fornavn,
                                        valgteBarn.etternavn,
                                        valgteBarn.mellomnavn,
                                    ),
                                    barnetsFødselsdato: dateToISODate(valgteBarn.fødselsdato).toString(),
                                });
                            }
                        }}
                        validate={legeerklæringGjelderEtAnnetBarn ? undefined : getRequiredFieldValidator()}
                    />

                    <FormBlock margin="l">
                        <SoknadFormComponents.Checkbox
                            label={intlHelper(intl, 'step.beskrivelse_pp.gjelderAnnetBarn')}
                            name={SoknadFormField.legeerklæringGjelderEtAnnetBarn}
                            afterOnChange={(newValue) => {
                                if (newValue) {
                                    setFieldValue(SoknadFormField.registrertBarnAktørId, undefined);
                                    setFieldValue(SoknadFormField.valgteRegistrertBarn, undefined);
                                } else {
                                    setFieldValue(SoknadFormField.barnetsFødselsnummer, undefined);
                                }
                            }}
                        />
                    </FormBlock>
                </>
            )}
        </>
    );
};

export default RegistrertBarnPart;
