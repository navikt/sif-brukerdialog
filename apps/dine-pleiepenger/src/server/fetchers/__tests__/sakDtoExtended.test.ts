import sakMedEttersendelse from '../../../../mock/data/to-saker/1001F8G/sak.json';
import { SakDtoExtended, zSakDtoExtended } from '../sakDtoExtended';

const finnInnsendelse = (sak: SakDtoExtended, innsendelsestype: string) =>
    sak.behandlinger.flatMap((b) => b.innsendelser).find((i) => i.innsendelsestype === innsendelsestype);

describe('zSakDtoExtended', () => {
    it('godtar ettersendelse med ytelse som streng', () => {
        const sak = zSakDtoExtended.parse(sakMedEttersendelse);

        expect(finnInnsendelse(sak, 'ETTERSENDELSE')?.k9FormatInnsendelse?.ytelse).toBe('PLEIEPENGER_SYKT_BARN');
    });

    it('fjerner ukjente felt fra ytelse på søknad', () => {
        const sak = zSakDtoExtended.parse(sakMedEttersendelse);

        const ytelse = finnInnsendelse(sak, 'SØKNAD')?.k9FormatInnsendelse?.ytelse;
        expect(typeof ytelse).toBe('object');
        expect(Object.keys(ytelse as object).sort()).toEqual(['arbeidstid', 'type']);
    });
});
