'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { User, Save } from "lucide-react";
import { useState } from "react";

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
                description: "Informasi profil Anda telah disimpan.",
            })
        }, 1000);
    }

    return (
        <div className="container mx-auto max-w-4xl py-8">
            <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <User className="h-8 w-8" />
                </div>
                <h1 className="text-4xl font-bold tracking-tight">Profil Pengguna</h1>
                <p className="mt-2 max-w-2xl text-muted-foreground">
                    Kelola informasi profil Anda untuk mendapatkan rekomendasi perawatan kulit yang dipersonalisasi.
                </p>
            </div>

            <Card className="mt-8 glass-card">
                <CardHeader>
                    <CardTitle>Informasi Pribadi</CardTitle>
                    <CardDescription>Informasi ini membantu kami menyesuaikan saran untuk Anda.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                             <div className="space-y-2">
                                <Label htmlFor="name">Nama</Label>
                                <Input id="name" placeholder="Nama Anda" defaultValue="Mulky Malikul Dhaher"/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="age">Usia</Label>
                                <Input id="age" type="number" placeholder="Usia Anda" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="skinType">Tipe Kulit</Label>
                             <Select>
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
                            <Textarea id="concerns" placeholder="cth., Jerawat, Flek Hitam, Kerutan" />
                        </div>

                         <div className="space-y-2">
                            <Label htmlFor="preferences">Preferensi Produk</Label>
                            <Textarea id="preferences" placeholder="cth., Vegan, Bebas Pewangi, Merek yang disukai" />
                        </div>
                        
                        <div className="space-y-2">
                             <Label htmlFor="budget">Anggaran Perawatan Kulit (Bulanan)</Label>
                             <Select>
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

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Menyimpan..." : "Simpan Perubahan"}
                            <Save className="ml-2 h-4 w-4" />
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
