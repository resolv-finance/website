'use client';
import { useState } from "react";
import { AccordionItem } from "./AccordionItem";

const faqs = [
  {
    id: 1,
    question: "Can I recover funds that have been stolen before using Resolv?",
    answer: "Unfortunately, Resolv's Protection Protocol is proactive and not retroactive. This means that any funds lost in the past, prior to protecting them with Resolv, are irrecoverable.",
  },
  {
    id: 2,
    question: "Is Resolv secure?",
    answer: "Yes, Resolv is secure. Funds are held in a multi-signature custodian wallet backed by Gnosis' industry-standard infrastructure. The private keys for the wallet are distributed amongst several trusted players in the industry and are not solely held by Resolv. So you can rest easy knowing that your assets are safe and no individual can run away with the whole lot.",
  },
  {
    id: 3,
    question: "How does this work?",
    answer: "<a href=\"./Resolv_One-Pager.pdf\" target=\"_blank\" class=\"text-blue-dark hover:text-gray-light\">Our One-Pager</a>",
  },
  {
    id: 4,
    question: "Doesn't this go against the ethos of Crypto?",
    answer: "No. In fact, it embodies all that crypto stands for! Vitalik Beutrin explains that the goal of crypto was never to remove all trust. Instead, it is to give people the choice of whom to trust. Crypto should ultimately give \"<a href=\"https://vitalik.ca/general/2021/01/11/recovery.html\" target=\"_blank\" class=\"text-blue-dark hover:text-gray-light\">someone the power to do some things on your behalf without giving them the power to do everything</a>.\" Multi-sig is a perfect expression of this. It assures users that their funds can be securely held and <a href=\"https://chain.link/proof-of-reserve\" target=\"_blank\" class=\"text-blue-dark hover:text-gray-light\">verified</a>, without having to worry that one entity will run off with the pot.",
  },
];

export function Accordion() {
  const [openFaq, setOpenFaq] = useState(0);

  const faqClickHandler = (faqId: number) => {
    const newOpenFaq = openFaq === faqId ? 0 : faqId;
    setOpenFaq(newOpenFaq);
  };

  return (
    <div className="p-8">
      {faqs.map(faq => (
        <AccordionItem key={faq.id} id={faq.id} question={faq.question} answer={faq.answer} clickHandler={() => faqClickHandler(faq.id)} currentFaq={openFaq} />
      ))}
    </div>
  )
}