import FooterMain from "../components/FooterMain";
import HeaderNav from "../components/HeaderNav";
import SectionWithBg from "../components/SectionWithBg";
import WeLeadBaselineSurveyForm from "../components/WeLeadBaselineSurveyForm";

export default function WeLeadBaselineSurveyPage() {
  return (
    <>
      <HeaderNav />
      <SectionWithBg
        src="/images/youth-about.jpg"
        overlay={20}
        className="py-12 md:py-16"
        containerClassName="max-w-4xl"
      >
        <WeLeadBaselineSurveyForm />
      </SectionWithBg>
      <FooterMain />
    </>
  );
}
