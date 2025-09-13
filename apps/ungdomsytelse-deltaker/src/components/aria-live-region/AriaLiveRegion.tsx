interface Props {
    visible: boolean;
    politeness?: 'polite' | 'assertive' | 'off';
    children: React.ReactNode;
}

const offScreenStyle: React.CSSProperties = {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: '1px',
    margin: '-1px',
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    width: '1px',
    left: -9999,
};

const AriaLiveRegion = ({ visible, politeness = 'off', children }: Props) => (
    <div aria-live={politeness} style={!visible ? offScreenStyle : undefined}>
        {visible ? children : null}
    </div>
);

export default AriaLiveRegion;
