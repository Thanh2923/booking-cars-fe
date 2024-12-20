import React from "react";
import QRCode from "qrcode.react";
const PaymentPageTsx = ({ orderUrl }) => {
  return (
    <div>
      <div className="text-center my-10">
        <h2 className="text-[1.2rem] font-bold">Quét mã để thanh toán</h2>
        <QRCode value={orderUrl} size={300} />
        <p>
          Hoặc{""}
          <a
            href={orderUrl}
            className="text-white bg-blue-500 rounded-xl p-2 hover:bg-blue-600 transition-all duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            nhấn vào đây
          </a>{" "}
          để thanh toán.
        </p>
      </div>
    </div>
  );
};

export default PaymentPageTsx;
