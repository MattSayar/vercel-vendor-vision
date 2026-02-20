// ============================================================
// VendorVision — Hardcoded Demo Data
// ============================================================

export type Severity = "critical" | "high" | "medium" | "low"
export type CaseStatus = "open" | "in-progress" | "auto-resolved" | "dismissed"

export interface Vendor {
  id: string
  name: string
  domain: string
  riskScore: number
  severity: Severity
  scenario: string
  activeSince: string
  internalContacts: number
  departments: number
  openCases: number
  emails30d: number
  industry: string
  size: string
  location: string
  primaryContact: string
  contractStatus: string
  contractValue: string
  renewalDate: string
  riskComponents: {
    behavioral: number
    threatIntel: number
    domainInfra: number
    community: number
    financial: number
  }
}

export interface RiskCase {
  id: string
  vendorId: string
  vendorName: string
  vendorDomain: string
  severity: Severity
  status: CaseStatus
  summary: string
  created: string
  tags: string[]
  statusLabel: string
  aiSummary: string
  evidence: EvidenceItem[]
  recommendedActions: RecommendedAction[]
}

export interface EvidenceItem {
  source: string
  sourceColor: string
  timestamp: string
  description: string
  confidence: number
}

export interface RecommendedAction {
  id: string
  label: string
  checked: boolean
}

export interface ActivityItem {
  id: string
  time: string
  level: "critical" | "warning" | "success" | "info"
  vendor: string
  description: string
}

export interface IntelSignal {
  id: string
  timestamp: string
  source: string
  sourceColor: string
  signalType: string
  description: string
  confidence: number
  status: string
}

export interface RemediationAction {
  id: string
  type: string
  description: string
  trigger: string
  impact: string
  confidence: number
  status: "pending" | "approved" | "rejected"
}

export interface ExecutedAction {
  id: string
  timestamp: string
  type: string
  vendor: string
  outcome: "success" | "partial" | "failed"
  description: string
  reversible: boolean
}

export interface Playbook {
  id: string
  name: string
  description: string
  trigger: string
  actions: string[]
  mode: "autonomous" | "human-approval" | "notify-only"
  enabled: boolean
}

