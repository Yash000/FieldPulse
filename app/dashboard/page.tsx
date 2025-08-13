import { Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Users,
  Phone,
  TrendingUp,
  DollarSign,
  Calendar,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';

// Mock data for dashboard
const dashboardData = {
  totalLeads: 1247,
  activeCalls: 23,
  conversionRate: 18.5,
  revenue: 125400,
  recentLeads: [
    {
      id: 1,
      name: 'Amit Sharma',
      company: 'Infotech Solutions',
      status: 'hot',
      value: 120000,
      lastContact: '2 hours ago',
    },
    {
      id: 2,
      name: 'Priya Verma',
      company: 'StartupHub',
      status: 'warm',
      value: 85000,
      lastContact: '1 day ago',
    },
    {
      id: 3,
      name: 'Rohan Gupta',
      company: 'EnterpriseTech',
      status: 'cold',
      value: 250000,
      lastContact: '3 days ago',
    },
    {
      id: 4,
      name: 'Sneha Iyer',
      company: 'LocalBiz',
      status: 'warm',
      value: 52000,
      lastContact: '5 hours ago',
    },
  ],
  recentCalls: [
    {
      id: 1,
      contact: 'Amit Sharma',
      type: 'outbound',
      duration: '10:22',
      status: 'completed',
      time: '10:30 AM',
    },
    {
      id: 2,
      contact: 'Priya Verma',
      type: 'inbound',
      duration: '8:15',
      status: 'missed',
      time: '9:45 AM',
    },
    {
      id: 3,
      contact: 'Rohan Gupta',
      type: 'outbound',
      duration: '15:22',
      status: 'completed',
      time: '9:15 AM',
    },
  ],
};

function DashboardMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {dashboardData.totalLeads.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-600 flex items-center">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +12.5%
            </span>
            from last month
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Calls</CardTitle>
          <Phone className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{dashboardData.activeCalls}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-red-600 flex items-center">
              <ArrowDownRight className="h-3 w-3 mr-1" />
              -2.1%
            </span>
            from yesterday
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {dashboardData.conversionRate}%
          </div>
          <Progress value={dashboardData.conversionRate} className="mt-2" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ₹{dashboardData.revenue.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-600 flex items-center">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +8.2%
            </span>
            from last month
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function RecentLeads() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'hot':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'warm':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'cold':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Recent Leads
          <Button variant="outline" size="sm" asChild>
            <a href="/leads">View All</a>
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {dashboardData.recentLeads.map((lead) => (
            <div
              key={lead.id}
              className="flex items-center justify-between p-3 rounded-lg border"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium">{lead.name}</h4>
                  <Badge className={getStatusColor(lead.status)}>
                    {lead.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{lead.company}</p>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <Clock className="h-3 w-3 mr-1" />
                  {lead.lastContact}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold">₹{lead.value.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function RecentCalls() {
  const getCallStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'missed':
        return 'text-red-600';
      case 'ongoing':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Recent Calls
          <Button variant="outline" size="sm" asChild>
            <a href="/calls">View All</a>
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {dashboardData.recentCalls.map((call) => (
            <div
              key={call.id}
              className="flex items-center justify-between p-3 rounded-lg border"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-full ${
                    call.type === 'inbound'
                      ? 'bg-green-100 dark:bg-green-900'
                      : 'bg-blue-100 dark:bg-blue-900'
                  }`}
                >
                  <Phone
                    className={`h-4 w-4 ${
                      call.type === 'inbound'
                        ? 'text-green-600 dark:text-green-300'
                        : 'text-blue-600 dark:text-blue-300'
                    }`}
                  />
                </div>
                <div>
                  <h4 className="font-medium">{call.contact}</h4>
                  <p className="text-sm text-muted-foreground capitalize">
                    {call.type} call
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{call.time}</p>
                <p className={`text-xs ${getCallStatusColor(call.status)}`}>
                  {call.status} • {call.duration}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  return (
    <div className="space-y-6 p-4 md:p-0">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your leads today.
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Last 30 days
          </Button>
        </div>
      </div>

      <Suspense fallback={<div>Loading metrics...</div>}>
        <DashboardMetrics />
      </Suspense>

      <div className="grid gap-6 md:grid-cols-2">
        <Suspense fallback={<div>Loading leads...</div>}>
          <RecentLeads />
        </Suspense>
        <Suspense fallback={<div>Loading calls...</div>}>
          <RecentCalls />
        </Suspense>
      </div>
    </div>
  );
}
