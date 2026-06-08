interface Props {
    orgnr: string;
}

const ariaOrgnummer = (orgnummer: string) => orgnummer.split('').join(' ');

const Organisasjonsnummer = ({ orgnr }: Props) => <span aria-label={ariaOrgnummer(orgnr)}>{orgnr}</span>;

export default Organisasjonsnummer;
