import { Heading, HeadingProps, HelpText, HStack, VStack } from '@navikt/ds-react';
import { dateFormatter, formatName } from '@navikt/sif-common-utils';
import { RegistrertBarn } from '@sif/api/k9-prosessering';
import { SifRadioGroup, SifRadioProp } from '@sif/rhf';
import { SifInfoCard } from '@sif/soknad-ui';
import { useMemo } from 'react';
import { FieldValues, Path } from 'react-hook-form';

import { SifSoknadFormsText, useSifSoknadFormsIntl } from '../../i18n';

export const ANNET_BARN = 'annetBarn';

interface Props<T extends FieldValues> {
    name: Path<T>;
    registrerteBarn: RegistrertBarn[];
    label?: string;
    headingProps?: Pick<HeadingProps, 'size' | 'level'>;
    inkluderAnnetBarn?: boolean;
    annetBarnLabel?: string;
    validate?: (value: string) => string | undefined;
}

export function VelgRegistrertBarnPanel<T extends FieldValues>({
    name,
    registrerteBarn,
    label,
    headingProps = { level: '3', size: 'xsmall' },
    inkluderAnnetBarn,
    annetBarnLabel,
    validate,
}: Props<T>) {
    const { text } = useSifSoknadFormsIntl();

    const radios = useMemo<SifRadioProp[]>(() => {
        const options: SifRadioProp[] = registrerteBarn.map((barn) => ({
            value: barn.aktørId,
            label: (
                <VStack gap="space-4">
                    <span>{formatName(barn.fornavn, barn.etternavn, barn.mellomnavn)}</span>
                    <span>
                        <SifSoknadFormsText
                            id="@sifSoknadForms.velgRegistrertBarn.født"
                            values={{ dato: dateFormatter.compact(barn.fødselsdato) }}
                        />
                    </span>
                </VStack>
            ),
        }));

        if (inkluderAnnetBarn) {
            options.push({
                value: ANNET_BARN,
                label: annetBarnLabel ?? text('@sifSoknadForms.velgRegistrertBarn.gjelderAnnetBarn'),
            });
        }

        return options;
    }, [registrerteBarn, inkluderAnnetBarn, annetBarnLabel, text]);

    const legend = (
        <HStack gap="space-8">
            <Heading {...headingProps}>{label ?? text('@sifSoknadForms.velgRegistrertBarn.legend')}</Heading>
            <HelpText title={text('@sifSoknadForms.velgRegistrertBarn.kildeInfo.helpTextTooltip')}>
                <SifSoknadFormsText id="@sifSoknadForms.velgRegistrertBarn.kildeInfo.kilde" />
            </HelpText>
        </HStack>
    );
    if (registrerteBarn.length === 0) {
        return (
            <SifInfoCard>
                <SifSoknadFormsText id="@sifSoknadForms.velgRegistrertBarn.ingenBarn" />
            </SifInfoCard>
        );
    }

    return <SifRadioGroup<T> name={name} legend={legend} radios={radios} validate={validate} />;
}
