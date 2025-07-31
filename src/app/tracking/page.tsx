
'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { LineChart, PlusCircle, Sun, Moon, Flag, Image as ImageIcon, Calendar as CalendarIcon, Upload } from "lucide-react";
import Image from "next/image";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export default function TrackingPage() {
    const [date, setDate] = useState<Date | undefined>(new Date());

    const amRoutine = [
        { id: "am1", label: "Pembersih Wajah" },
        { id: "am2", label: "Toner" },
        { id: "am3", label: "Serum Vitamin C" },
        { id: "am4", label: "Pelembap" },
        { id: "am5", label: "Tabir Surya" },
    ];

    const pmRoutine = [
        { id: "pm1", label: "Pembersih Ganda (Oil & Foam)" },
        { id: "pm2", label: "Toner Eksfoliasi" },
        { id: "pm3", label: "Serum Retinol" },
        { id: "pm4", label: "Krim Mata" },
        { id: "pm5", label: "Pelembap Malam" },
    ];

    const goals = [
        { id: "g1", title: "Mengurangi Jerawat", value: 60, target: "30 hari" },
        { id: "g2", title: "Mencerahkan Kulit", value: 25, target: "60 hari" },
    ];
    
    return (
        <div className="flex flex-col gap-8 p-4 sm:p-6 md:p-8">
             <section>
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                <LineChart className="h-8 w-8" style={{color: 'var(--primary-optimistic)'}}/>
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold tracking-tight" style={{fontFamily: 'Sora, sans-serif'}}>Jurnal Pelacakan</h1>
                                <p className="mt-1 text-muted-foreground">Monitor progres, rutinitas, dan tujuan kulit Anda di sini.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-8">
                     {/* Daily Routine Section */}
                    <Card className="glass-card">
                        <CardHeader>
                            <CardTitle>Rutinitas Harian</CardTitle>
                            <CardDescription>Tandai rutinitas yang telah Anda selesaikan hari ini.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-8 md:grid-cols-2">
                             <div className="space-y-4">
                                <h3 className="font-semibold flex items-center gap-2 text-lg"><Sun className="text-yellow-400"/> Rutinitas Pagi</h3>
                                <div className="space-y-3">
                                    {amRoutine.map(item => (
                                        <div key={item.id} className="flex items-center gap-3">
                                            <Checkbox id={item.id} />
                                            <Label htmlFor={item.id} className="text-sm font-normal">{item.label}</Label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-4">
                                 <h3 className="font-semibold flex items-center gap-2 text-lg"><Moon className="text-blue-300"/> Rutinitas Malam</h3>
                                 <div className="space-y-3">
                                    {pmRoutine.map(item => (
                                        <div key={item.id} className="flex items-center gap-3">
                                            <Checkbox id={item.id} />
                                            <Label htmlFor={item.id} className="text-sm font-normal">{item.label}</Label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                     {/* Goals Section */}
                    <Card className="glass-card">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Tujuan Kulit Anda</CardTitle>
                                <CardDescription>Tetap termotivasi dengan melacak tujuan Anda.</CardDescription>
                            </div>
                            <Button size="sm" variant="outline"><PlusCircle className="mr-2 h-4 w-4"/> Tambah Tujuan</Button>
                        </CardHeader>
                        <CardContent className="space-y-6">
                           {goals.map(goal => (
                               <div key={goal.id}>
                                    <div className="flex justify-between items-center mb-1">
                                        <p className="font-medium text-sm flex items-center gap-2">
                                            <Flag className="h-4 w-4"/> {goal.title}
                                        </p>
                                        <p className="text-sm font-bold text-primary" style={{color: 'var(--primary-optimistic)'}}>{goal.value}%</p>
                                    </div>
                                    <Progress value={goal.value} className="h-2"/>
                                    <p className="text-xs text-muted-foreground mt-1 text-right">Target: {goal.target}</p>
                               </div>
                           ))}
                        </CardContent>
                    </Card>

                    {/* Progress Photos Section */}
                    <Card className="glass-card">
                        <CardHeader>
                            <CardTitle>Galeri Foto Progres</CardTitle>
                            <CardDescription>Simpan dan bandingkan foto kulit Anda dari waktu ke waktu.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                 {["skin progress cheek", "skin progress forehead", "skin progress chin", "skin progress nose"].map((hint, index) => (
                                     <div key={index} className="relative aspect-square">
                                         <Image 
                                             src={`https://placehold.co/200x200.png`} 
                                             alt={`Progress ${index + 1}`} 
                                             fill
                                             className="rounded-lg object-cover" 
                                             data-ai-hint={hint} 
                                         />
                                         <p className="absolute bottom-1 left-1 text-white text-xs bg-black/50 px-1 rounded">{`${index+1} minggu lalu`}</p>
                                     </div>
                                 ))}
                            </div>
                        </CardContent>
                         <CardFooter>
                            <Button className="w-full" variant="secondary">
                                <Upload className="mr-2 h-4 w-4"/> Unggah Foto Baru
                            </Button>
                        </CardFooter>
                    </Card>
                </div>

                {/* Daily Log Section */}
                <aside className="lg:col-span-1">
                    <div className="sticky top-4">
                        <Card className="glass-card">
                            <CardHeader>
                                <CardTitle>Log Harian</CardTitle>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                        variant={"outline"}
                                        className="w-full justify-start text-left font-normal mt-2"
                                        >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date ? format(date, "PPP", { locale: id }) : <span>Pilih tanggal</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        initialFocus
                                        locale={id}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="skin-condition">Bagaimana kondisi kulit Anda hari ini?</Label>
                                    <Textarea id="skin-condition" placeholder="cth., Sedikit kemerahan di pipi, tidak ada jerawat baru." />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="new-products">Produk baru yang dicoba?</Label>
                                    <Input id="new-products" placeholder="cth., Serum Hyaluronic Acid dari Merek X" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="notes">Catatan Lainnya</Label>
                                    <Textarea id="notes" placeholder="cth., Cukup tidur, minum banyak air." />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full">Simpan Catatan</Button>
                            </CardFooter>
                        </Card>
                    </div>
                </aside>
            </section>
        </div>
    )
}
