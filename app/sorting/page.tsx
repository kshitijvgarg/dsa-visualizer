"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Loader2 } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AlgoInfoDialog from "@/components/algo-info-dialog";
import { sortingAlgorithms } from "@/data/sortingAlgorithms";

function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function generateRandomArray(
  size: number,
  min: number = 1,
  max: number = 100
): number[] {
  if (size <= 0) {
    throw new Error("Size must be a positive integer.");
  }

  const randomArray: number[] = [];

  for (let i = 0; i < size; i++) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    randomArray.push(randomNumber);
  }

  return randomArray;
}

export default function Page() {
  const [dataSize, setDataSize] = useState([20]);

  const [ogData, setOgData] = useState(generateRandomArray(20, 1, 100));

  const [max, setMax] = useState(Math.max(...ogData));
  const divRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  const [dataUI, setDataUI] = useState([...ogData]);
  const [highIndex, setHighIndex] = useState<number | null>();
  const [newData, setNewData] = useState("");

  const [isSorted, setIsSorted] = useState<boolean>(false);
  const [isSorting, setIsSorting] = useState<boolean>(false);

  const [delayTime, setDelayTime] = useState([0]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string | null>(
    null
  );
  const selectedData = selectedAlgorithm
    ? sortingAlgorithms[selectedAlgorithm]
    : null;

  const [totalTime, setTotalTime] = useState<EpochTimeStamp | null>(null);
  const startTime = useRef<EpochTimeStamp | null>(null);
  const endTime = useRef<EpochTimeStamp | null>(null);

  useEffect(() => {
    if (divRef.current) {
      setHeight(divRef.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    setOgData(generateRandomArray(dataSize[0], 1, 100));
    setIsSorted(false);
  }, [dataSize]);

  useEffect(() => {
    setMax(Math.max(...ogData));
    setDataUI([...ogData]);
  }, [ogData]);

  const handleRandom = () => {
    setOgData(generateRandomArray(dataSize[0], 1, 100));
    setIsSorted(false);
  };

  const handleAddNewData = () => {
    ogData.push(Number(newData));
    setNewData("");
    setDataUI([...ogData]);
  };

  const beforeSort = async () => {
    setTotalTime(null);
    startTime.current = Date.now();
    setIsSorting(true);
  };

  const afterSort = async () => {
    endTime.current = Date.now();
    setTotalTime(endTime.current - startTime.current);
    setIsSorted(true);
    setIsSorting(false);
    for (let i = 0; i < dataSize[0]; i++) {
      setHighIndex(i);
      await delay(5);
    }
    setHighIndex(null);
  };

  const handleBubbleSort = async () => {
    if (isSorted || isSorting) {
      return;
    }
    beforeSort();
    const data = [...ogData];
    for (let i = 0; i < data.length - 1; i++) {
      for (let j = 0; j < data.length - i - 1; j++) {
        setHighIndex(j + 1);
        if (data[j] > data[j + 1]) {
          const temp = data[j];
          data[j] = data[j + 1];
          data[j + 1] = temp;
        }
        setDataUI([...data]);
        await delay(delayTime[0]);
      }
    }
    await afterSort();
  };

  const handleSelectionSort = async () => {
    if (isSorted || isSorting) {
      return;
    }
    await beforeSort();
    const data = [...ogData];
    for (let i = 0; i < data.length - 1; i++) {
      let minpos = i;
      for (let j = i + 1; j < data.length; j++) {
        setHighIndex(j);
        if (data[j] < data[minpos]) {
          minpos = j;
        }
        await delay(delayTime[0]);
      }
      if (minpos != i) {
        const temp = data[i];
        data[i] = data[minpos];
        data[minpos] = temp;
        setDataUI([...data]);
      }
    }
    await afterSort();
  };

  const handleInsertionSort = async () => {
    if (isSorted || isSorting) {
      return;
    }
    await beforeSort();
    const data = [...ogData];
    for (let i = 0; i < data.length - 1; i++) {
      let j = i + 1;
      while (j >= 0 && data[j] < data[j - 1]) {
        setHighIndex(j - 1);
        const temp = data[j - 1];
        data[j - 1] = data[j];
        data[j] = temp;
        setDataUI([...data]);
        await delay(delayTime[0]);
        j--;
      }
    }
    await afterSort();
  };

  const handleSort = () => {
    switch (selectedAlgorithm) {
      case "bubbleSort":
        handleBubbleSort();
        break;
      case "selectionSort":
        handleSelectionSort();
        break;
      case "insertionSort":
        handleInsertionSort();
        break;
      case "quickSort":
        //quick sort
        break;

      default:
        break;
    }
  };

  const handleUnsort = () => {
    if (isSorting) {
      return;
    }
    setDataUI([...ogData]);
    setIsSorted(false);
  };

  const handleAlgoChange = (value: string) => {
    setSelectedAlgorithm(value);
  };

  const handleDataSizeChange = useCallback(
    debounce((val: number[]) => {
      setDataSize(val);
    }, 10),
    []
  );

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Sorting</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col m-4 gap-4">
        <Tabs defaultValue="random" className="">
          <TabsList>
            <TabsTrigger value="random">Random</TabsTrigger>
            <TabsTrigger value="custom">Custom</TabsTrigger>
          </TabsList>
          <TabsContent value="random">
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>
                  You can explore and play with different sorting algorithms
                  here.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex gap-4">
                <div className=" flex-1 flex flex-col gap-2">
                  <span>Size: {dataSize} elements</span>
                  <Slider
                    value={dataSize}
                    onValueChange={handleDataSizeChange}
                    min={5}
                    max={100}
                    step={1}
                    disabled={isSorting}
                  />
                </div>
                <div className=" flex-1 flex flex-col gap-2">
                  <span>Delay: {delayTime} ms</span>
                  <Slider
                    value={delayTime}
                    onValueChange={(val) => setDelayTime(val)}
                    max={200}
                    step={1}
                    disabled={isSorting}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-wrap gap-4">
                <Button
                  type="submit"
                  disabled={isSorting}
                  onClick={handleRandom}
                  size="sm"
                  variant="destructive"
                >
                  Random
                </Button>

                <Select
                  value={selectedAlgorithm || ""}
                  onValueChange={handleAlgoChange}
                  disabled={isSorting}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Algo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bubbleSort">Bubble Sort</SelectItem>
                    <SelectItem value="selectionSort">
                      Selection Sort
                    </SelectItem>
                    <SelectItem value="insertionSort">
                      Insertion Sort
                    </SelectItem>
                  </SelectContent>
                </Select>

                <AlgoInfoDialog algorithm={selectedData} />

                <Button
                  type="submit"
                  onClick={handleSort}
                  disabled={isSorted || isSorting}
                  size="sm"
                >
                  {isSorting ? <Loader2 className="animate-spin" /> : "Sort"}
                </Button>
                <Button
                  type="submit"
                  disabled={isSorting || !isSorted}
                  onClick={handleUnsort}
                  size="sm"
                  variant="destructive"
                >
                  Unsort
                </Button>
                <p>Time taken: {totalTime / 1000} s</p>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="custom">
            <Input
              className="w-36"
              placeholder="Add data"
              value={newData}
              onChange={(e) => setNewData(e.target.value)}
            ></Input>
            <Button
              type="submit"
              disabled={isSorting || !newData}
              onClick={handleAddNewData}
            >
              Add
            </Button>
          </TabsContent>
        </Tabs>

        <div ref={divRef} className="flex flex-1 items-end rounded-xl gap-1">
          {dataUI.map((element, index) => (
            <div
              key={index}
              className={`flex-1 hover:bg-white ${
                index == highIndex ? "bg-chart-2" : "bg-chart-1"
              }`}
              style={{
                height: `${(element * height) / max}px`,
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}
