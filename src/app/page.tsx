// app/page.tsx
import Header from "./components/header";
import Hero from "./components/hero";
import ImageSlider from "./components/imageSlider";
import News from "./components/news";
import EyeglassCardGrid from "./components/EyeglassCardGrid";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/0 h-32 -mt-16 pointer-events-none z-10" />
        <News />
        <ImageSlider />
      </div>
      <EyeglassCardGrid />
    </>
  );
}
