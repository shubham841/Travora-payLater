import { SidebarProvider} from "@/components/ui/sidebar";
import AppHeader from "./_components/AppHeader";
import AppSidebar from "./_components/AppSidebar";

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
