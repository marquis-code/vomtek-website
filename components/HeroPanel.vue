<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const uid = useId()
const layers = ['power', 'control', 'network'] as const
type Layer = typeof layers[number]

const active = ref<Layer>('control')
const auto = ref(true)
const cardEl = ref<HTMLElement | null>(null)
const tiltX = ref(0)
const tiltY = ref(0)
const hovering = ref(false)
const reduceMotion = ref(false)
let timer: ReturnType<typeof setInterval> | null = null

const cardStyle = computed(() => ({
  transform: `perspective(1400px) rotateX(${tiltX.value}deg) rotateY(${tiltY.value}deg)`,
  transition: hovering.value ? 'transform 120ms linear' : 'transform 700ms var(--ease-out-expo)',
}))

function onPointerMove(event: PointerEvent) {
  if (reduceMotion.value || !cardEl.value || event.pointerType === 'touch') return
  const rect = cardEl.value.getBoundingClientRect()
  const x = (event.clientX - rect.left) / rect.width
  const y = (event.clientY - rect.top) / rect.height
  tiltY.value = (x - 0.5) * 6.5
  tiltX.value = (0.5 - y) * 4.5
  hovering.value = true
  cardEl.value.style.setProperty('--mx', `${x * 100}%`)
  cardEl.value.style.setProperty('--my', `${y * 100}%`)
}

function resetTilt() {
  hovering.value = false
  tiltX.value = 0
  tiltY.value = 0
}

const captions: Record<Layer, { label: string; text: string; code: string }> = {
  power: {
    label: 'Power',
    text: '480V three-phase feed, main disconnect, branch protection, and motor starters sized for the real duty cycle.',
    code: 'PWR-480-3PH',
  },
  control: {
    label: 'Control',
    text: 'PLC, I/O, safety circuits, and HMI designed together and wired to schedule — then tested before freight.',
    code: 'CTL-24VDC',
  },
  network: {
    label: 'Network',
    text: 'Ethernet/IP, Modbus TCP, and SCADA connectivity documented at handover, not discovered at startup.',
    code: 'NET-ETH-IP',
  },
}

