"use client";
import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[rgb(231,229,218)]">
      {/* Header */}
      <div className="bg-[rgb(38,38,38)] text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center">
            隱私權政策
          </h1>
          <p className="text-center text-gray-300 mt-4">Privacy Policy</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 md:p-12">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">
              最後更新日期：{new Date().toLocaleDateString("zh-TW")}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[rgb(136,99,64)] mb-4">
                1. 資料收集與使用
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                視寶眼鏡（以下簡稱「我們」）致力於保護您的隱私權。本隱私權政策說明我們如何收集、使用、儲存和保護您的個人資料。
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>
                  當您瀏覽我們的網站時，我們可能會收集您的 IP
                  地址、瀏覽器類型、作業系統等技術資訊
                </li>
                <li>
                  當您聯繫我們或使用我們的服務時，我們會收集您提供的個人資訊，如姓名、電話號碼、電子郵件地址
                </li>
                <li>
                  我們使用這些資訊來提供更好的服務、回應您的詢問，以及改善我們的網站功能
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[rgb(136,99,64)] mb-4">
                2. 資料儲存與安全
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                我們採用適當的技術和組織措施來保護您的個人資料：
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>使用加密技術保護資料傳輸</li>
                <li>限制員工對個人資料的存取權限</li>
                <li>定期更新安全措施以應對新的威脅</li>
                <li>資料僅在必要的時間內保存</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[rgb(136,99,64)] mb-4">
                3. 資料分享
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                我們不會出售、交易或轉讓您的個人資料給第三方，除非：
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>獲得您的明確同意</li>
                <li>法律要求或法院命令</li>
                <li>保護我們的權利、財產或安全</li>
                <li>與可信賴的服務提供商合作（如網站託管、分析服務等）</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[rgb(136,99,64)] mb-4">
                4. Cookie 使用
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                我們的網站使用 Cookie 來改善您的瀏覽體驗：
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>必要 Cookie：確保網站正常運作</li>
                <li>分析 Cookie：幫助我們了解網站使用情況</li>
                <li>功能 Cookie：記住您的偏好設定</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                您可以透過瀏覽器設定來管理或刪除 Cookie。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[rgb(136,99,64)] mb-4">
                5. 您的權利
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                根據相關法律，您對您的個人資料享有以下權利：
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>查詢權：了解我們收集了哪些關於您的資料</li>
                <li>更正權：要求更正不正確的個人資料</li>
                <li>刪除權：要求刪除您的個人資料</li>
                <li>限制處理權：要求限制對您資料的處理</li>
                <li>資料可攜權：要求以結構化格式提供您的資料</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[rgb(136,99,64)] mb-4">
                6. 第三方連結
              </h2>
              <p className="text-gray-700 leading-relaxed">
                我們的網站可能包含指向第三方網站的連結。我們不對這些網站的隱私權政策負責，建議您在訪問這些網站時查看其隱私權政策。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[rgb(136,99,64)] mb-4">
                7. 政策更新
              </h2>
              <p className="text-gray-700 leading-relaxed">
                我們可能會不時更新本隱私權政策。任何重大變更都會在網站上公布，並更新「最後更新日期」。建議您定期查看本政策以了解最新資訊。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[rgb(136,99,64)] mb-4">
                8. 聯絡我們
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                如果您對本隱私權政策有任何疑問或需要行使您的權利，請透過以下方式聯繫我們：
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-2">
                  <strong>視寶眼鏡</strong>
                </p>
                <p className="text-gray-700 mb-2">電話：06-6331141</p>
                <p className="text-gray-700 mb-2">
                  地址：台南市新營區三民路121之6號
                </p>
                <p className="text-gray-700">
                  營業時間：週一至週日 10:00-22:00
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
