import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
  } from "@/components/ui/sidebar"
  

import { NavLink } from "react-router-dom"
  
  export function AppSidebar() {
    const items = [
        {
          title: "Dashboard",
          url: "/dashboard",
         
        //   icon: Home,
        },
        {
          title: "Manage Users",
          url: "/manageusers",
        
        //   icon: Inbox,
        },
        {
          title: "Manage Products",
          url: "/manageproducts",
         
        //   icon: Calendar,
        },
        {
          title: "Manage Order",
          url: "/manageorder",
         
        //   icon: Search,
        },
        {
          title: "Settings",
          url: "/settings",
          
        //   icon: Settings,
        },
      ]
    return (
     <SidebarProvider className='w-64 min-h-screen text-black'>
         <Sidebar className='text-white bg-orange-600'>
            <SidebarContent className='bg-orange-600 py-4 px-6'>
                <div className="">
                <h1 className="text-2xl font-semibold ">EShop</h1>
                </div>
                <SidebarGroup>
                    {/* <SidebarGroupLabel>EShop</SidebarGroupLabel> */}
                    <SidebarGroupContent>
                        <SidebarMenu className="gap-4">
                            {items.map((item) => (
                             <SidebarMenuItem  key={item.title}>                                 
                                   <NavLink to={item.url}
                                   className={({ isActive }) =>
                                     `text-lg transition-width duration-300  ${
                                       isActive ? 'text-zinc-800' : 'text-white hover:bg-white hover:text-black hover:px-2 hover:rounded-lg'} `
                                   }
                                   >{item.title}</NavLink> 
                                  
                               </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                       
                    </SidebarGroupContent>
                </SidebarGroup>
            
            </SidebarContent>
            <SidebarFooter className='bg-orange-600 p-4 hover:bg-red-600 hover:text-white'>
              <SidebarMenuButton className='hover:bg-red-600 hover:text-white'><h1 className="text-xl font-medium ">Logout</h1></SidebarMenuButton>
            </SidebarFooter>
          
        </Sidebar>
     </SidebarProvider>
    )
  }
  
  