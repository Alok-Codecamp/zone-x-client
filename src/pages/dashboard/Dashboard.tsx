import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";


const Dashboard = () => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main>
                <SidebarTrigger />
                <div>
                    hello content
                </div>
            </main>
        </SidebarProvider>
    );
}

export default Dashboard;