function select(layer: Layer) {
  active.value = layer
  auto.value = false
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

onMounted(() => {
  reduceMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduceMotion.value) return
  timer = setInterval(() => {
    if (!auto.value) return
    const next = (layers.indexOf(active.value) + 1) % layers.length
    active.value = layers[next] as Layer
  }, 6000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div class="relative [perspective:1400px]" @pointermove="onPointerMove" @pointerleave="resetTilt">
    <!-- Technical specimen card -->
    <div
      ref="cardEl"
      class="hero-panel-card relative overflow-hidden rounded-[3px] border border-ink/15 bg-ink text-bone shadow-[0_50px_110px_-50px_rgba(10,12,11,0.75)] will-change-transform"
      :style="cardStyle"
    >
      <div class="panel-spotlight pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-500" :class="hovering ? 'opacity-100' : ''" aria-hidden="true" />
      <div class="flex items-center justify-between border-b border-bone/10 px-4 py-2.5">
        <div class="flex items-center gap-2.5 font-mono text-[9px] uppercase tracking-[0.16em] text-bone/65">
          <span class="relative flex size-6 items-center justify-center overflow-hidden border border-bone/20">
            <img src="/images/optimized/control-room-480.jpg" alt="" class="h-full w-full object-cover opacity-70 grayscale" loading="lazy">
            <span class="absolute inset-0 border border-signal/30" aria-hidden="true" />
          </span>
          <span class="hidden 2xl:inline">Assembly elevation</span>
          <span class="hidden text-bone/20 2xl:inline">/</span>
          <span class="text-bone/75">CP-480-04</span>
        </div>
        <div class="hidden items-center gap-2 font-mono text-[8.5px] uppercase tracking-[0.14em] text-bone/50 sm:flex">
          <span>UL 508A</span>
          <span class="text-bone/15">·</span>
          <span>Rev C</span>
        </div>
      </div>

      <div class="relative bg-[radial-gradient(120%_90%_at_50%_0%,#1d2620_0%,#0a0c0b_62%)] px-2 pb-1 pt-3 sm:px-4">
        <div class="absolute inset-0 grid-bg-dark opacity-40" aria-hidden="true" />

        <svg
          viewBox="102 58 436 654"
          class="relative mx-auto h-auto w-full"
          role="img"
          aria-labelledby="panel-title panel-desc"
        >
          <title id="panel-title">Illustrative control panel elevation with power, control, and network layers</title>
          <desc id="panel-desc">A technical front elevation of a UL 508A control panel showing distribution breakers, a PLC, HMI, variable frequency drive, contactors, terminal blocks, and field wiring.</desc>

          <defs>
            <linearGradient :id="`cab-${uid}`" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#334038" />
              <stop offset="42%" stop-color="#1c2621" />
              <stop offset="100%" stop-color="#0c110e" />
            </linearGradient>
            <linearGradient :id="`plate-${uid}`" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#1b2320" />
              <stop offset="100%" stop-color="#101613" />
            </linearGradient>
            <linearGradient :id="`screen-${uid}`" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#10201a" />
              <stop offset="100%" stop-color="#07110d" />
            </linearGradient>
            <linearGradient :id="`sheen-${uid}`" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#ffffff" stop-opacity=".07" />
              <stop offset="45%" stop-color="#ffffff" stop-opacity="0" />
            </linearGradient>
            <filter :id="`glow-${uid}`" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="2.4" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <pattern :id="`hatch-${uid}`" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="6" stroke="#f2efe6" stroke-opacity=".08" stroke-width="1" />
            </pattern>

            <g :id="`breaker-${uid}`">
              <rect x="0" y="0" width="17" height="48" rx="1" fill="#0a0c0b" stroke="#f2efe6" stroke-opacity=".22" />
              <rect x="4" y="4" width="9" height="15" rx="0.5" fill="#f2efe6" fill-opacity=".14" />
              <line x1="6" y1="24" x2="6" y2="31" stroke="#ff4d17" stroke-opacity=".8" stroke-width="1" />
              <line x1="11" y1="24" x2="11" y2="31" stroke="#f2efe6" stroke-opacity=".35" stroke-width="1" />
            </g>
          </defs>

          <!-- cabinet -->
          <g>
            <rect x="113" y="74" width="414" height="630" rx="3" fill="#050706" opacity=".55" />
            <rect x="110" y="70" width="420" height="630" rx="2.5" :fill="`url(#cab-${uid})`" stroke="#f2efe6" stroke-opacity=".38" />
            <rect x="110" y="70" width="420" height="630" rx="2.5" fill="#000" opacity=".12" />
            <g stroke="#f2efe6" stroke-opacity=".05">
              <line v-for="i in 16" :key="'brush' + i" x1="118" :y1="82 + i * 38" x2="522" :y2="82 + i * 38" />
            </g>
            <rect x="115" y="75" width="410" height="620" rx="1.5" fill="none" stroke="#f2efe6" stroke-opacity=".1" />
            <rect x="126" y="86" width="388" height="598" rx="1" fill="none" stroke="#f2efe6" stroke-opacity=".22" />
            <rect x="110" y="70" width="420" height="630" rx="2.5" :fill="`url(#sheen-${uid})`" />

            <!-- hinges + latch -->
            <g fill="none" stroke="#f2efe6" stroke-opacity=".3">
              <circle cx="138" cy="190" r="3.3" />
              <circle cx="138" cy="385" r="3.3" />
              <circle cx="138" cy="580" r="3.3" />
            </g>
            <g>
              <rect x="497" y="352" width="9" height="66" rx="1.5" fill="#0b0f0d" stroke="#f2efe6" stroke-opacity=".28" />
              <circle cx="501.5" cy="368" r="2.4" fill="#ff4d17" />
              <circle cx="501.5" cy="402" r="2.4" fill="#f2efe6" fill-opacity=".3" />
            </g>

            <!-- screws -->
            <g fill="#0a0c0b" stroke="#f2efe6" stroke-opacity=".28">
              <circle cx="120" cy="80" r="2.3" /><circle cx="520" cy="80" r="2.3" />
              <circle cx="120" cy="690" r="2.3" /><circle cx="520" cy="690" r="2.3" />
              <circle cx="140" cy="100" r="1.7" /><circle cx="500" cy="100" r="1.7" />
            </g>
            <g stroke="#ff4d17" stroke-opacity=".55">
              <path d="M118 80 l4 4 M122 80 l-4 4" />
              <path d="M518 690 l4 4 M522 690 l-4 4" />
            </g>

            <!-- internal backplate -->
            <rect x="140" y="100" width="360" height="570" :fill="`url(#plate-${uid})`" stroke="#f2efe6" stroke-opacity=".08" />

            <!-- nameplate -->
            <g>
              <rect x="150" y="108" width="340" height="17" fill="#f2efe6" fill-opacity=".045" stroke="#f2efe6" stroke-opacity=".12" />
              <text x="158" y="119.5" font-family="IBM Plex Mono, monospace" font-size="6.6" letter-spacing="1" fill="#f2efe6" fill-opacity=".72">VOMTEK · CONTROL PANEL · CP-480-04</text>
              <text x="482" y="119.5" text-anchor="end" font-family="IBM Plex Mono, monospace" font-size="6" letter-spacing=".8" fill="#ff4d17">480V / 3Φ</text>
            </g>

            <!-- POWER layer -->
            <g>
              <g :class="active !== 'power' ? 'opacity-30' : 'opacity-100'" class="transition-opacity duration-500">
                <!-- main disconnect -->
                <g>
                  <rect x="150" y="136" width="52" height="58" rx="1" fill="#0a0c0b" stroke="#f2efe6" stroke-opacity=".24" />
                  <rect x="158" y="144" width="36" height="24" rx="0.5" fill="#f2efe6" fill-opacity=".1" />
                  <line x1="164" y1="156" x2="188" y2="156" stroke="#ff4d17" stroke-width="1.4" />
                  <text x="176" y="184" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="5.6" letter-spacing=".6" fill="#f2efe6" fill-opacity=".55">MAIN</text>
                </g>

                <!-- breakers -->
                <g>
                  <use v-for="i in 8" :key="i" :href="`#breaker-${uid}`" :x="150 + 52 + 6 + (i - 1) * 22" y="136" />
                  <text x="476" y="192" text-anchor="end" font-family="IBM Plex Mono, monospace" font-size="5.4" letter-spacing=".7" fill="#f2efe6" fill-opacity=".4">BRANCH 1–8</text>
                </g>

                <!-- bus + feeds -->
                <g stroke="#ff4d17" fill="none">
                  <path d="M176 194 V206 H466" stroke-width="1" stroke-opacity=".55" />
                  <path v-for="i in 8" :key="'f' + i" :d="`M${150 + 52 + 6 + (i - 1) * 22 + 8} 194 V206`" stroke-width="1" stroke-opacity=".5" />
                  <path d="M176 206 V216" stroke-width="1" stroke-opacity=".5" />
                </g>

                <!-- contactors -->
                <g>
                  <g v-for="i in 3" :key="'c' + i">
                    <rect :x="150 + (i - 1) * 46" y="466" width="38" height="54" rx="1" fill="#0a0c0b" stroke="#f2efe6" stroke-opacity=".24" />
                    <rect :x="156 + (i - 1) * 46" y="472" width="26" height="16" rx="0.5" fill="#f2efe6" fill-opacity=".07" />
                    <circle :cx="169 + (i - 1) * 46" cy="502" r="4" fill="none" stroke="#ff4d17" stroke-opacity=".6" />
                    <line :x1="162 + (i - 1) * 46" y1="514" :x2="176 + (i - 1) * 46" y2="514" stroke="#f2efe6" stroke-opacity=".28" />
                  </g>
                  <text x="286" y="528" font-family="IBM Plex Mono, monospace" font-size="5.4" letter-spacing=".7" fill="#f2efe6" fill-opacity=".4">M1 · M2 · M3</text>
                </g>

                <!-- incoming feed -->
                <g font-family="IBM Plex Mono, monospace" font-size="5.4" fill="#f2efe6" fill-opacity=".5">
                  <path d="M158 240 V300 H150 V660" stroke="#ff4d17" stroke-opacity=".35" fill="none" />
                  <path d="M470 240 V300 H480 V660" stroke="#ff4d17" stroke-opacity=".35" fill="none" />
                  <text x="150" y="676" text-anchor="middle">L1</text>
                  <text x="470" y="676" text-anchor="middle">L2</text>
                  <text x="310" y="676" text-anchor="middle">L3</text>
                </g>
              </g>
            </g>

            <!-- CONTROL layer -->
            <g :class="active !== 'control' ? 'opacity-30' : 'opacity-100'" class="transition-opacity duration-500">
              <!-- PLC -->
              <g>
                <rect x="150" y="216" width="196" height="82" rx="1" fill="#0b100d" stroke="#f2efe6" stroke-opacity=".26" />
                <rect x="150" y="216" width="196" height="16" fill="#f2efe6" fill-opacity=".05" />
                <text x="157" y="226.5" font-family="IBM Plex Mono, monospace" font-size="5.6" letter-spacing=".8" fill="#f2efe6" fill-opacity=".62">PLC · CPU / I/O</text>
                <circle cx="334" cy="224" r="1.7" :fill="'#ff4d17'" :filter="`url(#glow-${uid})`" />
                <g v-for="i in 24" :key="'led' + i">
                  <circle
                    :cx="160 + ((i - 1) % 8) * 23"
                    :cy="243 + Math.floor((i - 1) / 8) * 13"
                    r="1.6"
                    fill="#f2efe6"
                    :fill-opacity="i % 5 === 0 ? '.7' : '.16'"
                  />
                  <rect :x="170 + ((i - 1) % 8) * 23" :y="240 + Math.floor((i - 1) / 8) * 13" width="10" height="1" fill="#f2efe6" fill-opacity=".12" />
                </g>
                <rect x="150" y="282" width="196" height="9" fill="#ff4d17" fill-opacity=".09" />
                <text x="243" y="289.5" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="5" letter-spacing="1" fill="#ff4d17" fill-opacity=".8">ETHERNET / IP</text>
              </g>

              <!-- power supply -->
              <g>
                <rect x="358" y="216" width="126" height="82" rx="1" fill="#0b100d" stroke="#f2efe6" stroke-opacity=".22" />
                <g stroke="#f2efe6" stroke-opacity=".14">
                  <line v-for="i in 5" :key="'v' + i" :x1="368" :y1="232 + i * 9" x2="392" :y2="232 + i * 9" />
                </g>
                <text x="402" y="240" font-family="IBM Plex Mono, monospace" font-size="5.4" letter-spacing=".8" fill="#f2efe6" fill-opacity=".55">24V PSU</text>
                <text x="402" y="252" font-family="IBM Plex Mono, monospace" font-size="9" letter-spacing=".5" fill="#f2efe6" fill-opacity=".8">24.1</text>
                <text x="430" y="252" font-family="IBM Plex Mono, monospace" font-size="5" fill="#f2efe6" fill-opacity=".4">VDC</text>
                <rect x="402" y="262" width="64" height="3" fill="#ff4d17" fill-opacity=".55" />
                <text x="402" y="286" font-family="IBM Plex Mono, monospace" font-size="4.6" fill="#f2efe6" fill-opacity=".35">FEED FROM DIST</text>
              </g>

              <!-- HMI -->
              <g>
                <rect x="150" y="316" width="196" height="128" rx="1" fill="#0a0e0c" stroke="#f2efe6" stroke-opacity=".26" />
                <rect x="158" y="326" width="180" height="94" rx="0.5" :fill="`url(#screen-${uid})`" stroke="#f2efe6" stroke-opacity=".1" />
                <g stroke="#f2efe6" stroke-opacity=".06">
                  <line v-for="i in 4" :key="'hg' + i" x1="158" :y1="326 + i * 19" x2="338" :y2="326 + i * 19" />
                </g>
                <text x="166" y="340" font-family="IBM Plex Mono, monospace" font-size="5.2" letter-spacing=".8" fill="#f2efe6" fill-opacity=".55">LINE 04 / RUN</text>
                <circle cx="328" cy="337" r="2" :fill="'#ff4d17'" :filter="`url(#glow-${uid})`" />
                <polyline points="166,394 184,394 190,376 200,404 210,366 220,400 230,386 244,386 252,376 262,398 274,382 286,390 300,390 308,378 320,396 330,388" fill="none" stroke="#2fa36b" stroke-width="1.2" stroke-opacity=".95" />
                <line x1="158" y1="394" x2="338" y2="394" stroke="#f2efe6" stroke-opacity=".08" />
                <g font-family="IBM Plex Mono, monospace" font-size="4.5" fill="#f2efe6" fill-opacity=".35">
                  <text x="166" y="412">48.0 Hz</text>
                  <text x="222" y="412">412 PSI</text>
                  <text x="284" y="412">AUTO</text>
                </g>
                <path d="M166 332 H212 L180 410 H158 Z" fill="#f2efe6" fill-opacity=".035" />
                <text x="248" y="437" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="4.8" letter-spacing=".9" fill="#f2efe6" fill-opacity=".38">HMI · 10.1 IN</text>
              </g>

              <!-- VFD -->
              <g>
                <rect x="358" y="316" width="126" height="128" rx="1" fill="#0b100d" stroke="#f2efe6" stroke-opacity=".24" />
                <rect x="366" y="324" width="70" height="34" fill="#06100b" stroke="#f2efe6" stroke-opacity=".12" />
                <text x="372" y="338" font-family="IBM Plex Mono, monospace" font-size="4.5" fill="#ff4d17" fill-opacity=".8">DRIVE 2</text>
                <text x="372" y="352" font-family="IBM Plex Mono, monospace" font-size="11" fill="#f2efe6" fill-opacity=".85">48.0</text>
                <text x="414" y="352" font-family="IBM Plex Mono, monospace" font-size="4.5" fill="#f2efe6" fill-opacity=".45">Hz</text>
                <g stroke="#f2efe6" stroke-opacity=".13">
                  <line v-for="i in 7" :key="'fin' + i" x1="444" :y1="326 + i * 7" x2="476" :y2="326 + i * 7" />
                </g>
                <g>
                  <circle cx="374" cy="384" r="4.5" fill="none" stroke="#f2efe6" stroke-opacity=".3" />
                  <circle cx="392" cy="384" r="4.5" fill="none" stroke="#f2efe6" stroke-opacity=".3" />
                  <rect x="410" y="378" width="26" height="12" fill="#f2efe6" fill-opacity=".08" stroke="#f2efe6" stroke-opacity=".2" />
                </g>
                <text x="366" y="414" font-family="IBM Plex Mono, monospace" font-size="5" letter-spacing=".6" fill="#f2efe6" fill-opacity=".45">VFD · 75 HP</text>
                <rect x="366" y="422" width="94" height="14" fill="#ff4d17" fill-opacity=".1" />
                <text x="372" y="432" font-family="IBM Plex Mono, monospace" font-size="4.4" letter-spacing=".6" fill="#ff4d17" fill-opacity=".75">LOCAL / AUTO</text>
              </g>

              <!-- safety relays -->
              <g>
                <rect x="358" y="456" width="126" height="30" rx="1" fill="#0b100d" stroke="#f2efe6" stroke-opacity=".18" />
                <text x="366" y="468" font-family="IBM Plex Mono, monospace" font-size="4.8" letter-spacing=".7" fill="#f2efe6" fill-opacity=".45">SAFETY RELAY</text>
                <circle cx="466" cy="471" r="2.6" fill="none" stroke="#ff4d17" stroke-opacity=".8" />
                <circle cx="466" cy="471" r="1.1" fill="#ff4d17" />
              </g>

              <!-- terminals -->
              <g>
                <rect x="150" y="548" width="334" height="42" fill="#050807" stroke="#f2efe6" stroke-opacity=".18" />
                <g v-for="i in 18" :key="'t' + i">
                  <rect :x="154 + (i - 1) * 18.2" y="552" width="15" height="18" fill="#f2efe6" fill-opacity=".05" stroke="#f2efe6" stroke-opacity=".12" />
                  <text :x="161.5 + (i - 1) * 18.2" y="564" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="4.6" fill="#f2efe6" fill-opacity=".4">{{ i }}</text>
                </g>
                <g v-for="i in 18" :key="'tb' + i">
                  <rect :x="154 + (i - 1) * 18.2" y="572" width="15" height="14" fill="#f2efe6" fill-opacity=".03" stroke="#f2efe6" stroke-opacity=".1" />
                </g>
                <text x="484" y="563" text-anchor="end" font-family="IBM Plex Mono, monospace" font-size="4.6" letter-spacing=".6" fill="#f2efe6" fill-opacity=".3">FIELD I/O</text>
              </g>
            </g>

            <!-- wiring (always visible, subtle) -->
            <g fill="none" stroke-linecap="round">
              <g stroke="#f2efe6" stroke-opacity=".16">
                <path d="M176 212 V214" />
                <path d="M248 212 V304" />
                <path d="M300 298 V316" />
                <path d="M300 444 V466" />
                <path d="M420 298 V316" />
                <path d="M420 444 V456" />
                <path d="M248 444 V466" />
                <path d="M300 520 V548" />
                <path d="M420 486 V548" />
                <path d="M166 548 V532 H146 V592 H150" />
                <path d="M466 548 V600 H480 V660" />
              </g>
              <g stroke="#ff4d17" stroke-opacity=".38" stroke-dasharray="3 5" class="animate-dash">
                <path d="M176 194 V206 H466 V194" />
                <path d="M248 212 V304" />
                <path d="M420 298 V316" />
                <path d="M300 444 V548" />
              </g>
            </g>

            <!-- NETWORK layer -->
            <g :class="active !== 'network' ? 'opacity-20' : 'opacity-100'" class="transition-opacity duration-500">
              <g stroke="#ff4d17" fill="none" :filter="`url(#glow-${uid})`">
                <path d="M346 274 H352 V330 H358" stroke-width="1.3" />
                <path d="M330 274 V310" stroke-width="1" stroke-dasharray="2 4" />
                <path d="M420 490 V520 H352 V286" stroke-width="1" stroke-opacity=".6" stroke-dasharray="4 6" />
              </g>
              <g>
                <circle cx="346" cy="274" r="3" fill="#ff4d17" />
                <circle cx="358" cy="330" r="2.4" fill="#ff4d17" />
                <text x="352" y="306" font-family="IBM Plex Mono, monospace" font-size="4.2" letter-spacing=".8" fill="#ff4d17" fill-opacity=".8" transform="rotate(90 352 306)">ETH</text>
              </g>
            </g>

            <!-- bundle -->
            <g fill="none" stroke-linecap="round">
              <path d="M154 596 C150 632 146 652 142 676" stroke="#050706" stroke-width="7" stroke-opacity=".9" />
              <path d="M170 596 C170 632 166 652 164 676" stroke="#050706" stroke-width="6" stroke-opacity=".9" />
              <path d="M186 596 C190 632 192 652 194 676" stroke="#050706" stroke-width="5" stroke-opacity=".9" />
              <path d="M154 596 C150 632 146 652 142 676" stroke="#ff4d17" stroke-width="1.2" stroke-opacity=".5" />
              <path d="M170 596 C170 632 166 652 164 676" stroke="#f2efe6" stroke-width="1.1" stroke-opacity=".22" />
            </g>

            <!-- cable entry + fan -->
            <g>
              <rect x="150" y="636" width="150" height="22" fill="#050807" stroke="#f2efe6" stroke-opacity=".14" />
              <g v-for="i in 4" :key="'gland' + i">
                <circle :cx="168 + i * 30" cy="647" r="5" fill="none" stroke="#f2efe6" stroke-opacity=".22" />
                <circle :cx="168 + i * 30" cy="647" r="2.2" fill="#f2efe6" fill-opacity=".1" />
              </g>
              <text x="312" y="650" font-family="IBM Plex Mono, monospace" font-size="4.6" letter-spacing=".6" fill="#f2efe6" fill-opacity=".3">CABLE ENTRY</text>

              <circle cx="466" cy="628" r="24" fill="none" stroke="#f2efe6" stroke-opacity=".16" />
              <g stroke="#f2efe6" stroke-opacity=".16">
                <line x1="466" y1="610" x2="466" y2="646" />
                <line x1="448" y1="628" x2="484" y2="628" />
                <line x1="453" y1="615" x2="479" y2="641" />
                <line x1="479" y1="615" x2="453" y2="641" />
              </g>
              <text x="466" y="666" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="4.6" letter-spacing=".6" fill="#f2efe6" fill-opacity=".3">FAN</text>
            </g>

            <!-- corner crosshairs -->
            <g stroke="#f2efe6" stroke-opacity=".18">
              <path d="M110 56 V42 H124" fill="none" />
              <path d="M516 42 H530 V56" fill="none" />
              <path d="M110 714 V728 H124" fill="none" />
              <path d="M516 728 H530 V714" fill="none" />
            </g>
          </g>

        </svg>

        <!-- floating stamp -->
        <div class="pointer-events-none absolute bottom-6 left-4 hidden -rotate-6 rounded border border-brand-soft/50 bg-ink/40 px-2.5 py-1.5 backdrop-blur sm:block">
          <p class="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-soft">FAT · Passed</p>
          <p class="mt-0.5 font-mono text-[9.5px] uppercase tracking-[0.1em] text-bone/55">Documented before freight</p>
        </div>
      </div>

      <!-- layer controls -->
      <div class="grid grid-cols-3 border-t border-bone/10">
        <button
          v-for="layer in layers"
          :key="layer"
          type="button"
          class="group relative flex flex-col items-start gap-1 border-r border-bone/10 px-4 py-3 text-left transition-colors last:border-r-0"
          :class="active === layer ? 'bg-bone/5' : 'hover:bg-bone/[0.04]'"
          :aria-pressed="active === layer"
          @click="select(layer)"
        >
          <span class="flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.14em]" :class="active === layer ? 'text-brand-soft' : 'text-bone/60'">
            <span class="size-1" :class="active === layer ? 'bg-brand-soft' : 'bg-bone/25'" />
            {{ captions[layer].label }}
          </span>
          <span class="font-mono text-[9px] uppercase tracking-[0.1em] text-bone/40">{{ captions[layer].code }}</span>
          <span class="absolute inset-x-0 bottom-0 h-px bg-brand-soft transition-transform duration-500" :class="active === layer ? 'scale-x-100' : 'scale-x-0'" />
        </button>
      </div>

      <div class="px-4 py-3.5">
        <p class="min-h-[2.5rem] max-w-[46ch] text-[12.5px] leading-relaxed text-bone/70">
          {{ captions[active].text }}
        </p>
      </div>

      <div class="grid grid-cols-3 border-t border-bone/10">
        <div v-for="(stage, i) in [
          { label: 'Design', state: 'done', note: 'Rev C' },
          { label: 'Build', state: 'active', note: 'Bench 02' },
          { label: 'FAT', state: 'next', note: 'Scheduled' },
        ]" :key="stage.label" class="border-r border-bone/10 px-4 py-2.5 last:border-r-0">
          <p class="flex items-center gap-1.5 font-mono text-[8.5px] uppercase tracking-[0.1em]" :class="stage.state === 'active' ? 'text-brand-soft' : stage.state === 'done' ? 'text-bone/60' : 'text-bone/40'">
            <span class="size-1" :class="stage.state === 'active' ? 'animate-pulse-led bg-brand-soft' : stage.state === 'done' ? 'bg-bone/50' : 'bg-bone/15'" />
            {{ stage.label }}
          </p>
          <p class="mt-0.5 font-mono text-[8px] uppercase tracking-[0.06em] text-bone/40">{{ stage.note }}</p>
        </div>
      </div>
    </div>

  </div>
</template>
