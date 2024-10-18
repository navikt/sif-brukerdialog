import AriaAlternative from '@navikt/sif-common-core-ds/src/atoms/aria-alternative/AriaAlternative';

interface Props {
    fødselsnummer: string;
}

const stringToSpacedCharString = (str: string) => {
    return (str || '').split('').join(' ');
};

const FødselsnummerSvar = ({ fødselsnummer }: Props) => (
    <AriaAlternative ariaText={stringToSpacedCharString(fødselsnummer)} visibleText={fødselsnummer} />
);

export default FødselsnummerSvar;
