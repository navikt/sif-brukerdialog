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

describe('søknadStepConfig', () =>
    describe('includeDeltBostedStep', () => {
        describe('ved valg av registrert barn', () => {
            const omBarnet: OmBarnetSøknadsdata = {
                type: 'registrertBarn',
                registrertBarn,
                sammeAdresse: true,
                kroniskEllerFunksjonshemming: true,
            };
            it('inkluderer delt bosted når bruker bor på en annen andresse', () => {
                const result = includeDeltBostedStep({ ...omBarnet, sammeAdresse: false });
                expect(result).toBeTruthy();
            });
            it('inkluderer IKKE delt bosted når bruker bor på samme andresse', () => {
                const result = includeDeltBostedStep({ ...omBarnet, sammeAdresse: true });
                expect(result).toBeFalsy();
            });
        });
        describe('ved valg av annet barn', () => {
            const omBarnet: OmBarnetSøknadsdata = {
                type: 'annetBarn',
                barnetsFødselsnummer: '123',
                barnetsNavn: 'A',
                søkersRelasjonTilBarnet: SøkersRelasjonTilBarnet.ADOPTIVFORELDER,
                søknadenGjelderEtAnnetBarn: true,
                sammeAdresse: true,
                kroniskEllerFunksjonshemming: true,
            };
            it('inkluderer delt bosted når bruker ikke bor på en annen andresse', () => {
                const result = includeDeltBostedStep({ ...omBarnet, sammeAdresse: false });
                expect(result).toBeTruthy();
            });
            it('inkluderer IKKE delt bosted dersom brukers relasjon er fosterforelder, uavhengig av samme adresse', () => {
                expect(
                    includeDeltBostedStep({
                        ...omBarnet,
                        sammeAdresse: true,
                        søkersRelasjonTilBarnet: SøkersRelasjonTilBarnet.FOSTERFORELDER,
                    })
                ).toBeFalsy();
                expect(
                    includeDeltBostedStep({
                        ...omBarnet,
                        sammeAdresse: false,
                        søkersRelasjonTilBarnet: SøkersRelasjonTilBarnet.FOSTERFORELDER,
                    })
                ).toBeFalsy();
            });
            it('inkluderer IKKE delt bosted når bruker bor på samme andresse', () => {
                const result = includeDeltBostedStep({ ...omBarnet });
                expect(result).toBeFalsy();
            });
            it('inkluderer IKKE delt bosted når bruker bor på samme andresse - og er ikke fosterforelder', () => {
                expect(
                    includeDeltBostedStep({
                        ...omBarnet,
                        søkersRelasjonTilBarnet: SøkersRelasjonTilBarnet.ADOPTIVFORELDER,
                    })
                ).toBeFalsy();
                expect(
                    includeDeltBostedStep({
                        ...omBarnet,
                        søkersRelasjonTilBarnet: SøkersRelasjonTilBarnet.FAR,
                    })
                ).toBeFalsy();
                expect(
                    includeDeltBostedStep({
                        ...omBarnet,
                        søkersRelasjonTilBarnet: SøkersRelasjonTilBarnet.MOR,
                    })
                ).toBeFalsy();
            });
        });
    }));
