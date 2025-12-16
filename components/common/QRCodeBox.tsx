"use client";

import { QRCodeCanvas } from "qrcode.react";

type QRProps = {
  value: string;
  size?: number;
};

export default function QRCodeBox({ value, size = 180 }: QRProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <QRCodeCanvas
        value={value}
        size={size}
        bgColor="#ffffff"
        fgColor="#000000"
        level="H"
        includeMargin
      />
    </div>
  );
}
