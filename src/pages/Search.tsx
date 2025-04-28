
import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search as SearchIcon } from 'lucide-react';

// Mock associations data
const mockAssociations = [
  {
    id: '1',
    name: 'Community Support Alliance',
    registrationNumber: 'A12345',
    location: 'New York',
    category: 'Social Services',
    contactPerson: 'John Doe',
  },
  {
    id: '2',
    name: 'Youth Sports Foundation',
    registrationNumber: 'B67890',
    location: 'Los Angeles',
    category: 'Sports',
    contactPerson: 'Jane Smith',
  },
  {
    id: '3',
    name: 'Cultural Heritage Society',
    registrationNumber: 'C24680',
    location: 'Chicago',
    category: 'Cultural',
    contactPerson: 'Robert Johnson',
  },
];

// Mock persons data
const mockPersons = [
  {
    id: '1',
    name: 'Alice Brown',
    idCardNumber: 'ID123456',
    association: 'Community Support Alliance',
    role: 'Member',
    joinDate: '2023-01-15',
  },
  {
    id: '2',
    name: 'Michael Lee',
    idCardNumber: 'ID789012',
    association: 'Youth Sports Foundation',
    role: 'Board Member',
    joinDate: '2022-06-22',
  },
  {
    id: '3',
    name: 'Sarah Wilson',
    idCardNumber: 'ID345678',
    association: 'Cultural Heritage Society',
    role: 'Volunteer',
    joinDate: '2023-03-10',
  },
];

const Search = () => {
  const [activeTab, setActiveTab] = useState('associations');
  const [associationSearchTerm, setAssociationSearchTerm] = useState('');
  const [personSearchTerm, setPersonSearchTerm] = useState('');
  const [associationResults, setAssociationResults] = useState(mockAssociations);
  const [personResults, setPersonResults] = useState(mockPersons);

  // Search for associations
  const handleAssociationSearch = () => {
    if (!associationSearchTerm.trim()) {
      setAssociationResults(mockAssociations);
      return;
    }

    const term = associationSearchTerm.toLowerCase();
    const filtered = mockAssociations.filter(
      assoc => 
        assoc.name.toLowerCase().includes(term) || 
        assoc.registrationNumber.toLowerCase().includes(term)
    );
    setAssociationResults(filtered);
  };

  // Search for persons
  const handlePersonSearch = () => {
    if (!personSearchTerm.trim()) {
      setPersonResults(mockPersons);
      return;
    }

    const term = personSearchTerm.toLowerCase();
    const filtered = mockPersons.filter(
      person => 
        person.name.toLowerCase().includes(term) || 
        person.idCardNumber.toLowerCase().includes(term)
    );
    setPersonResults(filtered);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Search</h1>
        
        <Tabs defaultValue="associations" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="associations">Associations</TabsTrigger>
            <TabsTrigger value="persons">Persons</TabsTrigger>
          </TabsList>
          
          <TabsContent value="associations" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Search Associations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-6">
                  <Input
                    placeholder="Search by name or registration number..."
                    value={associationSearchTerm}
                    onChange={(e) => setAssociationSearchTerm(e.target.value)}
                  />
                  <Button onClick={handleAssociationSearch}>
                    <SearchIcon size={18} className="mr-2" />
                    Search
                  </Button>
                </div>
                
                {associationResults.length > 0 ? (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Registration Number</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Contact</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {associationResults.map((association) => (
                          <TableRow key={association.id}>
                            <TableCell className="font-medium">{association.name}</TableCell>
                            <TableCell>{association.registrationNumber}</TableCell>
                            <TableCell>{association.category}</TableCell>
                            <TableCell>{association.location}</TableCell>
                            <TableCell>{association.contactPerson}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No associations found</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="persons" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Search Persons</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-6">
                  <Input
                    placeholder="Search by name or ID card number..."
                    value={personSearchTerm}
                    onChange={(e) => setPersonSearchTerm(e.target.value)}
                  />
                  <Button onClick={handlePersonSearch}>
                    <SearchIcon size={18} className="mr-2" />
                    Search
                  </Button>
                </div>
                
                {personResults.length > 0 ? (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>ID Card Number</TableHead>
                          <TableHead>Association</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Join Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {personResults.map((person) => (
                          <TableRow key={person.id}>
                            <TableCell className="font-medium">{person.name}</TableCell>
                            <TableCell>{person.idCardNumber}</TableCell>
                            <TableCell>{person.association}</TableCell>
                            <TableCell>{person.role}</TableCell>
                            <TableCell>{person.joinDate}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No persons found</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Search;
