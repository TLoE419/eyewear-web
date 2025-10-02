"use client";
import React from "react";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[rgb(231,229,218)]">
      {/* Header */}
      <div className="bg-[rgb(38,38,38)] text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center">
            使用條款
          </h1>
          <p className="text-center text-gray-300 mt-4">
            Terms of Service
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 md:p-12">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">
              最後更新日期：{new Date().toLocaleDateString('zh-TW')}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[rgb(136,99,64)] mb-4">
                1. 服務說明
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                歡迎使用視寶眼鏡官方網站（以下簡稱「本網站」）。本網站由視寶眼鏡（以下簡稱「我們」）提供，旨在為客戶提供眼鏡產品資訊、服務介紹及線上預約等服務。
              </p>
              <p className="text-gray-700 leading-relaxed">
                使用本網站即表示您同意遵守以下使用條款。如果您不同意這些條款，請勿使用本網站。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[rgb(136,99,64)] mb-4">
                2. 使用條件
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                使用本網站時，您同意：
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>提供真實、準確、完整的個人資訊</li>
                <li>不得使用本網站進行任何非法活動</li>
                <li>不得干擾或破壞本網站的正常運作</li>
                <li>不得未經授權存取本網站的任何部分</li>
                <li>不得上傳或傳輸任何有害、威脅、誹謗、淫穢或其他不當內容</li>
                <li>尊重他人的智慧財產權</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[rgb(136,99,64)] mb-4">
                3. 智慧財產權
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                本網站的所有內容，包括但不限於文字、圖片、商標、標誌、設計、版面配置等，均受智慧財產權法保護：
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>所有內容均為視寶眼鏡所有或已獲得合法授權</li>
                <li>未經書面許可，不得複製、修改、分發或商業使用</li>
                <li>您僅可為個人非商業目的瀏覽和使用本網站</li>
                <li>任何未經授權的使用都可能構成侵權行為</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[rgb(136,99,64)] mb-4">
                4. 產品與服務
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                關於本網站展示的產品和服務：
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>產品圖片僅供參考，實際產品可能因批次或製造差異而有所不同</li>
                <li>產品價格如有變動，以實際店面價格為準</li>
                <li>我們保留隨時修改或停止提供任何產品或服務的權利</li>
                <li>所有產品均享有相關保固服務，詳情請洽詢店面</li>
                <li>專業驗光服務需預約，建議提前聯繫確認時間</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[rgb(136,99,64)] mb-4">
                5. 免責聲明
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                本網站提供的資訊僅供參考，我們不承擔以下責任：
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>網站內容的準確性、完整性或時效性</li>
                <li>網站服務的中斷、延遲或錯誤</li>
                <li>因使用本網站而造成的任何直接或間接損失</li>
                <li>第三方網站連結的內容或服務</li>
                <li>因技術問題、網路中斷或其他不可抗力因素造成的服務中斷</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[rgb(136,99,64)] mb-4">
                6. 隱私權保護
              </h2>
              <p className="text-gray-700 leading-relaxed">
                我們重視您的隱私權，有關個人資料的收集、使用和保護，請參閱我們的
                <a href="/privacy" className="text-[rgb(136,99,64)] hover:underline">
                  隱私權政策
                </a>
                。使用本網站即表示您同意該政策。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[rgb(136,99,64)] mb-4">
                7. 服務變更與終止
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                我們保留以下權利：
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>隨時修改或更新本網站內容</li>
                <li>暫停或終止本網站服務</li>
                <li>限制或禁止特定用戶使用本網站</li>
                <li>修改本使用條款，修改後將在網站上公布</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[rgb(136,99,64)] mb-4">
                8. 爭議解決
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                因使用本網站而產生的任何爭議，應優先透過友好協商解決。如無法協商解決，則：
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>適用中華民國法律</li>
                <li>由台灣台南地方法院管轄</li>
                <li>雙方同意以調解方式優先解決爭議</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[rgb(136,99,64)] mb-4">
                9. 聯絡資訊
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                如果您對本使用條款有任何疑問，請透過以下方式聯繫我們：
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-2">
                  <strong>視寶眼鏡</strong>
                </p>
                <p className="text-gray-700 mb-2">
                  電話：06-6331141
                </p>
                <p className="text-gray-700 mb-2">
                  地址：台南市新營區三民路121之6號
                </p>
                <p className="text-gray-700 mb-2">
                  營業時間：週一至週日 10:00-22:00
                </p>
                <p className="text-gray-700">
                  LINE：@ksn7157i
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[rgb(136,99,64)] mb-4">
                10. 其他條款
              </h2>
              <p className="text-gray-700 leading-relaxed">
                本使用條款構成您與視寶眼鏡之間的完整協議。如果本條款的任何部分被認定為無效或不可執行，其餘部分仍然有效。我們保留隨時修改本條款的權利，修改後的條款將在網站上公布並立即生效。
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