// ---- Vendors ----
export const vendors: Vendor[] = [
  {
    id: "v1",
    name: "Acme Corp",
    domain: "acmecorp.com",
    riskScore: 92,
    severity: "critical",
    scenario: "Confirmed breach, credential exposure, active case",
    activeSince: "Mar 2023",
    internalContacts: 47,
    departments: 4,
    openCases: 2,
    emails30d: 1247,
    industry: "Enterprise Software",
    size: "1,000–5,000 employees",
    location: "San Francisco, CA",
    primaryContact: "Sarah Chen, VP Engineering",
    contractStatus: "Active",
    contractValue: "$480,000/yr",
    renewalDate: "Sep 2026",
    riskComponents: { behavioral: 72, threatIntel: 89, domainInfra: 45, community: 68, financial: 31 },
  },
  {
    id: "v2",
    name: "Globex Partners",
    domain: "globex.io",
    riskScore: 74,
    severity: "high",
    scenario: "Anomalous login geography, behavioral deviation",
    activeSince: "Jun 2023",
    internalContacts: 23,
    departments: 3,
    openCases: 1,
    emails30d: 634,
    industry: "Financial Services",
    size: "500–1,000 employees",
    location: "New York, NY",
    primaryContact: "James Rodriguez, CTO",
    contractStatus: "Active",
    contractValue: "$220,000/yr",
    renewalDate: "Dec 2026",
    riskComponents: { behavioral: 78, threatIntel: 52, domainInfra: 65, community: 45, financial: 38 },
  },
  {
    id: "v3",
    name: "DataFlow Inc",
    domain: "dataflow.com",
    riskScore: 68,
    severity: "high",
    scenario: "Financial distress signals, D&B score drop",
    activeSince: "Jan 2024",
    internalContacts: 31,
    departments: 2,
    openCases: 1,
    emails30d: 892,
    industry: "Data Analytics",
    size: "200–500 employees",
    location: "Austin, TX",
    primaryContact: "Maria Gonzalez, Head of Partnerships",
    contractStatus: "Active",
    contractValue: "$150,000/yr",
    renewalDate: "Mar 2027",
    riskComponents: { behavioral: 35, threatIntel: 42, domainInfra: 28, community: 55, financial: 88 },
  },
  {
    id: "v4",
    name: "Initech Solutions",
    domain: "initech.co",
    riskScore: 45,
    severity: "medium",
    scenario: "Minor domain reputation change, monitoring",
    activeSince: "Aug 2022",
    internalContacts: 15,
    departments: 2,
    openCases: 0,
    emails30d: 312,
    industry: "IT Services",
    size: "100–200 employees",
    location: "Chicago, IL",
    primaryContact: "Bill Lumbergh, Account Manager",
    contractStatus: "Active",
    contractValue: "$85,000/yr",
    renewalDate: "Aug 2026",
    riskComponents: { behavioral: 30, threatIntel: 25, domainInfra: 58, community: 20, financial: 22 },
  },
  {
    id: "v5",
    name: "Prolia Systems",
    domain: "proliasys.com",
    riskScore: 38,
    severity: "medium",
    scenario: "Historical community report, now resolved",
    activeSince: "Nov 2023",
    internalContacts: 8,
    departments: 1,
    openCases: 0,
    emails30d: 156,
    industry: "Cloud Infrastructure",
    size: "50–100 employees",
    location: "Seattle, WA",
    primaryContact: "Alex Kim, Support Lead",
    contractStatus: "Active",
    contractValue: "$45,000/yr",
    renewalDate: "Nov 2026",
    riskComponents: { behavioral: 18, threatIntel: 15, domainInfra: 22, community: 42, financial: 30 },
  },
  {
    id: "v6",
    name: "Sterling & Associates",
    domain: "sterling-assoc.com",
    riskScore: 12,
    severity: "low",
    scenario: "Clean, long-standing vendor relationship",
    activeSince: "Feb 2021",
    internalContacts: 52,
    departments: 5,
    openCases: 0,
    emails30d: 2103,
    industry: "Legal Services",
    size: "5,000+ employees",
    location: "Washington, DC",
    primaryContact: "Patricia Sterling, Managing Partner",
    contractStatus: "Active",
    contractValue: "$1,200,000/yr",
    renewalDate: "Feb 2027",
    riskComponents: { behavioral: 8, threatIntel: 5, domainInfra: 10, community: 12, financial: 6 },
  },
  {
    id: "v7",
    name: "quickbooks-invoicing.net",
    domain: "quickbooks-invoicing.net",
    riskScore: 95,
    severity: "critical",
    scenario: "Shadow vendor / impersonation, auto-blocked",
    activeSince: "Feb 2026",
    internalContacts: 4,
    departments: 1,
    openCases: 1,
    emails30d: 12,
    industry: "Unknown",
    size: "Unknown",
    location: "Unknown",
    primaryContact: "N/A",
    contractStatus: "None",
    contractValue: "N/A",
    renewalDate: "N/A",
    riskComponents: { behavioral: 95, threatIntel: 90, domainInfra: 98, community: 85, financial: 0 },
  },
]

// ---- Activity Feed ----
export const activityFeed: ActivityItem[] = [
  {
    id: "a1",
    time: "12:34 PM",
    level: "critical",
    vendor: "Acme Corp",
    description: "CRITICAL: Acme Corp risk score elevated to 92. New breach indicator detected. Case #VV-2847 created.",
  },
  {
    id: "a2",
    time: "11:15 AM",
    level: "warning",
    vendor: "Globex Partners",
    description: "Globex Partners: Anomalous login geography detected from vendor domain. Auto-quarantine applied to 3 pending emails.",
  },
  {
    id: "a3",
    time: "10:02 AM",
    level: "success",
    vendor: "DataFlow Inc",
    description: "DataFlow Inc: Elevated risk case #VV-2841 auto-resolved. Dark web mention confirmed as false positive after enrichment.",
  },
  {
    id: "a4",
    time: "9:45 AM",
    level: "info",
    vendor: "quickbooks-invoicing.net",
    description: "Shadow vendor detected: Unknown entity 'quickbooks-invoicing.net' communicating with 4 employees in Finance.",
  },
  {
    id: "a5",
    time: "9:12 AM",
    level: "success",
    vendor: "Prolia Systems",
    description: "Prolia Systems: Community risk report reviewed and confirmed false positive. Risk score unchanged.",
  },
  {
    id: "a6",
    time: "8:30 AM",
    level: "warning",
    vendor: "DataFlow Inc",
    description: "DataFlow Inc: D&B financial score dropped 15 points. Financial risk component elevated.",
  },
]

