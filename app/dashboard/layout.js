import Nav from "@/components/Dashboardcomponent/Nav";
import Sidenav from "@/components/Dashboardcomponent/Sidenav";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function DashboardLayout({ children }) {
  return (
    <section>
      <main className="grid grid-cols-1 md:grid-cols-[auto,1fr]    w-full">
        <div className="w-full h-full md:h-screen">
          <Sidenav/>
        </div>

        <section className="flex  flex-col  w-full  h-full md:h-screen p-0 ">
          <Nav/>
          <ScrollArea className="w-full  ">
          {children}

          </ScrollArea>
        </section>
      </main>
    </section>
  );
}
