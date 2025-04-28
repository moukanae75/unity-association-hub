
import { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { Plus, Printer, Edit } from 'lucide-react';

// Mock associations data
const mockAssociations = Array(20)
  .fill(null)
  .map((_, index) => ({
    id: `a${index + 1}`,
    name: `Association ${index + 1}`,
    registrationNumber: `REG${1000 + index}`,
    category: ['Cultural', 'Sports', 'Educational', 'Social', 'Environmental'][
      Math.floor(Math.random() * 5)
    ],
    status: ['active', 'pending', 'inactive'][Math.floor(Math.random() * 3)],
    memberCount: Math.floor(Math.random() * 200) + 10,
    foundingDate: new Date(
      2010 + Math.floor(Math.random() * 13),
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28) + 1
    ).toISOString().split('T')[0],
  }));

const AssociationList = () => {
  const { toast } = useToast();
  const [associations, setAssociations] = useState(mockAssociations);
  const [selectedAssociation, setSelectedAssociation] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Function to handle printing a receipt
  const printReceipt = (association: any) => {
    setSelectedAssociation(association);
    setIsDialogOpen(true);
  };

  // Function to simulate actual printing
  const handlePrint = () => {
    // In a real app, this would generate a PDF and trigger download or print
    toast({
      title: 'Receipt Generated',
      description: `Receipt for ${selectedAssociation?.name} has been generated.`,
    });
    setIsDialogOpen(false);

    // This would typically involve generating a PDF with a library like pdfmake or jspdf
    // For now, we'll just simulate it with a timeout
    setTimeout(() => {
      toast({
        title: 'Print Ready',
        description: 'The PDF has been prepared for printing.',
      });
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Associations Directory</h1>
          <Link to="/associations/add">
            <Button>
              <Plus className="mr-2" size={16} />
              Add Association
            </Button>
          </Link>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>All Associations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Registration #</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Founded</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Members</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {associations.map((association) => (
                    <TableRow key={association.id}>
                      <TableCell className="font-medium">{association.name}</TableCell>
                      <TableCell>{association.registrationNumber}</TableCell>
                      <TableCell>{association.category}</TableCell>
                      <TableCell>{association.foundingDate}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            association.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : association.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {association.status.charAt(0).toUpperCase() + association.status.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell>{association.memberCount}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => printReceipt(association)}>
                            <Printer size={16} />
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/associations/edit/${association.id}`}>
                              <Edit size={16} />
                            </Link>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Print Receipt Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Generate Association Receipt</DialogTitle>
          </DialogHeader>
          {selectedAssociation && (
            <div className="py-4">
              <div className="border rounded-lg p-6 space-y-4 bg-gray-50">
                <div className="text-center">
                  <h2 className="text-xl font-bold">ASSOCIATION RECEIPT</h2>
                  <p className="text-sm text-muted-foreground">Reference: {selectedAssociation.id}</p>
                </div>
                
                <div className="space-y-2 border-b pb-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Association Name:</span>
                    <span>{selectedAssociation.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Registration Number:</span>
                    <span>{selectedAssociation.registrationNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Category:</span>
                    <span>{selectedAssociation.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Status:</span>
                    <span className="capitalize">{selectedAssociation.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Founding Date:</span>
                    <span>{selectedAssociation.foundingDate}</span>
                  </div>
                </div>
                
                <div className="text-center pt-4">
                  <p className="text-sm text-muted-foreground">
                    This receipt was generated on {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handlePrint}>
              <Printer className="mr-2" size={16} />
              Print Receipt
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default AssociationList;
