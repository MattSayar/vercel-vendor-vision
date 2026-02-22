// ============================================================
// VendorVision — Hardcoded Demo Data
// ============================================================

export type Severity = "critical" | "high" | "medium" | "low"
export type CaseStatus = "open" | "in-progress" | "auto-resolved" | "closed"

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
  vendorId: string
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
  actions: { step: string; result: "success" | "partial" | "failed" | "skipped" }[]
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
    openCases: 0,
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
  {
    id: "v8",
    name: "CloudSync Pro",
    domain: "cloudsyncpro.com",
    riskScore: 15,
    severity: "low",
    scenario: "Clean vendor, standard cloud storage provider",
    activeSince: "Apr 2022",
    internalContacts: 12,
    departments: 2,
    openCases: 0,
    emails30d: 340,
    industry: "Cloud Storage",
    size: "200–500 employees",
    location: "Portland, OR",
    primaryContact: "Derek Nguyen, Account Manager",
    contractStatus: "Active",
    contractValue: "$72,000/yr",
    renewalDate: "Apr 2027",
    riskComponents: { behavioral: 10, threatIntel: 8, domainInfra: 12, community: 15, financial: 18 },
  },
  {
    id: "v9",
    name: "NetGuard Ltd",
    domain: "netguard.co.uk",
    riskScore: 8,
    severity: "low",
    scenario: "Trusted network security provider, long history",
    activeSince: "Jan 2020",
    internalContacts: 6,
    departments: 1,
    openCases: 0,
    emails30d: 89,
    industry: "Network Security",
    size: "100–200 employees",
    location: "London, UK",
    primaryContact: "Emma Clarke, Sales Director",
    contractStatus: "Active",
    contractValue: "$38,000/yr",
    renewalDate: "Jan 2027",
    riskComponents: { behavioral: 5, threatIntel: 3, domainInfra: 8, community: 10, financial: 6 },
  },
  {
    id: "v10",
    name: "PayFlow Systems",
    domain: "payflowsys.com",
    riskScore: 11,
    severity: "low",
    scenario: "Payment processing vendor, PCI compliant",
    activeSince: "Sep 2021",
    internalContacts: 18,
    departments: 2,
    openCases: 0,
    emails30d: 520,
    industry: "Payment Processing",
    size: "500–1,000 employees",
    location: "Atlanta, GA",
    primaryContact: "Marcus Johnson, VP Partnerships",
    contractStatus: "Active",
    contractValue: "$195,000/yr",
    renewalDate: "Sep 2026",
    riskComponents: { behavioral: 6, threatIntel: 4, domainInfra: 10, community: 8, financial: 14 },
  },
  {
    id: "v11",
    name: "SecureStack",
    domain: "securestack.io",
    riskScore: 6,
    severity: "low",
    scenario: "Security tooling vendor, SOC 2 Type II certified",
    activeSince: "Jun 2021",
    internalContacts: 9,
    departments: 1,
    openCases: 0,
    emails30d: 142,
    industry: "Cybersecurity",
    size: "50–100 employees",
    location: "Denver, CO",
    primaryContact: "Rachel Torres, CTO",
    contractStatus: "Active",
    contractValue: "$55,000/yr",
    renewalDate: "Jun 2027",
    riskComponents: { behavioral: 3, threatIntel: 2, domainInfra: 5, community: 8, financial: 4 },
  },
  {
    id: "v12",
    name: "TechBridge Co",
    domain: "techbridge.co",
    riskScore: 19,
    severity: "low",
    scenario: "IT consulting firm, clean record with minor domain age flag",
    activeSince: "Mar 2023",
    internalContacts: 14,
    departments: 3,
    openCases: 0,
    emails30d: 278,
    industry: "IT Consulting",
    size: "100–200 employees",
    location: "Boston, MA",
    primaryContact: "Kevin Park, Engagement Lead",
    contractStatus: "Active",
    contractValue: "$110,000/yr",
    renewalDate: "Mar 2027",
    riskComponents: { behavioral: 12, threatIntel: 8, domainInfra: 22, community: 14, financial: 10 },
  },
]

