
'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Settings, Save, Bell, Shield, LogOut, Loader2 } from "lucide-react";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            toast({
                title: "Pengaturan Disimpan",
                description: "Preferensi Anda telah berhasil diperbarui.",
            })
        }, 1500);
    }

    return (
        <div className="container mx-auto max-w-4xl py-8 md:py-12">
            <div className="flex flex-col items-center text-center">
                 <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Settings className="h-8 w-8" style={{color: 'var(--primary-optimistic)'}}/>
                </div>
                <h1 className="text-4xl font-bold tracking-tight" style={{fontFamily: 'Sora, sans-serif'}}>Pengaturan</h1>
                <p className="mt-2 max-w-2xl text-muted-foreground">
                    Kelola preferensi akun, notifikasi, dan keamanan Anda.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-8">
                <Card className="glass-card">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Bell className="h-5 w-5"/> Notifikasi</CardTitle>
                        <CardDescription>Pilih notifikasi yang ingin Anda terima.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between rounded-lg border p-4">
                            <Label htmlFor="tips-notifications" className="flex flex-col gap-1">
                                <span>Tips Perawatan Harian</span>
                                <span className="font-normal leading-snug text-muted-foreground">
                                    Dapatkan tips harian untuk menjaga kesehatan kulit Anda.
                                </span>
                            </Label>
                            <Switch id="tips-notifications" defaultChecked />
                        </div>
                         <div className="flex items-center justify-between rounded-lg border p-4">
                             <Label htmlFor="promo-notifications" className="flex flex-col gap-1">
                                <span>Promosi & Penawaran</span>
                                <span className="font-normal leading-snug text-muted-foreground">
                                    Terima informasi tentang diskon produk dan penawaran spesial.
                                </span>
                            </Label>
                            <Switch id="promo-notifications" />
                        </div>
                         <div className="flex items-center justify-between rounded-lg border p-4">
                             <Label htmlFor="progress-notifications" className="flex flex-col gap-1">
                                <span>Update Progres & Tujuan</span>
                                <span className="font-normal leading-snug text-muted-foreground">
                                    Dapatkan notifikasi tentang pencapaian tujuan perawatan Anda.
                                </span>
                            </Label>
                            <Switch id="progress-notifications" defaultChecked />
                        </div>
                    </CardContent>
                </Card>

                <Card className="glass-card">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5"/> Keamanan & Privasi</CardTitle>
                        <CardDescription>Kelola keamanan akun Anda.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email">Alamat Email</Label>
                            <Input id="email" type="email" defaultValue="mulky.dhaher@example.com" disabled/>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="password">Ubah Kata Sandi</Label>
                            <Input id="password" type="password" placeholder="••••••••••••"/>
                        </div>
                        <Separator />
                        <Button variant="destructive" className="w-full sm:w-auto">
                            Hapus Akun Saya
                        </Button>
                    </CardContent>
                </Card>

                 <div className="mt-8 flex justify-end gap-4">
                    <Button type="button" variant="outline" size="lg">Batalkan</Button>
                    <Button type="submit" size="lg" disabled={loading}>
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Menyimpan...
                            </>
                        ) : (
                            <>
                                Simpan Pengaturan
                                <Save className="ml-2 h-4 w-4" />
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    )
}
