import type { PanelType, ProcessStep, ValueItem } from '~/types/content'

export const site = {
  name: 'Vomtek',
  legalName: 'Vomtek',
  tagline: 'Engineered control systems.',
  descriptor: 'Control systems, electrical manufacturing, and field service — Houston, Texas.',
  address: {
    street: '2401 Fountain View Dr, Ste 312',
    city: 'Houston',
    state: 'TX',
    postalCode: '77057',
    country: 'USA',
    full: '2401 Fountain View Dr, Ste 312, Houston, TX 77057',
    maps: 'https://maps.google.com/?q=2401+Fountain+View+Dr+Ste+312+Houston+TX+77057',
  },
  phone: '713-347-1466',
  phoneHref: '+17133471466',
  email: 'support@vomtek.com',
  hours: 'Monday–Friday, 8:00–17:00 CT',
  coordinates: '29.7410° N / 95.4830° W',
  serviceArea: 'Houston, the Gulf Coast, and field support beyond.',
}

export const nav = [
  {
    label: 'Capabilities',
    to: '/services',
    children: [
      { label: 'Control panels', to: '/services/control-panels', note: 'UL 508A design & build' },
      { label: 'PCB design', to: '/services/pcb-design', note: 'Layout & DFM' },
      { label: 'Wire harness', to: '/services/wire-harness', note: 'Assembly & test' },
      { label: 'Motor rewinding', to: '/services/motor-rewinding', note: 'Rewind & rebalance' },
      { label: 'Motor testing', to: '/services/motor-testing', note: 'Diagnostics & fixtures' },
      { label: 'Panel repair', to: '/services/panel-repair', note: 'Repair & retrofit' },
      { label: 'Field service', to: '/services/field-service', note: 'Startup & maintenance' },
      { label: 'Uptime Care', to: '/uptime-care', note: 'Plans & response' },
    ],
  },
  {
    label: 'Systems',
    to: '/systems',
  },
  {
    label: 'Divisions',
    to: '/divisions',
    children: [
      { label: 'Electrical', to: '/divisions/electrical', note: '01' },
      { label: 'Instrumentation', to: '/divisions/instrumentation', note: '02' },
      { label: 'Automotive', to: '/divisions/automotive', note: '03' },
      { label: 'Mechanical', to: '/divisions/mechanical', note: '04' },
      { label: 'Fabrication', to: '/divisions/fabrication', note: '05' },
      { label: 'Facilities', to: '/divisions/real-estate', note: '06' },
    ],
  },
  {
    label: 'Company',
    to: '/about',
    children: [
      { label: 'About Vomtek', to: '/about', note: 'Who we are' },
      { label: 'Careers', to: '/careers', note: 'Open roles' },
      { label: 'Des Foundation', to: '/foundation', note: 'Community' },
      { label: 'Field notes', to: '/insights', note: 'Engineering writing' },
      { label: 'Contact', to: '/contact', note: 'Talk to us' },
    ],
  },
  { label: 'Field notes', to: '/insights' },
]

export const values: ValueItem[] = [
  {
    title: 'Excellence',
    text: 'We measure the result, not the effort. A panel is finished when it passes, the drawings match, and the customer can maintain it without calling us.',
  },
  {
    title: 'Respect',
    text: 'Every operator, electrician, and supplier on the job is treated as a professional. That is how you get honest information when it matters.',
  },
  {
    title: 'One team',
    text: 'Your engineers, our engineers, and the people on the floor are working on the same problem. We would rather raise an issue early than defend a schedule.',
  },
  {
    title: 'Innovation',
    text: 'Better does not have to mean more complex. We look for the simpler circuit, the cleaner layout, the maintenance path that saves the next person an hour.',
  },
  {
    title: 'Integrity',
    text: 'We tell you what we found, what it will cost, and what we are not the right shop for. Do the right thing when nobody is watching — especially then.',
  },
]

export const principles = [
  {
    title: 'Single point of accountability',
    text: 'Design, fabrication, assembly, and field service sit under one roof and one project manager. No finger-pointing between vendors.',
  },
  {
    title: 'Design for the maintenance tech',
    text: 'Layouts are built for access, labeling, and troubleshooting years after installation — not just for the day of delivery.',
  },
  {
    title: 'Test before it leaves',
    text: 'Every panel gets a documented factory acceptance test. Findings are corrected in the shop, where they cost hours instead of shifts.',
  },
  {
    title: 'Documentation that matches',
    text: 'As-built drawings, wire schedules, and spare-parts lists ship with the equipment. If it is in the panel, it is in the package.',
  },
  {
    title: 'Answer after startup',
    text: 'The warranty period is not the end of the relationship. Field support is part of the product.',
  },
]

