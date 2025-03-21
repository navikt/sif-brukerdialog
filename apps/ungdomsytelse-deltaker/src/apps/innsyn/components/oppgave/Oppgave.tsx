import { OppgaveProvider } from './OppgaveContext';

interface Props {
    children: React.ReactNode;
}

const Oppgave = ({ children }: Props) => {
    return <OppgaveProvider>{children}</OppgaveProvider>;
};

export default Oppgave;
