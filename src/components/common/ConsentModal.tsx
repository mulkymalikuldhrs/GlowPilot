
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
            <ShieldCheck className="w-12 h-12 text-primary" />
          </div>
          <AlertDialogTitle className="text-center">Selamat Datang di GlowPilot!</AlertDialogTitle>
          <AlertDialogDescription className="text-center text-muted-foreground pt-2">
            Sebelum kita mulai, kami ingin memastikan Anda memahami beberapa hal penting.
            <ul className="list-disc list-inside text-left mt-4 space-y-2 text-xs text-muted-foreground px-6">
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
