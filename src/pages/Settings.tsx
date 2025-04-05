
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  
  const [generalSettings, setGeneralSettings] = useState({
    schoolName: "Scholar Sync Academy",
    academicYear: "2024-2025",
    address: "123 Education Street, Knowledge City",
    phone: "+1 (555) 123-4567",
    email: "info@scholarsync.edu",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    attendanceAlerts: true,
    gradeUpdates: true,
    systemAnnouncements: true,
    homeworkReminders: false,
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: "30",
    passwordExpiry: "90",
    loginAttempts: "5",
  });

  const handleGeneralSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGeneralSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleNotificationToggle = (setting: string) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof notificationSettings],
    }));
  };

  const handleSecuritySettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSecuritySettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your settings have been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        
        {/* General Settings Tab */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Manage your school's basic information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="schoolName">School Name</Label>
                  <Input 
                    id="schoolName"
                    name="schoolName"
                    value={generalSettings.schoolName}
                    onChange={handleGeneralSettingsChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="academicYear">Current Academic Year</Label>
                  <Input 
                    id="academicYear"
                    name="academicYear"
                    value={generalSettings.academicYear}
                    onChange={handleGeneralSettingsChange}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input 
                  id="address"
                  name="address"
                  value={generalSettings.address}
                  onChange={handleGeneralSettingsChange}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone"
                    name="phone"
                    value={generalSettings.phone}
                    onChange={handleGeneralSettingsChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email"
                    name="email"
                    type="email"
                    value={generalSettings.email}
                    onChange={handleGeneralSettingsChange}
                  />
                </div>
              </div>
              
              <Button onClick={handleSaveSettings}>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch 
                    id="emailNotifications" 
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={() => handleNotificationToggle("emailNotifications")}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="smsNotifications">SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via SMS
                    </p>
                  </div>
                  <Switch 
                    id="smsNotifications" 
                    checked={notificationSettings.smsNotifications}
                    onCheckedChange={() => handleNotificationToggle("smsNotifications")}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="attendanceAlerts">Attendance Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive alerts about attendance changes
                    </p>
                  </div>
                  <Switch 
                    id="attendanceAlerts" 
                    checked={notificationSettings.attendanceAlerts}
                    onCheckedChange={() => handleNotificationToggle("attendanceAlerts")}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="gradeUpdates">Grade Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications when grades are updated
                    </p>
                  </div>
                  <Switch 
                    id="gradeUpdates" 
                    checked={notificationSettings.gradeUpdates}
                    onCheckedChange={() => handleNotificationToggle("gradeUpdates")}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="systemAnnouncements">System Announcements</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive important system announcements
                    </p>
                  </div>
                  <Switch 
                    id="systemAnnouncements" 
                    checked={notificationSettings.systemAnnouncements}
                    onCheckedChange={() => handleNotificationToggle("systemAnnouncements")}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="homeworkReminders">Homework Reminders</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive reminders about upcoming homework
                    </p>
                  </div>
                  <Switch 
                    id="homeworkReminders" 
                    checked={notificationSettings.homeworkReminders}
                    onCheckedChange={() => handleNotificationToggle("homeworkReminders")}
                  />
                </div>
              </div>
              
              <Button onClick={handleSaveSettings}>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Security Tab */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure security preferences for your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Require a second form of authentication when logging in
                  </p>
                </div>
                <Switch 
                  id="twoFactorAuth" 
                  checked={securitySettings.twoFactorAuth}
                  onCheckedChange={() => setSecuritySettings(prev => ({
                    ...prev,
                    twoFactorAuth: !prev.twoFactorAuth,
                  }))}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input 
                    id="sessionTimeout"
                    name="sessionTimeout"
                    type="number"
                    value={securitySettings.sessionTimeout}
                    onChange={handleSecuritySettingsChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
                  <Input 
                    id="passwordExpiry"
                    name="passwordExpiry"
                    type="number"
                    value={securitySettings.passwordExpiry}
                    onChange={handleSecuritySettingsChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="loginAttempts">Max Login Attempts</Label>
                  <Input 
                    id="loginAttempts"
                    name="loginAttempts"
                    type="number"
                    value={securitySettings.loginAttempts}
                    onChange={handleSecuritySettingsChange}
                  />
                </div>
              </div>
              
              <Button onClick={handleSaveSettings}>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
