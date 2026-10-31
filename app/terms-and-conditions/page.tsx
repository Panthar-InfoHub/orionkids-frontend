import type { Metadata } from "next";
import { InfoPage, type InfoSection } from "@/components/info-page/info-page";

export const metadata: Metadata = {
  title: "Terms & Conditions | OrionKids",
  description: "The terms that apply when using OrionKids.",
};

// TODO: placeholder content, replace with the final legal text
const SECTIONS: InfoSection[] = [
  {
    heading: "1. Using OrionKids",
    paragraphs: [
      "Placeholder: OrionKids is intended for use by parents, guardians and schools on behalf of children in Classes 1 to 4.",
    ],
  },
  {
    heading: "2. Accounts",
    paragraphs: [
      "Placeholder: you are responsible for keeping your account secure and for the accuracy of the information you provide.",
    ],
  },
  {
    heading: "3. Reports and insights",
    paragraphs: [
      "Placeholder: reports describe strengths and growth areas. They are not a medical or clinical diagnosis.",
    ],
  },
  {
    heading: "4. Changes to these terms",
    paragraphs: [
      "Placeholder: we may update these terms from time to time. Continued use of OrionKids means you accept the updated terms.",
    ],
  },
];

export default function TermsAndConditionsPage() {
  return (
    <InfoPage
      eyebrow="Terms & Conditions"
      title="Terms & Conditions"
      intro="This is placeholder text. The final terms and conditions will be published here."
      lastUpdated="To be confirmed"
      sections={SECTIONS}
    />
  );
}
