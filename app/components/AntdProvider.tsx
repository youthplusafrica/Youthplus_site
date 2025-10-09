// components/AntdProvider.tsx
"use client";

import { ConfigProvider, theme } from "antd";
import type { ReactNode } from "react";

export default function AntdProvider({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          fontFamily: "var(--font-montserrat), system-ui, sans-serif",
          colorPrimary: "#d0a328",
          colorTextBase: "#000",
          colorBgBase: "#fff",
          colorLink: "#d0a328",
          borderRadius: 12,
        },
        components: {
          Button: {
            controlHeight: 40,
          },
          Menu: {
            itemColor: "#000",
            itemHoverColor: "#000",
            itemSelectedColor: "#000",
            itemSelectedBg: "transparent",
            fontSize: 16,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
