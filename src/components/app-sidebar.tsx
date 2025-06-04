import {
    Sidebar,
    SidebarContent,
    SidebarFooter,

    SidebarHeader,
} from "@/components/ui/sidebar"
import { Button } from "./ui/button"
import { useNavigate } from "react-router"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog"

export function AppSidebar() {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('signinInfo')
        navigate('/')
    }
    return (
        <Sidebar>
            <SidebarHeader />
            <SidebarContent>
                <div>Dashboard</div>
            </SidebarContent>
            <SidebarFooter>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="bg-red-700 text-xl text-white">Logout</Button>
                    </DialogTrigger>
                    <DialogContent className="text-center h-40 w-72">
                        Are you sure want to logout
                        <DialogFooter className="w-fit mx-auto">
                            <DialogClose asChild>
                                <Button className="bg-green-600">Cancel</Button>
                            </DialogClose>
                            <Button className="bg-red-600" onClick={handleLogout}>Confirm</Button>
                        </DialogFooter>
                    </DialogContent>

                </Dialog>
            </SidebarFooter>
        </Sidebar>
    )
}