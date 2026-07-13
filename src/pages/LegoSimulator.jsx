import TopNav from "../components/TopNav";

export default function LegoSimulator() {
  return (
    <div style={{ minHeight: '100vh', background: '#111' }}>
      <TopNav />
      <div style={{ padding: '20px' }}>
        <iframe
          src="https://fll-pigeons.github.io/gamechangers/simulator/public/index.html"
          style={{
            width: '100%',
            height: '700px',
            border: 'none',
            borderRadius: '12px',
          }}
          title="Lego EV3 Simulator"
          allow="*"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
      </div>
    </div>
  );
}