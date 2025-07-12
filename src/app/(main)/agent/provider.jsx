import AppHeader from "./_components/AppHeader";
import AppSidebar from "./_components/AppSidebar";
import { SidebarProvider } from "./_components/sidebar";

export default function Provider({ children }) {
  return (
    
      <SidebarProvider>

        <AppSidebar/>

      <div className="w-full bg-blue-100">
        <AppHeader />
        <div>
          {children}
        </div> 
      </div>
    </SidebarProvider>
    
    
  );
}