export const process: ProcessStep[] = [
  {
    index: '01',
    title: 'Define',
    text: 'We start with the process, not the parts list: load list, sequence of operation, environment, duty cycle, and the constraints nobody wrote down.',
    output: 'Scope memo, load list, and RFQ',
  },
  {
    index: '02',
    title: 'Engineer',
    text: 'Schematics, layout, component selection, and thermal and spacing calculations. Every drawing is reviewed against the process before release.',
    output: 'Approved drawing set and BOM',
  },
  {
    index: '03',
    title: 'Build',
    text: 'UL 508A assembly, DIN rail layout, point-to-point wiring to schedule, ferrules, labels, and torque checks on every termination.',
    output: 'Photo log and build record',
  },
  {
    index: '04',
    title: 'Prove',
    text: 'Continuity, insulation resistance, functional simulation, and safety-circuit verification. You can witness the FAT in person or remotely.',
    output: 'Signed FAT report and as-builts',
  },
  {
    index: '05',
    title: 'Start',
    text: 'Delivery, installation, loop checks, commissioning, and operator training — then support that outlives the warranty.',
    output: 'Startup record and spares list',
  },
]

export const standards = [
  { code: 'UL 508A', label: 'Certified panel shop', note: 'Industrial control panel assembly and marking.' },
  { code: 'NFPA 70', label: 'NEC-compliant design', note: 'Sizing, protection, grounding, and installation.' },
  { code: 'IEC 61439', label: 'Export-build reference', note: 'Assembly and verification practice for international projects.' },
  { code: 'FAT', label: 'Factory acceptance test', note: 'Documented before shipment, witnessable by the client.' },
]

export const panelTypes: PanelType[] = [
  { code: 'MCC-01', name: 'Motor control center', note: 'Multi-bucket motor control with feeders, starters, and drives.' },
  { code: 'MCP-02', name: 'Motor control panel', note: 'Single-machine starters, overloads, and local control.' },
  { code: 'VFD-03', name: 'Variable frequency drive panel', note: 'Drive, bypass, reactors, and cooling for variable-torque loads.' },
  { code: 'PLC-04', name: 'PLC control panel', note: 'I/O, processors, networks, and power for automated processes.' },
  { code: 'HMI-05', name: 'HMI operator panel', note: 'Operator interface, alarms, and process visualization.' },
  { code: 'SCA-06', name: 'SCADA & telemetry', note: 'Remote monitoring, historian, and reporting architecture.' },
  { code: 'PV-07', name: 'Solar PV combiner & skid', note: 'DC collection, protection, and inverter interface.' },
  { code: 'PDB-08', name: 'Power distribution panel', note: 'Service distribution, feeders, and branch protection.' },
  { code: 'ICP-09', name: 'Instrument control panel', note: 'Loop power, signal conditioning, and marshalling.' },
  { code: 'JBD-10', name: 'Junction box & DIN rail', note: 'Termination, marshalling, and field wiring transition.' },
  { code: 'CBB-11', name: 'Circuit breaker enclosure', note: 'Disconnect and branch protection in a serviceable enclosure.' },
]

export const industries = [
  'Water & wastewater',
  'Oil & gas',
  'Food & beverage',
  'Manufacturing',
  'Solar & storage',
  'Commercial facilities',
  'Automotive & fleet',
  'Machine builders',
]

export const stats = [
  { value: '06', label: 'Divisions', note: 'One accountable team' },
  { value: '01', label: 'Shop floor', note: 'Engineering to startup' },
  { value: '100%', label: 'FAT coverage', note: 'Every panel, before freight' },
  { value: '24/7', label: 'Field response', note: 'When the line is down' },
]

export const heroTicker = [
  'Panel design',
  'UL 508A assembly',
  'PCB layout',
  'Wire harness',
  'Motor rewind',
  'FAT & commissioning',
  'Field service',
  'Fabrication',
]

export const contactReasons = [
  'New control panel or retrofit',
  'PCB design or layout',
  'Wire harness or cable assembly',
  'Motor repair, rewind, or testing',
  'Field service or emergency breakdown',
  'Fabrication or machining',
  'Careers',
  'Des Foundation',
  'Something else',
]

export const contactFaqs = [
  {
    q: 'How fast will I hear back?',
    a: 'Quote requests submitted through the configurator are acknowledged immediately and reviewed within one business day. For an active breakdown, call 713-347-1466 and tell us the line is down.',
  },
  {
    q: 'What should I include with a panel request?',
    a: 'A sequence of operation, load list, voltage, environment, and your required delivery date gets us to a real number fastest. If you do not have those yet, the configurator will capture what we need to start the conversation.',
  },
  {
    q: 'Do you work outside Houston?',
    a: 'We build for clients across the country and support field work across the Gulf Coast and beyond. Travel is quoted as a line item so there are no surprises.',
  },
]
