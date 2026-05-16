import dynamic from "next/dynamic";
import { Reveal } from "@/components/Reveal";
import CognitionOrb from "@/components/CognitionOrb";

const NeuralGalaxy = dynamic(() => import("@/components/NeuralGalaxy"), { ssr: false });
const TokenRiver = dynamic(() => import("@/components/TokenRiver"), { ssr: false });

// ─────────────────────────────────────────────────────────────────────────────
// CONTENT
// ─────────────────────────────────────────────────────────────────────────────

const BOOK_ERAS = [
  { year: "-3000",  title: "Cuneiform Tablets",      sub: "Sumer",       body: "Knowledge first leaves the body. Memory becomes external, durable, and inheritable." },
  { year: "-300",   title: "Library of Alexandria",  sub: "Ptolemaic Egypt", body: "A civilization tries to gather all of human writing under one roof. The dream of a total archive begins." },
  { year: "1450",   title: "The Printing Press",     sub: "Mainz",       body: "Books decouple from scribes. Copies become cheap; ideas become viral. The Reformation, the Renaissance, modern science." },
  { year: "1543",   title: "Scientific Revolution",  sub: "Copernicus, Galileo, Newton", body: "Knowledge organizes itself around shared method, peer reproducibility, and mathematical law." },
  { year: "1751",   title: "The Encyclopédie",       sub: "Diderot & d'Alembert", body: "An attempt to compress all human knowledge into a single ordered system — the first encyclopedia as worldview." },
  { year: "1869",   title: "Public Schooling",       sub: "Industrial era", body: "Mass literacy becomes infrastructure. The book becomes the unit of education, of citizenship, of progress." },
  { year: "1991",   title: "World Wide Web",         sub: "CERN",        body: "The book's monopoly ends. Information becomes hypertext, fluid, distributed, infinite — and unsorted." },
  { year: "2017",   title: "Attention Is All You Need", sub: "Transformer paper", body: "The architecture that will compress most of human writing into a few billion parameters arrives, quietly, in a Google research lab." },
  { year: "2023",   title: "Large Language Models",  sub: "GPT, Claude, Gemini", body: "For the first time, a machine has read approximately everything. The book era has a successor." },
];

const COMPRESSION_PHASES = [
  { label: "INGEST",       glyph: "▦", text: "Books, papers, code, conversations, images, video — every modality of human expression is converted into tokens." },
  { label: "EMBED",        glyph: "◈", text: "Each token is mapped into a high-dimensional space where meaning becomes geometry. Similar things sit near each other." },
  { label: "COMPRESS",     glyph: "✦", text: "Attention layers find which symbols matter for which. The model learns the shape of how humans connect ideas." },
  { label: "GENERALIZE",   glyph: "◯", text: "The model interpolates across the latent manifold. It produces things no human wrote, in voices no one used." },
  { label: "RECALL",       glyph: "⇌", text: "Knowledge becomes queryable in natural language. The library answers back." },
];

const LAYERS = [
  {
    n: "01",
    name: "Information",
    cn: "信息层",
    color: "photon",
    status: "AI SURPASSES HUMANS",
    body: "Retrieval, summarization, recall across millions of pages. There is no contest. The book as information container is being absorbed into models.",
  },
  {
    n: "02",
    name: "Understanding",
    cn: "理解层",
    color: "photon-2",
    status: "AI IMITATES UNDERSTANDING",
    body: "Models can paraphrase, explain, compare. But understanding is not just recombination — it is the felt sense of how an idea changes you. That part remains.",
  },
  {
    n: "03",
    name: "Judgment",
    cn: "判断层",
    color: "latent",
    status: "HUMAN-LED",
    body: "Civilizations are not built from facts but from priorities. What matters, what is beautiful, what is just, what is worth pursuing — these are not predictions. They are choices.",
  },
  {
    n: "04",
    name: "Civilization",
    cn: "文明层",
    color: "ember",
    status: "DIRECTED BY HUMANS",
    body: "Ideas shape institutions; institutions shape behavior; behavior shapes the future. Reading is one of the few private acts where the direction of civilization is still being voted on.",
  },
  {
    n: "05",
    name: "Consciousness",
    cn: "意识层",
    color: "rose",
    status: "INACCESSIBLE TO MODELS",
    body: "A book is consciousness in storage — a mind preserved across time, addressed to another mind in the future. To read deeply is to let a stranger think inside you. No model can do this for you.",
  },
];

