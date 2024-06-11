import { Alert, Heading } from '@navikt/ds-react';
import React, { useState } from 'react';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds';
import { getRequiredFieldValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { RegistrertBarn } from '../../../../types/RegistrertBarn';
import { OmBarnetFormFields, OmBarnetFormValues } from '../OmBarnetStep';
import { mapBarnTilRadioProps } from '../omBarnetStepUtils';
import { useAppIntl } from '../../../../i18n';
import innvilgetVedtakEndpoint from '../../../../api/endpoints/innvilgetVedtakEndpoint';
import { HentSisteGyldigeVedtakResponseDto } from '../../../../types/innvilgetVedtakApiData/HentSisteGyldigeVedtakResponseDto';

interface Props {
    registrerteBarn: RegistrertBarn[];
    søknadenGjelderEtAnnetBarn?: boolean;
}

const { RadioGroup, Checkbox } = getTypedFormComponents<OmBarnetFormFields, OmBarnetFormValues>();

const VelgRegistrertBarn: React.FunctionComponent<Props> = ({ registrerteBarn, søknadenGjelderEtAnnetBarn }) => {
    const { text } = useAppIntl();
    // use sate to store the last innvilget vedtak
    const [sisteInnvilgetVedtak, setSisteInnvilgetVedtak] = useState<HentSisteGyldigeVedtakResponseDto | undefined>(
        undefined,
    );

    async function harInnvilgetVedFraFør(aktørId: string) {
        const sisteInnvilgetVedtak = await innvilgetVedtakEndpoint.send({ pleietrengendeAktørId: aktørId });
        setSisteInnvilgetVedtak(sisteInnvilgetVedtak.data);
    }

    return (
        <>
            <Heading level="2" size="medium">
                {text('steg.omBarnet.hvilketBarn.spm')}
            </Heading>
            <FormBlock margin="l">
                <RadioGroup
                    legend={text('steg.omBarnet.hvilketBarn.registrerteBarn')}
                    description={text('steg.omBarnet.hvilketBarn.info')}
                    name={OmBarnetFormFields.barnetSøknadenGjelder}
                    radios={registrerteBarn.map((barn) => mapBarnTilRadioProps(barn, søknadenGjelderEtAnnetBarn))}
                    validate={søknadenGjelderEtAnnetBarn ? undefined : getRequiredFieldValidator()}
                    afterOnChange={(aktørId) => {
                        harInnvilgetVedFraFør(aktørId);
                    }}
                />
            </FormBlock>
            <FormBlock margin="l">
                <Checkbox
                    label={text('steg.omBarnet.gjelderAnnetBarn')}
                    name={OmBarnetFormFields.søknadenGjelderEtAnnetBarn}
                />
            </FormBlock>
            {sisteInnvilgetVedtak && sisteInnvilgetVedtak.harInnvilgedeBehandlinger && (
                <FormBlock margin="l">
                    <Alert variant="warning">
                        <Heading spacing size="small" level="3">
                            Du trenger ikke å søke igjen.
                        </Heading>
                        Du har allerede et vedtak med saksnummer {sisteInnvilgetVedtak.saksnummer} som gjelder fram til
                        barnet fyller 18 år.
                    </Alert>
                </FormBlock>
            )}
        </>
    );
};

export default VelgRegistrertBarn;
