
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarIcon, ClipboardList, Users, BookOpen, Bell } from 'lucide-react';
import { api } from '@/services/api';
import { Student, Teacher, Event } from '@/types';

const Dashboard = () => {
  const { authState } = useAuth();
  const [students, setStudents] = useState<Student[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const user = authState.user;
  const role = user?.role || '';
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        // Fetch different data based on user role
        if (['admin', 'teacher'].includes(role)) {
          const [studentsData, teachersData, eventsData] = await Promise.all([
            api.getStudents(),
            api.getTeachers(),
            api.getEvents()
          ]);
          setStudents(studentsData);
          setTeachers(teachersData);
          setEvents(eventsData);
        } else {
          const eventsData = await api.getEvents();
          setEvents(eventsData);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [role]);
  
  const renderAdminDashboard = () => (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.length}</div>
            <p className="text-xs text-muted-foreground">Enrolled students</p>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teachers.length}</div>
            <p className="text-xs text-muted-foreground">Active teachers</p>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Classes</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Active classes</p>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
        <Card className="md:col-span-4 lg:col-span-3 card-hover">
          <CardHeader>
            <CardTitle>Recent Students</CardTitle>
            <CardDescription>Recently enrolled students</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {students.slice(0, 5).map(student => (
                <div key={student.id} className="flex items-center gap-4">
                  <div className="font-medium">{student.firstName} {student.lastName}</div>
                  <div className="ml-auto text-sm text-muted-foreground">{student.classGrade}</div>
                </div>
              ))}
            </div>
            <Button variant="link" className="mt-4 px-0">View all students</Button>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-4 lg:col-span-4 card-hover">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>School events scheduled</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events.map(event => (
                <div key={event.id} className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{event.eventName}</span>
                    <div className="ml-auto text-sm text-muted-foreground">{event.date}</div>
                  </div>
                  <p className="text-sm text-muted-foreground ml-6">{event.venue}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
  
  const renderTeacherDashboard = () => (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">My Classes</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Classes assigned</p>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.length}</div>
            <p className="text-xs text-muted-foreground">Under supervision</p>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 mt-4">
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Class Schedule Today</CardTitle>
            <CardDescription>Your teaching sessions for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div>
                  <div className="font-medium">Mathematics - Grade 10A</div>
                  <div className="text-sm text-muted-foreground">9:00 AM - 10:30 AM</div>
                </div>
                <Button variant="ghost" className="ml-auto" size="sm">View</Button>
              </div>
              <div className="flex items-center">
                <div>
                  <div className="font-medium">Mathematics - Grade 10B</div>
                  <div className="text-sm text-muted-foreground">1:00 PM - 2:30 PM</div>
                </div>
                <Button variant="ghost" className="ml-auto" size="sm">View</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>School events scheduled</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events.map(event => (
                <div key={event.id} className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{event.eventName}</span>
                  </div>
                  <div className="flex justify-between ml-6">
                    <span className="text-sm text-muted-foreground">{event.date}</span>
                    <span className="text-sm text-muted-foreground">{event.venue}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
  
  const renderStudentDashboard = () => (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Attendance</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">95%</div>
            <p className="text-xs text-muted-foreground">This semester</p>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Classes Today</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Scheduled sessions</p>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Assignments</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Pending submissions</p>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Library Books</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Currently borrowed</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 mt-4">
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
            <CardDescription>Your classes for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div>
                  <div className="font-medium">Mathematics</div>
                  <div className="text-sm text-muted-foreground">9:00 AM - 10:30 AM</div>
                </div>
                <Button variant="ghost" size="sm" className="ml-auto">View</Button>
              </div>
              <div className="flex items-center">
                <div>
                  <div className="font-medium">English</div>
                  <div className="text-sm text-muted-foreground">10:45 AM - 12:15 PM</div>
                </div>
                <Button variant="ghost" size="sm" className="ml-auto">View</Button>
              </div>
              <div className="flex items-center">
                <div>
                  <div className="font-medium">Physics</div>
                  <div className="text-sm text-muted-foreground">1:00 PM - 2:30 PM</div>
                </div>
                <Button variant="ghost" size="sm" className="ml-auto">View</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Announcements</CardTitle>
            <CardDescription>Recent school announcements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events.map(event => (
                <div key={event.id} className="flex items-center">
                  <div className="mr-2">
                    <Bell className="h-4 w-4 text-scholar-primary" />
                  </div>
                  <div>
                    <div className="font-medium">{event.eventName}</div>
                    <div className="text-sm text-muted-foreground">{event.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
  
  const renderParentDashboard = () => (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Children</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Enrolled in school</p>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Attendance</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Fee Status</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Paid</div>
            <p className="text-xs text-muted-foreground">Current semester</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 mt-4">
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Child Information</CardTitle>
            <CardDescription>Student details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Name:</span>
                <span>John Smith</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Class:</span>
                <span>Grade 10A</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Roll Number:</span>
                <span>S1001</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Admission Date:</span>
                <span>August 15, 2022</span>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              View Full Profile
            </Button>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>School events scheduled</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events.map(event => (
                <div key={event.id} className="flex items-center">
                  <div className="mr-2">
                    <CalendarIcon className="h-4 w-4 text-scholar-primary" />
                  </div>
                  <div>
                    <div className="font-medium">{event.eventName}</div>
                    <div className="text-sm text-muted-foreground">{event.date} - {event.venue}</div>
                  </div>
                </div>
              ))}
              <div className="flex items-center">
                <div className="mr-2">
                  <CalendarIcon className="h-4 w-4 text-scholar-primary" />
                </div>
                <div>
                  <div className="font-medium">Parent-Teacher Meeting</div>
                  <div className="text-sm text-muted-foreground">September 30, 2023 - School Classrooms</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
  
  return (
    <div className="space-y-4 animate-fade-in">
      <h1 className="text-2xl font-semibold">{user?.firstName}'s Dashboard</h1>
      
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Array(3).fill(0).map((_, index) => (
            <Card key={index} className="h-28">
              <CardHeader className="animate-pulse bg-gray-200 h-8 w-1/2 rounded"></CardHeader>
              <CardContent>
                <div className="animate-pulse bg-gray-200 h-6 w-12 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <>
          {role === 'admin' && renderAdminDashboard()}
          {role === 'teacher' && renderTeacherDashboard()}
          {role === 'student' && renderStudentDashboard()}
          {role === 'parent' && renderParentDashboard()}
        </>
      )}
    </div>
  );
};

export default Dashboard;
