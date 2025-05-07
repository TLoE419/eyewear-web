// app/page.tsx
import Header from "./components/header";
import Hero from "./components/hero";
import ImageSlider from "./components/imageSlider";
import Cards from "./components/cards";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <div className="mt-16">
        <ImageSlider />
      </div>
      <Cards />
    </>
  );
}
