import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";

export function InfoCard({ title, children, onEdit }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center border-b pb-2 mb-4">
        <h3 className="font-bold text-lg">{title}</h3>
        <Button variant="link" onClick={onEdit} className="text-sm">
          <Edit2 size={16} className="ml-1" />
          ویرایش
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">{children}</div>
    </div>
  );
}

export function InfoRow({ label, value, isMono = false }) {
  return (
    <>
      <p className="text-gray-500">{label}</p>
      <p className={isMono ? "font-mono" : ""}>{value || "—"}</p>
    </>
  );
}
