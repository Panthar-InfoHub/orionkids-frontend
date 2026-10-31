import type { Metadata } from "next";
import { InfoPage, type InfoSection } from "@/components/info-page/info-page";

export const metadata: Metadata = {
  title: "Privacy Policy | OrionKids",
  description: "How OrionKids collects, uses and protects personal data.",
};

// TODO: placeholder content, replace with the final legal text
const SECTIONS: InfoSection[] = [
  {
    heading: "1. Information we collect",
    paragraphs: [
      "Placeholder: parent account details, child profile details provided with parental consent, and gameplay results from the quest.",
    ],
  },
  {
    heading: "2. How we use information",
    paragraphs: [
      "Placeholder: to run the quest, generate reports for parents and improve our activities. Only anonymised scores are used for report drafting.",
    ],
  },
  {
    heading: "3. Sharing and storage",
    paragraphs: [
      "Placeholder: we do not sell personal data. Data is stored securely and shared only with service providers needed to run OrionKids.",
    ],
  },
  {
    heading: "4. Your rights",
    paragraphs: [
      "Placeholder: you can request access, correction or deletion of your data at any time by contacting privacy@orionkids.in.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <InfoPage
      eyebrow="Privacy Policy"
      title="Privacy Policy"
      intro="This is placeholder text. The final privacy policy will be published here."
      lastUpdated="To be confirmed"
      sections={SECTIONS}
    />
  );
}
