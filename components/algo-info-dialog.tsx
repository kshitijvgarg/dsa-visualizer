import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Info } from "lucide-react";
import { SortingAlgorithm } from "@/data/sortingAlgorithms";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";

interface SortingAlgorithmInfoProps {
  algorithm: SortingAlgorithm | null;
}

const AlgoInfoDialog: React.FC<SortingAlgorithmInfoProps> = ({ algorithm }) => {
  if (!algorithm) {
    return;
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Info /> How it works
        </Button>
      </DialogTrigger>

      <DialogContent className="">
        <DialogHeader>
          <DialogTitle className="">{algorithm.name}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <>
            <div className="">
              <p className="">{algorithm.description}</p>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="">Time Complexity</h3>
              <div className="flex space-x-2">
                <Badge className="bg-green-500">{`Best: ${algorithm.bestCaseTimeComplexity}`}</Badge>
                <Badge className="bg-yellow-500">{`Average: ${algorithm.averageCaseTimeComplexity}`}</Badge>
                <Badge className="bg-red-500">{`Worst: ${algorithm.worstCaseTimeComplexity}`}</Badge>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="">Space Complexity</h3>
              <div>
                <Badge>{algorithm.spaceComplexity}</Badge>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="">Stability</h3>
              <p className="">
                {algorithm.stable
                  ? "Stable (Preserves relative order)"
                  : "Not Stable"}
              </p>
            </div>
          </>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AlgoInfoDialog;
