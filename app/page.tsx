import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FinancialProvider } from '@/contexts/financial-context'
import ConsultantsComponent from '@/components/consultants-component'
import { ClientsProvider } from '@/contexts/client-context'
import ClientsComponent from '@/components/clients-component'
import Image from 'next/image'
import logo from '@/public/logo.gif'

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Financeiro</h2>
          <Image src={logo} alt="Logo" width={100} height={100} />
        </div>
        <Tabs defaultValue="consultants">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="consultants">Consultores</TabsTrigger>
            <TabsTrigger value="clients">Clientes</TabsTrigger>
          </TabsList>
          <TabsContent value="consultants">
            <FinancialProvider>
              <ConsultantsComponent />
            </FinancialProvider>
          </TabsContent>
          <TabsContent value="clients">
            <ClientsProvider>
              <ClientsComponent />
            </ClientsProvider>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
