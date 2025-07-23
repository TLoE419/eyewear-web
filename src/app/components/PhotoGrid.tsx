import Image from "next/image";

const PhotoGrid = () => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-0">
      <div className="relative w-full aspect-[4/3] group overflow-hidden">
        <Image
          src="/Store_1.jpg"
          alt="Featured photo 1"
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgb(38,38,38)] via-transparent to-transparent" />
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 bg-[rgb(38,38,38)]/90 flex flex-col items-start justify-center px-8 py-6 gap-4">
          <p className="text-[rgb(227,208,165)] text-xl font-normal mb-1">
            分店資訊
          </p>
          <p className="text-[rgb(227,208,165)] text-5xl md:text-6xl font-bold mb-4">
            六甲店
          </p>
          <p className="text-[rgb(227,208,165)] text-lg font-normal leading-relaxed mb-4">
            以一條極細的 LED 光框勾勒門楣，像替城市寫下無聲的引言<br></br>
            燈帶在米白立面上留下乾淨的一筆，映出店內大理石中島的冷白與木質展示桌的暖調
            <br></br>
            一隻摺紙鹿靜靜守候，那是視覺與藝術的守門人
          </p>
          <p className="text-[rgb(227,208,165)] text-lg font-normal leading-relaxed mb-1">
            地址：台南市六甲區民生街6號
          </p>
        </div>
      </div>
      <div className="relative w-full aspect-[4/3] group overflow-hidden">
        <Image
          src="/Store_2.jpg"
          alt="Featured photo 2"
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgb(38,38,38)] via-transparent to-transparent" />
        <div className="absolute inset-0 translate-x-full group-hover:translate-x-0 transition-transform duration-500 bg-[rgb(38,38,38)]/90 flex flex-col items-end justify-center px-8 py-6 gap-4 text-right">
          <p className="text-[rgb(227,208,165)] text-xl font-normal mb-1">
            分店資訊
          </p>
          <p className="text-[rgb(227,208,165)] text-5xl md:text-6xl font-bold mb-4">
            新營店
          </p>
          <p className="text-[rgb(227,208,165)] text-lg font-normal leading-relaxed mb-4">
            深色石柱如劇院門框，中央卻懸掛著一塊溫潤原木，矜持且不冷峻的對比
            <br></br>
            推門而入，方形天花拼板在頭頂展開節奏，映襯玻璃展櫃裡的鏡框<br></br>
            每一件都是工藝樂章的高音符
          </p>
          <p className="text-[rgb(227,208,165)] text-lg font-normal leading-relaxed mb-1">
            地址：台南市新營區三民路121之6號
          </p>
        </div>
      </div>
    </div>
  );
};

export default PhotoGrid;
