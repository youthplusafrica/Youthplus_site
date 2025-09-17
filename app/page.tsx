import { Button, Card, Space } from "antd";
import Image from "next/image";

export default function Home() {
  return (
    <div className="container mx-auto max-w-3xl py-10">
      <Card title="Ant Design is live" className="shadow-sm">
        <Space>
          <Button type="primary">Primary</Button>
          <Button>Default</Button>
          <Button type="link">Link</Button>
        </Space>
      </Card>
    </div>
  );
}
