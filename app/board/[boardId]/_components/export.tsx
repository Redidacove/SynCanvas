import { exportToPdf } from "@/lib/utils";
import { Save } from "lucide-react";

import { Button } from "@/components/ui/button";

const Export = () => (
  <div className="bg-white rounded-md gap-y-1 p-1.5 flex flex-col items-center shadow-md">
    <Button onClick={exportToPdf} variant="board">
      <Save />
    </Button>
  </div>
);

export default Export;