// ---- Activity Feed ----
export const activityFeed: ActivityItem[] = [
  {
    id: "a1",
    time: "12:34 PM",
    level: "critical",
    vendor: "Acme Corp",
    vendorId: "v1",
    description: "CRITICAL: Acme Corp risk score elevated to 92. New breach indicator detected. Case #VV-2847 created.",
  },
  {
    id: "a2",
    time: "11:15 AM",
    level: "warning",
    vendor: "Globex Partners",
    vendorId: "v2",
    description: "Globex Partners: Anomalous login geography detected from vendor domain. Auto-quarantine applied to 3 pending emails.",
  },
  {
    id: "a3",
    time: "10:02 AM",
    level: "warning",
    vendor: "DataFlow Inc",
    vendorId: "v3",
    description: "DataFlow Inc: Case #VV-2841 escalated to Action Required. D&B Viability Rating dropped from 4 to 7, response times from vendor contacts increased 180%.",
  },
  {
    id: "a4",
    time: "9:45 AM",
    level: "info",
    vendor: "quickbooks-invoicing.net",
    vendorId: "v7",
    description: "Shadow vendor detected: Unknown entity 'quickbooks-invoicing.net' communicating with 4 employees in Finance.",
  },
  {
    id: "a5",
    time: "9:12 AM",
    level: "success",
    vendor: "Prolia Systems",
    vendorId: "v5",
    description: "Prolia Systems: Community risk report reviewed and confirmed false positive. Risk score unchanged.",
  },
  {
    id: "a6",
    time: "8:30 AM",
    level: "warning",
    vendor: "DataFlow Inc",
    vendorId: "v3",
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
        sourceColor: "text-purple",
        timestamp: "Feb 18, 2:15 PM",
        description: "Communication volume with Finance team increased 340% in past 7 days",
        confidence: 82,
      },
      {
        source: "Breach Intelligence",
        sourceColor: "text-danger",
        timestamp: "Feb 17, 6:00 AM",
        description: "acmecorp.com found in HaveIBeenPwned database (Feb 17, 2026)",
        confidence: 95,
      },
      {
        source: "Dark Web",
        sourceColor: "text-orange",
        timestamp: "Feb 17, 11:30 PM",
        description: "3 credential pairs matching @acmecorp.com listed on dark web marketplace",
        confidence: 88,
      },
      {
        source: "Domain Reputation",
        sourceColor: "text-info",
        timestamp: "Feb 15, 3:00 PM",
        description: "SPF record modified on Feb 15, MX record change detected",
        confidence: 71,
      },
      {
        source: "Community Intel",
        sourceColor: "text-success",
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
    id: "VV-2846",
    vendorId: "v1",
    vendorName: "Acme Corp",
    vendorDomain: "acmecorp.com",
    severity: "high",
    status: "open",
    summary: "Unusual file-sharing activity detected from Acme Corp. 8 sensitive documents accessed outside normal business hours.",
    created: "4 hours ago",
    tags: ["Behavioral", "Data Exfiltration Risk"],
    statusLabel: "Action Required",
    aiSummary:
      "Acme Corp (acmecorp.com) triggered a behavioral anomaly alert after 8 shared documents in the Engineering folder were accessed via Acme-linked service accounts between 1:00–3:00 AM EST — well outside established business hours for this vendor. The accessed files include architecture diagrams and API documentation classified as 'Internal Only.' While this may correlate with the ongoing breach investigation (VV-2847), the access pattern suggests potential data staging for exfiltration. No outbound transfers detected yet. Confidence: Medium-High (78%). Recommended: Restrict file-sharing permissions, audit recent downloads, correlate with VV-2847 breach timeline.",
    evidence: [
      {
        source: "VendorBase Behavioral",
        sourceColor: "text-purple",
        timestamp: "Feb 18, 2:45 AM",
        description: "8 sensitive documents accessed outside normal business hours (1:00–3:00 AM EST)",
        confidence: 78,
      },
      {
        source: "Domain Reputation",
        sourceColor: "text-info",
        timestamp: "Feb 18, 3:00 AM",
        description: "Access originated from IP range not previously associated with Acme Corp",
        confidence: 72,
      },
      {
        source: "Community Intel",
        sourceColor: "text-success",
        timestamp: "Feb 18, 9:00 AM",
        description: "Similar file-access anomalies reported by 1 other Abnormal customer for Acme Corp",
        confidence: 61,
      },
    ],
    recommendedActions: [
      { id: "ra14", label: "Restrict file-sharing permissions for Acme Corp service accounts", checked: true },
      { id: "ra15", label: "Audit all document downloads from Acme-linked accounts (past 72h)", checked: false },
      { id: "ra16", label: "Correlate timeline with breach investigation VV-2847", checked: false },
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
        sourceColor: "text-purple",
        timestamp: "Feb 18, 10:00 AM",
        description: "3x increase in attachment-bearing emails from Globex in 48h",
        confidence: 72,
      },
      {
        source: "Domain Reputation",
        sourceColor: "text-info",
        timestamp: "Feb 18, 8:30 AM",
        description: "Login events from 3 new geographic locations (RO, BR, VN)",
        confidence: 68,
      },
      {
        source: "Community Intel",
        sourceColor: "text-success",
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
        sourceColor: "text-purple",
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
        sourceColor: "text-info",
        timestamp: "Feb 17, 4:00 PM",
        description: "Domain registered 3 days ago; hosting on known phishing infrastructure",
        confidence: 96,
      },
      {
        source: "VendorBase Behavioral",
        sourceColor: "text-purple",
        timestamp: "Feb 17, 4:05 PM",
        description: "Zero prior communication history; 4 recipients all in Finance dept",
        confidence: 94,
      },
      {
        source: "Community Intel",
        sourceColor: "text-success",
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

// ---- Per-Vendor Detail Data ----
export interface VendorDetailData {
  historicalRisk: { date: string; score: number }[]
  departmentContacts: { dept: string; contacts: number; color: string }[]
  emailActivity: { day: string; sent: number; received: number; anomaly?: boolean }[]
  emailMetadata: { date: string; from: string; to: string; subject: string; attachment: boolean; anomaly: boolean }[]
  intelSignals: IntelSignal[]
  auditEntries: { date: string; action: string; by: string }[]
}

export const vendorDetailData: Record<string, VendorDetailData> = {
  v1: {
    historicalRisk: [
      { date: "Nov", score: 35 },
      { date: "Dec", score: 48 },
      { date: "Jan", score: 74 },
      { date: "Feb", score: 92 },
    ],
    departmentContacts: [
      { dept: "Engineering", contacts: 18, color: "var(--info)" },
      { dept: "Finance", contacts: 14, color: "var(--success)" },
      { dept: "Legal", contacts: 8, color: "var(--purple)" },
      { dept: "Operations", contacts: 7, color: "var(--orange)" },
    ],
    emailActivity: [
      { day: "Feb 1", sent: 12, received: 38 },
      { day: "Feb 4", sent: 15, received: 42 },
      { day: "Feb 7", sent: 8, received: 35 },
      { day: "Feb 10", sent: 22, received: 65 },
      { day: "Feb 13", sent: 18, received: 48 },
      { day: "Feb 16", sent: 45, received: 120, anomaly: true },
      { day: "Feb 19", sent: 38, received: 95 },
    ],
    emailMetadata: [
      { date: "Feb 18", from: "s.chen@acmecorp.com", to: "j.doe@company.com", subject: "RE: Q1 Integration Timeline", attachment: true, anomaly: false },
      { date: "Feb 18", from: "billing@acmecorp.com", to: "finance@company.com", subject: "Invoice #ACM-2026-0218", attachment: true, anomaly: true },
      { date: "Feb 17", from: "j.doe@company.com", to: "support@acmecorp.com", subject: "API Rate Limit Issue", attachment: false, anomaly: false },
      { date: "Feb 17", from: "noreply@acmecorp.com", to: "m.torres@company.com", subject: "Security Advisory: Action Required", attachment: true, anomaly: true },
      { date: "Feb 16", from: "s.chen@acmecorp.com", to: "engineering@company.com", subject: "Updated SDK Documentation", attachment: true, anomaly: false },
    ],
    intelSignals: [
      { id: "is1", timestamp: "Feb 18, 2:15 PM", source: "VendorBase Behavioral", sourceColor: "bg-purple/10 text-purple", signalType: "Behavioral Anomaly", description: "Communication volume with Finance team increased 340% in past 7 days", confidence: 82, status: "Active" },
      { id: "is2", timestamp: "Feb 17, 6:00 AM", source: "Breach Intelligence", sourceColor: "bg-danger/10 text-danger", signalType: "Credential Exposure", description: "acmecorp.com found in HaveIBeenPwned database (Feb 17, 2026)", confidence: 95, status: "Confirmed" },
      { id: "is3", timestamp: "Feb 17, 11:30 PM", source: "Dark Web Monitoring", sourceColor: "bg-orange/10 text-orange", signalType: "Credential Exposure", description: "3 credential pairs matching @acmecorp.com listed on dark web marketplace", confidence: 88, status: "Active" },
      { id: "is4", timestamp: "Feb 15, 3:00 PM", source: "Domain & Infrastructure", sourceColor: "bg-info/10 text-info", signalType: "Infrastructure Change", description: "SPF record modified on Feb 15, MX record change detected", confidence: 71, status: "Monitoring" },
      { id: "is5", timestamp: "Feb 18, 8:00 AM", source: "Community Intelligence", sourceColor: "bg-success/10 text-success", signalType: "Community Report", description: "2 other Abnormal customers flagged Acme Corp vendor risk in past 48h", confidence: 76, status: "Active" },
      { id: "is6", timestamp: "Feb 14, 10:00 AM", source: "Financial Risk", sourceColor: "bg-[#14B8A6]/10 text-[#14B8A6]", signalType: "Financial Distress", description: "No financial risk indicators detected. D&B score stable at 3 (low risk).", confidence: 90, status: "Clear" },
      { id: "is7", timestamp: "Feb 12, 1:00 PM", source: "VendorBase Behavioral", sourceColor: "bg-purple/10 text-purple", signalType: "Behavioral Anomaly", description: "Email response time from Acme contacts shifted 2h later than historical baseline", confidence: 45, status: "Resolved" },
    ],
    auditEntries: [
      { date: "Feb 18, 2:15 PM", action: "Case #VV-2847 created — Breach indicator detected", by: "AI Agent" },
      { date: "Feb 17, 4:00 PM", action: "Risk score updated: 74 → 92 (Critical)", by: "System" },
      { date: "Feb 15, 3:00 PM", action: "Domain infrastructure change detected (SPF/MX)", by: "AI Agent" },
      { date: "Feb 10, 9:00 AM", action: "Quarterly vendor assessment completed — Score: 74", by: "Jane Doe" },
      { date: "Jan 15, 11:00 AM", action: "Vendor profile reviewed — No action required", by: "Jane Doe" },
    ],
  },
  v2: {
    historicalRisk: [
      { date: "Nov", score: 42 },
      { date: "Dec", score: 51 },
      { date: "Jan", score: 62 },
      { date: "Feb", score: 74 },
    ],
    departmentContacts: [
      { dept: "Finance", contacts: 10, color: "var(--success)" },
      { dept: "Engineering", contacts: 8, color: "var(--info)" },
      { dept: "Compliance", contacts: 5, color: "var(--purple)" },
    ],
    emailActivity: [
      { day: "Feb 1", sent: 8, received: 22 },
      { day: "Feb 4", sent: 10, received: 18 },
      { day: "Feb 7", sent: 6, received: 20 },
      { day: "Feb 10", sent: 9, received: 24 },
      { day: "Feb 13", sent: 7, received: 19 },
      { day: "Feb 16", sent: 22, received: 58, anomaly: true },
      { day: "Feb 19", sent: 15, received: 42 },
    ],
    emailMetadata: [
      { date: "Feb 18", from: "j.rodriguez@globex.io", to: "finance@company.com", subject: "Q1 Portfolio Review Deck", attachment: true, anomaly: false },
      { date: "Feb 18", from: "reports@globex.io", to: "compliance@company.com", subject: "Monthly Risk Metrics Export", attachment: true, anomaly: true },
      { date: "Feb 17", from: "j.doe@company.com", to: "support@globex.io", subject: "API Latency Issues — Ticket #GL-4421", attachment: false, anomaly: false },
      { date: "Feb 16", from: "noreply@globex.io", to: "m.torres@company.com", subject: "Scheduled Maintenance Window Feb 20", attachment: false, anomaly: false },
      { date: "Feb 16", from: "billing@globex.io", to: "finance@company.com", subject: "Invoice #GLX-2026-0216", attachment: true, anomaly: true },
    ],
    intelSignals: [
      { id: "gis1", timestamp: "Feb 18, 10:00 AM", source: "VendorBase Behavioral", sourceColor: "bg-purple/10 text-purple", signalType: "Behavioral Anomaly", description: "3x increase in attachment-bearing emails from Globex in 48h", confidence: 72, status: "Active" },
      { id: "gis2", timestamp: "Feb 18, 8:30 AM", source: "Domain & Infrastructure", sourceColor: "bg-info/10 text-info", signalType: "Login Anomaly", description: "Login events from 3 new geographic locations (RO, BR, VN)", confidence: 68, status: "Active" },
      { id: "gis3", timestamp: "Feb 18, 11:00 AM", source: "Community Intelligence", sourceColor: "bg-success/10 text-success", signalType: "Community Report", description: "1 other Abnormal customer reported similar Globex anomalies", confidence: 55, status: "Active" },
      { id: "gis4", timestamp: "Feb 14, 9:00 AM", source: "Financial Risk", sourceColor: "bg-[#14B8A6]/10 text-[#14B8A6]", signalType: "Financial Health", description: "No financial risk indicators. D&B score stable at 4.", confidence: 85, status: "Clear" },
      { id: "gis5", timestamp: "Feb 10, 2:00 PM", source: "VendorBase Behavioral", sourceColor: "bg-purple/10 text-purple", signalType: "Behavioral Baseline", description: "Email volume within normal range. No anomalies detected.", confidence: 90, status: "Resolved" },
    ],
    auditEntries: [
      { date: "Feb 18, 10:30 AM", action: "Case #VV-2845 created — Anomalous login geography detected", by: "AI Agent" },
      { date: "Feb 18, 8:30 AM", action: "Risk score updated: 62 → 74 (High)", by: "System" },
      { date: "Feb 16, 11:00 AM", action: "Enhanced email filtering applied to globex.io", by: "AI Agent" },
      { date: "Feb 1, 10:00 AM", action: "Quarterly vendor assessment completed — Score: 62", by: "Jane Doe" },
      { date: "Dec 15, 3:00 PM", action: "Vendor profile reviewed — Monitoring continued", by: "Jane Doe" },
    ],
  },
  v3: {
    historicalRisk: [
      { date: "Nov", score: 30 },
      { date: "Dec", score: 38 },
      { date: "Jan", score: 59 },
      { date: "Feb", score: 68 },
    ],
    departmentContacts: [
      { dept: "Engineering", contacts: 19, color: "var(--info)" },
      { dept: "Analytics", contacts: 12, color: "var(--purple)" },
    ],
    emailActivity: [
      { day: "Feb 1", sent: 14, received: 32 },
      { day: "Feb 4", sent: 16, received: 28 },
      { day: "Feb 7", sent: 12, received: 30 },
      { day: "Feb 10", sent: 10, received: 25 },
      { day: "Feb 13", sent: 8, received: 18 },
      { day: "Feb 16", sent: 5, received: 12 },
      { day: "Feb 19", sent: 4, received: 10 },
    ],
    emailMetadata: [
      { date: "Feb 18", from: "m.gonzalez@dataflow.com", to: "engineering@company.com", subject: "RE: Data Pipeline Migration Status", attachment: false, anomaly: false },
      { date: "Feb 17", from: "support@dataflow.com", to: "j.doe@company.com", subject: "Ticket #DF-8812 — Response Time Degradation", attachment: false, anomaly: false },
      { date: "Feb 16", from: "billing@dataflow.com", to: "finance@company.com", subject: "Invoice #DF-2026-0216 — Payment Terms Update", attachment: true, anomaly: true },
      { date: "Feb 14", from: "j.doe@company.com", to: "m.gonzalez@dataflow.com", subject: "Contract Contingency Discussion", attachment: false, anomaly: false },
      { date: "Feb 12", from: "noreply@dataflow.com", to: "engineering@company.com", subject: "Scheduled Maintenance — Reduced Capacity Feb 15-17", attachment: false, anomaly: false },
    ],
    intelSignals: [
      { id: "dis1", timestamp: "Feb 18, 6:00 AM", source: "Financial Risk", sourceColor: "bg-[#14B8A6]/10 text-[#14B8A6]", signalType: "Financial Distress", description: "D&B Viability Rating dropped from 4 to 7 (elevated risk)", confidence: 91, status: "Confirmed" },
      { id: "dis2", timestamp: "Feb 17, 2:00 PM", source: "VendorBase Behavioral", sourceColor: "bg-purple/10 text-purple", signalType: "Behavioral Anomaly", description: "Response times from DataFlow contacts increased 180% this week", confidence: 65, status: "Active" },
      { id: "dis3", timestamp: "Feb 15, 10:00 AM", source: "Financial Risk", sourceColor: "bg-[#14B8A6]/10 text-[#14B8A6]", signalType: "Workforce Change", description: "Layoff announcements: 23% workforce reduction reported in SEC filing", confidence: 88, status: "Confirmed" },
      { id: "dis4", timestamp: "Feb 12, 8:00 AM", source: "Financial Risk", sourceColor: "bg-[#14B8A6]/10 text-[#14B8A6]", signalType: "Executive Departure", description: "CTO and VP Engineering departures confirmed via LinkedIn", confidence: 82, status: "Active" },
      { id: "dis5", timestamp: "Feb 8, 11:00 AM", source: "Domain & Infrastructure", sourceColor: "bg-info/10 text-info", signalType: "Infrastructure Change", description: "No domain or infrastructure anomalies detected", confidence: 92, status: "Clear" },
    ],
    auditEntries: [
      { date: "Feb 18, 6:30 AM", action: "Case #VV-2841 created — D&B financial score drop detected", by: "AI Agent" },
      { date: "Feb 17, 2:00 PM", action: "Risk score updated: 59 → 68 (High)", by: "System" },
      { date: "Feb 15, 10:30 AM", action: "Financial risk component elevated — Workforce reduction signal", by: "AI Agent" },
      { date: "Feb 1, 9:00 AM", action: "Quarterly vendor assessment completed — Score: 59", by: "Jane Doe" },
      { date: "Nov 20, 2:00 PM", action: "Vendor onboarded — Initial assessment score: 30", by: "Jane Doe" },
    ],
  },
  v4: {
    historicalRisk: [
      { date: "Nov", score: 50 },
      { date: "Dec", score: 47 },
      { date: "Jan", score: 42 },
      { date: "Feb", score: 45 },
    ],
    departmentContacts: [
      { dept: "IT", contacts: 9, color: "var(--info)" },
      { dept: "Operations", contacts: 6, color: "var(--orange)" },
    ],
    emailActivity: [
      { day: "Feb 1", sent: 4, received: 10 },
      { day: "Feb 4", sent: 5, received: 12 },
      { day: "Feb 7", sent: 3, received: 8 },
      { day: "Feb 10", sent: 6, received: 14 },
      { day: "Feb 13", sent: 4, received: 11 },
      { day: "Feb 16", sent: 5, received: 10 },
      { day: "Feb 19", sent: 4, received: 9 },
    ],
    emailMetadata: [
      { date: "Feb 18", from: "b.lumbergh@initech.co", to: "it@company.com", subject: "RE: Monthly License Renewal", attachment: true, anomaly: false },
      { date: "Feb 16", from: "support@initech.co", to: "j.doe@company.com", subject: "Ticket #IN-2201 — Resolved", attachment: false, anomaly: false },
      { date: "Feb 14", from: "j.doe@company.com", to: "b.lumbergh@initech.co", subject: "Service Level Review Q1", attachment: false, anomaly: false },
      { date: "Feb 10", from: "noreply@initech.co", to: "it@company.com", subject: "Patch Notes v4.2.1", attachment: true, anomaly: false },
    ],
    intelSignals: [
      { id: "iis1", timestamp: "Feb 16, 9:00 AM", source: "Domain & Infrastructure", sourceColor: "bg-info/10 text-info", signalType: "Domain Reputation", description: "Minor DMARC policy change detected on initech.co — p=quarantine → p=none", confidence: 58, status: "Monitoring" },
      { id: "iis2", timestamp: "Feb 10, 3:00 PM", source: "VendorBase Behavioral", sourceColor: "bg-purple/10 text-purple", signalType: "Behavioral Baseline", description: "Email volume and patterns within normal range", confidence: 90, status: "Clear" },
      { id: "iis3", timestamp: "Feb 5, 11:00 AM", source: "Financial Risk", sourceColor: "bg-[#14B8A6]/10 text-[#14B8A6]", signalType: "Financial Health", description: "D&B score stable at 5 (moderate). No change.", confidence: 85, status: "Clear" },
    ],
    auditEntries: [
      { date: "Feb 16, 9:30 AM", action: "Domain reputation change detected — DMARC policy modified", by: "AI Agent" },
      { date: "Feb 10, 9:00 AM", action: "Quarterly vendor assessment completed — Score: 45", by: "Jane Doe" },
      { date: "Nov 15, 2:00 PM", action: "Vendor profile reviewed — Score: 42, no action required", by: "Jane Doe" },
    ],
  },
  v5: {
    historicalRisk: [
      { date: "Nov", score: 55 },
      { date: "Dec", score: 48 },
      { date: "Jan", score: 43 },
      { date: "Feb", score: 38 },
    ],
    departmentContacts: [
      { dept: "Engineering", contacts: 8, color: "var(--info)" },
    ],
    emailActivity: [
      { day: "Feb 1", sent: 2, received: 6 },
      { day: "Feb 4", sent: 3, received: 5 },
      { day: "Feb 7", sent: 2, received: 4 },
      { day: "Feb 10", sent: 1, received: 5 },
      { day: "Feb 13", sent: 2, received: 4 },
      { day: "Feb 16", sent: 3, received: 6 },
      { day: "Feb 19", sent: 2, received: 5 },
    ],
    emailMetadata: [
      { date: "Feb 18", from: "a.kim@proliasys.com", to: "engineering@company.com", subject: "Infrastructure Status — All Systems Normal", attachment: false, anomaly: false },
      { date: "Feb 14", from: "j.doe@company.com", to: "support@proliasys.com", subject: "Capacity Planning for Q2", attachment: true, anomaly: false },
      { date: "Feb 10", from: "noreply@proliasys.com", to: "engineering@company.com", subject: "Maintenance Complete — No Downtime", attachment: false, anomaly: false },
    ],
    intelSignals: [
      { id: "pis1", timestamp: "Feb 12, 10:00 AM", source: "Community Intelligence", sourceColor: "bg-success/10 text-success", signalType: "Community Report", description: "Previous community risk report reviewed — confirmed false positive", confidence: 88, status: "Resolved" },
      { id: "pis2", timestamp: "Feb 5, 2:00 PM", source: "VendorBase Behavioral", sourceColor: "bg-purple/10 text-purple", signalType: "Behavioral Baseline", description: "All communication patterns within normal range", confidence: 92, status: "Clear" },
      { id: "pis3", timestamp: "Jan 20, 9:00 AM", source: "Domain & Infrastructure", sourceColor: "bg-info/10 text-info", signalType: "Infrastructure Check", description: "SSL cert renewed. No anomalies in DNS or hosting.", confidence: 95, status: "Clear" },
    ],
    auditEntries: [
      { date: "Feb 12, 10:30 AM", action: "Community risk report dismissed — Confirmed false positive", by: "AI Agent" },
      { date: "Feb 12, 10:00 AM", action: "Risk score updated: 43 → 38 (Medium)", by: "System" },
      { date: "Feb 1, 9:00 AM", action: "Quarterly vendor assessment completed — Score: 43", by: "Jane Doe" },
      { date: "Nov 10, 11:00 AM", action: "Vendor onboarded — Initial assessment score: 55", by: "Jane Doe" },
    ],
  },
  v6: {
    historicalRisk: [
      { date: "Nov", score: 14 },
      { date: "Dec", score: 13 },
      { date: "Jan", score: 12 },
      { date: "Feb", score: 12 },
    ],
    departmentContacts: [
      { dept: "Legal", contacts: 16, color: "var(--purple)" },
      { dept: "Compliance", contacts: 12, color: "var(--success)" },
      { dept: "Finance", contacts: 10, color: "#14B8A6" },
      { dept: "Executive", contacts: 8, color: "var(--orange)" },
      { dept: "Operations", contacts: 6, color: "var(--info)" },
    ],
    emailActivity: [
      { day: "Feb 1", sent: 30, received: 68 },
      { day: "Feb 4", sent: 28, received: 72 },
      { day: "Feb 7", sent: 32, received: 65 },
      { day: "Feb 10", sent: 35, received: 70 },
      { day: "Feb 13", sent: 30, received: 74 },
      { day: "Feb 16", sent: 33, received: 71 },
      { day: "Feb 19", sent: 31, received: 68 },
    ],
    emailMetadata: [
      { date: "Feb 18", from: "p.sterling@sterling-assoc.com", to: "legal@company.com", subject: "RE: Master Services Agreement — Redline v3", attachment: true, anomaly: false },
      { date: "Feb 17", from: "billing@sterling-assoc.com", to: "finance@company.com", subject: "Invoice #STA-2026-0217 — February Retainer", attachment: true, anomaly: false },
      { date: "Feb 16", from: "j.doe@company.com", to: "p.sterling@sterling-assoc.com", subject: "Board Meeting Prep Materials", attachment: true, anomaly: false },
      { date: "Feb 14", from: "compliance@sterling-assoc.com", to: "compliance@company.com", subject: "Annual Compliance Certification — 2026", attachment: true, anomaly: false },
    ],
    intelSignals: [
      { id: "sis1", timestamp: "Feb 15, 9:00 AM", source: "VendorBase Behavioral", sourceColor: "bg-purple/10 text-purple", signalType: "Behavioral Baseline", description: "All communication patterns stable. Volume consistent with 5-year baseline.", confidence: 96, status: "Clear" },
      { id: "sis2", timestamp: "Feb 10, 2:00 PM", source: "Financial Risk", sourceColor: "bg-[#14B8A6]/10 text-[#14B8A6]", signalType: "Financial Health", description: "D&B score stable at 2 (low risk). Excellent financial health.", confidence: 94, status: "Clear" },
      { id: "sis3", timestamp: "Feb 5, 11:00 AM", source: "Domain & Infrastructure", sourceColor: "bg-info/10 text-info", signalType: "Infrastructure Check", description: "All domain records nominal. DMARC/SPF/DKIM fully configured.", confidence: 97, status: "Clear" },
    ],
    auditEntries: [
      { date: "Feb 10, 9:00 AM", action: "Quarterly vendor assessment completed — Score: 12 (Low Risk)", by: "Jane Doe" },
      { date: "Nov 12, 2:00 PM", action: "Annual vendor review completed — Score: 14, exemplary record", by: "Jane Doe" },
      { date: "Feb 15, 2021", action: "Vendor onboarded — Initial assessment score: 10", by: "Jane Doe" },
    ],
  },
  v7: {
    historicalRisk: [
      { date: "Feb 17", score: 95 },
    ],
    departmentContacts: [
      { dept: "Finance", contacts: 4, color: "var(--success)" },
    ],
    emailActivity: [
      { day: "Feb 17", sent: 0, received: 8, anomaly: true },
      { day: "Feb 18", sent: 0, received: 4, anomaly: true },
    ],
    emailMetadata: [
      { date: "Feb 18", from: "billing@quickbooks-invoicing.net", to: "finance@company.com", subject: "URGENT: Invoice #QB-99281 Past Due — Immediate Action Required", attachment: true, anomaly: true },
      { date: "Feb 17", from: "support@quickbooks-invoicing.net", to: "ap@company.com", subject: "Your QuickBooks Subscription — Verify Payment Method", attachment: true, anomaly: true },
      { date: "Feb 17", from: "noreply@quickbooks-invoicing.net", to: "finance@company.com", subject: "Account Suspended — Click to Reactivate", attachment: false, anomaly: true },
    ],
    intelSignals: [
      { id: "qis1", timestamp: "Feb 17, 4:00 PM", source: "Domain & Infrastructure", sourceColor: "bg-info/10 text-info", signalType: "Suspicious Domain", description: "Domain registered 3 days ago; hosting on known phishing infrastructure", confidence: 96, status: "Confirmed" },
      { id: "qis2", timestamp: "Feb 17, 4:05 PM", source: "VendorBase Behavioral", sourceColor: "bg-purple/10 text-purple", signalType: "Shadow Vendor", description: "Zero prior communication history; 4 recipients all in Finance dept", confidence: 94, status: "Confirmed" },
      { id: "qis3", timestamp: "Feb 17, 5:00 PM", source: "Community Intelligence", sourceColor: "bg-success/10 text-success", signalType: "Community Report", description: "Domain reported by 12 other Abnormal customers in past 24h", confidence: 98, status: "Confirmed" },
    ],
    auditEntries: [
      { date: "Feb 17, 5:30 PM", action: "Domain quickbooks-invoicing.net permanently blocked", by: "AI Agent" },
      { date: "Feb 17, 4:10 PM", action: "Case #VV-2839 auto-resolved — Shadow vendor impersonation confirmed", by: "AI Agent" },
      { date: "Feb 17, 4:05 PM", action: "12 emails auto-quarantined from quickbooks-invoicing.net", by: "AI Agent" },
      { date: "Feb 17, 4:00 PM", action: "Shadow vendor detected — quickbooks-invoicing.net, risk score: 95", by: "System" },
    ],
  },
  v8: {
    historicalRisk: [
      { date: "Sep", score: 12 }, { date: "Oct", score: 14 }, { date: "Nov", score: 13 },
      { date: "Dec", score: 15 }, { date: "Jan", score: 14 }, { date: "Feb", score: 15 },
    ],
    departmentContacts: [
      { dept: "Engineering", contacts: 8, color: "var(--info)" },
      { dept: "IT", contacts: 4, color: "var(--orange)" },
    ],
    emailActivity: [
      { day: "Feb 1", sent: 6, received: 14 }, { day: "Feb 4", sent: 8, received: 16 },
      { day: "Feb 7", sent: 5, received: 12 }, { day: "Feb 10", sent: 7, received: 18 },
      { day: "Feb 13", sent: 6, received: 15 }, { day: "Feb 16", sent: 8, received: 14 },
      { day: "Feb 19", sent: 7, received: 16 },
    ],
    emailMetadata: [
      { date: "Feb 19", from: "sync@cloudsyncpro.com", to: "eng@company.com", subject: "Storage quota update for Q1", attachment: false, anomaly: false },
      { date: "Feb 18", from: "support@cloudsyncpro.com", to: "it@company.com", subject: "Scheduled maintenance window Feb 22", attachment: true, anomaly: false },
    ],
    intelSignals: [
      { id: "cs1", timestamp: "Jan 15, 10:00 AM", source: "Domain & Infrastructure", sourceColor: "bg-info/10 text-info", signalType: "SSL Renewal", description: "SSL certificate renewed on schedule; no anomalies", confidence: 95, status: "Clear" },
    ],
    auditEntries: [
      { date: "Feb 10", action: "Annual vendor review completed — no issues found", by: "Jane Doe" },
      { date: "Jan 15", action: "SSL certificate renewal verified", by: "System" },
    ],
  },
  v9: {
    historicalRisk: [
      { date: "Sep", score: 10 }, { date: "Oct", score: 9 }, { date: "Nov", score: 8 },
      { date: "Dec", score: 8 }, { date: "Jan", score: 7 }, { date: "Feb", score: 8 },
    ],
    departmentContacts: [
      { dept: "IT", contacts: 6, color: "var(--info)" },
    ],
    emailActivity: [
      { day: "Feb 1", sent: 1, received: 4 }, { day: "Feb 4", sent: 2, received: 3 },
      { day: "Feb 7", sent: 1, received: 5 }, { day: "Feb 10", sent: 2, received: 4 },
      { day: "Feb 13", sent: 1, received: 3 }, { day: "Feb 16", sent: 2, received: 4 },
      { day: "Feb 19", sent: 1, received: 3 },
    ],
    emailMetadata: [
      { date: "Feb 18", from: "alerts@netguard.co.uk", to: "soc@company.com", subject: "Monthly threat report — January 2026", attachment: true, anomaly: false },
    ],
    intelSignals: [
      { id: "ng1", timestamp: "Feb 1, 9:00 AM", source: "Community Intelligence", sourceColor: "bg-success/10 text-success", signalType: "Reputation Check", description: "NetGuard maintains clean reputation across all community feeds", confidence: 98, status: "Clear" },
    ],
    auditEntries: [
      { date: "Feb 1", action: "Quarterly security review — SOC 2 report received", by: "Jane Doe" },
    ],
  },
  v10: {
    historicalRisk: [
      { date: "Sep", score: 14 }, { date: "Oct", score: 12 }, { date: "Nov", score: 11 },
      { date: "Dec", score: 10 }, { date: "Jan", score: 12 }, { date: "Feb", score: 11 },
    ],
    departmentContacts: [
      { dept: "Finance", contacts: 12, color: "var(--success)" },
      { dept: "Operations", contacts: 6, color: "var(--orange)" },
    ],
    emailActivity: [
      { day: "Feb 1", sent: 10, received: 22 }, { day: "Feb 4", sent: 12, received: 25 },
      { day: "Feb 7", sent: 8, received: 20 }, { day: "Feb 10", sent: 14, received: 28 },
      { day: "Feb 13", sent: 10, received: 24 }, { day: "Feb 16", sent: 12, received: 22 },
      { day: "Feb 19", sent: 11, received: 26 },
    ],
    emailMetadata: [
      { date: "Feb 19", from: "settlements@payflowsys.com", to: "finance@company.com", subject: "Daily settlement report — Feb 19", attachment: true, anomaly: false },
      { date: "Feb 18", from: "support@payflowsys.com", to: "ops@company.com", subject: "PCI DSS compliance certificate renewed", attachment: true, anomaly: false },
    ],
    intelSignals: [
      { id: "pf1", timestamp: "Jan 20, 2:00 PM", source: "Financial Intelligence", sourceColor: "bg-[#14B8A6]/10 text-[#14B8A6]", signalType: "Financial Health", description: "PayFlow Systems annual revenue growth 18%; no financial risk indicators", confidence: 92, status: "Clear" },
    ],
    auditEntries: [
      { date: "Feb 15", action: "PCI DSS compliance certificate renewed and verified", by: "System" },
      { date: "Jan 20", action: "Financial health check completed — stable", by: "AI Agent" },
    ],
  },
  v11: {
    historicalRisk: [
      { date: "Sep", score: 8 }, { date: "Oct", score: 7 }, { date: "Nov", score: 6 },
      { date: "Dec", score: 5 }, { date: "Jan", score: 6 }, { date: "Feb", score: 6 },
    ],
    departmentContacts: [
      { dept: "Engineering", contacts: 9, color: "var(--info)" },
    ],
    emailActivity: [
      { day: "Feb 1", sent: 3, received: 6 }, { day: "Feb 4", sent: 2, received: 8 },
      { day: "Feb 7", sent: 4, received: 5 }, { day: "Feb 10", sent: 3, received: 7 },
      { day: "Feb 13", sent: 2, received: 6 }, { day: "Feb 16", sent: 3, received: 5 },
      { day: "Feb 19", sent: 2, received: 7 },
    ],
    emailMetadata: [
      { date: "Feb 19", from: "updates@securestack.io", to: "eng@company.com", subject: "SecureStack v4.2 release notes", attachment: true, anomaly: false },
    ],
    intelSignals: [
      { id: "ss1", timestamp: "Feb 5, 11:00 AM", source: "Domain & Infrastructure", sourceColor: "bg-info/10 text-info", signalType: "Infrastructure Check", description: "All endpoints healthy; SOC 2 Type II audit passed Dec 2025", confidence: 99, status: "Clear" },
    ],
    auditEntries: [
      { date: "Feb 5", action: "SOC 2 Type II audit report reviewed — compliant", by: "Jane Doe" },
    ],
  },
  v12: {
    historicalRisk: [
      { date: "Sep", score: 22 }, { date: "Oct", score: 20 }, { date: "Nov", score: 18 },
      { date: "Dec", score: 17 }, { date: "Jan", score: 19 }, { date: "Feb", score: 19 },
    ],
    departmentContacts: [
      { dept: "Engineering", contacts: 6, color: "var(--info)" },
      { dept: "Operations", contacts: 5, color: "var(--orange)" },
      { dept: "Executive", contacts: 3, color: "var(--purple)" },
    ],
    emailActivity: [
      { day: "Feb 1", sent: 5, received: 10 }, { day: "Feb 4", sent: 6, received: 12 },
      { day: "Feb 7", sent: 4, received: 9 }, { day: "Feb 10", sent: 7, received: 14 },
      { day: "Feb 13", sent: 5, received: 11 }, { day: "Feb 16", sent: 6, received: 10 },
      { day: "Feb 19", sent: 5, received: 12 },
    ],
    emailMetadata: [
      { date: "Feb 19", from: "kevin.park@techbridge.co", to: "eng@company.com", subject: "Sprint review — migration phase 2 status", attachment: true, anomaly: false },
      { date: "Feb 18", from: "billing@techbridge.co", to: "procurement@company.com", subject: "February consulting hours invoice", attachment: true, anomaly: false },
    ],
    intelSignals: [
      { id: "tb1", timestamp: "Jan 10, 3:00 PM", source: "Domain & Infrastructure", sourceColor: "bg-info/10 text-info", signalType: "Domain Age", description: "Domain techbridge.co registered 2.5 years ago; minor age flag but consistent activity", confidence: 72, status: "Monitoring" },
    ],
    auditEntries: [
      { date: "Feb 12", action: "Consulting engagement review — satisfactory performance", by: "Jane Doe" },
      { date: "Jan 10", action: "Domain age flag noted — monitoring", by: "System" },
    ],
  },
}

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
    actions: [
      { step: "Identified 5 inbound emails from quickbooks-invoicing.net in delivery queue", result: "success" },
      { step: "Verified domain is not in approved vendor list", result: "success" },
      { step: "Moved all 5 emails to quarantine folder", result: "success" },
      { step: "Notified 8 internal recipients of quarantine action", result: "success" },
      { step: "Created audit log entry for compliance review", result: "success" },
    ],
  },
  {
    id: "ea2",
    timestamp: "1:30 PM",
    type: "Escalation",
    vendor: "DataFlow Inc",
    outcome: "success",
    description: "Escalated DataFlow Inc risk case to procurement@company.com. Reason: Financial risk indicator (D&B score drop) + behavioral anomaly.",
    reversible: false,
    actions: [
      { step: "Compiled risk summary with D&B financial data and behavioral anomaly report", result: "success" },
      { step: "Sent escalation email to procurement@company.com", result: "success" },
      { step: "Flagged $150K contract for contingency review in procurement dashboard", result: "success" },
      { step: "Set 48-hour follow-up reminder for procurement team response", result: "success" },
    ],
  },
  {
    id: "ea3",
    timestamp: "11:00 AM",
    type: "Security Questionnaire",
    vendor: "Prolia Systems",
    outcome: "partial",
    description: "Attempted to trigger security questionnaire for Prolia Systems. Partial: Questionnaire sent, but vendor auto-responder returned OOO.",
    reversible: false,
    actions: [
      { step: "Generated security questionnaire from template (SOC 2 compliance)", result: "success" },
      { step: "Sent questionnaire to vendor contact alex.kim@proliasys.com", result: "success" },
      { step: "Awaiting vendor response — auto-responder detected (OOO until Feb 24)", result: "partial" },
      { step: "Scheduled automatic follow-up for Feb 25", result: "success" },
      { step: "Notify internal stakeholder of delayed response", result: "skipped" },
    ],
  },
  {
    id: "ea4",
    timestamp: "9:00 AM",
    type: "Domain Block",
    vendor: "quickbooks-invoicing.net",
    outcome: "success",
    description: "Permanently blocked domain quickbooks-invoicing.net. Reason: Confirmed impersonation attempt targeting Finance department.",
    reversible: true,
    actions: [
      { step: "Added quickbooks-invoicing.net to organization-wide block list", result: "success" },
      { step: "Configured email gateway rule to reject all future inbound from domain", result: "success" },
      { step: "Notified Finance department (4 users) of the blocked domain", result: "success" },
      { step: "Submitted domain to Abnormal community threat feed", result: "success" },
    ],
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
    case "critical": return "bg-danger/10 text-danger border-danger/20"
    case "high": return "bg-orange/10 text-orange border-orange/20"
    case "medium": return "bg-warning/10 text-warning border-warning/20"
    case "low": return "bg-success/10 text-success border-success/20"
  }
}

export function getSeverityDot(severity: Severity): string {
  switch (severity) {
    case "critical": return "bg-danger"
    case "high": return "bg-orange"
    case "medium": return "bg-warning"
    case "low": return "bg-success"
  }
}

export function getConfidenceColor(confidence: number): string {
  if (confidence >= 80) return "text-success"
  if (confidence >= 50) return "text-warning"
  return "text-danger"
}
