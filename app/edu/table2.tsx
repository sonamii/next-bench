import "./style.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, FilterIcon } from "lucide-react";
export function Table() {
  return (
    <>
      <div className="container">
        <div className="heading">
          <div className="text"> Search:</div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "30px",
              width: "400px",
              justifyContent: "end",
              flexDirection: "row",
            }}
          >
            <Input placeholder="Latest in your area..." type="text" />
            <Button>
              <FilterIcon size={26} />
            </Button>
          </div>
        </div>
        <div className="filters">{/*to do*/}</div>
        <div className="tableContainer"></div>
      </div>
    </>
  );
}
