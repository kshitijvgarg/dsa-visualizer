"use client";

// react hooks
import { useState } from "react";

// models
import { Task } from "@/lib/models/task";
import { TaskList } from "@/lib/models/task-list";

// shadcn hooks
import { useToast } from "@/hooks/use-toast";

// icons
import { Ellipsis } from "lucide-react";

// components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const taskList = new TaskList();

export default function TaskComp() {
  // const [taskList] = useState(new TaskList());

  const { toast } = useToast();

  const [open, setOpen] = useState(false);

  const [taskText, setTaskText] = useState("");
  const [editingTaskNo, setEditingTaskNo] = useState<number | null>(null);
  const [editingTaskText, setEditingTaskText] = useState<string>("");

  const [tasks, setTasks] = useState<Task[]>(taskList.getTasks());

  const generateTaskId = () => {
    return Date.now() - Math.floor(Math.random() * 1000);
  };

  const handleAddTask = () => {
    setOpen(false);
    if (taskText.trim()) {
      if (taskList.getTasks().length < 10) {
        const newTask = new Task(generateTaskId(), "pending", taskText);
        taskList.addTask(newTask);
        setTasks([...taskList.getTasks()]);
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh!",
          description: "You cannot add more than 5 tasks.",
        });
      }
      setTaskText("");
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Task cannot be empty.",
      });
    }
  };

  const handleEditTask = (taskNo: number, taskText: string) => {
    setEditingTaskNo(taskNo);
    setEditingTaskText(taskText);
  };

  const handleSaveTask = (taskNo: number) => {
    if (editingTaskNo) {
      const task = taskList.getTasks().find((task) => task.getNo() === taskNo);
      if (task) {
        task.setTask(editingTaskText);
        setEditingTaskNo(null);
        setEditingTaskText("");
        setTasks([...taskList.getTasks()]);
      }
    }
  };

  const handleDeleteTask = (taskNo: number) => {
    taskList.deleteTask(taskNo);
    setTasks([...taskList.getTasks()]);
  };

  const handleCompleteTask = (taskNo: number) => {
    const taskToComplete = taskList
      .getTasks()
      .find((task) => task.getNo() === taskNo);
    if (taskToComplete) {
      if (taskToComplete.getStatus() == "completed") {
        taskToComplete.setStatus("pending");
      } else {
        taskToComplete.setStatus("completed");
      }
      setTasks([...taskList.getTasks()]); // Trigger re-render with updated tasks
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Add Task</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add your task.</DialogTitle>
            <DialogDescription>What do you have in mind?</DialogDescription>
          </DialogHeader>
          <div className="items-center">
            <Input
              type="text"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              placeholder="Task"
            />
          </div>
          <DialogFooter>
            <Button disabled={!taskText} type="submit" onClick={handleAddTask}>
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Table>
        <TableCaption>A list of your tasks.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Complete</TableHead>
            <TableHead className="w-[100px]">No.</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Task</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <ContextMenu key={task.getNo()}>
              <ContextMenuTrigger asChild>
                <TableRow>
                  <TableCell>
                    <Checkbox
                      checked={task.getStatus() == "completed"}
                      onClick={() => handleCompleteTask(task.getNo())}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{task.getNo()}</TableCell>
                  <TableCell>{task.getStatus()}</TableCell>

                  {task.getNo() == editingTaskNo ? (
                    <TableCell className="flex">
                      <Input
                        type="text"
                        value={editingTaskText}
                        onChange={(e) => setEditingTaskText(e.target.value)}
                        placeholder={editingTaskText}
                      />
                      <Button
                        className="ml-2"
                        type="submit"
                        onClick={() => handleSaveTask(task.getNo())}
                      >
                        Save
                      </Button>
                    </TableCell>
                  ) : (
                    <TableCell>{task.getTask()}</TableCell>
                  )}

                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Ellipsis />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() =>
                            handleEditTask(task.getNo(), task.getTask())
                          }
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteTask(task.getNo())}
                        >
                          Delete
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleCompleteTask(task.getNo())}
                        >
                          {task.getStatus() == "completed"
                            ? "Mark pending"
                            : "Mark complete"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {/* <Button onClick={() => handleDeleteTask(task.getNo())}>Delete</Button>
                    <Button className="ml-2" onClick={() => handleEditTask(task.getNo(), task.getTask())}>Edit</Button> */}
                  </TableCell>
                </TableRow>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem
                  onClick={() => handleEditTask(task.getNo(), task.getTask())}
                >
                  Edit
                </ContextMenuItem>
                <ContextMenuItem onClick={() => handleDeleteTask(task.getNo())}>
                  Delete
                </ContextMenuItem>
                <ContextMenuItem
                  onClick={() => handleCompleteTask(task.getNo())}
                >
                  {task.getStatus() === "completed"
                    ? "Mark pending"
                    : "Mark Complete"}
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          ))}
        </TableBody>
      </Table>
      <Toaster />
    </div>
  );
}
