import StoreBanner from "@/components/store-banner";
import CardsSections from "./_sections/cards-sections";
import CategoriesSection from "./_sections/categories-section";
import PopularSearches from "./_sections/popular-searches";
import Stories from "./_sections/stories";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <CategoriesSection />
      <Suspense fallback={<div>Loading stories...</div>}>
        <Stories />
      </Suspense>
      <CardsSections />
      <StoreBanner />
      <PopularSearches />
    </>
  );
}
