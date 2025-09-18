"use client";
import { useEffect, useState } from "react";
import { Button, Card, Space } from "antd";
import Image from "next/image";
import Logo from '../public/images/youth-plus-logo.png'
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 2000);

    const redirectTimer = setTimeout(() => {
      router.push("/home");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className={`transition-opacity duration-1000 ${fadeOut ? "opacity-0" : "opacity-100"}`}>
        <Image src={Logo} alt="Boresha Biz Logo" width={500} height={500} />
      </div>
    </div>
  );
}