// ---- Risk Cases ----
export const riskCases: RiskCase[] = [
  {
    id: "VV-2847",
    vendorId: "v1",
    vendorName: "Acme Corp",
    vendorDomain: "acmecorp.com",
    severity: "critical",
    status: "open",
    summary: "Acme Corp domain appeared in HaveIBeenPwned breach database. 12 internal contacts at risk.",
    created: "23 min ago",
    tags: ["Breach Intel", "Behavioral", "Auto-Enriched"],
    statusLabel: "Awaiting Review",
    aiSummary:
      "Acme Corp (acmecorp.com) was identified in a breach disclosure published to HaveIBeenPwned on Feb 17, 2026. The breach reportedly exposed employee credentials including email/password pairs. Cross-referencing with VendorBase behavioral signals: Acme Corp has active email communication with 47 internal users across Engineering and Finance. No behavioral anomalies detected in email patterns yet, but 3 Acme contacts match exposed credential domains. Confidence: High (87%). Recommended: Quarantine pending Acme emails, notify affected internal users, trigger vendor security assessment.",
    evidence: [
      {
        source: "VendorBase Behavioral",
        sourceColor: "text-[#818CF8]",
        timestamp: "Feb 18, 2:15 PM",
        description: "Communication volume with Finance team increased 340% in past 7 days",
        confidence: 82,
      },
      {
        source: "Breach Intelligence",
        sourceColor: "text-[#EF4444]",
        timestamp: "Feb 17, 6:00 AM",
        description: "acmecorp.com found in HaveIBeenPwned database (Feb 17, 2026)",
        confidence: 95,
      },
      {
        source: "Dark Web",
        sourceColor: "text-[#F97316]",
        timestamp: "Feb 17, 11:30 PM",
        description: "3 credential pairs matching @acmecorp.com listed on dark web marketplace",
        confidence: 88,
      },
      {
        source: "Domain Reputation",
        sourceColor: "text-[#3B82F6]",
        timestamp: "Feb 15, 3:00 PM",
        description: "SPF record modified on Feb 15, MX record change detected",
        confidence: 71,
      },
      {
        source: "Community Intel",
        sourceColor: "text-[#22C55E]",
        timestamp: "Feb 18, 8:00 AM",
        description: "2 other Abnormal customers flagged Acme Corp vendor risk in past 48h",
        confidence: 76,
      },
    ],
    recommendedActions: [
      { id: "ra1", label: "Quarantine pending emails from Acme Corp (12 emails)", checked: true },
      { id: "ra2", label: "Notify affected internal users (47 users)", checked: true },
      { id: "ra3", label: "Escalate to Procurement for vendor review", checked: false },
      { id: "ra4", label: "Trigger automated vendor security questionnaire", checked: false },
      { id: "ra5", label: "Adjust email filtering policy to heightened scrutiny", checked: false },
    ],
  },
  {
    id: "VV-2845",
    vendorId: "v2",
    vendorName: "Globex Partners",
    vendorDomain: "globex.io",
    severity: "high",
    status: "in-progress",
    summary: "Anomalous login patterns detected from Globex Partners domain. Unusual geographic access from 3 new countries.",
    created: "2 hours ago",
    tags: ["Behavioral", "Domain Intel"],
    statusLabel: "AI Investigating",
    aiSummary:
      "Globex Partners (globex.io) exhibited anomalous login patterns starting Feb 18, 2026. The vendor's email domain showed authentication events from IP addresses in Romania, Brazil, and Vietnam — none of which are consistent with Globex's known operational footprint (US, UK). While no direct compromise indicators have been confirmed, behavioral analysis shows a 3x increase in emails with attachment content from Globex in the past 48 hours. Confidence: Medium (64%). Recommended: Apply enhanced email filtering, monitor for credential phishing indicators.",
    evidence: [
      {
        source: "VendorBase Behavioral",
        sourceColor: "text-[#818CF8]",
        timestamp: "Feb 18, 10:00 AM",
        description: "3x increase in attachment-bearing emails from Globex in 48h",
        confidence: 72,
      },
      {
        source: "Domain Reputation",
        sourceColor: "text-[#3B82F6]",
        timestamp: "Feb 18, 8:30 AM",
        description: "Login events from 3 new geographic locations (RO, BR, VN)",
        confidence: 68,
      },
      {
        source: "Community Intel",
        sourceColor: "text-[#22C55E]",
        timestamp: "Feb 18, 11:00 AM",
        description: "1 other Abnormal customer reported similar Globex anomalies",
        confidence: 55,
      },
    ],
    recommendedActions: [
      { id: "ra6", label: "Apply enhanced email filtering for Globex Partners", checked: true },
      { id: "ra7", label: "Monitor for credential phishing indicators", checked: true },
      { id: "ra8", label: "Contact Globex security team for verification", checked: false },
    ],
  },
  {
    id: "VV-2841",
    vendorId: "v3",
    vendorName: "DataFlow Inc",
    vendorDomain: "dataflow.com",
    severity: "high",
    status: "open",
    summary: "D&B financial score dropped significantly. Potential vendor instability risk.",
    created: "5 hours ago",
    tags: ["Financial Risk", "Auto-Enriched"],
    statusLabel: "Action Required",
    aiSummary:
      "DataFlow Inc (dataflow.com) triggered a financial risk alert after its Dun & Bradstreet Viability Rating dropped from 4 to 7 (on 1-9 scale, with 9 being highest risk). Contributing factors: recent layoff announcements (23% workforce reduction), delayed SEC filing, and two senior executive departures in Q1 2026. While no cybersecurity indicators are present, vendor financial instability increases supply chain risk. 31 internal users depend on DataFlow services across Engineering and Analytics. Confidence: High (91%). Recommended: Notify procurement, initiate contract contingency review.",
    evidence: [
      {
        source: "Financial Risk",
        sourceColor: "text-[#14B8A6]",
        timestamp: "Feb 18, 6:00 AM",
        description: "D&B Viability Rating dropped from 4 to 7 (elevated risk)",
        confidence: 91,
      },
      {
        source: "VendorBase Behavioral",
        sourceColor: "text-[#818CF8]",
        timestamp: "Feb 17, 2:00 PM",
        description: "Response times from DataFlow contacts increased 180% this week",
        confidence: 65,
      },
    ],
    recommendedActions: [
      { id: "ra9", label: "Notify procurement team for contract review", checked: true },
      { id: "ra10", label: "Initiate vendor contingency planning", checked: false },
      { id: "ra11", label: "Request financial health attestation from DataFlow", checked: false },
    ],
  },
  {
    id: "VV-2839",
    vendorId: "v7",
    vendorName: "quickbooks-invoicing.net",
    vendorDomain: "quickbooks-invoicing.net",
    severity: "critical",
    status: "auto-resolved",
    summary: "Shadow vendor impersonating QuickBooks detected and auto-blocked. Zero prior communication history.",
    created: "1 day ago",
    tags: ["Shadow Vendor", "Impersonation", "Auto-Blocked"],
    statusLabel: "Auto-Resolved",
    aiSummary:
      "A previously unknown entity 'quickbooks-invoicing.net' was detected sending emails to 4 employees in the Finance department. Domain analysis reveals this is not affiliated with Intuit/QuickBooks — the domain was registered 3 days ago, uses a hosting provider commonly associated with phishing campaigns, and has zero historical email communication with the organization. The AI agent has automatically quarantined all 12 emails from this domain and flagged it as an impersonation attempt. Confidence: Very High (96%). Action taken: Auto-quarantine + domain block.",
    evidence: [
      {
        source: "Domain Reputation",
        sourceColor: "text-[#3B82F6]",
        timestamp: "Feb 17, 4:00 PM",
        description: "Domain registered 3 days ago; hosting on known phishing infrastructure",
        confidence: 96,
      },
      {
        source: "VendorBase Behavioral",
        sourceColor: "text-[#818CF8]",
        timestamp: "Feb 17, 4:05 PM",
        description: "Zero prior communication history; 4 recipients all in Finance dept",
        confidence: 94,
      },
      {
        source: "Community Intel",
        sourceColor: "text-[#22C55E]",
        timestamp: "Feb 17, 5:00 PM",
        description: "Domain reported by 12 other Abnormal customers in past 24h",
        confidence: 98,
      },
    ],
    recommendedActions: [
      { id: "ra12", label: "Block domain permanently (completed)", checked: true },
      { id: "ra13", label: "Notify Finance department of attempted impersonation", checked: true },
    ],
  },
]

