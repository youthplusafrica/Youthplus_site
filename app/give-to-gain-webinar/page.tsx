import FooterMain from "../components/FooterMain";
import GiveToGainWebinarForm from "../components/GiveToGainWebinarForm";
import HeaderNav from "../components/HeaderNav";
import SectionWithBg from "../components/SectionWithBg";

export default function GiveToGainWebinarPage() {
  return (
    <>
      <HeaderNav />
      <SectionWithBg
        src="/images/events-bg.jpg"
        alt="Give to Gain webinar background"
        overlay={55}
        className="py-10 md:py-14"
      >
        <GiveToGainWebinarForm />
      </SectionWithBg>
      <FooterMain />
    </>
  );
}
