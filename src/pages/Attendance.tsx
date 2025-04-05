import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { api } from '@/services/api';
import { Attendance, Student, Class } from '@/types';
import { Calendar as CalendarIcon, Check, X } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const AttendancePage = () => {
  const { authState } = useAuth();
  const user = authState.user;
  const role = user?.role || '';
  const { toast } = useToast();
  
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [classes, setClasses] = useState<Class[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const classesData = await api.getClasses();
        setClasses(classesData);
        if (classesData.length > 0 && !selectedClass) {
          setSelectedClass(classesData[0].id);
        }
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };
    
    fetchClasses();
  }, [selectedClass]);
  
  useEffect(() => {
    const fetchAttendanceData = async () => {
      setIsLoading(true);
      try {
        if (selectedClass) {
          const formattedDate = format(selectedDate, 'yyyy-MM-dd');
          const attendanceData = await api.getAttendanceByClassId(selectedClass, formattedDate);
          setAttendance(attendanceData);
          
          const allStudents = await api.getStudents();
          const studentIds = attendanceData.map(att => att.studentId);
          const classStudents = allStudents.filter(student => 
            student.classGrade === classes.find(c => c.id === selectedClass)?.className.split(' ')[1]
          );
          setStudents(classStudents);
        }
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (selectedClass && classes.length > 0) {
      fetchAttendanceData();
    }
  }, [selectedClass, selectedDate, classes]);
  
  const isStudentPresent = (studentId: string) => {
    const record = attendance.find(att => att.studentId === studentId);
    return record ? record.status === 'present' : false;
  };
  
  const toggleAttendance = (studentId: string) => {
    const updatedAttendance = [...attendance];
    const index = updatedAttendance.findIndex(att => att.studentId === studentId);
    
    if (index >= 0) {
      const currentStatus = updatedAttendance[index].status;
      updatedAttendance[index] = {
        ...updatedAttendance[index],
        status: currentStatus === 'present' ? 'absent' : 'present'
      };
    } else {
      const newAttendance: Attendance = {
        id: `ATT${Date.now()}`,
        studentId,
        classId: selectedClass,
        date: format(selectedDate, 'yyyy-MM-dd'),
        status: 'present'
      };
      updatedAttendance.push(newAttendance);
    }
    
    setAttendance(updatedAttendance);
  };
  
  const saveAttendance = async () => {
    setIsSaving(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast({
        title: "Attendance Saved",
        description: `Attendance for ${format(selectedDate, 'MMM d, yyyy')} has been saved.`,
      });
      
      console.log('Saving attendance:', attendance);
    } catch (error) {
      console.error('Error saving attendance:', error);
      toast({
        title: "Error",
        description: "Failed to save attendance. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  const renderStudentView = () => {
    const studentId = role === 'student' ? user?.id : 'S1001';
    
    const attendanceData = [
      { date: '2023-09-01', status: 'present' },
      { date: '2023-09-02', status: 'present' },
      { date: '2023-09-05', status: 'absent' },
      { date: '2023-09-06', status: 'present' },
      { date: '2023-09-07', status: 'present' },
      { date: '2023-09-08', status: 'present' },
      { date: '2023-09-11', status: 'present' },
      { date: '2023-09-12', status: 'present' },
      { date: '2023-09-13', status: 'absent' },
      { date: '2023-09-14', status: 'present' },
      { date: '2023-09-15', status: 'present' },
    ];
    
    const totalDays = attendanceData.length;
    const presentDays = attendanceData.filter(day => day.status === 'present').length;
    const absentDays = totalDays - presentDays;
    const attendancePercentage = Math.round((presentDays / totalDays) * 100);
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 card-hover">
          <CardHeader>
            <CardTitle>Attendance Summary</CardTitle>
            <CardDescription>Current semester statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-scholar-primary">{attendancePercentage}%</div>
                <p className="text-sm text-muted-foreground">Attendance Rate</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500">{presentDays}</div>
                  <p className="text-sm text-muted-foreground">Present Days</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-500">{absentDays}</div>
                  <p className="text-sm text-muted-foreground">Absent Days</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2 card-hover">
          <CardHeader>
            <CardTitle>Attendance History</CardTitle>
            <CardDescription>Detailed attendance record</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Day</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendanceData.map((record, index) => {
                  const date = new Date(record.date);
                  return (
                    <TableRow key={index}>
                      <TableCell>{format(date, 'MMM dd, yyyy')}</TableCell>
                      <TableCell>{format(date, 'EEEE')}</TableCell>
                      <TableCell>
                        {record.status === 'present' ? (
                          <Badge className="bg-green-500">Present</Badge>
                        ) : (
                          <Badge className="bg-red-500">Absent</Badge>
                        )}
                      </TableCell>
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
  
  const renderTeacherView = () => (
    <>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Select
            value={selectedClass}
            onValueChange={setSelectedClass}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Class" />
            </SelectTrigger>
            <SelectContent>
              {classes.map(classItem => (
                <SelectItem key={classItem.id} value={classItem.id}>
                  {classItem.className} ({classItem.section})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="min-w-[240px] justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {format(selectedDate, 'PPP')}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Attendance for {classes.find(c => c.id === selectedClass)?.className}</CardTitle>
          <CardDescription>
            Date: {format(selectedDate, 'MMMM d, yyyy')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center p-4">
              <p>Loading attendance data...</p>
            </div>
          ) : students.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No students found for this class.</p>
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map(student => (
                    <TableRow key={student.id}>
                      <TableCell>{student.id}</TableCell>
                      <TableCell>{student.firstName} {student.lastName}</TableCell>
                      <TableCell className="text-center">
                        {isStudentPresent(student.id) ? (
                          <Badge className="bg-green-500">Present</Badge>
                        ) : (
                          <Badge variant="outline" className="text-red-500 border-red-500">Absent</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleAttendance(student.id)}
                        >
                          {isStudentPresent(student.id) ? (
                            <>
                              <X className="h-4 w-4 mr-1 text-red-500" />
                              Mark Absent
                            </>
                          ) : (
                            <>
                              <Check className="h-4 w-4 mr-1 text-green-500" />
                              Mark Present
                            </>
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex justify-end mt-6">
                <Button 
                  onClick={saveAttendance}
                  className="bg-scholar-primary hover:bg-scholar-secondary"
                  disabled={isSaving}
                >
                  {isSaving ? 'Saving...' : 'Save Attendance'}
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
  
  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-semibold mb-4">Attendance</h1>
      
      {['admin', 'teacher'].includes(role) ? renderTeacherView() : renderStudentView()}
    </div>
  );
};

export default AttendancePage;