// ---- Intel Signals for Acme Corp ----
export const acmeIntelSignals: IntelSignal[] = [
  {
    id: "is1",
    timestamp: "Feb 18, 2:15 PM",
    source: "VendorBase Behavioral",
    sourceColor: "bg-[#818CF8]/10 text-[#818CF8]",
    signalType: "Behavioral Anomaly",
    description: "Communication volume with Finance team increased 340% in past 7 days",
    confidence: 82,
    status: "Active",
  },
  {
    id: "is2",
    timestamp: "Feb 17, 6:00 AM",
    source: "Breach Intelligence",
    sourceColor: "bg-[#EF4444]/10 text-[#EF4444]",
    signalType: "Credential Exposure",
    description: "acmecorp.com found in HaveIBeenPwned database (Feb 17, 2026)",
    confidence: 95,
    status: "Confirmed",
  },
  {
    id: "is3",
    timestamp: "Feb 17, 11:30 PM",
    source: "Dark Web Monitoring",
    sourceColor: "bg-[#F97316]/10 text-[#F97316]",
    signalType: "Credential Exposure",
    description: "3 credential pairs matching @acmecorp.com listed on dark web marketplace",
    confidence: 88,
    status: "Active",
  },
  {
    id: "is4",
    timestamp: "Feb 15, 3:00 PM",
    source: "Domain & Infrastructure",
    sourceColor: "bg-[#3B82F6]/10 text-[#3B82F6]",
    signalType: "Infrastructure Change",
    description: "SPF record modified on Feb 15, MX record change detected",
    confidence: 71,
    status: "Monitoring",
  },
  {
    id: "is5",
    timestamp: "Feb 18, 8:00 AM",
    source: "Community Intelligence",
    sourceColor: "bg-[#22C55E]/10 text-[#22C55E]",
    signalType: "Community Report",
    description: "2 other Abnormal customers flagged Acme Corp vendor risk in past 48h",
    confidence: 76,
    status: "Active",
  },
  {
    id: "is6",
    timestamp: "Feb 14, 10:00 AM",
    source: "Financial Risk",
    sourceColor: "bg-[#14B8A6]/10 text-[#14B8A6]",
    signalType: "Financial Distress",
    description: "No financial risk indicators detected. D&B score stable at 3 (low risk).",
    confidence: 90,
    status: "Clear",
  },
  {
    id: "is7",
    timestamp: "Feb 12, 1:00 PM",
    source: "VendorBase Behavioral",
    sourceColor: "bg-[#818CF8]/10 text-[#818CF8]",
    signalType: "Behavioral Anomaly",
    description: "Email response time from Acme contacts shifted 2h later than historical baseline",
    confidence: 45,
    status: "Resolved",
  },
]

