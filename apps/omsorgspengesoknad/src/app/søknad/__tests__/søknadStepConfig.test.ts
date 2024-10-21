import { vi } from 'vitest';
import { BarnSammeAdresse } from '../../types/BarnSammeAdresse';
import { RegistrertBarn } from '../../types/RegistrertBarn';
import { SøkersRelasjonTilBarnet } from '../../types/SøkersRelasjonTilBarnet';
import { OmBarnetSøknadsdata } from '../../types/søknadsdata/Søknadsdata';
import { includeDeltBostedStep } from '../søknadStepConfig';

const registrertBarn: RegistrertBarn = {
    aktørId: '123',
    etternavn: 'B',
    fornavn: 'A',
    fødselsdato: new Date(),
};

vi.mock('@navikt/sif-common-env', () => {
    return { getRequiredEnv: () => '', getCommonEnv: () => ({}), getEnv: () => '' };
});

describe('søknadStepConfig', () => {
    describe('includeDeltBostedStep', () => {
        describe('ved valg av registrert barn', () => {
            const omBarnet: OmBarnetSøknadsdata = {
                type: 'registrertBarn',
                registrertBarn,
                sammeAdresse: BarnSammeAdresse.JA,
                kroniskEllerFunksjonshemming: true,
            };
            it('inkluderer delt fast bosted når bruker bor på en annen andresse', () => {
                const result = includeDeltBostedStep({ ...omBarnet, sammeAdresse: BarnSammeAdresse.JA_DELT_BOSTED });
                expect(result).toBeTruthy();
            });
            it('inkluderer IKKE delt fast bosted når bruker bor på samme andresse', () => {
                const result = includeDeltBostedStep({ ...omBarnet, sammeAdresse: BarnSammeAdresse.JA });
                expect(result).toBeFalsy();
            });
        });
        describe('ved valg av annet barn', () => {
            const omBarnet: OmBarnetSøknadsdata = {
                type: 'annetBarn',
                barnetsFødselsnummer: '123',
                barnetsFødselsdato: '05.02.2020',
                barnetsNavn: 'A',
                søkersRelasjonTilBarnet: SøkersRelasjonTilBarnet.ADOPTIVFORELDER,
                søknadenGjelderEtAnnetBarn: true,
                sammeAdresse: BarnSammeAdresse.JA,
                kroniskEllerFunksjonshemming: true,
            };
            it('inkluderer delt fast bosted når bruker ikke bor på en annen andresse', () => {
                const result = includeDeltBostedStep({ ...omBarnet, sammeAdresse: BarnSammeAdresse.JA_DELT_BOSTED });
                expect(result).toBeTruthy();
            });
            it('inkluderer IKKE delt fast bosted dersom brukers relasjon er fosterforelder, uavhengig av samme adresse', () => {
                expect(
                    includeDeltBostedStep({
                        ...omBarnet,
                        sammeAdresse: BarnSammeAdresse.JA,
                        søkersRelasjonTilBarnet: SøkersRelasjonTilBarnet.FOSTERFORELDER,
                    }),
                ).toBeFalsy();
                expect(
                    includeDeltBostedStep({
                        ...omBarnet,
                        sammeAdresse: BarnSammeAdresse.JA_DELT_BOSTED,
                        søkersRelasjonTilBarnet: SøkersRelasjonTilBarnet.FOSTERFORELDER,
                    }),
                ).toBeFalsy();
            });
            it('inkluderer IKKE delt fast bosted når bruker bor på samme andresse', () => {
                const result = includeDeltBostedStep({ ...omBarnet });
                expect(result).toBeFalsy();
            });
            it('inkluderer IKKE delt fast bosted når bruker bor på samme andresse - og er ikke fosterforelder', () => {
                expect(
                    includeDeltBostedStep({
                        ...omBarnet,
                        søkersRelasjonTilBarnet: SøkersRelasjonTilBarnet.ADOPTIVFORELDER,
                    }),
                ).toBeFalsy();
                expect(
                    includeDeltBostedStep({
                        ...omBarnet,
                        søkersRelasjonTilBarnet: SøkersRelasjonTilBarnet.FAR,
                    }),
                ).toBeFalsy();
                expect(
                    includeDeltBostedStep({
                        ...omBarnet,
                        søkersRelasjonTilBarnet: SøkersRelasjonTilBarnet.MOR,
                    }),
                ).toBeFalsy();
            });
        });
    });
});
