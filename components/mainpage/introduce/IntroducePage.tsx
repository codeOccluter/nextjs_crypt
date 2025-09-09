import { Metadata } from "next";
import HeroSection from "./HeroSection";
import ValueProps from "./ValueProps";
import TechStack from "./TechStack";
import Timeline from "./Timeline";
import TeamShowcase from "./TeamShowcase";
import FAQ from "./FAQ";
import CTASection from "./CTASection";
import {
    heroData,
    valuesData,
    techData,
    timelineData,
    teamData,
    faqData,
    ctaData,
} from "@/features/introduce/content"

export const metadata: Metadata = {
    title: "Introduce",
    description: "서비스/프로젝트 소개 페이지",
};

export default async function IntroducePage() {
    return (
        <main className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-10 space-y-16">
            <HeroSection {...heroData} />
            <ValueProps items={valuesData} />
            <TechStack categories={techData} />
            <Timeline items={timelineData} />
            <TeamShowcase members={teamData} />
            <FAQ items={faqData} />
            <CTASection {...ctaData} />
        </main>
    );
}
