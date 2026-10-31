import type { Metadata } from "next";
import { InfoPage, type InfoSection } from "@/components/info-page/info-page";

export const metadata: Metadata = {
  title: "Contact Us | OrionKids",
  description: "Get in touch with the OrionKids team.",
};

// TODO: placeholder content, replace with final copy and contact details
const SECTIONS: InfoSection[] = [
  {
    heading: "General enquiries",
    paragraphs: ["Email: contact@orionkids.in", "We usually reply within two working days."],
  },
  {
    heading: "Schools and partnerships",
    paragraphs: [
      "Interested in running OrionKids at your school? Email schools@orionkids.in and we will set up a call.",
    ],
  },
  {
    heading: "Office",
    paragraphs: ["OrionKids Digital Solutions Pvt. Ltd.", "Address to be added."],
  },
];

export default function ContactUsPage() {
  return (
    <InfoPage
      eyebrow="Contact Us"
      title="We'd love to hear from you"
      intro="Questions, feedback or partnership ideas: reach out and our team will get back to you. This page is a placeholder and will be updated soon."
      sections={SECTIONS}
    />
  );
}
