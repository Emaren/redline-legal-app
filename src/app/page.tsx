import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans min-h-screen bg-white text-black dark:bg-zinc-900 dark:text-white p-8 sm:p-20 flex flex-col items-center justify-center gap-12">
      <header className="text-center">
        <Image
          src="/redline-legal.png"
          alt="Redline Legal logo"
          width={1024}
          height={1024}
          priority
          className="mx-auto mb-6 h-auto w-40 sm:w-52"
        />
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          Redline Legal
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-zinc-600 dark:text-zinc-400">
          Legal Support Services for Self-Represented Litigants & Small Business
        </p>
      </header>

      <main className="max-w-2xl text-center space-y-6">
        <p className="text-base sm:text-lg">
          We help you navigate the legal system by offering document preparation,
          court filing assistance, and litigation support — without the high cost
          of traditional legal representation.
        </p>
        <ul className="list-disc list-inside text-left text-zinc-700 dark:text-zinc-300">
          <li>Small Claims & Civil Filing Support</li>
          <li>Demand Letters & Legal Drafting</li>
          <li>Research & Case Organization</li>
          <li>Affordable, Flat-Rate Services</li>
        </ul>
      </main>

      <a
        href="mailto:contact@redlinelegal.ca"
        className="mt-4 bg-black text-white dark:bg-white dark:text-black px-6 py-3 rounded-full text-sm sm:text-base hover:opacity-90 transition"
      >
        Contact Us
      </a>

      <footer className="text-sm text-zinc-500 dark:text-zinc-400 mt-12">
        &copy; {new Date().getFullYear()} Redline Legal. All rights reserved.
      </footer>
    </div>
  );
}