const MANIFESTO = [
  "AI will read every book.",
  "Only humans decide civilization's direction.",
  "",
  "The most important skill of the future",
  "is not memorizing knowledge.",
  "It is constructing a worldview.",
  "",
  "AI is the compression layer of civilization.",
  "Humans remain the direction layer.",
];

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function Page() {
  return (
    <main className="relative">
      <TopHud />

      {/* HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen overflow-hidden">
        <NeuralGalaxy />
        {/* Vignette */}
        <div className="absolute inset-0 -z-[5] pointer-events-none"
             style={{ background: "radial-gradient(ellipse 80% 60% at 50% 45%, transparent 0%, rgba(4,6,17,0.7) 80%)" }} />

        <div className="relative max-w-[1320px] mx-auto px-6 sm:px-10 pt-40 sm:pt-48 pb-32">
          <div className="flex items-center gap-3 mb-10">
            <span className="eyebrow">Field Note · 01 / V</span>
            <span className="hidden sm:block w-12 h-px bg-white/15" />
            <span className="eyebrow text-photon">Civilization Research Lab</span>
          </div>

          <h1 className="display text-[clamp(2.6rem,7.6vw,7.2rem)] max-w-[18ch]">
            AI has already read{" "}
            <span className="display-italic text-photon-2">every book.</span>
            <br />
            But it cannot{" "}
            <span className="display-italic text-ember">think</span>{" "}
            for you.
          </h1>

          <div className="mt-10 max-w-2xl text-text-2 text-lg sm:text-xl leading-relaxed font-light">
            In the past, reading was information acquisition.<br />
            In the future, reading becomes <span className="text-photon">cognitive architecture</span> —
            the slow building of a mind that can hold the world.
          </div>

          <div className="mt-16 flex items-center gap-6 text-sm font-mono text-muted">
            <ScrollCue />
            <span className="hidden sm:inline">Five sections · one question · forty minutes of reading</span>
          </div>
        </div>

        {/* Floating quote panel */}
        <div className="absolute right-6 sm:right-10 bottom-10 max-w-sm glass card-edge rounded-sm p-5 hidden md:block">
          <div className="eyebrow text-photon mb-2">Marginalia</div>
          <p className="display-italic text-text-2 text-lg leading-snug">
            &ldquo;Knowledge used to live in books.<br/>
            Now it increasingly lives inside models.&rdquo;
          </p>
        </div>
      </section>

      {/* SECTION 1 — THE AGE OF BOOKS ────────────────────────────────────── */}
      <section className="relative py-32 sm:py-44">
        <SectionHead n="I" eyebrow="The previous era" title="The Age of Books" cn="书的时代" />
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <Reveal>
            <p className="display text-[clamp(1.8rem,3.6vw,3rem)] max-w-[22ch] leading-[1.05] text-text">
              For five thousand years, civilization compressed itself{" "}
              <span className="display-italic text-photon-2">into books.</span>
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-2xl text-text-2 text-lg leading-relaxed font-light">
              The book is not just a container of words. It is the format in which a civilization
              negotiates with its future selves — a quiet bet that something said today will still
              be worth hearing in two hundred years. Every leap forward — Alexandria, Gutenberg,
              Newton, the Encyclopédie — was a refactor of this format.
            </p>
          </Reveal>

          {/* Timeline rail */}
          <div className="relative mt-24 sm:mt-32">
            <div className="absolute left-0 right-0 top-[42px] aurora-line" />
            <ol className="grid grid-cols-[repeat(9,minmax(180px,1fr))] sm:grid-cols-9 overflow-x-auto sm:overflow-visible gap-x-6 pb-6 -mx-6 sm:mx-0 px-6 sm:px-0">
              {BOOK_ERAS.map((era, idx) => (
                <li key={era.title} className="relative">
                  <div className="flex flex-col items-start">
                    <div className="font-mono text-xs text-photon tracking-[0.16em]">{era.year}</div>
                    <div className="mt-6 w-3 h-3 rounded-full bg-photon shadow-[0_0_18px_2px_rgba(125,211,252,0.6)] -translate-y-[2px]" />
                    <h3 className="mt-4 display text-xl text-text leading-tight">{era.title}</h3>
                    <div className="mt-1 text-[10px] uppercase tracking-widest text-muted">{era.sub}</div>
                    <p className="mt-3 text-sm text-text-2 leading-relaxed font-light max-w-[24ch]">{era.body}</p>
                  </div>
                  {idx < BOOK_ERAS.length - 1 && (
                    <div className="hidden sm:block absolute -right-3 top-[40px] text-photon/50">→</div>
                  )}
                </li>
              ))}
            </ol>
          </div>

          <Reveal>
            <div className="mt-32 max-w-3xl">
              <div className="eyebrow text-ember mb-3">Core idea</div>
              <p className="display text-[clamp(1.4rem,2.6vw,2.2rem)] leading-[1.15]">
                Books were humanity&apos;s knowledge compression format —{" "}
                <span className="display-italic text-ember-2">a deal we made with time</span>{" "}
                to keep the best of us legible to the future.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTION 2 — WHY AI CHANGED EVERYTHING ────────────────────────────── */}
      <section className="relative py-32 sm:py-44 overflow-hidden">
        <SectionHead n="II" eyebrow="The new compression" title="Why AI Changed Everything" cn="模型时代" />

        <div className="relative max-w-[1320px] mx-auto px-6 sm:px-10">
          <Reveal>
            <p className="display text-[clamp(1.8rem,3.6vw,3rem)] max-w-[24ch] leading-[1.05]">
              A language model is not a chatbot.<br/>
              It is a{" "}
              <span className="display-italic text-latent-2">civilization-scale knowledge compressor.</span>
            </p>
          </Reveal>

          {/* Token river panel */}
          <Reveal delay={0.1}>
            <div className="relative mt-16 h-[260px] sm:h-[320px] glass rounded-sm overflow-hidden scanline">
              <TokenRiver />
              <div className="absolute inset-0 pointer-events-none"
                   style={{ background: "linear-gradient(90deg, #040611 0%, transparent 10%, transparent 88%, #040611 100%)" }} />
              <div className="absolute top-3 left-4 flex items-center gap-3 text-[10px] font-mono tracking-[0.22em] text-muted uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-photon animate-pulse-soft"/>
                Token Stream · Ingest → Embed → Generalize
              </div>
              <div className="absolute bottom-3 right-4 text-[10px] font-mono tracking-[0.22em] text-dim uppercase">
                latent dim 4096 · ctx 200k · vocab 128k
              </div>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 mt-24">
            <Reveal>
              <ol className="space-y-8 max-w-xl">
                {COMPRESSION_PHASES.map((p) => (
                  <li key={p.label} className="grid grid-cols-[44px_1fr] gap-6 items-start">
                    <div className="text-3xl text-latent-2 leading-none mt-1">{p.glyph}</div>
                    <div>
                      <div className="eyebrow text-photon">{p.label}</div>
                      <p className="mt-2 text-text-2 leading-relaxed font-light">{p.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={0.1}>
              <figure className="relative glass-strong rounded-sm p-10 sm:p-12 card-edge">
                <div className="absolute inset-0 -z-[1] opacity-50 pointer-events-none"
                     style={{ background: "radial-gradient(circle at 70% 30%, rgba(167,139,250,0.25), transparent 60%)" }} />
                <div className="eyebrow text-latent mb-6">Q-1.0 · Compression Hypothesis</div>
                <blockquote className="display text-[clamp(1.5rem,2.4vw,2.1rem)] leading-[1.15]">
                  &ldquo;Knowledge used to live in books.<br/>
                  Now it increasingly lives{" "}
                  <span className="display-italic text-photon-2">inside models.</span>&rdquo;
                </blockquote>
                <div className="mt-8 hairline" />
                <div className="mt-6 grid grid-cols-3 gap-4 text-xs font-mono">
                  <Stat label="Books read by GPT-4-class" value="~ all of them" />
                  <Stat label="Parameters" value="10¹¹ – 10¹²" />
                  <Stat label="Per-human reading rate" value="~500 books / life" />
                </div>
              </figure>
            </Reveal>
          </div>

          <Reveal>
            <p className="mt-24 max-w-3xl text-text-2 text-lg leading-relaxed font-light">
              For most of history, the bottleneck of civilization was{" "}
              <span className="link-u text-text">access to text</span>. That bottleneck is closing.
              What remains is the older, harder question:{" "}
              <span className="display-italic text-text">what is the text for?</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* SECTION 3 — WHY AI CANNOT REPLACE REAL READING ───────────────────── */}
      <section className="relative py-32 sm:py-44">
        <SectionHead n="III" eyebrow="The philosophical core" title="Why AI Cannot Replace Real Reading" cn="阅读不可被替代" />

        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <Reveal>
            <p className="display text-[clamp(1.9rem,3.8vw,3.2rem)] max-w-[24ch] leading-[1.05]">
              The real purpose of reading is not changing{" "}
              <span className="display-italic">what you know.</span><br/>
              It is changing{" "}
              <span className="display-italic text-ember-2">what your mind becomes.</span>
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-10 max-w-2xl text-text-2 text-lg leading-relaxed font-light">
              A summary tells you what a book said. Reading lets the book restructure you.
              Those are different operations on different objects. AI is excellent at the first.
              Civilization runs on the second.
            </p>
          </Reveal>

          {/* Layered framework */}
          <div className="mt-24 space-y-px">
            {LAYERS.map((l, idx) => (
              <Reveal key={l.n} delay={idx * 0.04}>
                <LayerRow {...l} />
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-32 grid lg:grid-cols-3 gap-px bg-line/40">
              <FrameCard
                title="Worldview"
                cn="世界观"
                body="A worldview is not a list of facts. It is the shape your facts hang on. Slowly built, hard to copy, irreplaceable."
              />
              <FrameCard
                title="Judgment"
                cn="判断力"
                body="Judgment is taste under uncertainty. It cannot be downloaded. It has to be earned, slowly, against the world."
              />
              <FrameCard
                title="Consciousness"
                cn="意识"
                body="Reading is the strange technology of one consciousness reaching into another across centuries. No model is on the other end."
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTION 4 — THE FUTURE OF LEARNING ────────────────────────────────── */}
      <section className="relative py-32 sm:py-44 overflow-hidden">
        <SectionHead n="IV" eyebrow="The hybrid stack" title="The Future of Learning" cn="学习的未来" />

        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <p className="display text-[clamp(1.7rem,3vw,2.6rem)] max-w-[22ch] leading-[1.1]">
                The new operating system of cognition is{" "}
                <span className="display-italic text-photon-2">not human, and not machine.</span>{" "}
                It is the loop between them.
              </p>
              <p className="mt-8 max-w-xl text-text-2 leading-relaxed font-light">
                Future learners will not memorize. They will assemble. AI handles compression,
                retrieval, simulation. Humans handle direction, taste, meaning. The work of
                a mind shifts from <em>knowing</em> to <em>composing</em>.
              </p>

              <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-px bg-line/40 max-w-xl">
                <WorldCard
                  era="OLD WORLD"
                  glyph="◐"
                  ops={["Search", "Read", "Organize", "Think"]}
                  formula="Human"
                  tone="muted"
                />
                <WorldCard
                  era="NEW WORLD"
                  glyph="◑"
                  ops={["Explore", "Model", "Judge", "Create"]}
                  formula="Human + AI"
                  tone="bright"
                />
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <CognitionOrb />
              <div className="mt-6 text-center eyebrow text-muted">
                Cognition Loop · v∞ · human at the center
              </div>
            </Reveal>
          </div>

          {/* Capability strip */}
          <Reveal>
            <div className="mt-32 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-line/40">
              <CapCard title="AI tutors" body="Personalized instruction at zero marginal cost, available to every student on earth."/>
              <CapCard title="Memory externalization" body="A second brain that doesn't forget — search across your own thinking as a first-class operation."/>
              <CapCard title="Autonomous agents" body="Long-running cognitive workers that pursue your goals while you sleep."/>
              <CapCard title="Civilization reasoning" body="Models that hold the whole policy debate in working memory and stress-test arguments at scale."/>
            </div>
          </Reveal>
        </div>
      </section>

      {/* MANIFESTO ────────────────────────────────────────────────────────── */}
      <section className="relative py-40 sm:py-56 overflow-hidden">
        {/* big radial glow */}
        <div className="absolute inset-0 -z-[1] pointer-events-none"
             style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(251,191,36,0.10), transparent 60%), radial-gradient(ellipse 50% 50% at 50% 10%, rgba(167,139,250,0.18), transparent 60%)" }} />

        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 text-center">
          <div className="eyebrow text-ember-2 mb-10">Civilization Manifesto · §V</div>

          <div className="space-y-3">
            {MANIFESTO.map((line, i) => (
              <Reveal key={i} delay={i * 0.06} y={36}>
                {line === "" ? (
                  <div className="h-10 sm:h-12" />
                ) : (
                  <p className={
                    "display text-[clamp(1.4rem,4.5vw,3.6rem)] leading-[1.05] " +
                    (i === 0 || i === 1 ? "text-text" : "") +
                    (i === 3 || i === 4 || i === 5 ? " text-text-2" : "") +
                    (i === 7 || i === 8 ? " display-italic text-photon-2" : "")
                  }>{line}</p>
                )}
              </Reveal>
            ))}
          </div>

          <div className="mt-28 mx-auto max-w-3xl">
            <div className="aurora-line" />
            <Reveal>
              <p className="mt-12 display text-[clamp(1.6rem,3.6vw,2.8rem)] leading-[1.1]">
                The Age of Information is{" "}
                <span className="display-italic text-muted">ending.</span><br/>
                The Age of{" "}
                <span className="display-italic text-ember-2">Cognitive Architecture</span>{" "}
                has begun.
              </p>
            </Reveal>
            <div className="mt-12 aurora-line" />
          </div>

          <Reveal>
            <p className="mt-16 font-mono text-xs tracking-[0.24em] uppercase text-muted">
              transmitted from a future that still reads
            </p>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SUBCOMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function TopHud() {
  return (
    <header className="fixed top-0 inset-x-0 z-30 pointer-events-none">
      <div className="max-w-[1320px] mx-auto px-6 sm:px-10 pt-5 flex items-center justify-between text-[10px] font-mono tracking-[0.22em] uppercase text-muted">
        <div className="flex items-center gap-3 pointer-events-auto">
          <span className="w-1.5 h-1.5 rounded-full bg-verdant animate-pulse-soft" />
          <span>Civilization Research Lab</span>
          <span className="hidden sm:inline text-dim">·</span>
          <span className="hidden sm:inline">Field Note 01 / V</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 pointer-events-auto">
          <span className="text-dim">EN</span>
          <span className="text-text-2">·</span>
          <span className="zh text-dim">阅读的未来</span>
        </div>
      </div>
    </header>
  );
}

function ScrollCue() {
  return (
    <span className="inline-flex items-center gap-2 text-photon">
      <span className="block w-px h-10 bg-gradient-to-b from-transparent via-photon to-transparent animate-pulse-soft" />
      <span className="font-mono text-[10px] tracking-[0.3em] uppercase">scroll to descend</span>
    </span>
  );
}

function SectionHead({ n, eyebrow, title, cn }: { n: string; eyebrow: string; title: string; cn: string }) {
  return (
    <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
      <div className="grid lg:grid-cols-[260px_1fr] gap-10 mb-16">
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <span className="plate">SECTION</span>
            <span className="display text-photon-2 text-3xl leading-none">{n}</span>
          </div>
          <div className="mt-4 w-12 h-px bg-photon/40" />
          <div className="mt-4 eyebrow">{eyebrow}</div>
        </div>
        <div>
          <h2 className="display text-[clamp(2.2rem,5.2vw,4.4rem)] leading-[0.98] text-text">
            {title}
          </h2>
          <div className="mt-3 zh text-muted text-lg tracking-wider">{cn}</div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-dim uppercase tracking-[0.18em] text-[9px]">{label}</div>
      <div className="mt-1 text-text">{value}</div>
    </div>
  );
}

function LayerRow({ n, name, cn, color, status, body }:
  { n: string; name: string; cn: string; color: string; status: string; body: string }) {
  // map dynamic color tokens to actual classes
  const dot: Record<string, string> = {
    "photon":   "bg-photon shadow-[0_0_24px_3px_rgba(125,211,252,0.6)]",
    "photon-2": "bg-photon-2 shadow-[0_0_24px_3px_rgba(186,230,253,0.6)]",
    "latent":   "bg-latent shadow-[0_0_24px_3px_rgba(167,139,250,0.6)]",
    "ember":    "bg-ember shadow-[0_0_24px_3px_rgba(251,191,36,0.55)]",
    "rose":     "bg-rose shadow-[0_0_24px_3px_rgba(251,113,133,0.55)]",
  };
  return (
    <div className="grid grid-cols-[72px_1fr_minmax(220px,30%)] gap-6 sm:gap-12 py-10 border-t border-line">
      <div>
        <div className="font-mono text-xs text-muted">{n}</div>
        <div className={"mt-3 w-2.5 h-2.5 rounded-full " + (dot[color] || "bg-text")} />
      </div>
      <div>
        <h3 className="display text-[clamp(1.6rem,3.2vw,2.6rem)] leading-tight">
          {name} <span className="zh text-muted text-2xl ml-2">{cn}</span>
        </h3>
        <p className="mt-4 max-w-xl text-text-2 leading-relaxed font-light text-lg">{body}</p>
      </div>
      <div className="flex sm:items-start sm:justify-end">
        <div className="glass rounded-sm px-3 py-2 inline-flex items-center gap-2 self-start">
          <span className={"w-1.5 h-1.5 rounded-full " + (dot[color] || "bg-text")}/>
          <span className="font-mono text-[10px] tracking-[0.22em] text-text-2 uppercase">{status}</span>
        </div>
      </div>
    </div>
  );
}

function FrameCard({ title, cn, body }: { title: string; cn: string; body: string }) {
  return (
    <div className="bg-void p-10 card-edge rounded-none">
      <div className="eyebrow">Frame</div>
      <h4 className="mt-4 display text-3xl">
        {title} <span className="zh text-muted text-xl ml-2">{cn}</span>
      </h4>
      <p className="mt-4 text-text-2 leading-relaxed font-light">{body}</p>
    </div>
  );
}

function WorldCard({ era, glyph, ops, formula, tone }:
  { era: string; glyph: string; ops: string[]; formula: string; tone: "muted" | "bright" }) {
  return (
    <div className={"bg-void p-8 card-edge " + (tone === "bright" ? "" : "opacity-90")}>
      <div className="flex items-center justify-between">
        <span className={"eyebrow " + (tone === "bright" ? "text-photon" : "text-muted")}>{era}</span>
        <span className={"text-2xl " + (tone === "bright" ? "text-photon-2" : "text-muted")}>{glyph}</span>
      </div>
      <div className={"mt-6 display text-2xl " + (tone === "bright" ? "text-text" : "text-text-2")}>
        {formula}
      </div>
      <ul className="mt-4 space-y-1.5 font-mono text-sm">
        {ops.map((op, i) => (
          <li key={op} className={(tone === "bright" ? "text-text" : "text-muted")}>
            <span className="text-dim mr-2">{String(i + 1).padStart(2, "0")}</span>{op}
          </li>
        ))}
      </ul>
    </div>
  );
}

function CapCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="bg-void p-8 card-edge">
      <div className="display text-xl text-text">{title}</div>
      <p className="mt-3 text-sm text-text-2 leading-relaxed font-light">{body}</p>
    </div>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-line/60 mt-10">
      <div className="max-w-[1320px] mx-auto px-6 sm:px-10 py-14 grid sm:grid-cols-[1fr_auto] gap-6 items-end">
        <div>
          <div className="eyebrow">end of transmission</div>
          <div className="mt-3 display text-2xl text-text">Read carefully. <span className="display-italic text-muted">The future is reading you back.</span></div>
        </div>
        <div className="text-right font-mono text-xs text-muted tracking-[0.18em] uppercase">
          A field note from <a className="link-u text-text" href="https://psyverse.fun">Psyverse</a><br/>
          by Gewenbo · MMXXVI
        </div>
      </div>
    </footer>
  );
}
