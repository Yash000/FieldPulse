'use client';

import type React from 'react';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Search,
  Plus,
  Filter,
  MoreHorizontal,
  Phone,
  Mail,
  Calendar,
  Building,
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useRouter } from 'next/navigation';
import { CallResponseDialog } from '@/components/call-response-dialog';

// Mock leads data
export const mockLeads: TypeLead[] = [
  {
    id: 1,
    name: 'Amit Sharma',
    email: 'amit.sharma@infotech.in',
    phone: '+91 98765 43210',
    company: 'Infotech Solutions',
    position: 'CTO',
    status: 'Hot',
    value: 1200000,
    source: 'Website',
    lastContact: '2024-01-15',
    notes: 'Interested in cloud migration',
  },
  {
    id: 2,
    name: 'Priya Verma',
    email: 'priya.verma@startuphub.in',
    phone: '+91 91234 56789',
    company: 'StartupHub',
    position: 'Founder',
    status: 'Warm',
    value: 800000,
    source: 'Referral',
    lastContact: '2024-01-14',
    notes: 'Looking for scalable CRM',
  },
  {
    id: 3,
    name: 'Rohan Gupta',
    email: 'rohan.gupta@enterprisetech.in',
    phone: '+91 99887 76655',
    company: 'EnterpriseTech',
    position: 'VP Sales',
    status: 'Cold',
    value: 2000000,
    source: 'LinkedIn',
    lastContact: '2024-01-12',
    notes: 'Potential for large deal',
  },
  {
    id: 4,
    name: 'Sneha Iyer',
    email: 'sneha.iyer@localbiz.in',
    phone: '+91 90909 80808',
    company: 'LocalBiz',
    position: 'Owner',
    status: 'Warm',
    value: 500000,
    source: 'Cold Call',
    lastContact: '2024-01-15',
    notes: 'Interested in affordable solution',
  },
  {
    id: 5,
    name: 'Vikram Singh',
    email: 'vikram.singh@innovate.in',
    phone: '+91 98877 66554',
    company: 'Innovate India',
    position: 'Director',
    status: 'Hot',
    value: 1500000,
    source: 'Trade Show',
    lastContact: '2024-01-15',
    notes: 'Ready for quick implementation',
  },
];

type LeadStatus = 'Hot' | 'Warm' | 'Cold';

export type TypeLead = {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  status: LeadStatus;
  value: number;
  source: string;
  lastContact: string;
  notes: string;
  isNew?: boolean;
  outcome?: string; // <-- Add this
};

