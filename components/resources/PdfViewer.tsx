import { Button } from "@/components/ui/button";

export function PdfViewer({ src, title }: { src: string; title?: string }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <Button asChild variant="outline" size="sm">
          <a href={src} target="_blank" rel="noopener noreferrer">
            Mở PDF trong tab mới
          </a>
        </Button>
        <Button asChild variant="secondary" size="sm">
          <a href={src} download>
            Tải xuống PDF
          </a>
        </Button>
      </div>
      <iframe
        src={src}
        title={title || "PDF document"}
        className="h-[80vh] w-full rounded-lg border border-border bg-background"
      />
    </div>
  );
}
