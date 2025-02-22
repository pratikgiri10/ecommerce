export default function Footer() {
    return (
      <footer className="bg-zinc-900 text-white py-6 px-4 mt-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          {/* Left: Branding */}
          <div className="text-lg font-semibold">EShop © {new Date().getFullYear()}</div>
  
          {/* Center: Links */}
          <div className="flex space-x-4 my-3 md:my-0">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Contact</a>
          </div>
  
          {/* Right: Socials (optional) */}
          <div className="flex space-x-3">
            <a href="#" aria-label="Twitter" className="hover:text-gray-400">🐦</a>
            <a href="#" aria-label="LinkedIn" className="hover:text-gray-400">🔗</a>
            <a href="#" aria-label="GitHub" className="hover:text-gray-400">💻</a>
          </div>
        </div>
      </footer>
    );
  }
  