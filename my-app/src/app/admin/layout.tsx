import type { Metadata } from 'next'
import Header from '@/components/admin/header'
import Sidebar from '@/components/admin/sidebar'


export const metadata: Metadata = {
  title: 'Quản lý Admin',
  description: 'Young Tech',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
       <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Main Content where the {children} will be rendered */}
        <main className="p-6 bg-gray-100 flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
