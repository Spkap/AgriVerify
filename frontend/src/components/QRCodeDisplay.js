import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

const QRCodeDisplay = ({ cropId }) => {
  const qrValue = cropId
    ? `https://agriverify.vercel.app/verify/${cropId}`
    : '';
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current && qrValue) {
      QRCode.toCanvas(canvasRef.current, qrValue, { width: 256 }, (error) => {
        if (error) console.error('Error generating QR code:', error);
      });
    }
  }, [qrValue]);

  if (!cropId) return <div>No crop ID available for QR code generation.</div>;

  return (
    <div className="qr-code">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default QRCodeDisplay;