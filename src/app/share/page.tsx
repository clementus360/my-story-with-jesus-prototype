import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShareStoryForm from "@/components/share/ShareStoryForm";

export const metadata = {
  title: "Share Your Story — My Story With Jesus",
  description: "Share your personal testimony and inspire believers around the world.",
};

export default function SharePage() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <Header />

      {/* Hero */}
      <section className="bg-[#00194c] px-6 py-16 text-center">
        <div className="max-w-[600px] mx-auto">
          <p className="text-[#7986cb] text-sm font-semibold uppercase tracking-widest mb-4">Share Your Testimony</p>
          <h1 className="text-white text-[44px] font-bold leading-tight mb-4">
            Your story is someone's miracle
          </h1>
          <p className="text-[#b0bec5] text-base leading-relaxed">
            Every testimony carries the power to shift a life. Take a few minutes to share what God has done for you — the world needs to hear it.
          </p>
        </div>
      </section>

      {/* Form */}
      <ShareStoryForm />

      <Footer />
    </main>
  );
}
