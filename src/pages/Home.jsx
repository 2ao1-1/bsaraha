import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MessageCircle, Shield, Users, Zap } from "lucide-react";

import { isTokenValid } from "../helpers/TokenValidation";

import HomeHero from "../components/Home/HomeHero";
import FeaturesGrid from "../components/Home/FeaturesGrid";
import StatsSection from "../components/Home/StatsSection";
import HowItWorks from "../components/Home/HowItWorks";
import FooterCTA from "../components/Home/FooterCTA";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    if (isTokenValid()) {
      navigate("/profile", { replace: true });
    }
  }, [navigate]);

  const features = [
    {
      icon: <MessageCircle size={32} />,
      title: "رسائل مجهولة",
      description: "استقبل رسائل صريحة من أصدقائك بدون معرفة هويتهم",
    },
    {
      icon: <Shield size={32} />,
      title: "خصوصية تامة",
      description: "نحمي خصوصيتك وهوية المرسلين بشكل كامل",
    },
    {
      icon: <Users size={32} />,
      title: "سهل الاستخدام",
      description: "واجهة بسيطة وسهلة للجميع",
    },
    {
      icon: <Zap size={32} />,
      title: "سريع ومجاني",
      description: "ابدأ الآن مجاناً بدون أي رسوم",
    },
  ];

  const HowItWork = [
    {
      step: "١",
      title: "أنشئ حسابك",
      description: "سجل بسرعة وأنشئ ملفك الشخصي",
    },
    {
      step: "٢",
      title: "شارك رابطك",
      description: "انسخ رابطك وشاركه مع أصدقائك",
    },
    {
      step: "٣",
      title: "استقبل الرسائل",
      description: "اقرأ آراء أصدقائك الصريحة فيك",
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden relative z-10 container mx-auto px-4 pt-20 flex flex-col items-center justify-center inset-0 w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>

      <HomeHero
        title="بصراحه"
        subtitle="اكتشف رأي أصدقائك بصراحة!"
        description="منصة آمنة لاستقبال رسائل صريحة ومجهولة من أصدقائك"
      />

      <FeaturesGrid features={features} />

      <StatsSection />

      <HowItWorks steps={HowItWork} />

      <FooterCTA />

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="text-center mt-16 pb-8 text-text-primary/60"
      >
        <p>© بصراحه 2025. جميع الحقوق محفوظة.</p>
      </motion.footer>
    </div>
  );
}
