"use client";

import AboutIntro from "../components/AboutIntro";
import CareersSection from "../components/CareersSection";
import FooterMain from "../components/FooterMain";
import HeaderNav from "../components/HeaderNav";
import TeamGrid from "../components/TeamGrid";
import { JOBS } from "../content/jobs";
import { TEAM } from "../content/team";

export default function AboutPage() {
  return (
    <>
      <HeaderNav />

      <TeamGrid team={TEAM} />

      <CareersSection jobs={JOBS} />

      <FooterMain />
    </>
  );
}