// ---- Remediation Actions ----
export const pendingActions: RemediationAction[] = [
  {
    id: "pa1",
    type: "Quarantine Emails",
    description: "Quarantine all emails from vendor Globex Partners",
    trigger: "Triggered by Case #VV-2845: Anomalous login geography from vendor domain",
    impact: "Affects 23 pending emails to 8 internal recipients",
    confidence: 92,
    status: "pending",
  },
  {
    id: "pa2",
    type: "Escalate to Procurement",
    description: "Escalate DataFlow Inc contract for review due to financial instability",
    trigger: "Triggered by Case #VV-2841: D&B financial score drop",
    impact: "Notifies procurement team, flags $150K contract for contingency review",
    confidence: 88,
    status: "pending",
  },
  {
    id: "pa3",
    type: "Enhanced Monitoring",
    description: "Enable enhanced email monitoring for Initech Solutions domain",
    trigger: "Triggered by domain reputation change detected on initech.co",
    impact: "All emails from initech.co will be subject to enhanced content analysis",
    confidence: 65,
    status: "pending",
  },
]

export const executedActions: ExecutedAction[] = [
  {
    id: "ea1",
    timestamp: "2:15 PM",
    type: "Auto-quarantine",
    vendor: "quickbooks-invoicing.net",
    outcome: "success",
    description: "Auto-quarantined 5 emails from quickbooks-invoicing.net (shadow vendor). Reason: Unrecognized domain impersonating QuickBooks, 0 prior communication history.",
    reversible: true,
  },
  {
    id: "ea2",
    timestamp: "1:30 PM",
    type: "Escalation",
    vendor: "DataFlow Inc",
    outcome: "success",
    description: "Escalated DataFlow Inc risk case to procurement@company.com. Reason: Financial risk indicator (D&B score drop) + behavioral anomaly.",
    reversible: false,
  },
  {
    id: "ea3",
    timestamp: "11:00 AM",
    type: "Security Questionnaire",
    vendor: "Prolia Systems",
    outcome: "partial",
    description: "Attempted to trigger security questionnaire for Prolia Systems. Partial: Questionnaire sent, but vendor auto-responder returned OOO.",
    reversible: false,
  },
  {
    id: "ea4",
    timestamp: "9:00 AM",
    type: "Domain Block",
    vendor: "quickbooks-invoicing.net",
    outcome: "success",
    description: "Permanently blocked domain quickbooks-invoicing.net. Reason: Confirmed impersonation attempt targeting Finance department.",
    reversible: true,
  },
]

