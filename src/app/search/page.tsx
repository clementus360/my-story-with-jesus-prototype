import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchPage from "@/components/search/SearchPage";

export const metadata = {
  title: "Search Testimonies — My Story With Jesus",
  description: "Search and filter thousands of testimonies from believers around the world.",
};

export default function SearchRoute() {
  return (
    <main className="min-h-screen bg-[#f9f9f9] overflow-x-hidden flex flex-col">
      <Header />
      <div className="flex-1">
        <Suspense fallback={<div className="h-20" />}>
          <SearchPage />
        </Suspense>
      </div>
      <Footer />
    </main>
  );
}