export default function LeadsPage() {
  const [leads, setLeads] = useState(mockLeads);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvPreview, setCsvPreview] = useState<any[]>([]);
  const [csvError, setCsvError] = useState<string>('');
  const [isProcessingCsv, setIsProcessingCsv] = useState(false);

  const router = useRouter();

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

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddLead = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newLead: TypeLead = {
      id: leads.length + 1,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      company: formData.get('company') as string,
      position: formData.get('position') as string,
      status: formData.get('status') as LeadStatus,
      value: Number.parseInt(formData.get('value') as string),
      source: formData.get('source') as string,
      lastContact: new Date().toISOString().split('T')[0],
      notes: formData.get('notes') as string,
      isNew: true, // <-- Add this
    };
    setLeads([...leads, newLead]);
    setIsAddDialogOpen(false);
  };

  const handleCallClick = (lead: (typeof mockLeads)[0]) => {
    router.push(`tel:${lead.phone}`);
  };

  const handleEmailClick = (lead: (typeof mockLeads)[0]) => {
    router.push(`mailto:${lead.email}`);
  };

  const handleCsvFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCsvFile(file);
      setCsvError('');
      parseCsvFile(file);
    }
  };

  const parseCsvFile = (file: File) => {
    setIsProcessingCsv(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const lines = text.split('\n').filter((line) => line.trim());

        if (lines.length < 2) {
          setCsvError(
            'CSV file must contain at least a header row and one data row'
          );
          setIsProcessingCsv(false);
          return;
        }

        const headers = lines[0].split(',').map((h) => h.trim().toLowerCase());
        const requiredHeaders = ['name', 'email', 'phone'];
        const missingHeaders = requiredHeaders.filter(
          (h) => !headers.includes(h)
        );

        if (missingHeaders.length > 0) {
          setCsvError(`Missing required columns: ${missingHeaders.join(', ')}`);
          setIsProcessingCsv(false);
          return;
        }

        const preview = lines.slice(1, 6).map((line, index) => {
          const values = line
            .split(',')
            .map((v) => v.trim().replace(/^"|"$/g, ''));
          const lead: any = { id: `preview-${index}` };

          headers.forEach((header, i) => {
            switch (header) {
              case 'name':
                lead.name = values[i] || '';
                break;
              case 'email':
                lead.email = values[i] || '';
                break;
              case 'phone':
                lead.phone = values[i] || '';
                break;
              case 'company':
                lead.company = values[i] || '';
                break;
              case 'position':
                lead.position = values[i] || '';
                break;
              case 'status':
                lead.status = ['hot', 'warm', 'cold'].includes(
                  values[i]?.toLowerCase()
                )
                  ? values[i].toLowerCase()
                  : 'cold';
                break;
              case 'value':
                lead.value = Number.parseInt(values[i]) || 0;
                break;
              case 'source':
                lead.source = values[i] || 'CSV Import';
                break;
              case 'notes':
                lead.notes = values[i] || '';
                break;
            }
          });

          return lead;
        });

        setCsvPreview(preview);
        setIsProcessingCsv(false);
      } catch (error) {
        setCsvError('Error parsing CSV file. Please check the format.');
        setIsProcessingCsv(false);
      }
    };

    reader.readAsText(file);
  };

  const handleCsvImport = () => {
    if (!csvFile) return;

    setIsProcessingCsv(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const lines = text.split('\n').filter((line) => line.trim());
        const headers = lines[0].split(',').map((h) => h.trim().toLowerCase());

        const newLeads = lines
          .slice(1)
          .map((line, index) => {
            const values = line
              .split(',')
              .map((v) => v.trim().replace(/^"|"$/g, ''));
            const lead: any = { id: leads.length + index + 1 };

            headers.forEach((header, i) => {
              switch (header) {
                case 'name':
                  lead.name = values[i] || '';
                  break;
                case 'email':
                  lead.email = values[i] || '';
                  break;
                case 'phone':
                  lead.phone = values[i] || '';
                  break;
                case 'company':
                  lead.company = values[i] || '';
                  break;
                case 'position':
                  lead.position = values[i] || '';
                  break;
                case 'status':
                  lead.status = ['hot', 'warm', 'cold'].includes(
                    values[i]?.toLowerCase()
                  )
                    ? values[i].toLowerCase()
                    : 'cold';
                  break;
                case 'value':
                  lead.value = Number.parseInt(values[i]) || 0;
                  break;
                case 'source':
                  lead.source = values[i] || 'CSV Import';
                  break;
                case 'notes':
                  lead.notes = values[i] || '';
                  break;
              }
            });

            lead.lastContact = new Date().toISOString().split('T')[0];
            return lead;
          })
          .filter((lead) => lead.name && lead.email && lead.company);

        setLeads([...leads, ...newLeads]);
        setIsAddDialogOpen(false);
        setCsvFile(null);
        setCsvPreview([]);
        setCsvError('');
        setIsProcessingCsv(false);
      } catch (error) {
        setCsvError('Error importing CSV file');
        setIsProcessingCsv(false);
      }
    };

    reader.readAsText(csvFile);
  };

  const resetCsvUpload = () => {
    setCsvFile(null);
    setCsvPreview([]);
    setCsvError('');
    setIsProcessingCsv(false);
  };

  return (
    <div className="space-y-6 p-4 md:p-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leads</h1>
          <p className="text-muted-foreground">
            Manage and track your sales leads
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Lead
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Lead</DialogTitle>
              <DialogDescription>
                Add leads manually or import from a CSV file.
              </DialogDescription>
            </DialogHeader>
            <Tabs
              defaultValue="manual"
              className="w-full"
              onValueChange={resetCsvUpload}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="manual">Manual Entry</TabsTrigger>
                <TabsTrigger value="csv">CSV Upload</TabsTrigger>
              </TabsList>

              <TabsContent value="manual" className="space-y-4">
                <form onSubmit={handleAddLead} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" name="name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" name="phone" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input id="company" name="company" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="position">Position</Label>
                      <Input id="position" name="position" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="value">Deal Value</Label>
                      <Input id="value" name="value" type="number" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select name="status" defaultValue="cold">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cold">Cold</SelectItem>
                          <SelectItem value="warm">Warm</SelectItem>
                          <SelectItem value="hot">Hot</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="source">Source</Label>
                      <Select name="source" defaultValue="website">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="website">Website</SelectItem>
                          <SelectItem value="referral">Referral</SelectItem>
                          <SelectItem value="linkedin">LinkedIn</SelectItem>
                          <SelectItem value="cold-call">Cold Call</SelectItem>
                          <SelectItem value="trade-show">Trade Show</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea id="notes" name="notes" />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsAddDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Add Lead</Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="csv" className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="csv-file">CSV File</Label>
                    <div className="flex items-center gap-4">
                      <Input
                        id="csv-file"
                        type="file"
                        accept=".csv"
                        onChange={handleCsvFileChange}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href =
                            'data:text/csv;charset=utf-8,name,email,phone,company,position,status,value,source,notes\nJohn Doe,john@example.com,+1234567890,Example Corp,Manager,warm,5000,Website,Sample lead';
                          link.download = 'leads_template.csv';
                          link.click();
                        }}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Download Template
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Required columns: name, email, Phone. Optional: company,
                      position, status, value, source, notes
                    </p>
                  </div>

                  {csvError && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{csvError}</AlertDescription>
                    </Alert>
                  )}

                  {isProcessingCsv && (
                    <Alert>
                      <Upload className="h-4 w-4" />
                      <AlertDescription>
                        Processing CSV file...
                      </AlertDescription>
                    </Alert>
                  )}

                  {csvPreview.length > 0 && (
                    <div className="space-y-2">
                      <Label>Preview (first 5 rows)</Label>
                      <div className="border rounded-md p-4 max-h-60 overflow-y-auto">
                        <div className="space-y-2">
                          {csvPreview.map((lead, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 p-2 bg-muted rounded text-sm"
                            >
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <span className="font-medium">{lead.name}</span>
                              <span className="text-muted-foreground">•</span>
                              <span>{lead.email}</span>
                              <span className="text-muted-foreground">•</span>
                              <span>{lead.company}</span>
                              {lead.status && (
                                <>
                                  <span className="text-muted-foreground">
                                    •
                                  </span>
                                  <Badge
                                    className={getStatusColor(lead.status)}
                                    variant="secondary"
                                  >
                                    {lead.status}
                                  </Badge>
                                </>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsAddDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      onClick={handleCsvImport}
                      disabled={!csvFile || csvError !== '' || isProcessingCsv}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Import Leads
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="hot">Hot</SelectItem>
            <SelectItem value="warm">Warm</SelectItem>
            <SelectItem value="cold">Cold</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredLeads.map((lead) => (
          <Card key={lead.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {lead.name}
                    {lead.isNew && (
                      <Badge className="bg-green-100 text-green-800 ml-2">
                        New
                      </Badge>
                    )}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {lead.position}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(lead.status)}>
                    {lead.status}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <CallResponseDialog callDetails={lead} />
                      <DropdownMenuItem
                        onClick={() => {
                          handleEmailClick(lead);
                        }}
                      >
                        Email
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Building className="h-4 w-4 text-muted-foreground" />
                <span>{lead.company}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="truncate">{lead.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{lead.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>
                  Last contact:{' '}
                  {new Date(lead.lastContact).toLocaleDateString()}
                </span>
              </div>
              <div className="pt-2 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Deal Value
                  </span>
                  <span className="font-semibold">
                    ₹{lead.value.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-sm text-muted-foreground">Source</span>
                  <span className="text-sm">{lead.source}</span>
                </div>
              </div>
              {lead.notes && (
                <div className="pt-2 border-t">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {lead.notes}
                  </p>
                </div>
              )}
              <div className="flex gap-2 pt-2">
                <CallResponseDialog
                  buttonClassName="flex-1 bg-transparent"
                  callDetails={lead}
                  onSave={(outcome) => {
                    setLeads((prevLeads) =>
                      prevLeads.map((l) =>
                        l.id === lead.id ? { ...l, outcome } : l
                      )
                    );
                  }}
                />
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => {
                    handleEmailClick(lead);
                  }}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </Button>
              </div>
              {lead.outcome && (
                <Badge className="bg-purple-100 text-purple-800">
                  {lead.outcome}
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredLeads.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No leads found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
}
