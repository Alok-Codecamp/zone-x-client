import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";


const Dashboard = () => {
    const [showShopName, setShowShopName] = useState<boolean>(false)
    const stored = localStorage.getItem('signinInfo');
    const myInfo = stored && JSON.parse(stored)?.userInfo
    const navigate = useNavigate();
    const hostname = window.location.hostname;
    const subdomain = hostname.split(".")[0];
    useEffect(() => {
        if (subdomain !== "localhost" && window.location.pathname === "/") {
            navigate("/shop");
        }
    }, [navigate, subdomain]);
    console.log(myInfo);
    return (
        <SidebarProvider>
            <AppSidebar />
            <main>
                <SidebarTrigger />
                <div className="">
                    <div className="" onClick={() => setShowShopName(!showShopName)}>
                        <img src="https://c7.alamy.com/comp/TC2FPE/young-man-avatar-cartoon-character-profile-picture-TC2FPE.jpg" alt="" className="h-40 w-40 shadow-lg border-1 border-gray-400" />
                    </div>
                    <div className="mt-20">
                        {
                            showShopName && <p className="text-2xl my-6">Your shop names</p>
                        }
                        {
                            showShopName && myInfo.shopName.map((item: string) => (
                                <button
                                    key={item}
                                    onClick={() => window.location.href = `http://${item}.localhost:5173/shop`}
                                    className="cursor-pointer inline border-2 border-violet-600 bg-violet-900 text-white shadow-lg mx-4 px-2 py-2 rounded-lg hover:bg-violet-700 transition-all duration-200"
                                >
                                    {item}
                                </button>
                            ))
                        }
                    </div>
                </div>
            </main>
        </SidebarProvider>
    );
}

export default Dashboard;
