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
    <div className="w-11/12 md:py-20 py-8 mx-auto  grid md:grid-cols-2 grid-cols-1 justify-center items-center place-content-center gap-8">
      <div className="w-full ">
        <h2 className="md:text-2xl text-xl font-bold mb-4">Choose Branch</h2>
        <Select>
          <SelectTrigger className="md:w-3/4 h-12">
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
        <p className="text-[#595959] md:text-sm text-xs leading-7 text-justify">
          {`Step into our gallery and explore snapshots from the unforgettable experiences we’ve created at The Theatre Thrills. From intimate movie screenings to grand birthday celebrations, each image captures the joy and excitement of our guests. Get inspired by the unique events we've hosted, showcasing custom decorations, themed parties, and private theatre setups.`}
        </p>
      </div>
    </div>
  );
}
