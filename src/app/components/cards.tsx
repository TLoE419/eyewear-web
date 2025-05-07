"use client";
import Image from "next/image";

const cards = [
  { title: "眼鏡1", image: "/hero.png" },
  { title: "眼鏡2", image: "/hero.png" },
  { title: "眼鏡3", image: "/hero.png" },
  { title: "眼鏡4", image: "/hero.png" },
];

export default function Cards() {
  return (
    <section className="w-full py-12 px-4 bg-white text-gray-700">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-2">眼鏡</h2>
        <p className="text-gray-600 mb-10">.......................</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {cards.map((card) => (
            <div
              key={card.title}
              className="relative overflow-hidden rounded-2xl shadow hover:shadow-lg transition"
            >
              <Image
                src={card.image}
                alt={card.title}
                width={400}
                height={400}
                className="w-full h-[300px] object-cover"
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                <div className="bg-white text-sm font-medium rounded-full px-4 py-1 shadow">
                  {card.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
