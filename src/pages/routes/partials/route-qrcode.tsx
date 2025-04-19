import html2canvas from 'html2canvas-pro';
import { MapPin, QrCode } from 'lucide-react';
import React from 'react';
import QrCodeComponent from 'react-qr-code';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { getName, Route } from '@/models/route.type';

import { Detail } from './route-details';

export const RouteQrCode = ({ route }: { route: Route }) => {
  const printRef = React.useRef(null);

  const handleDownloadImage = async () => {
    const element = printRef.current;

    if (!element) {
      return;
    }

    const canvas = await html2canvas(element);

    const data = canvas.toDataURL('image/jpg');
    const link = document.createElement('a');

    if (typeof link.download === 'string') {
      link.href = data;
      link.download = `alfaid-rota-${route.id}.png`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" children={<QrCode />} />
      </DialogTrigger>

      <DialogContent className="p-0 gap-0">
        <div className="p-6" ref={printRef}>
          <DialogHeader>
            <DialogTitle className="text-left pb-6">
              Rota {getName(route)}
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-3 text-left">
            <Detail
              icon={<MapPin size={14} />}
              label="Origem"
              value={route.path.origin.toUpperCase()}
            />

            <Detail
              icon={<MapPin size={14} />}
              label="Destino"
              value={route.path.destination.toUpperCase()}
            />

            <div className="w-[128px] my-6 mx-auto">
              <QrCodeComponent
                size={256}
                className="max-w-full w-full h-auto"
                value={route.id!.toString()}
                viewBox={`0 0 256 256`}
              />
            </div>
          </div>
        </div>

        <DialogFooter className="p-6">
          <Button variant="ghost" onClick={handleDownloadImage}>
            Baixar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
