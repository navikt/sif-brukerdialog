interface Props {
    visible: boolean;
    politeness?: 'polite' | 'assertive' | 'off';
    children: React.ReactNode;
}

const AriaLiveRegion = ({ visible, politeness = 'off', children }: Props) => (
    <div aria-live={politeness}>{visible ? children : null}</div>
);

export default AriaLiveRegion;
