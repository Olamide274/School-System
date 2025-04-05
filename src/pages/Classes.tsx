
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Calendar, Users } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

type Class = {
  id: string;
  name: string;
  section: string;
  teacherId: string;
  teacherName: string;
  studentCount: number;
};

// Mock class data
const mockClasses: Class[] = [
  {
    id: "CLS001",
    name: "Grade 10",
    section: "A",
    teacherId: "TCH001",
    teacherName: "Michael Johnson",
    studentCount: 28,
  },
  {
    id: "CLS002",
    name: "Grade 11",
    section: "B",
    teacherId: "TCH002",
    teacherName: "Sarah Williams",
    studentCount: 30,
  },
  {
    id: "CLS003",
    name: "Grade 9",
    section: "C",
    teacherId: "TCH003",
    teacherName: "David Brown",
    studentCount: 25,
  },
  {
    id: "CLS004",
    name: "Grade 12",
    section: "A",
    teacherId: "TCH004",
    teacherName: "Jennifer Davis",
    studentCount: 22,
  },
  {
    id: "CLS005",
    name: "Grade 10",
    section: "B",
    teacherId: "TCH005",
    teacherName: "Robert Wilson",
    studentCount: 29,
  },
];

const Classes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { authState } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const userRole = authState.user?.role || 'student';

  const filteredClasses = mockClasses.filter(
    (cls) =>
      cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.teacherName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleViewTimetable = (classId: string) => {
    // Navigate to timetable page with class ID
    navigate(`/timetable?classId=${classId}`);
  };
  
  const handleViewStudents = (classId: string) => {
    // Navigate to students filtered by class
    navigate(`/students?classId=${classId}`);
  };
  
  const handleAddClass = () => {
    // In a real app, this would open a modal or navigate to a form
    toast({
      title: "Add Class",
      description: "Class creation form would open here",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Classes</h1>
        {userRole === 'admin' && (
          <Button 
            className="bg-scholar-primary hover:bg-scholar-secondary"
            onClick={handleAddClass}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Class
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Classes</CardTitle>
            <CardDescription>Current academic year</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{mockClasses.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Students</CardTitle>
            <CardDescription>Across all classes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {mockClasses.reduce((sum, cls) => sum + cls.studentCount, 0)}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Class Teachers</CardTitle>
            <CardDescription>Assigned teachers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{mockClasses.length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Class Management</CardTitle>
          <CardDescription>Manage all classes in the system</CardDescription>
          <div className="flex items-center mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search classes..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Class Name</TableHead>
                <TableHead>Section</TableHead>
                <TableHead>Class Teacher</TableHead>
                <TableHead>Students</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClasses.map((cls) => (
                <TableRow key={cls.id}>
                  <TableCell className="font-medium">{cls.id}</TableCell>
                  <TableCell>{cls.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{cls.section}</Badge>
                  </TableCell>
                  <TableCell>{cls.teacherName}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{cls.studentCount}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewTimetable(cls.id)}
                    >
                      <Calendar className="h-4 w-4 mr-1" /> Timetable
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewStudents(cls.id)}
                    >
                      Students
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Classes;
