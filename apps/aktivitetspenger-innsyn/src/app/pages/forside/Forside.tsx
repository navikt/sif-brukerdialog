import { Søker } from '@sif/api';

interface Props {
    oppgaver: any[];
    søker: Søker;
}

export const InnsynForside = ({ oppgaver, søker }: Props) => {
    return (
        <div>
            Hei {søker.fornavn} - Du har {oppgaver.length} oppgaver.
        </div>
    );
};
