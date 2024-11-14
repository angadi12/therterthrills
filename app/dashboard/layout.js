import Nav from "@/components/Dashboardcomponent/Nav";
import Sidenav from "@/components/Dashboardcomponent/Sidenav";

export default function DashboardLayout({ children }) {
  return (
    <section>
      <main className="grid grid-cols-1 md:grid-cols-[auto,1fr] bg-white   w-full">
        <div className="w-full h-full md:h-screen">
          <Sidenav/>
        </div>

        <section className="flex  flex-col  w-full h-full md:h-screen p-0 ">
          <Nav/>
          {children}
        </section>
      </main>
    </section>
  );
}
