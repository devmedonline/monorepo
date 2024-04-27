import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { HelpCircleIcon } from "lucide-react";

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="bg-gray-100 text-gray-900 rounded p-1">{children}</kbd>
  );
}

export function TextEditorHelpDialogTrigger() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="p-0 text-muted-foreground">
          <HelpCircleIcon className="w-4 h-4 mr-1" />
          Ajuda
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>Ajuda</DialogHeader>
        <DialogDescription asChild>
          <div>
            Os seguintes atalhos estão disponíveis:
            <ul className="mt-2 flex gap-2 flex-col">
              <li>
                <Kbd>Ctrl</Kbd> + <Kbd>B</Kbd> - Negrito
              </li>
              <li>
                <Kbd>Ctrl</Kbd> + <Kbd>I</Kbd> - Itálico
              </li>
              <li>
                <Kbd>Ctrl</Kbd> + <Kbd>U</Kbd> - Sublinhado
              </li>
              <li>
                <Kbd>Ctrl</Kbd> + <Kbd>Shift</Kbd> + <Kbd>7</Kbd> - Lista
                numerada
              </li>
              <li>
                <Kbd>Ctrl</Kbd> + <Kbd>Shift</Kbd> + <Kbd>8</Kbd> - Lista com
                marcadores
              </li>
              <li>
                <Kbd>{">"}</Kbd> + <Kbd>Espaço</Kbd> - Citação
              </li>
              <li>
                <Kbd>---</Kbd> + <Kbd>Espaço</Kbd> - Divisor
              </li>
              <li>
                <Kbd>#</Kbd> + <Kbd>Espaço</Kbd> - Título
              </li>
              <li>
                <Kbd>##</Kbd> + <Kbd>Espaço</Kbd> - Subtítulo
              </li>
            </ul>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
