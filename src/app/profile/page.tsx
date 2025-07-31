
'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { User, Save, Loader2 } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfilePage() {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        // Mock saving data
        setTimeout(() => {
            setLoading(false);
            toast({
                title: "Profil Diperbarui",
                description: "Informasi profil Anda telah berhasil disimpan.",
            })
        }, 1500);
    }

    return (
        <div className="container mx-auto max-w-4xl py-8 md:py-12">
            <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <User className="h-8 w-8" style={{color: 'var(--primary-optimistic)'}}/>
                </div>
                <h1 className="text-4xl font-bold tracking-tight" style={{fontFamily: 'Sora, sans-serif'}}>Profil Pengguna</h1>
                <p className="mt-2 max-w-2xl text-muted-foreground">
                    Personalisasikan pengalaman Anda dengan melengkapi profil kulit Anda.
                </p>
            </div>
            
            <form onSubmit={handleSubmit}>
                <div className="mt-8 grid gap-8 md:grid-cols-3">
                    <div className="md:col-span-1">
                        <Card className="glass-card text-center">
                            <CardContent className="p-6">
                                <Avatar className="h-24 w-24 mx-auto mb-4">
                                    <AvatarImage src="https://placehold.co/100x100.png" alt="Mulky Malikul Dhaher" data-ai-hint="user avatar" />
                                    <AvatarFallback>M</AvatarFallback>
                                </Avatar>
                                <Button variant="outline" size="sm">Ubah Foto</Button>
                                <p className="text-lg font-semibold mt-4">Mulky Malikul Dhaher</p>
                                <p className="text-sm text-muted-foreground">email@example.com</p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="md:col-span-2">
                        <Card className="glass-card">
                            <CardHeader>
                                <CardTitle>Informasi Kulit</CardTitle>
                                <CardDescription>Informasi ini membantu AI memberikan saran yang akurat.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid gap-6 md:grid-cols-2">
                                     <div className="space-y-2">
                                        <Label htmlFor="name">Nama Lengkap</Label>
                                        <Input id="name" placeholder="Nama Anda" defaultValue="Mulky Malikul Dhaher"/>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="age">Usia</Label>
                                        <Input id="age" type="number" placeholder="Usia Anda" defaultValue="28"/>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="skinType">Tipe Kulit</Label>
                                     <Select defaultValue="combination">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih tipe kulit Anda" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="normal">Normal</SelectItem>
                                            <SelectItem value="oily">Berminyak</SelectItem>
                                            <SelectItem value="dry">Kering</SelectItem>
                                            <SelectItem value="combination">Kombinasi</SelectItem>
                                            <SelectItem value="sensitive">Sensitif</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            
                                <div className="space-y-2">
                                    <Label htmlFor="concerns">Masalah Utama Kulit</Label>
                                    <Textarea id="concerns" placeholder="cth., Jerawat, Flek Hitam, Kerutan" defaultValue="Jerawat, Kemerahan, Pori-pori besar"/>
                                </div>

                                 <div className="space-y-2">
                                    <Label htmlFor="preferences">Preferensi Produk</Label>
                                    <Textarea id="preferences" placeholder="cth., Vegan, Bebas Pewangi, Merek yang disukai" defaultValue="Preferensi untuk produk yang tidak mengandung alkohol dan pewangi."/>
                                </div>
                                
                                <div className="space-y-2">
                                     <Label htmlFor="budget">Anggaran Perawatan Kulit (Bulanan)</Label>
                                     <Select defaultValue="50-100">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih anggaran Anda" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="<50">Rp 0 - Rp 750.000</SelectItem>
                                            <SelectItem value="50-100">Rp 750.000 - Rp 1.500.000</SelectItem>
                                            <SelectItem value="100-200">Rp 1.500.000 - Rp 3.000.000</SelectItem>
                                            <SelectItem value=">200">Rp 3.000.000+</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
                 <div className="mt-8 flex justify-end">
                    <Button type="submit" size="lg" disabled={loading}>
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Menyimpan...
                            </>
                        ) : (
                            <>
                                Simpan Perubahan
                                <Save className="ml-2 h-4 w-4" />
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    )
}
