
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import DashboardLayout from '@/components/layout/DashboardLayout';

// Define the Association type
interface Association {
  name: string;
  registrationNumber: string;
  foundingDate: string;
  category: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  description: string;
  membershipFee: string;
  status: 'active' | 'pending' | 'inactive';
  logo?: File | null;
}

// Define the form steps
type FormStep = 'basicInfo' | 'contact' | 'details' | 'confirmation';

const AddAssociation = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<FormStep>('basicInfo');
  const [formData, setFormData] = useState<Association>({
    name: '',
    registrationNumber: '',
    foundingDate: '',
    category: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    contactPerson: '',
    contactEmail: '',
    contactPhone: '',
    description: '',
    membershipFee: '',
    status: 'active',
    logo: null,
  });
  
  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would call your Go backend API
    console.log('Submitting association data:', formData);

    // Mock API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Show success toast
    toast({
      title: 'Association Created',
      description: `${formData.name} has been successfully registered.`,
    });
    
    // Reset form
    setFormData({
      name: '',
      registrationNumber: '',
      foundingDate: '',
      category: '',
      address: '',
      city: '',
      postalCode: '',
      country: '',
      contactPerson: '',
      contactEmail: '',
      contactPhone: '',
      description: '',
      membershipFee: '',
      status: 'active',
      logo: null,
    });
    
    // Back to first step
    setCurrentStep('basicInfo');
  };
  
  // Input change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // File input handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, logo: file }));
  };
  
  // Radio input handler
  const handleRadioChange = (value: 'active' | 'pending' | 'inactive') => {
    setFormData(prev => ({ ...prev, status: value }));
  };
  
  // Navigation between steps
  const nextStep = () => {
    if (currentStep === 'basicInfo') setCurrentStep('contact');
    else if (currentStep === 'contact') setCurrentStep('details');
    else if (currentStep === 'details') setCurrentStep('confirmation');
  };
  
  const prevStep = () => {
    if (currentStep === 'contact') setCurrentStep('basicInfo');
    else if (currentStep === 'details') setCurrentStep('contact');
    else if (currentStep === 'confirmation') setCurrentStep('details');
  };
  
  // Render different form steps
  const renderStepContent = () => {
    switch (currentStep) {
      case 'basicInfo':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Association Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter association name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="registrationNumber">Registration Number</Label>
              <Input
                id="registrationNumber"
                name="registrationNumber"
                placeholder="Official registration number"
                value={formData.registrationNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="foundingDate">Founding Date</Label>
              <Input
                id="foundingDate"
                name="foundingDate"
                type="date"
                value={formData.foundingDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                name="category"
                placeholder="e.g., Sports, Cultural, Educational"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        );
      case 'contact':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                placeholder="Street address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input
                  id="postalCode"
                  name="postalCode"
                  placeholder="Postal code"
                  value={formData.postalCode}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactPerson">Contact Person</Label>
              <Input
                id="contactPerson"
                name="contactPerson"
                placeholder="Full name"
                value={formData.contactPerson}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        );
      case 'details':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Email</Label>
              <Input
                id="contactEmail"
                name="contactEmail"
                type="email"
                placeholder="Contact email"
                value={formData.contactEmail}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactPhone">Phone</Label>
              <Input
                id="contactPhone"
                name="contactPhone"
                placeholder="Contact phone"
                value={formData.contactPhone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Brief description of the association"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="membershipFee">Membership Fee</Label>
              <Input
                id="membershipFee"
                name="membershipFee"
                placeholder="Annual fee amount"
                value={formData.membershipFee}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <RadioGroup value={formData.status} onValueChange={handleRadioChange}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="active" id="active" />
                  <Label htmlFor="active">Active</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pending" id="pending" />
                  <Label htmlFor="pending">Pending Approval</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="inactive" id="inactive" />
                  <Label htmlFor="inactive">Inactive</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="logo">Association Logo</Label>
              <Input
                id="logo"
                name="logo"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
          </div>
        );
      case 'confirmation':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Please review your information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Association Name</p>
                <p className="text-sm text-muted-foreground">{formData.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Registration Number</p>
                <p className="text-sm text-muted-foreground">{formData.registrationNumber}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Founding Date</p>
                <p className="text-sm text-muted-foreground">{formData.foundingDate}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Category</p>
                <p className="text-sm text-muted-foreground">{formData.category}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Address</p>
                <p className="text-sm text-muted-foreground">
                  {formData.address}, {formData.city}, {formData.postalCode}, {formData.country}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Contact Person</p>
                <p className="text-sm text-muted-foreground">{formData.contactPerson}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Contact Details</p>
                <p className="text-sm text-muted-foreground">
                  {formData.contactEmail} | {formData.contactPhone}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Status</p>
                <p className="text-sm text-muted-foreground capitalize">{formData.status}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">Description</p>
              <p className="text-sm text-muted-foreground">{formData.description}</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  
  // Progress indicator component
  const ProgressIndicator = () => {
    const steps = [
      { name: 'Basic Info', value: 'basicInfo' },
      { name: 'Contact', value: 'contact' },
      { name: 'Details', value: 'details' },
      { name: 'Confirmation', value: 'confirmation' },
    ];
    
    return (
      <div className="flex justify-between mb-8">
        {steps.map((step, index) => (
          <div key={step.value} className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentStep === step.value
                  ? 'bg-primary text-white'
                  : steps.findIndex(s => s.value === currentStep) > index
                  ? 'bg-primary/20 text-primary'
                  : 'bg-gray-200 text-gray-400'
              }`}
            >
              {index + 1}
            </div>
            <span
              className={`text-xs mt-2 ${
                currentStep === step.value ? 'text-primary font-medium' : 'text-muted-foreground'
              }`}
            >
              {step.name}
            </span>
            {index < steps.length - 1 && (
              <div
                className={`h-0.5 w-full ${
                  steps.findIndex(s => s.value === currentStep) > index
                    ? 'bg-primary'
                    : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Add New Association</h1>
        
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle>Association Registration Form</CardTitle>
          </CardHeader>
          <CardContent>
            <ProgressIndicator />
            <form id="association-form" onSubmit={handleSubmit}>
              <div className="form-step-transition">{renderStepContent()}</div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            {currentStep !== 'basicInfo' && (
              <Button variant="outline" onClick={prevStep}>
                Back
              </Button>
            )}
            {currentStep !== 'confirmation' ? (
              <Button onClick={nextStep} className="ml-auto">
                Next
              </Button>
            ) : (
              <Button type="submit" form="association-form" className="ml-auto">
                Submit Registration
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>

  );
};

export default AddAssociation;
