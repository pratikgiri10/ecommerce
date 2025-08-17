import { categoryList } from "@/constants";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center pt-8 space-y-6 px-4 bg-gray-100 text-black ">
      <div className="text-3xl font-bold text-yellow-500">DigitalDokan</div>
      <div className="px-10 flex justify-between items-start border-t-2 border-black  w-full py-4">

        <div className="w-[500px] flex flex-col items-start justify-center">
          <h1 className="text-xl font-medium">About US</h1>
          <p className="text-sm text-gray-800 ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos magni quisquam, sit culpa dolore omnis.</p>
        </div>


        <div className="flex gap-16">
          <div>
            <h1 className="text-xl font-medium">Products</h1>
            <div className="flex flex-col gap-2 text-sm text-gray-800">
              {categoryList.map((category) => (
                <a key={category.value} href="#" className="hover:underline">{category.label}</a>
              ))}


            </div>
          </div>
          <div>
            <h1 className="text-xl font-medium">Features</h1>
            <div className="flex flex-col gap-2 text-sm text-gray-800">
              <a href="#" className="hover:underline">Privacy Policy</a>
              <a href="#" className="hover:underline">Terms of Service</a>
              <a href="#" className="hover:underline">Contact</a>
            </div>
          </div>

        </div>
      </div>
      <div className="flex items-center justify-center py-4 border-t-2 border-black w-full text-lg gap-4">

        <div>
          <h1>© {new Date().getFullYear()} | DigitalDokan | All rights reserved</h1>
        </div>
      </div>
    </footer>
  );
}
