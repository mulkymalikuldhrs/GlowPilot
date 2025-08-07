
'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";

interface ConsentModalProps {
  isOpen: boolean;
  onAccept: () => void;
}

export function ConsentModal({ isOpen, onAccept }: ConsentModalProps) {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="glass-card">
        <AlertDialogHeader>
          <div className="flex justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <ShieldCheck className="w-8 h-8 text-primary" />
            </div>
          </div>
          <AlertDialogTitle className="text-center" style={{fontFamily: 'Sora, sans-serif'}}>Selamat Datang di GlowPilot!</AlertDialogTitle>
          <AlertDialogDescription className="text-center text-muted-foreground pt-2">
            Sebelum kita mulai, kami ingin memastikan Anda memahami beberapa hal penting.
            <ul className="list-disc list-inside text-left mt-4 space-y-2 text-xs text-muted-foreground px-2 sm:px-6">
                <li>
                    <strong>Ini Bukan Nasihat Medis:</strong> GlowPilot adalah asisten AI, bukan dokter sungguhan. Konsultasi di sini bersifat informasional dan tidak menggantikan nasihat dari dokter profesional.
                </li>
                 <li>
                    <strong>Privasi & Data:</strong> Kami menghargai privasi Anda. Interaksi Anda akan digunakan untuk meningkatkan layanan kami. Untuk detail lebih lanjut, lihat{" "}
                    <Link href="/privacy" className="underline hover:text-primary">Kebijakan Privasi</Link> kami.
                </li>
            </ul>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={onAccept} className="w-full">
            Saya Mengerti & Lanjutkan
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
