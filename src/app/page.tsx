import Image from "next/image";
import { ArrowsIcon, CheckIcon, CircleArrowIcon, CongratsBox, GoodNewsBox, Logo, ResolvButton, ShieldIcon } from "../images/index";
import { Accordion } from "@/components/Accordion";
import { ImageViewer } from "@/components/ImageViewer";
import { EmailInput } from "@/components/EmailInput";

export default function Home() {
  return <>
    <header className="flex">
      <div className="flex items-center">
        <Image src={Logo} alt="Resolv" className="w-12" />
        <span className="pl-2 text-4xl font-bold">Resolv</span>
      </div>
    </header>
    
    <h1 className="text-6xl font-bold text-center leading-extra-tight mt-24">
      Say goodbye to
      <br />
      stolen crypto.
    </h1>
    <h2 className="text-center mt-12">
      Start protecting your crypto assets from
      <br />
      fraudulent activity in minutes.
    </h2>

    <EmailInput />

    <div className="flex items-center justify-center mt-32">
      <span className="font-bold text-2xl pr-2">Explore</span>
      <Image src={CircleArrowIcon} alt="" className="w-7" />
    </div>

    <h2 className="text-3xl mt-32 font-bold">
      Let&apos;s cut right to the chase.
      <br />
      No confusing crypto lingo.
    </h2>

    <div className="rounded-4xl p-8 bg-blue mt-8">
      <div className="bg-black rounded-full w-12 h-12 flex items-center text-center">
        <Image src={ArrowsIcon} alt="" className="mx-auto w-8" />
      </div>
      <div className="text-3xl mt-4 font-bold">
        Your funds returned,
        <br />
        even <span className="text-blue-dark">after</span> being stolen.
      </div>
    </div>

    <div className="grid md:grid-cols-2 gap-8 mt-8">
      <div className="rounded-4xl p-8 bg-green">
        <div className="bg-black rounded-full w-12 h-12 flex items-center text-center">
          <Image src={CheckIcon} alt="" className="mx-auto w-8" />
        </div>
        <div className="text-3xl mt-4 font-bold">
          Simple onboarding.
          <br />
          Peaceful <span className="text-blue-dark">protection</span>.
        </div>
      </div>

      <div className="rounded-4xl p-8 bg-gray">
        <div className="bg-black rounded-full w-12 h-12 flex items-center text-center">
          <Image src={ShieldIcon} alt="" className="mx-auto w-6" />
        </div>
        <div className="text-3xl mt-4 font-bold">
          Your security is our
          <br />
          <span className="text-blue-dark">top priority</span>.
        </div>
      </div>
    </div>

    <h2 className="text-3xl mt-16 font-bold">
      All controlled from a simple dashboard
      <br />
      that even your <span className="text-blue-dark">grandma</span> can use.
    </h2>

    <ImageViewer />

    <div className="grid md:grid-cols-2 md:gap-8 mt-16 items-center">
      <div className="p-8 md:order-2">
        <div className="rounded-full bg-gradient-to-br from-blue to-green py-4 px-12 font-bold inline-block text-2xl">Step 1</div>
        <div className="text-5xl font-bold mt-8 leading-tight">
          Protect
          <br />
          your tokens
        </div>
        <div className="text-2xl mt-8">
          In seconds, your ERC-20 tokens will be protected from being stolen.
        </div>
      </div>

      <div className="rounded-4xl p-8 flex items-center bg-gray">
        <Image src={CongratsBox} alt="" className="mx-auto" />
      </div>
    </div>

    <div className="grid md:grid-cols-2 md:gap-8 mt-12 items-center">
      <div className="p-8">
        <div className="rounded-full bg-gradient-to-br from-blue to-green py-4 px-12 font-bold inline-block text-2xl">Step 2</div>
        <div className="text-5xl font-bold mt-8 leading-tight">
          Submit
          <br />
          a dispute
        </div>
        <div className="text-2xl mt-8">
          We hope you don&apos;t get your funds stolen, but if you do, simply Resolv the transaction.
        </div>
      </div>

      <div className="rounded-4xl pr-8 py-20 flex items-center bg-gray">
        <Image src={ResolvButton} alt="" />
      </div>
    </div>

    <div className="grid md:grid-cols-2 md:gap-8 mt-12 items-center">
      <div className="p-8 md:order-2">
        <div className="rounded-full bg-gradient-to-br from-blue to-green py-4 px-12 font-bold inline-block text-2xl">Step 3</div>
        <div className="text-5xl font-bold mt-8 leading-tight">
          Get your
          <br />
          crypto back
        </div>
        <div className="text-2xl mt-8">
          Once the Resovlrs have viewed the case and voted in your favor, your funds will be returned to a wallet of your choosing.
        </div>
      </div>

      <div className="rounded-4xl p-8 flex items-center bg-gray">
        <Image src={GoodNewsBox} alt="" className="mx-auto" />
      </div>
    </div>

    <div className="w-full bg-blue grid lg:grid-cols-2 items-center mt-16">
      <div className="pt-8 pl-8 lg:pb-8 lg:pr-8">
        <div className="text-4xl font-bold">
          Frequently asked questions
        </div>
        <div className="text-2xl mt-8">
          We get it. It&apos;s a lot to take in.
          <br />
          Hope these FAQ&apos;s help.
        </div>
      </div>

      <Accordion />
    </div>

    <footer className="my-24">
      <div className="flex items-center">
        <Image src={Logo} alt="Resolv" className="w-24" />
        <span className="text-6xl font-bold pl-2">Resolv</span>
      </div>
    </footer>
  </>
}