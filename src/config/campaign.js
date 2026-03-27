export const campaign = {
  buildingName: "The Nexus",
  managementEmail: import.meta.env.VITE_MANAGEMENT_EMAIL || "management@yournexus.com",
  subject: import.meta.env.VITE_EMAIL_SUBJECT || "Request: Billiards Equipment Replacement in Common Area",
  draft: `Hi,

I'm a resident at The Nexus and I'm writing to request that the billiards equipment in the common area be repaired or replaced. The cues are in poor condition and the table needs attention.

Several residents share this concern and we'd appreciate your help making the amenities usable again.

Thank you for your time.`,
}
