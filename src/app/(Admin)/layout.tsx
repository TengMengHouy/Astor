import {ErrorBoundary} from "next/dist/client/components/error-boundary";
import Error from "@/app/error";
import {Suspense} from "react";
import Loading from "@/components/Loading";
import {AppSidebar} from "@/components/sidebar";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode;
}>) {
    return (
        <SidebarProvider>
            <ErrorBoundary errorComponent={Error}>
                <AppSidebar/>
                <Suspense fallback={Loading()}>
                    <div className="min-h-screen flex-1 bg-slate-50 dark:bg-zinc-950">
                        <div className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 px-4 py-3 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/80">
                            <SidebarTrigger/>
                        </div>
                        {children}
                    </div>
                </Suspense>
            </ErrorBoundary>
        </SidebarProvider>
    );
}
