import ToDoToggle from './ToDo/ToDoToggle';

interface Props {}

const DevFooter = ({}: Props) => {
    return (
        <div style={{ position: 'fixed', bottom: '1rem', right: '1rem', zIndex: 50 }}>
            <ToDoToggle />
        </div>
    );
};
export default DevFooter;
