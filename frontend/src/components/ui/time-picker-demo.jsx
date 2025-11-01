import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Clock8 } from "lucide-react";

export function TimePickerDemo({ value, onChange }) {
  const [time, setTime] = useState(value || "");

  useEffect(() => {
    setTime(value);
  }, [value]);

  const handleChange = (e) => {
    setTime(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className="relative">
      <Clock8 className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="time"
        className="pl-8"
        value={time}
        onChange={handleChange}
        required
      />
    </div>
  );
}
