import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { X } from 'lucide-react';

interface ServerInfoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ServerInfoModal({ open, onOpenChange }: ServerInfoModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="bg-[#0a0a0a] border border-cyan-500/30 backdrop-blur-2xl max-w-lg w-[95%] p-0 overflow-hidden"
      >
        <DialogClose className="absolute right-4 top-4 z-10 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
          <X className="w-5 h-5 text-white" />
        </DialogClose>

        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-cyan-400">&#9728;</span> Энергосистема Сервера
          </DialogTitle>
        </DialogHeader>

        <div className="p-6">
          <div className="bg-black rounded-lg p-4 font-mono text-sm border border-cyan-500/20">
            <div className="space-y-2">
              <div className="flex">
                <span className="text-cyan-400 w-20 shrink-0">Host:</span>
                <span className="text-green-400">MAR-LX1A</span>
              </div>
              <div className="flex">
                <span className="text-cyan-400 w-20 shrink-0">OS:</span>
                <span className="text-green-400">Android 16 (Dev)</span>
              </div>
              <div className="h-px bg-cyan-500/20 my-3" />
              <div className="flex">
                <span className="text-cyan-400 w-20 shrink-0">Power:</span>
                <span className="text-yellow-400">
                  Солнечная станция 56W
                </span>
              </div>
              <div className="flex">
                <span className="text-cyan-400 w-20 shrink-0">Converter:</span>
                <span className="text-yellow-400">Buck-boost</span>
              </div>
              <div className="flex">
                <span className="text-cyan-400 w-20 shrink-0">Storage:</span>
                <span className="text-yellow-400">
                  PowerBank 40 000 mAh
                </span>
              </div>
              <div className="h-px bg-cyan-500/20 my-3" />
              <div className="flex">
                <span className="text-cyan-400 w-20 shrink-0">Core:</span>
                <span className="text-purple-400">
                  ARM-процессор (Termux)
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>Система активна и функционирует нормально</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
