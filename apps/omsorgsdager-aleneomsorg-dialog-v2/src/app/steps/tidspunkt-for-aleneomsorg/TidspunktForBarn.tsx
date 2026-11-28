import { Heading } from '@navikt/ds-react';
import { FormLayout } from '@sif/soknad-ui/components';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { DatoSpørsmål } from './spørsmål/DatoSpørsmål';
import { TidspunktSpørsmål } from './spørsmål/TidspunktSpørsmål';
import {
    type BarnMedAleneomsorg,
    TidspunktForAleneomsorg,
    type TidspunktForAleneomsorgFormValues,
} from './types';

type Props = {
    barn: BarnMedAleneomsorg;
};

export const TidspunktForBarn = ({ barn }: Props) => {
    const { clearErrors, watch } = useFormContext<TidspunktForAleneomsorgFormValues>();
    const tidspunktName = `aleneomsorgTidspunkt.idFnr_${barn.id}.tidspunktForAleneomsorg` as const;
    const datoName = `aleneomsorgTidspunkt.idFnr_${barn.id}.dato` as const;
    const tidspunkt = watch(tidspunktName);
    const viserDato = tidspunkt === TidspunktForAleneomsorg.SISTE_2_ÅRENE;

    useEffect(() => {
        if (!viserDato) {
            clearErrors(datoName);
        }
    }, [clearErrors, datoName, viserDato]);

    return (
        <div>
            <Heading level="2" size="small" spacing>
                {barn.navn}
            </Heading>
            <FormLayout.Questions>
                <TidspunktSpørsmål barnId={barn.id} barnNavn={barn.navn} />
                {viserDato && <DatoSpørsmål barnId={barn.id} barnNavn={barn.navn} />}
            </FormLayout.Questions>
        </div>
    );
};
