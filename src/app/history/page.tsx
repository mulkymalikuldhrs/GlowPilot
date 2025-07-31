
'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { History, Scale, Wand2, Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function HistoryPage() {

    const diagnosisHistory = [
        { id: 1, type: "Diagnosis", title: "Jerawat Ringan", date: "3 hari yang lalu", icon: <Wand2 className="h-5 w-5 text-primary" style={{color: 'var(--primary-optimistic)'}}/> },
        { id: 3, type: "Diagnosis", title: "Kulit Kering & Kusam", date: "2 minggu yang lalu", icon: <Wand2 className="h-5 w-5 text-primary" style={{color: 'var(--primary-optimistic)'}}/> },
        { id: 5, type: "Diagnosis", title: "Analisis Rutinitas", date: "1 bulan yang lalu", icon: <Wand2 className="h-5 w-5 text-primary" style={{color: 'var(--primary-optimistic)'}}/> },
    ];

    const comparisonHistory = [
        { id: 2, type: "Perbandingan", title: "CeraVe vs La Roche-Posay Cleanser", date: "5 hari yang lalu", icon: <Scale className="h-5 w-5 text-primary" style={{color: 'var(--primary-optimistic)'}}/> },
        { id: 4, type: "Perbandingan", title: "Sunscreen: Skin Aqua vs Biore", date: "3 minggu yang lalu", icon: <Scale className="h-5 w-5 text-primary" style={{color: 'var(--primary-optimistic)'}}/> },
    ];

    const HistoryItem = ({ item }: { item: {id: number, type: string, title: string, date: string, icon: React.ReactNode} }) => (
         <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors">
            <div className="flex items-center gap-4">
                {item.icon}
                <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.date}</p>
                </div>
            </div>
            <Button variant="outline" size="sm" asChild>
                <Link href={`/history/${item.id}`}>Lihat Detail</Link>
            </Button>
        </div>
    );

    return (
        <div className="container mx-auto max-w-4xl py-8 md:py-12">
            <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <History className="h-8 w-8" style={{color: 'var(--primary-optimistic)'}}/>
                </div>
                <h1 className="text-4xl font-bold tracking-tight" style={{fontFamily: 'Sora, sans-serif'}}>Riwayat Aktivitas</h1>
                <p className="mt-2 max-w-2xl text-muted-foreground">
                    Jelajahi kembali semua diagnosis dan perbandingan produk yang pernah Anda lakukan.
                </p>
            </div>

            <Card className="mt-8 glass-card">
                <CardContent className="p-6">
                    <Tabs defaultValue="all">
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                            <TabsList>
                                <TabsTrigger value="all">Semua</TabsTrigger>
                                <TabsTrigger value="diagnosis">Diagnosis</TabsTrigger>
                                <TabsTrigger value="comparison">Perbandingan</TabsTrigger>
                            </TabsList>
                             <div className="relative w-full sm:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Cari riwayat..." className="pl-10" />
                            </div>
                        </div>
                       
                        <TabsContent value="all" className="space-y-4">
                            {[...diagnosisHistory, ...comparisonHistory].sort((a,b) => a.id - b.id).map(item => <HistoryItem key={item.id} item={item} />)}
                        </TabsContent>
                        <TabsContent value="diagnosis" className="space-y-4">
                             {diagnosisHistory.map(item => <HistoryItem key={item.id} item={item} />)}
                        </TabsContent>
                        <TabsContent value="comparison" className="space-y-4">
                             {comparisonHistory.map(item => <HistoryItem key={item.id} item={item} />)}
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}