export const playbooks: Playbook[] = [
  {
    id: "pb1",
    name: "Breach Response",
    description: "Automated response to vendor breach indicators from threat intelligence feeds",
    trigger: "Triggers on breach feed match (HaveIBeenPwned, breach databases)",
    actions: ["Quarantine emails from affected vendor", "Notify internal contacts at risk", "Escalate to procurement for vendor review"],
    mode: "human-approval",
    enabled: true,
  },
  {
    id: "pb2",
    name: "Shadow Vendor Detection",
    description: "Identifies and responds to unrecognized vendor domains communicating with employees",
    trigger: "Triggers on new unrecognized vendor domain communication",
    actions: ["Flag for review", "Block if impersonation detected", "Create investigation case"],
    mode: "autonomous",
    enabled: true,
  },
  {
    id: "pb3",
    name: "Behavioral Anomaly",
    description: "Responds to significant deviations in vendor communication patterns",
    trigger: "Triggers on communication pattern deviation (>2 std dev from baseline)",
    actions: ["Elevate monitoring sensitivity", "Generate AI investigation summary", "Alert SOC if high confidence"],
    mode: "autonomous",
    enabled: true,
  },
  {
    id: "pb4",
    name: "Financial Risk Alert",
    description: "Monitors vendor financial health indicators and triggers procurement review",
    trigger: "Triggers on financial distress indicators (D&B, credit rating changes)",
    actions: ["Notify procurement team", "Flag contract for review", "Generate risk assessment"],
    mode: "notify-only",
    enabled: true,
  },
  {
    id: "pb5",
    name: "Credential Exposure Response",
    description: "Responds to vendor credentials appearing on dark web or breach databases",
    trigger: "Triggers on dark web credential match for vendor domains",
    actions: ["Alert affected internal users", "Enforce password reset for shared credentials", "Increase email filtering"],
    mode: "human-approval",
    enabled: false,
  },
]

// ---- Chart Data ----
export const riskDistributionOverTime = [
  { date: "Jan 22", critical: 2, high: 5, medium: 18, low: 3822 },
  { date: "Jan 29", critical: 3, high: 6, medium: 16, low: 3822 },
  { date: "Feb 5", critical: 2, high: 7, medium: 19, low: 3819 },
  { date: "Feb 12", critical: 4, high: 8, medium: 17, low: 3818 },
  { date: "Feb 19", critical: 5, high: 8, medium: 10, low: 3824 },
]

export const riskPostureTrend = [
  { month: "Nov", critical: 8, high: 14, medium: 28, low: 3797, autoRate: 52 },
  { month: "Dec", critical: 6, high: 12, medium: 24, low: 3805, autoRate: 58 },
  { month: "Jan", critical: 4, high: 9, medium: 20, low: 3814, autoRate: 65 },
  { month: "Feb", critical: 5, high: 8, medium: 10, low: 3824, autoRate: 73 },
]

export function getSeverityColor(severity: Severity): string {
  switch (severity) {
    case "critical": return "bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/20"
    case "high": return "bg-[#F97316]/10 text-[#F97316] border-[#F97316]/20"
    case "medium": return "bg-[#EAB308]/10 text-[#EAB308] border-[#EAB308]/20"
    case "low": return "bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/20"
  }
}

export function getSeverityDot(severity: Severity): string {
  switch (severity) {
    case "critical": return "bg-[#EF4444]"
    case "high": return "bg-[#F97316]"
    case "medium": return "bg-[#EAB308]"
    case "low": return "bg-[#22C55E]"
  }
}

export function getConfidenceColor(confidence: number): string {
  if (confidence >= 80) return "text-[#22C55E]"
  if (confidence >= 50) return "text-[#EAB308]"
  return "text-[#EF4444]"
}
