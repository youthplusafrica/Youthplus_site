// components/EventDetailsModal.tsx
"use client";

import { Modal, Button, Space } from "antd";
import {
  PictureOutlined,
  YoutubeFilled,
  EnvironmentOutlined,
  CalendarOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";
// ⬇️ no Image import
import type { EventItem } from "./EventCard";

export default function VentureDetailsModal({
  open,
  onClose,
  event,
}: {
  open: boolean;
  onClose: () => void;
  event: EventItem | null;
}) {
  if (!event) return null;

  const link = event.link;

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={720}
      title={
        <div className="flex flex-col gap-2">
          <div className="text-lg font-semibold leading-tight">
            {event.title}
          </div>
          <div className="text-black/70 text-sm flex flex-wrap gap-4">
            <span className="flex items-center gap-1">
              <CalendarOutlined /> {event.date}
            </span>
            <span className="flex items-center gap-1">
              <EnvironmentOutlined /> {event.location}
            </span>
          </div>
        </div>
      }
      styles={{ body: { paddingTop: 8 } }}
    >
      {/* Top actions (links) */}
      {(event.galleryUrl || event.youtubeUrl) && (
        <div className="mb-4">
          <Space wrap>
            {event.galleryUrl && (
              <Button
                icon={<PictureOutlined />}
                href={event.galleryUrl}
                target="_blank"
                rel="noreferrer"
              >
                View photo gallery
              </Button>
            )}
            {event.youtubeUrl && (
              <Button
                type="primary"
                icon={<YoutubeFilled />}
                href={event.youtubeUrl}
                target="_blank"
                rel="noreferrer"
              >
                Watch on YouTube
              </Button>
            )}
          </Space>
        </div>
      )}

      {/* Details (no poster shown) */}
      {event.details ? (
        <div className="prose max-w-none">
          <p className="text-black/85">{event.details}</p>
        </div>
      ) : event.description ? (
        <p className="text-black/85">{event.description}</p>
      ) : (
        <p className="text-black/60">More details coming soon.</p>
      )}

      {/* CTA (moved here since poster is removed) */}
      {event.hasFutureEvents && link && (
        <div className="mt-4">
          <a
            href={link}
            className="inline-flex items-center gap-1 text-[var(--yplus-primary,#d0a328)] border border-[var(--yplus-primary,#d0a328)] rounded-full px-3 py-1 cursor-pointer"
          >
            <ScheduleOutlined /> Book a slot
          </a>
        </div>
      )}
    </Modal>
  );
}
