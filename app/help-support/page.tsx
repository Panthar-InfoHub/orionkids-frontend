import type { Metadata } from "next";
import { InfoPage, type InfoSection } from "@/components/info-page/info-page";

export const metadata: Metadata = {
  title: "Help & Support | OrionKids",
  description: "Answers to common questions and ways to get help with OrionKids.",
};

// TODO: placeholder content, replace with final copy
const SECTIONS: InfoSection[] = [
  {
    heading: "Getting started",
    paragraphs: [
      "Create a parent account, add your child's details and start the quest from your dashboard. Each quest has six short games and takes about 20 minutes.",
      "You can pause at any time. Progress is saved automatically and you can resume from where you left off.",
    ],
  },
  {
    heading: "Account and login",
    paragraphs: [
      "If you cannot sign in, check that you are using the same account you registered with. New accounts may need to be approved before you can start a quest.",
    ],
  },
  {
    heading: "Reports",
    paragraphs: [
      "Reports are generated once all six games are complete. Every report is reviewed before it is shared with families.",
    ],
  },
  {
    heading: "Still need help?",
    paragraphs: [
      "Write to us at support@orionkids.in and our team will get back to you within two working days.",
    ],
  },
];

export default function HelpSupportPage() {
  return (
    <InfoPage
      eyebrow="Help & Support"
      title="How can we help?"
      intro="Find quick answers about accounts, games and reports. This page is a placeholder and will be updated soon."
      sections={SECTIONS}
    />
  );
}
