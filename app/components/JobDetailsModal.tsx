// components/JobDetailsModal.tsx
"use client";

import { Modal, Button } from "antd";
import {
  EnvironmentOutlined,
  CalendarOutlined,
  TeamOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import type { Job } from "./CareersSection";
import Link from "next/link";

export default function JobDetailsModal({
  open,
  onClose,
  job,
}: {
  open: boolean;
  onClose: () => void;
  job: Job | null;
}) {
  if (!job) return null;

  const applyHref =
    job.applyLink ||
    (job.applyEmail
      ? `mailto:${job.applyEmail}?subject=${encodeURIComponent("Application: " + job.title)}`
      : undefined);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={720}
      title={
        <div className="flex flex-col gap-2">
          <div className="text-lg font-semibold leading-tight">{job.title}</div>
          <div className="text-black/70 text-sm flex flex-wrap gap-4">
            <span className="flex items-center gap-1"><EnvironmentOutlined /> {job.location}</span>
            <span className="flex items-center gap-1"><CalendarOutlined /> {job.type}</span>
            <span className="flex items-center gap-1"><TeamOutlined /> Youth+ Africa</span>
          </div>
        </div>
      }
    >
      {/* Description */}
      {job.description && (
        <p className="text-black/85">{job.description}</p>
      )}

      {/* Responsibilities */}
      {job.responsibilities?.length ? (
        <div className="mt-4">
          <h4 className="font-semibold">Responsibilities</h4>
          <ul className="mt-2 list-disc pl-5 space-y-1 text-black/85">
            {job.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
          </ul>
        </div>
      ) : null}

      {/* Requirements */}
      {job.requirements?.length ? (
        <div className="mt-4">
          <h4 className="font-semibold">Requirements</h4>
          <ul className="mt-2 list-disc pl-5 space-y-1 text-black/85">
            {job.requirements.map((r, i) => <li key={i}>{r}</li>)}
          </ul>
        </div>
      ) : null}

      {/* Benefits */}
      {job.benefits?.length ? (
        <div className="mt-4">
          <h4 className="font-semibold">Benefits</h4>
          <ul className="mt-2 list-disc pl-5 space-y-1 text-black/85">
            {job.benefits.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        </div>
      ) : null}

      {/* Apply action */}
      {applyHref && (
        <div className="mt-6">
          <Link
            href={applyHref}
            target={applyHref.startsWith("http") ? "_blank" : undefined}
          >
            <Button
              type="primary"
              icon={<CheckOutlined />}
              className="!bg-[var(--yplus-primary,#d0a328)] !text-black hover:!opacity-90"
            >
              Apply now
            </Button>
          </Link>
        </div>
      )}
    </Modal>
  );
}
