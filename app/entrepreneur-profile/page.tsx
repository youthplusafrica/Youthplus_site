import FooterMain from "../components/FooterMain";
import HeaderNav from "../components/HeaderNav";
import EntrepreneurProfileForm from "../components/EntrepreneurProfileForm";
import SectionWithBg from "../components/SectionWithBg";

export default function EntrepreneurProfilePage() {
  return (
    <>
      <HeaderNav />
      <SectionWithBg
        src="/images/youth-about.jpg"
        overlay={20}
        className="py-12 md:py-16"
        containerClassName="max-w-4xl"
      >
        <EntrepreneurProfileForm />
      </SectionWithBg>
      <FooterMain />
    </>
  );
}

