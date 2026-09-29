import { Box, Heading, Tag, VStack } from '@navikt/ds-react';
import { RegistrertBarn } from '@navikt/sif-common-api';
import { VelgBarnEkstrainfo, VelgBarnFormPart } from '@navikt/sif-common-forms-ds';
import { dateFormatter, ISODateToDate } from '@navikt/sif-common-utils';
import { getRequiredFieldValidator } from '@navikt/sif-validation';

import { InnvilgedeVedtak } from '../../../../hooks/useInnvilgedeVedtakForRegistrerteBarn';
import { useAppIntl } from '../../../../i18n';
import { OmBarnetFormFields } from '../OmBarnetStep';

interface Props {
    registrerteBarn: RegistrertBarn[];
    innvilgedeVedtak?: InnvilgedeVedtak;
}

const RegistrertBarnSpørsmål = ({ registrerteBarn, innvilgedeVedtak }: Props) => {
    const { text } = useAppIntl();

    const ekstrainfo: VelgBarnEkstrainfo = {};

    if (innvilgedeVedtak) {
        Object.keys(innvilgedeVedtak).forEach((key) => {
            const vedtak = { ...innvilgedeVedtak[key] };
            if (!vedtak.harInnvilgedeBehandlinger) {
                return;
            }
            ekstrainfo[key] = (
                <Box marginBlock="space-4 space-2">
                    <Tag data-color="brand-blue" size="small">
                        {vedtak.vedtakTomDato
                            ? text('steg.omBarnet.harVedtak.tidsbegrenset', {
                                  dato: dateFormatter.compact(ISODateToDate(vedtak.vedtakTomDato)),
                              })
                            : text('steg.omBarnet.harVedtak.utenTidsbegrensning')}
                    </Tag>
                </Box>
            );
        });
    }

    return (
        <VStack gap="space-16">
            <Heading level="2" size="medium">
                {text('steg.omBarnet.spm.barnetSøknadenGjelder.label')}
            </Heading>
            <VStack gap="space-8">
                <VelgBarnFormPart
                    name={OmBarnetFormFields.barnetSøknadenGjelder}
                    registrerteBarn={registrerteBarn}
                    registrerteBarnEkstrainfo={ekstrainfo}
                    inkluderAnnetBarn={true}
                    validate={getRequiredFieldValidator()}
                />
            </VStack>
        </VStack>
    );
};

export default RegistrertBarnSpørsmål;
