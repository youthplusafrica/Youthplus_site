"use client";

import { useEffect, useState } from "react";
import { Modal, Button } from "antd";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const STORAGE_KEY = "yplus.callforspeakers.2026.seen"; // change key next year

export default function CallForSpeakersModal() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Don't show the modal on the signup page itself
    if (pathname?.startsWith("/call-for-speakers")) return;

    // Only show if not seen before
    if (typeof window !== "undefined") {
      const seen = localStorage.getItem(STORAGE_KEY);
      if (!seen) setOpen(true);
    }
  }, [pathname]);

  const markSeen = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {}
  };

  const handleDismiss = () => {
    markSeen();
    setOpen(false);
  };

  const goToForm = () => {
    markSeen();
    router.push("/call-for-speakers"); // dedicated page
  };

  return (
    <Modal
      open={open}
      onCancel={handleDismiss}
      footer={null}
      width={720}
      styles={{ body: { paddingTop: 8 } }}
    >
      <div className="space-y-4">
        <div className="relative w-full overflow-hidden rounded-xl border border-black/10">
          <Image
            src="/images/call-for-speakers.jpg"  // put your poster here
            alt="Step Into the Spotlight at Youth Plus Festival 2026!"
            width={1440}
            height={1440}
            className="w-full h-auto object-contain"
            priority
          />
        </div>

        <div className="text-black/80">
          <p className="text-base">
            We’re inviting visionary leaders, bold thinkers, and dynamic storytellers.
            Tap below to submit your interest to speak at <strong>Youth+ Festival 2026</strong>.
          </p>
        </div>

        <div className="flex flex-wrap gap-8">
          <Button
            type="primary"
            size="large"
            className="!bg-[var(--yplus-primary,#ead61f)] !text-black hover:!opacity-90"
            onClick={goToForm}
          >
            Apply to speak
          </Button>

            <button
              onClick={handleDismiss}
              className="text-black/70 underline underline-offset-2"
            >
              Not now
            </button>
        </div>
      </div>
    </Modal>
  );
}
