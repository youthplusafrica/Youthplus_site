// components/AntdProvider.tsx
'use client';

import { ConfigProvider, theme } from 'antd';
import type { ReactNode } from 'react';

export default function AntdProvider({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          // Brand tokens
          colorPrimary: '#ead61f',
          colorTextBase: '#000',
          colorBgBase: '#fff',
          colorLink: '#ead61f',
          // Nice rounded corners across components
          borderRadius: 12
        },
        // Optional per-component tweaks (adjust anytime)
        components: {
          Button: {
            controlHeight: 40 // slightly taller default buttons
          },
          Menu: {
            itemSelectedColor: '#000',
            itemSelectedBg: 'rgba(234,214,31,0.25)'
          }
        }
      }}
    >
      {children}
    </ConfigProvider>
  );
}
