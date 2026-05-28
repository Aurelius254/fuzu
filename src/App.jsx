export default function FuzuLandingPage() {
  return (
    <div className="min-h-screen bg-[#0f1720] text-white font-sans overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#0f1720]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold tracking-tight text-white">
            Fuzu
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-300">
            <a href="#" className="hover:text-white transition">Courses</a>
            <a href="#" className="hover:text-white transition">Pricing</a>
            <button className="bg-white text-black px-5 py-2 rounded-full text-sm font-semibold hover:scale-105 transition-transform">
              Sign in
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="uppercase tracking-[0.3em] text-sm text-[#7dd3fc] mb-6">
              Interactive learning platform
            </p>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8">
              Learn deeply.
              <br />
              Think clearly.
              <br />
              Build confidently.
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed max-w-xl mb-10">
              Fuzu helps learners master math, science, and AI through
              engaging interactive lessons and visual problem solving.
            </p>
            <button className="bg-[#f59e0b] hover:bg-[#fbbf24] text-black px-8 py-4 rounded-full text-lg font-semibold transition-all hover:scale-105 shadow-xl">
              Get Started
            </button>
          </div>

          <div className="relative flex justify-center">
            <div className="absolute w-80 h-80 bg-[#2563eb] blur-[120px] opacity-30 rounded-full"></div>
            <div className="relative bg-[#111827] border border-white/10 rounded-3xl p-8 w-full max-w-md shadow-2xl">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <p className="text-sm text-gray-400">Current Lesson</p>
                  <h3 className="text-xl font-semibold">Introduction to AI</h3>
                </div>
                <div className="bg-[#1e293b] px-3 py-2 rounded-xl text-sm text-[#7dd3fc]">72%</div>
              </div>
              <div className="space-y-4">
                <div className="bg-[#1e293b] p-4 rounded-2xl border border-white/5">
                  <p className="text-sm text-gray-400 mb-2">Question</p>
                  <p className="font-medium">Which model is commonly used for image recognition?</p>
                </div>
                <button className="w-full bg-[#0f1720] border border-white/10 rounded-2xl p-4 text-left hover:border-[#7dd3fc] transition">Neural Networks</button>
                <button className="w-full bg-[#0f1720] border border-white/10 rounded-2xl p-4 text-left hover:border-[#7dd3fc] transition">Sorting Algorithms</button>
                <button className="w-full bg-[#0f1720] border border-white/10 rounded-2xl p-4 text-left hover:border-[#7dd3fc] transition">Linked Lists</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section — bg-[#111827] alternates with hero */}
      <section className="py-24 px-6 bg-[#111827] border-y border-white/5">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-30">
              Learn difficult concepts visually and interactively with guided
              lessons designed for real understanding.
            </h2>
          </div>

          <div className="space-y-32">

            {/* Feature 1 — text left, visual right */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold mb-6">Lessons that actually stick</h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Fuzu doesn't just present information — it walks you through
                  ideas step by step, using visuals and interaction to build
                  real understanding from the ground up.
                </p>
              </div>
              <div className="bg-[#0f1720] border border-white/10 rounded-3xl p-10 flex items-center justify-center min-h-[260px]">
                <div className="grid grid-cols-3 gap-4 w-full max-w-xs">
                  <div className="bg-[#1e293b] rounded-2xl p-4 text-center"><div className="text-2xl mb-2">💡</div><p className="text-xs text-gray-400">Concept</p></div>
                  <div className="bg-[#1e293b] rounded-2xl p-4 text-center"><div className="text-2xl mb-2">✏️</div><p className="text-xs text-gray-400">Practice</p></div>
                  <div className="bg-[#1e293b] rounded-2xl p-4 text-center"><div className="text-2xl mb-2">🏆</div><p className="text-xs text-gray-400">Mastery</p></div>
                </div>
              </div>
            </div>

            {/* Feature 2 — visual left, text right */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="bg-[#0f1720] border border-white/10 rounded-3xl p-10 flex items-center justify-center min-h-[260px] order-last lg:order-first">
                <div className="w-full max-w-xs space-y-3">
                  <div className="bg-[#1e293b] rounded-2xl px-5 py-4 flex items-center justify-between">
                    <span className="text-sm text-gray-300">Current streak</span>
                    <span className="text-[#f59e0b] font-bold text-lg">7 days 🔥</span>
                  </div>
                  <div className="bg-[#1e293b] rounded-2xl px-5 py-4 flex items-center justify-between">
                    <span className="text-sm text-gray-300">Topics completed</span>
                    <span className="text-[#7dd3fc] font-bold text-lg">24</span>
                  </div>
                  <div className="bg-[#1e293b] rounded-2xl px-5 py-4 flex items-center justify-between">
                    <span className="text-sm text-gray-300">Next milestone</span>
                    <span className="text-gray-400 text-sm">3 lessons away</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-3xl md:text-4xl font-bold mb-6">
                  Built around <span className="italic text-[#7dd3fc]">your</span> pace
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Fuzu adapts to where you are. Whether you're revisiting the
                  basics or pushing into advanced territory, the platform meets
                  you exactly where you need to be.
                </p>
              </div>
            </div>

            {/* Feature 3 — text left, visual right */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold mb-6">Designed to keep you moving forward</h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Short focused lessons, instant feedback, and a sense of
                  progress that keeps you coming back — learning that fits into
                  your life, not the other way around.
                </p>
              </div>
              <div className="bg-[#0f1720] border border-white/10 rounded-3xl p-10 flex items-center justify-center min-h-[260px]">
                <div className="w-full max-w-xs">
                  <div className="flex justify-between mb-3">
                    <span className="text-sm text-gray-400">Weekly progress</span>
                    <span className="text-sm text-[#7dd3fc]">68%</span>
                  </div>
                  <div className="w-full bg-[#1e293b] rounded-full h-2 mb-6">
                    <div className="bg-[#7dd3fc] h-2 rounded-full" style={{width: "68%"}}></div>
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {["M","T","W","T","F","S","S"].map((day, i) => (
                      <div key={i} className="flex flex-col items-center gap-1">
                        <div className={`w-7 h-7 rounded-lg text-xs flex items-center justify-center font-medium ${i < 5 ? "bg-[#7dd3fc]/20 text-[#7dd3fc]" : "bg-[#1e293b] text-gray-600"}`}>{day}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Subjects Section — bg-[#0f1720] alternates back */}
      <section className="py-24 px-6 bg-[#0f1720]">
        <div className="max-w-7xl mx-auto text-center">

          <h3 className="text-4xl md:text-5xl font-bold mb-16">
            From childhood classrooms to the endless horizons of learning
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#111827] border border-white/10 rounded-3xl p-8 hover:-translate-y-2 transition-transform shadow-xl">
              <div className="text-5xl mb-6">📐</div>
              <h3 className="text-2xl font-semibold mb-4">Math</h3>
              <p className="text-gray-400 leading-relaxed">
                Build intuition through interactive equations, visual
                explanations, and guided practice.
              </p>
            </div>
            <div className="bg-[#111827] border border-white/10 rounded-3xl p-8 hover:-translate-y-2 transition-transform shadow-xl">
              <div className="text-5xl mb-6">🧪</div>
              <h3 className="text-2xl font-semibold mb-4">Science</h3>
              <p className="text-gray-400 leading-relaxed">
                Explore physics, chemistry, and biology through engaging visual
                lessons.
              </p>
            </div>
            <div className="bg-[#111827] border border-white/10 rounded-3xl p-8 hover:-translate-y-2 transition-transform shadow-xl">
              <div className="text-5xl mb-6">🤖</div>
              <h3 className="text-2xl font-semibold mb-4">AI</h3>
              <p className="text-gray-400 leading-relaxed">
                Learn artificial intelligence concepts from neural networks to
                modern machine learning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA — bg-[#111827] alternates */}
      <section className="py-24 px-6 bg-[#111827] border-y border-white/5">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-[#1e293b] to-[#0f1720] border border-white/10 rounded-[40px] p-12 shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Start learning with Fuzu today.
          </h2>
          <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
            Interactive lessons designed to help you truly understand concepts,
            not just memorize them.
          </p>
          <button className="bg-[#f59e0b] hover:bg-[#fbbf24] text-black px-8 py-4 rounded-full text-lg font-semibold transition-all hover:scale-105">
            Get Started
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#080d13] border-t border-white/10 pt-16 pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-5 gap-12 mb-16">
            <div className="md:col-span-2">
              <div className="text-2xl font-bold text-white mb-4">Fuzu</div>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                An interactive learning platform built to help you master math,
                science, and AI — deeply and visually.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-widest">Product</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">Courses</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">Changelog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-widest">Company</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-widest">Legal</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">© {new Date().getFullYear()} Fuzu. All rights reserved.</p>
            <div className="flex items-center gap-5 text-gray-500">
              <a href="#" className="hover:text-white transition text-sm">Twitter / X</a>
              <a href="#" className="hover:text-white transition text-sm">LinkedIn</a>
              <a href="#" className="hover:text-white transition text-sm">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}