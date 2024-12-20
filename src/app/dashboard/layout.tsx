"use client"
import Navbar from "@/components/dashboard/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
<>
 
 <main className="w-full flex h-full bg-gray-100">
    <Navbar/>
    <div className=" w-1/5">

    </div>
    <div className="flex-1 h-full bg-white w-4/5 p-8">
    {children}
    </div>
      
        
      </main>
     
</>
     
     
   
  );
}
