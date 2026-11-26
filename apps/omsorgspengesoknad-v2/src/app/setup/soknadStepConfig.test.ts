import { Søker } from '@sif/api/k9-brukerdialog-prosessering';
import { ISODate } from '@sif/utils';
import { describe, expect, it } from 'vitest';

import { BarnSammeAdresse } from '../types/BarnSammeAdresse';
import { SøkersRelasjonTilBarnet } from '../types/SøkersRelasjonTilBarnet';
import { OmBarnetSøknadsdata, Søknadsdata } from '../types/Soknadsdata';
import { SøknadStepId } from '../types/SoknadStepId';
import { søknadsdataToSøknadDTO } from '../utils/soknadsdataToSoknadDTO';
import { søknadStepConfig } from './soknadStepConfig';

const samværsavtale = {
    id: 'vedlegg-1',
    url: '/vedlegg/vedlegg-1',
    backendUrl: 'https://api.example.com/vedlegg/vedlegg-1',
    name: 'samvaersavtale.pdf',
    size: 100,
    type: 'application/pdf',
    lastModified: 1,
};

const annetBarnMedRelasjon = (søkersRelasjonTilBarnet: SøkersRelasjonTilBarnet): OmBarnetSøknadsdata => ({
    type: 'annetBarn',
    barnetsFødselsnummer: '12345678901',
    barnetsFødselsdato: '2018-01-01',
    barnetsNavn: 'Ola Nordmann',
    søkersRelasjonTilBarnet,
    sammeAdresse: BarnSammeAdresse.JA_DELT_BOSTED,
    kroniskEllerFunksjonshemming: false,
});

const søknadsdataMedBarn = (omBarnet: OmBarnetSøknadsdata): Søknadsdata => ({
    [SøknadStepId.OM_BARNET]: omBarnet,
    [SøknadStepId.DELT_BOSTED]: { samværsavtale: [samværsavtale] },
});

const søker = { fødselsnummer: '10987654321' } as Søker;

describe('inkludering av delt bosted', () => {
    it('inkluderer steget for registrerte barn og andre relasjoner enn fosterforelder', () => {
        const registrertBarn: OmBarnetSøknadsdata = {
            type: 'registrertBarn',
            registrertBarn: {
                aktørId: 'barn-123',
                fornavn: 'Ola',
                mellomnavn: undefined,
                etternavn: 'Nordmann',
                fødselsdato: '2018-01-01' as ISODate,
            },
            sammeAdresse: BarnSammeAdresse.JA_DELT_BOSTED,
            kroniskEllerFunksjonshemming: false,
        };
        const omBarnetData = [
            søknadsdataMedBarn(registrertBarn),
            søknadsdataMedBarn(annetBarnMedRelasjon(SøkersRelasjonTilBarnet.MOR)),
        ];

        for (const søknadsdata of omBarnetData) {
            expect(søknadStepConfig[SøknadStepId.DELT_BOSTED].isIncluded?.(søknadsdata)).toBe(true);
        }
    });

    it('utelater steget og samværsavtalen for fosterforelder', () => {
        const søknadsdata = søknadsdataMedBarn(annetBarnMedRelasjon(SøkersRelasjonTilBarnet.FOSTERFORELDER));

        expect(søknadStepConfig[SøknadStepId.DELT_BOSTED].isIncluded?.(søknadsdata)).toBe(false);
        expect(søknadsdataToSøknadDTO({ søker, søknadsdata, språk: 'nb' })?.samværsavtale).toBeUndefined();
    });

    it('sender samværsavtalen når samme inkluderingsregel tillater delt bosted', () => {
        const søknadsdata = søknadsdataMedBarn(annetBarnMedRelasjon(SøkersRelasjonTilBarnet.MOR));

        expect(søknadsdataToSøknadDTO({ søker, søknadsdata, språk: 'nb' })?.samværsavtale).toEqual([
            samværsavtale.backendUrl,
        ]);
    });
});
