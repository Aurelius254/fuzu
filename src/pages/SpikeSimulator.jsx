import TopNav from "../components/TopNav";

export default function SpikeSimulator() {
  return (
    <div style={{ minHeight: '100vh', background: '#111' }}>
      <TopNav />
      <div style={{ padding: '20px' }}>
        <iframe
          src="https://spike.ahardy.za.net/"
          style={{
            width: '100%',
            height: '700px',
            border: 'none',
            borderRadius: '12px',
          }}
          title="Lego Spike Simulator"
          allow="*"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
      </div>
    </div>
  );
}