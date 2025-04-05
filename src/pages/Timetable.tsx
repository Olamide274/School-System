
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

type TimeSlot = {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  subject: string;
  teacher: string;
  room: string;
};

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

// Mock timetable data
const mockTimetable: Record<string, TimeSlot[]> = {
  "Grade 10A": [
    {
      id: "TS001",
      day: "Monday",
      startTime: "08:00",
      endTime: "09:00",
      subject: "Mathematics",
      teacher: "Michael Johnson",
      room: "Room 101",
    },
    {
      id: "TS002",
      day: "Monday",
      startTime: "09:15",
      endTime: "10:15",
      subject: "Science",
      teacher: "Sarah Williams",
      room: "Room 102",
    },
    {
      id: "TS003",
      day: "Monday",
      startTime: "10:30",
      endTime: "11:30",
      subject: "History",
      teacher: "David Brown",
      room: "Room 103",
    },
    {
      id: "TS004",
      day: "Tuesday",
      startTime: "08:00",
      endTime: "09:00",
      subject: "English",
      teacher: "Jennifer Davis",
      room: "Room 104",
    },
    {
      id: "TS005",
      day: "Tuesday",
      startTime: "09:15",
      endTime: "10:15",
      subject: "Physical Education",
      teacher: "Robert Wilson",
      room: "Gymnasium",
    },
    {
      id: "TS006",
      day: "Wednesday",
      startTime: "10:30",
      endTime: "11:30",
      subject: "Mathematics",
      teacher: "Michael Johnson",
      room: "Room 101",
    },
    {
      id: "TS007",
      day: "Thursday",
      startTime: "08:00",
      endTime: "09:00",
      subject: "Science",
      teacher: "Sarah Williams",
      room: "Room 102",
    },
    {
      id: "TS008",
      day: "Friday",
      startTime: "09:15",
      endTime: "10:15",
      subject: "History",
      teacher: "David Brown",
      room: "Room 103",
    },
  ],
  "Grade 11B": [
    {
      id: "TS009",
      day: "Monday",
      startTime: "08:00",
      endTime: "09:00",
      subject: "English",
      teacher: "Jennifer Davis",
      room: "Room 104",
    },
    {
      id: "TS010",
      day: "Tuesday",
      startTime: "09:15",
      endTime: "10:15",
      subject: "Mathematics",
      teacher: "Michael Johnson",
      room: "Room 101",
    },
    {
      id: "TS011",
      day: "Wednesday",
      startTime: "10:30",
      endTime: "11:30",
      subject: "Science",
      teacher: "Sarah Williams",
      room: "Room 102",
    },
  ],
};

const classOptions = ["Grade 10A", "Grade 11B"];

const Timetable = () => {
  const [selectedClass, setSelectedClass] = useState(classOptions[0]);
  const { toast } = useToast();

  const handlePrintTimetable = () => {
    toast({
      title: "Printing timetable",
      description: `Timetable for ${selectedClass} has been sent to the printer.`,
    });
  };

  const handleExportTimetable = () => {
    toast({
      title: "Exporting timetable",
      description: `Timetable for ${selectedClass} has been exported to PDF.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Timetable</h1>
        <div className="flex space-x-2">
          <button
            onClick={handlePrintTimetable}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            Print
          </button>
          <button
            onClick={handleExportTimetable}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            Export
          </button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Class Timetable</CardTitle>
          <CardDescription>View and manage class schedules</CardDescription>
          <Tabs
            defaultValue={selectedClass}
            className="mt-4"
            onValueChange={(value) => setSelectedClass(value)}
          >
            <TabsList>
              {classOptions.map((classOption) => (
                <TabsTrigger key={classOption} value={classOption}>
                  {classOption}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Time</TableHead>
                {days.map((day) => (
                  <TableHead key={day}>{day}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {["08:00-09:00", "09:15-10:15", "10:30-11:30"].map((timeSlot) => {
                const [startTime, endTime] = timeSlot.split("-");
                
                return (
                  <TableRow key={timeSlot}>
                    <TableCell className="font-medium">{timeSlot}</TableCell>
                    {days.map((day) => {
                      const lesson = mockTimetable[selectedClass]?.find(
                        (slot) => 
                          slot.day === day && 
                          slot.startTime === startTime && 
                          slot.endTime === endTime
                      );
                      
                      return (
                        <TableCell key={`${day}-${timeSlot}`}>
                          {lesson ? (
                            <div className="p-2 bg-gray-50 rounded border border-gray-100">
                              <div className="font-medium">{lesson.subject}</div>
                              <div className="text-xs text-gray-500">
                                {lesson.teacher}
                              </div>
                              <Badge variant="outline" className="mt-1">
                                {lesson.room}
                              </Badge>
                            </div>
                          ) : (
                            <div className="text-gray-400 text-center">-</div>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Timetable;
