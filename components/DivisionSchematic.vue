<script setup lang="ts">
withDefaults(defineProps<{
  variant: 'electrical' | 'instrumentation' | 'automotive' | 'mechanical' | 'fabrication' | 'facilities'
  code?: string
}>(), {
  code: 'VT',
})

const uid = useId()

const titles: Record<string, string> = {
  electrical: 'Power distribution / motor control',
  instrumentation: 'Control loop / panel architecture',
  automotive: 'Vehicle diagnostics',
  mechanical: 'Precision assembly',
  fabrication: 'Sheet metal / structural',
  facilities: 'Property power infrastructure',
}

const codes: Record<string, string> = {
  electrical: 'E-480-01',
  instrumentation: 'I-CTL-02',
  automotive: 'A-DIA-03',
  mechanical: 'M-PRC-04',
  fabrication: 'F-FAB-05',
  facilities: 'B-PWR-06',
}
</script>

<template>
  <div class="relative overflow-hidden border border-bone/12 bg-ink">
    <div class="pointer-events-none absolute inset-0 grid-bg-dark opacity-50" aria-hidden="true" />

    <div class="relative flex items-center justify-between border-b border-bone/10 px-4 py-2.5">
      <div class="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-bone/55">
        <span class="size-1 rounded-full bg-signal" aria-hidden="true" />
        Schema
      </div>
      <span class="font-mono text-[10px] uppercase tracking-[0.16em] text-bone/45">{{ codes[variant] }}</span>
    </div>

    <svg
      viewBox="0 0 520 360"
      class="relative h-auto w-full"
      role="img"
      :aria-label="`${titles[variant]} schematic`"
    >
      <defs>
        <pattern :id="`dot-${uid}`" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r=".7" fill="#f2efe6" fill-opacity=".12" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="520" height="360" :fill="`url(#dot-${uid})`" />

      <!-- frame ticks -->
      <g stroke="#f2efe6" stroke-opacity=".18">
        <path d="M20 20 h10 M20 20 v10" fill="none" />
        <path d="M500 20 h-10 M500 20 v10" fill="none" />
        <path d="M20 340 h10 M20 340 v-10" fill="none" />
        <path d="M500 340 h-10 M500 340 v-10" fill="none" />
      </g>

      <!-- ELECTRICAL -->
      <g v-if="variant === 'electrical'" fill="none" stroke="#f2efe6" stroke-opacity=".55" stroke-width="1.1">
        <g stroke="#007d48" stroke-opacity=".8">
          <line x1="70" y1="96" x2="450" y2="96" />
          <line x1="70" y1="112" x2="450" y2="112" />
          <line x1="70" y1="128" x2="450" y2="128" />
        </g>
        <!-- transformer -->
        <g transform="translate(130 96)">
          <line x1="0" y1="0" x2="0" y2="34" stroke="#f2efe6" />
          <path d="M-14 40 a14 14 0 0 1 28 0" />
          <path d="M-14 48 a14 14 0 0 1 28 0" />
          <path d="M-14 56 a14 14 0 0 1 28 0" />
          <line x1="0" y1="62" x2="0" y2="92" stroke="#f2efe6" />
          <rect x="-22" y="26" width="44" height="44" stroke="#f2efe6" stroke-opacity=".18" stroke-dasharray="3 4" />
        </g>
        <!-- breaker -->
        <g transform="translate(250 150)">
          <rect x="-26" y="-26" width="52" height="52" rx="1" stroke="#f2efe6" stroke-opacity=".3" />
          <path d="M-12 12 L8 -12" stroke="#007d48" stroke-width="1.6" />
          <circle cx="-12" cy="12" r="3" fill="#0a0c0b" stroke="#f2efe6" stroke-opacity=".5" />
          <circle cx="8" cy="-12" r="3" fill="#0a0c0b" stroke="#f2efe6" stroke-opacity=".5" />
          <line x1="0" y1="-38" x2="0" y2="-26" />
          <line x1="0" y1="26" x2="0" y2="56" />
        </g>
        <!-- motor -->
        <g transform="translate(370 196)">
          <circle r="40" stroke="#f2efe6" stroke-opacity=".5" />
          <circle r="40" stroke="#f2efe6" stroke-opacity=".12" transform="rotate(45)" />
          <text x="0" y="2" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="15" fill="#f2efe6" fill-opacity=".75" stroke="none">M</text>
          <text x="0" y="17" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="7" fill="#007d48" stroke="none">3~</text>
          <line x1="0" y1="-40" x2="0" y2="-86" stroke="#007d48" stroke-opacity=".6" stroke-dasharray="4 4" />
        </g>
        <!-- labels -->
        <g font-family="IBM Plex Mono, monospace" font-size="7.5" fill="#f2efe6" fill-opacity=".4" stroke="none" letter-spacing=".8">
          <text x="70" y="84">480V · 3Φ · 60HZ</text>
          <text x="112" y="176">XFMR</text>
          <text x="232" y="234">MCC FEEDER</text>
          <text x="338" y="276">75 HP</text>
          <text x="440" y="118" text-anchor="end">BUS A</text>
          <text x="440" y="140" text-anchor="end" fill-opacity=".25">BUS B</text>
          <text x="440" y="156" text-anchor="end" fill-opacity=".25">BUS C</text>
        </g>
        <circle cx="250" cy="150" r="3.4" fill="#007d48" class="animate-pulse-led" stroke="none" />
      </g>

      <!-- INSTRUMENTATION -->
      <g v-else-if="variant === 'instrumentation'" fill="none" stroke="#f2efe6" stroke-opacity=".5" stroke-width="1.1">
        <!-- process line -->
        <path d="M40 258 H480" stroke-width="1.4" />
        <path d="M40 270 H480" stroke-width="1.4" stroke-opacity=".25" />
        <path d="M300 258 l10 6 -10 6" stroke="#007d48" />
        <!-- transmitter -->
        <g transform="translate(148 196)">
          <circle r="26" stroke="#f2efe6" stroke-opacity=".6" />
          <text x="0" y="4" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="10" fill="#f2efe6" fill-opacity=".8" stroke="none">PT</text>
          <line x1="0" y1="26" x2="0" y2="62" />
          <line x1="-9" y1="62" x2="9" y2="62" stroke="#007d48" />
          <circle cx="0" cy="62" r="2.5" fill="#007d48" stroke="none" />
        </g>
        <!-- PLC -->
        <g transform="translate(284 116)">
          <rect width="128" height="112" rx="1" stroke="#f2efe6" stroke-opacity=".45" />
          <line x1="0" y1="22" x2="128" y2="22" stroke-opacity=".3" />
          <text x="8" y="15" font-family="IBM Plex Mono, monospace" font-size="7.5" fill="#f2efe6" fill-opacity=".6" stroke="none" letter-spacing="1">PLC / CPU</text>
          <g stroke="#f2efe6" stroke-opacity=".25">
            <rect x="10" y="34" width="44" height="22" />
            <rect x="62" y="34" width="44" height="22" />
            <rect x="10" y="64" width="44" height="22" />
            <rect x="62" y="64" width="44" height="22" />
          </g>
          <g fill="#007d48" stroke="none">
            <circle cx="20" cy="45" r="1.8" /><circle cx="20" cy="75" r="1.8" />
            <circle cx="72" cy="45" r="1.8" /><circle cx="72" cy="75" r="1.8" />
          </g>
          <text x="10" y="101" font-family="IBM Plex Mono, monospace" font-size="6" fill="#f2efe6" fill-opacity=".35" stroke="none">AI · AO · DI · DO</text>
        </g>
        <!-- HMI -->
        <g transform="translate(432 116)">
          <rect width="58" height="76" rx="1" stroke="#f2efe6" stroke-opacity=".45" />
          <rect x="6" y="8" width="46" height="34" fill="#f2efe6" fill-opacity=".05" stroke="#f2efe6" stroke-opacity=".2" />
          <polyline points="10,34 18,34 22,22 28,38 34,18 40,32 48,26" stroke="#007d48" stroke-width="1" stroke-opacity=".8" />
          <text x="29" y="58" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="6" fill="#f2efe6" fill-opacity=".5" stroke="none">HMI</text>
          <line x1="29" y1="76" x2="29" y2="120" stroke-opacity=".3" />
        </g>
        <!-- valve -->
        <g transform="translate(392 258)">
          <path d="M-14 -16 L0 0 L-14 16 Z" stroke="#f2efe6" stroke-opacity=".55" />
          <path d="M14 -16 L0 0 L14 16 Z" stroke="#f2efe6" stroke-opacity=".55" />
          <line x1="0" y1="0" x2="0" y2="-28" stroke="#f2efe6" stroke-opacity=".4" />
          <rect x="-9" y="-42" width="18" height="14" stroke="#f2efe6" stroke-opacity=".5" />
          <text x="0" y="34" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="6.5" fill="#f2efe6" fill-opacity=".5" stroke="none">FV</text>
        </g>
        <!-- signal paths -->
        <path d="M174 196 V160 H284" stroke="#007d48" stroke-opacity=".8" stroke-dasharray="4 4" />
        <path d="M284 172 H240 V258 H378" stroke="#007d48" stroke-opacity=".35" stroke-dasharray="2 5" />
        <path d="M412 172 H432" stroke="#007d48" stroke-opacity=".8" />
        <g font-family="IBM Plex Mono, monospace" font-size="7" fill="#007d48" fill-opacity=".8" stroke="none" letter-spacing=".7">
          <text x="188" y="152">4–20 mA</text>
          <text x="252" y="290" fill-opacity=".45">CONTROL SIGNAL</text>
        </g>
        <g font-family="IBM Plex Mono, monospace" font-size="6.5" fill="#f2efe6" fill-opacity=".35" stroke="none" letter-spacing=".8">
          <text x="40" y="300">PROCESS LINE / LINE 04</text>
          <text x="148" y="286" text-anchor="middle">PT-104</text>
        </g>
      </g>

      <!-- AUTOMOTIVE -->
      <g v-else-if="variant === 'automotive'" fill="none" stroke="#f2efe6" stroke-opacity=".55" stroke-width="1.1">
        <!-- ground -->
        <line x1="40" y1="286" x2="480" y2="286" stroke-opacity=".18" stroke-dasharray="2 5" />
        <!-- car body -->
        <path d="M64 248 H112 L134 210 H212 L238 186 H316 L346 210 H412 Q436 210 440 232 V262 H420" />
        <path d="M64 248 V262 H104" />
        <path d="M64 248 H440" stroke-opacity=".18" stroke-dasharray="3 5" />
        <path d="M112 248 L134 210 H212 L238 186 H316 L346 210 H412" />
        <!-- windows -->
        <path d="M148 212 H210 L228 192 H286 L310 212 Z" stroke="#007d48" stroke-opacity=".55" />
        <line x1="252" y1="192" x2="252" y2="212" stroke-opacity=".3" />
        <!-- wheels -->
        <g>
          <circle cx="156" cy="264" r="30" />
          <circle cx="156" cy="264" r="17" stroke-opacity=".35" />
          <circle cx="156" cy="264" r="4" fill="#f2efe6" fill-opacity=".3" stroke="none" />
          <circle cx="372" cy="264" r="30" />
          <circle cx="372" cy="264" r="17" stroke-opacity=".35" />
          <circle cx="372" cy="264" r="4" fill="#f2efe6" fill-opacity=".3" stroke="none" />
        </g>
        <!-- scan cable -->
        <path d="M446 240 H470 V120 H420" stroke="#007d48" stroke-opacity=".8" stroke-dasharray="4 3" />
        <g transform="translate(330 86)">
          <rect width="90" height="34" rx="1" stroke="#f2efe6" stroke-opacity=".45" />
          <polyline points="10,24 22,24 27,14 33,26 40,12 47,24 58,24 64,18 72,22 80,22" stroke="#007d48" stroke-width="1.2" />
          <text x="45" y="30" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="5.5" fill="#f2efe6" fill-opacity=".45" stroke="none">LIVE DATA</text>
        </g>
        <!-- OBD -->
        <g transform="translate(446 246)">
          <rect x="-12" y="-7" width="24" height="14" rx="2" stroke="#f2efe6" stroke-opacity=".5" />
          <g fill="#f2efe6" fill-opacity=".3" stroke="none">
            <circle cx="-6" cy="-2" r="1" /><circle cx="0" cy="-2" r="1" /><circle cx="6" cy="-2" r="1" />
            <circle cx="-6" cy="3" r="1" /><circle cx="0" cy="3" r="1" /><circle cx="6" cy="3" r="1" />
          </g>
        </g>
        <g font-family="IBM Plex Mono, monospace" font-size="7" fill="#f2efe6" fill-opacity=".4" stroke="none" letter-spacing=".8">
          <text x="64" y="316">DIAGNOSTIC BAY / CAN BUS</text>
          <text x="446" y="322" text-anchor="middle">OBD-II</text>
          <text x="156" y="320" text-anchor="middle" fill-opacity=".25">ALIGN</text>
          <text x="372" y="320" text-anchor="middle" fill-opacity=".25">BRAKE</text>
        </g>
      </g>

      <!-- MECHANICAL -->
      <g v-else-if="variant === 'mechanical'" fill="none" stroke="#f2efe6" stroke-opacity=".5" stroke-width="1.1">
        <!-- gear teeth -->
        <g transform="translate(250 172)">
          <circle r="96" stroke-opacity=".3" />
          <circle r="80" stroke-opacity=".8" />
          <circle r="42" stroke-opacity=".5" />
          <circle r="18" stroke="#007d48" stroke-opacity=".8" />
          <g v-for="i in 28" :key="'tooth' + i">
            <rect :transform="`rotate(${i * (360 / 28)}) translate(0 -92)`" x="-4.5" y="-12" width="9" height="14" fill="#f2efe6" fill-opacity=".09" stroke="#f2efe6" stroke-opacity=".45" />
          </g>
          <g stroke-dasharray="6 5" stroke-opacity=".4">
            <line x1="-124" y1="0" x2="124" y2="0" />
            <line x1="0" y1="-124" x2="0" y2="124" />
          </g>
          <circle r="80" stroke-dasharray="1 7" stroke-opacity=".35" />
        </g>
        <!-- dimensions -->
        <g stroke="#f2efe6" stroke-opacity=".3">
          <path d="M154 84 H346" />
          <path d="M154 78 v12 M346 78 v12" />
          <path d="M122 172 V276" />
          <path d="M116 172 h12 M116 276 h12" />
        </g>
        <g font-family="IBM Plex Mono, monospace" font-size="7.5" fill="#f2efe6" fill-opacity=".4" stroke="none" letter-spacing=".7">
          <text x="250" y="76" text-anchor="middle">Ø 192.00</text>
          <text x="104" y="228" text-anchor="middle" transform="rotate(-90 104 228)">H7 / ±0.001</text>
          <text x="250" y="312" text-anchor="middle">BEARING ASSEMBLY · SECTION A–A</text>
          <text x="386" y="140" fill-opacity=".25">SHAFT</text>
        </g>
        <g stroke="#007d48" stroke-opacity=".6">
          <line x1="250" y1="154" x2="250" y2="190" />
          <line x1="404" y1="90" x2="330" y2="130" stroke-dasharray="3 3" />
        </g>
      </g>

      <!-- FABRICATION -->
      <g v-else-if="variant === 'fabrication'" fill="none" stroke="#f2efe6" stroke-opacity=".5" stroke-width="1.1">
        <!-- formed profile -->
        <path d="M96 96 H236 Q252 96 252 112 V224 Q252 240 268 240 H424" stroke-width="1.6" stroke-opacity=".75" />
        <path d="M96 116 H224 Q232 116 232 124 V212 Q232 260 268 260 H424" stroke-width="1.2" stroke-opacity=".35" />
        <path d="M96 96 V116 M96 96 H116" stroke-opacity=".25" />
        <!-- bend radius -->
        <path d="M252 96 A16 16 0 0 1 236 112" stroke="#007d48" stroke-width="1.2" />
        <path d="M268 250 A10 10 0 0 0 260 240" stroke="#007d48" stroke-width="1.2" />
        <!-- material hatch -->
        <g stroke="#f2efe6" stroke-opacity=".12">
          <line x1="300" y1="219" x2="320" y2="239" />
          <line x1="320" y1="219" x2="340" y2="239" />
          <line x1="340" y1="219" x2="360" y2="239" />
          <line x1="360" y1="219" x2="380" y2="239" />
          <line x1="380" y1="219" x2="400" y2="239" />
        </g>
        <!-- holes -->
        <g stroke="#f2efe6" stroke-opacity=".4">
          <circle cx="140" cy="106" r="5" />
          <circle cx="180" cy="106" r="5" />
          <circle cx="220" cy="106" r="5" />
          <circle cx="340" cy="250" r="5" />
          <circle cx="390" cy="250" r="5" />
        </g>
        <!-- dimensions -->
        <g stroke="#f2efe6" stroke-opacity=".28">
          <path d="M96 72 H424" />
          <path d="M96 66 v12 M424 66 v12" />
          <path d="M456 96 V260" />
          <path d="M450 96 h12 M450 260 h12" />
        </g>
        <g font-family="IBM Plex Mono, monospace" font-size="7.5" fill="#f2efe6" fill-opacity=".4" stroke="none" letter-spacing=".7">
          <text x="260" y="64" text-anchor="middle">FLAT / 24.00 IN</text>
          <text x="472" y="182" text-anchor="middle" transform="rotate(-90 472 182)">16 GA CRS</text>
          <text x="296" y="104" fill="#007d48" fill-opacity=".85">R 0.125</text>
          <text x="96" y="300">BEND 1 · 90°</text>
          <text x="424" y="300" text-anchor="end">BEND 2 · 90°</text>
        </g>
      </g>

      <!-- FACILITIES -->
      <g v-else fill="none" stroke="#f2efe6" stroke-opacity=".5" stroke-width="1.1">
        <!-- PV roof -->
        <path d="M84 118 H436 L412 84 H108 Z" stroke="#f2efe6" stroke-opacity=".6" />
        <g stroke="#007d48" stroke-opacity=".45">
          <line x1="134" y1="112" x2="152" y2="90" />
          <line x1="186" y1="112" x2="204" y2="90" />
          <line x1="238" y1="112" x2="256" y2="90" />
          <line x1="290" y1="112" x2="308" y2="90" />
          <line x1="342" y1="112" x2="360" y2="90" />
          <line x1="394" y1="112" x2="412" y2="90" />
        </g>
        <!-- building -->
        <path d="M96 118 V300 H424 V118" />
        <g stroke-opacity=".22">
          <line x1="96" y1="178" x2="424" y2="178" />
          <line x1="96" y1="238" x2="424" y2="238" />
        </g>
        <!-- windows -->
        <g stroke-opacity=".25">
          <g v-for="col in 6" :key="'w' + col">
            <rect :x="122 + (col - 1) * 48" y="136" width="26" height="26" />
            <rect :x="122 + (col - 1) * 48" y="196" width="26" height="26" />
            <rect :x="122 + (col - 1) * 48" y="256" width="26" height="26" />
          </g>
        </g>
        <!-- service riser -->
        <path d="M58 300 V196 H96" stroke="#007d48" stroke-opacity=".7" stroke-width="1.3" />
        <g stroke="#f2efe6" stroke-opacity=".45">
          <rect x="40" y="210" width="36" height="26" />
          <text x="58" y="227" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="7" fill="#f2efe6" fill-opacity=".55" stroke="none">MTR</text>
        </g>
        <circle cx="58" cy="300" r="3" fill="#007d48" />
        <!-- generator -->
        <g transform="translate(388 262)">
          <rect width="64" height="38" stroke="#f2efe6" stroke-opacity=".45" />
          <text x="32" y="15" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="6.5" fill="#f2efe6" fill-opacity=".5" stroke="none">GEN</text>
          <text x="32" y="27" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="5.5" fill="#007d48" fill-opacity=".75" stroke="none">ATS</text>
        </g>
        <g font-family="IBM Plex Mono, monospace" font-size="7" fill="#f2efe6" fill-opacity=".4" stroke="none" letter-spacing=".8">
          <text x="108" y="76">ROOFTOP PV ARRAY</text>
          <text x="40" y="322">480V SERVICE</text>
          <text x="388" y="322">BACKUP POWER</text>
          <text x="424" y="150" text-anchor="end" fill-opacity=".25">FL 03</text>
          <text x="424" y="210" text-anchor="end" fill-opacity=".25">FL 02</text>
          <text x="424" y="270" text-anchor="end" fill-opacity=".25">FL 01</text>
        </g>
      </g>

      <text x="20" y="346" font-family="IBM Plex Mono, monospace" font-size="6.5" letter-spacing=".9" fill="#f2efe6" fill-opacity=".3">{{ code }} · {{ titles[variant].toUpperCase() }}</text>
      <text x="500" y="346" text-anchor="end" font-family="IBM Plex Mono, monospace" font-size="6.5" letter-spacing=".9" fill="#f2efe6" fill-opacity=".25">REV A</text>
    </svg>
  </div>
</template>
