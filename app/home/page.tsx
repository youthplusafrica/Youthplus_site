import AboutIntro from "../components/AboutIntro";
import BackStoryDual from "../components/BackStoryDual";
import HeaderNav from "../components/HeaderNav";
import Hero from "../components/Hero";
import AboutImage from "@/public/images/about.jpg";
import PillarsGrid from "../components/PillarsGrid";
import VenturesByPillar from "../components/VenturesByPillar";
import ImpactTrack from "../components/ImpactTrack";
import PartnersStrip from "../components/PartnersStrip";
import FooterMain from "../components/FooterMain";

export default function Home() {
  return (
    <div className="min-h-screen w-full">
      <HeaderNav />
      <Hero
        title="Empowering Africa’s youth to build, create, and lead."
        subtitle="We bridge talent and opportunity across training, creation, growth, and leadership."
        align="left"
        bgSrc="/images/youth-home.jpg"
      />
      <BackStoryDual />

      <AboutIntro
        id="about"
        lead={
          <>
            Youth+ Africa is a youth-led, pan-African institution that serves to
            bridge the gap between talent and opportunity through investing into
            the growth and economic empowerment of Africa’s youth demographic.
            By identifying, empowering and accelerating Africa’s youth
            entrepreneurs, Youth+ Africa is building an ecosystem with a
            continental footprint that will birth innovation, access to
            opportunity and the attainment of Africa’s socio-economic potential.
          </>
        }
        mission="To nurture generations of youth equipped with the resources
needed to capitalize on opportunities that drive economic change."
        vision="An economically empowered African youth tackling challenges
through innovation, collaboration and social enterprise."
        imageSrc="/images/youth-about-2.jpg" // optional; place in /public/images/about/cover.jpg
        imageAlt="Youth+ Africa team and community"
        imageLeft={true}
      />

      <PillarsGrid />
      <VenturesByPillar />
      <ImpactTrack />
      <PartnersStrip
        subtitle="We work with forward-thinking brands, institutions, and community partners."
        partners={[
          { name: "Nairobi City County", src: "/images/nairobi_county.jpeg" },
          { name: "Blaze", src: "/images/blaze_logo.png" },
          { name: "British Council", src: "/images/british_council_logo.png" },
					{ name: "Nestle", src: "/images/nestle_logo.webp"},
					{ name: "Youth Enterprise Development Fund", src: "/images/youth_enterprise_logo.jpg"}
        ]}
      />
			<FooterMain />
    </div>
  );
}
