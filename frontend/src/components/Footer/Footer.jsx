export default function Footer() {
    return (
      <footer className="bg-gray-100 flex flex-col items-center text-black py-10 space-y-6 px-4">
         <div className="text-4xl font-semibold mb-6">EShop</div>
        <div className="px-10 flex justify-between items-start border-t-2 w-full py-10">
        
         <div className="w-[500px] flex flex-col items-start justify-center">
          <h1 className="text-2xl font-medium">About US</h1>
          <p className="text-lg text-gray-400 ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos magni quisquam, sit culpa dolore omnis.</p>
         </div>
  
          {/* Center: Links */}
          <div className="flex flex-col items-start justify-center gap-2">
            <h1 className="text-2xl font-medium">Features</h1>
            <div className="flex flex-col gap-2 text-lg text-gray-400">
              <a href="#" className="hover:underline">Privacy Policy</a>
              <a href="#" className="hover:underline">Terms of Service</a>
              <a href="#" className="hover:underline">Contact</a>
            </div>
           
          </div>
  
         
        
        </div>
        <div className="flex items-center justify-center py-4 border-t-2 w-full text-xl gap-4">
         
            <a href="#" aria-label="Twitter" className="hover:text-gray-400">🐦</a>
            <a href="#" aria-label="LinkedIn" className="hover:text-gray-400">🔗</a>
            <a href="#" aria-label="GitHub" className="hover:text-gray-400">💻</a>
            <div>
              <h1>© {new Date().getFullYear()} | EShop | All rights reserved</h1>
          </div>
          </div>
      </footer>
    );
  }
  