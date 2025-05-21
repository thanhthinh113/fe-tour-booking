import React from "react";

function ContactUs() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">LIÊN HỆ CHÚNG TÔI</h1>
      <p className="mb-4">
        Bạn có thắc mắc hoặc cần tư vấn về dịch vụ? Hãy liên hệ với chúng tôi để
        được hỗ trợ nhanh chóng và tận tình!
      </p>

      <div className="flex flex-col gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">1. Thông tin liên hệ</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Địa chỉ:</strong> Vịnh Hạ Long, Quảng Ninh, Việt Nam
            </li>
            <li>
              <strong>Hotline:</strong> (0353081222)
            </li>
            <li>
              <strong>Email:</strong> (ntdinh25@gmail.com)
            </li>
            <li>
              <strong>Website:</strong> (https://drive.google.com/drive/u/0/folders/1Lslt-k8BdpDLYUG-p6YJ8FMLE8qhH-hg?hl=vi)
            </li>
            <li>
              <strong>Giờ làm việc:</strong> Thứ 2 - Chủ Nhật, từ 08:00 - 18:00
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">2. Liên hệ trực tuyến</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Zalo/Viber/WhatsApp:</strong> (0353089987)
            </li>
            <li>
              <strong>Facebook:</strong> [https://drive.google.com/drive/u/0/folders/1Lslt-k8BdpDLYUG-p6YJ8FMLE8qhH-hg?hl=vi]
            </li>
            <li>
              <strong>Instagram:</strong> [https://drive.google.com/drive/u/0/folders/1Lslt-k8BdpDLYUG-p6YJ8FMLE8qhH-hg?hl=vi]
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
