import Navbar from "@/components/Navbar";
import SideBar from "@/components/SideBar";
import { getCurrentCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";


const DashboardLayout = async({children}:{children:React.ReactNode})=>{
  const getCount =await  getCurrentCount();
  const isPro = await checkSubscription();
    
     return (
      <div className="h-full relative">
          <div className="hidden h-full md:flex md:flex-col 
              md:fixed  md:w-72 md:inset-y-0 bg-gray-900">
             <SideBar getCount={getCount} isPro={isPro}/>
          </div>
          <main className="md:pl-72">
             <Navbar/>
             {children}
          </main>
      </div>
     )
}

export default DashboardLayout;