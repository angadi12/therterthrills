import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Branchselect() {
  return (
    <div className="w-11/12 py-20 mx-auto  grid grid-cols-2 justify-center items-center place-content-center gap-8">
      <div className="w-full ">
        <h2 className="text-2xl font-bold mb-4">Choose Branch</h2>
        <Select>
          <SelectTrigger className="w-3/4">
            <SelectValue placeholder="Select a branch" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="lingampally">Lingampally</SelectItem>
            <SelectItem value="branch2">Branch 2</SelectItem>
            <SelectItem value="branch3">Branch 3</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full ">
        <p className="text-[#595959] text-sm leading-7 text-justify">
          {`Step into our gallery and explore snapshots from the unforgettable experiences we’ve created at The Theatre Thrills. From intimate movie screenings to grand birthday celebrations, each image captures the joy and excitement of our guests. Get inspired by the unique events we've hosted, showcasing custom decorations, themed parties, and private theatre setups.`}
        </p>
      </div>
    </div>
  );
}
