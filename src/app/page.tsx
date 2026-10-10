import { Hero } from "@/components/home/Hero";
import { TechMarquee } from "@/components/home/TechMarquee";
import { Statement } from "@/components/home/Statement";
import { Services } from "@/components/home/Services";
import { RetrofitScrub } from "@/components/RetrofitScrub";
import { OpenSource } from "@/components/OpenSource";
import { ReferenceList } from "@/components/home/ReferenceList";
import { Profile } from "@/components/home/Profile";
import { CtaBand } from "@/components/CtaBand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TechMarquee />
      <Statement />
      <Services />
      <RetrofitScrub />
      <ReferenceList />
      <OpenSource />
      <Profile />
      <CtaBand />
    </>
  );
}
