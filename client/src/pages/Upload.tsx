import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Upload = () => {
  const [selectedTab, setSelectedTab] = useState("documents");
  const [selectedDocumentType, setSelectedDocumentType] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentDescription, setDocumentDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  const handleDocumentUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !selectedDocumentType) return;
    
    setUploading(true);
    
    // Mock upload process
    setTimeout(() => {
      console.log('Uploaded file:', {
        file: selectedFile,
        type: selectedDocumentType,
        description: documentDescription
      });
      
      // Reset form
      setSelectedFile(null);
      setDocumentDescription("");
      setUploading(false);
      
      // In a real implementation, we would handle the file upload to server here
    }, 1500);
  };
  
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Upload & Store</h1>
          
          <Tabs defaultValue="documents" onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="photos">Photos</TabsTrigger>
              <TabsTrigger value="history">Upload History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <CardTitle>Document Upload</CardTitle>
                  <CardDescription>
                    Upload important documents like lease agreements, notices, or correspondence with your landlord.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleDocumentUpload} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="document-type">Document Type</Label>
                      <Select 
                        value={selectedDocumentType} 
                        onValueChange={setSelectedDocumentType}
                      >
                        <SelectTrigger id="document-type">
                          <SelectValue placeholder="Select document type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lease">Lease Agreement</SelectItem>
                          <SelectItem value="notice">Notice from Landlord</SelectItem>
                          <SelectItem value="complaint">Formal Complaint</SelectItem>
                          <SelectItem value="repair">Repair Request</SelectItem>
                          <SelectItem value="correspondence">Email/Letter Correspondence</SelectItem>
                          <SelectItem value="other">Other Document</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="document-description">Description</Label>
                      <Input
                        id="document-description"
                        placeholder="Briefly describe this document"
                        value={documentDescription}
                        onChange={(e) => setDocumentDescription(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="document-file">Select File</Label>
                      <Input
                        id="document-file"
                        type="file"
                        accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                      />
                      <p className="text-xs text-neutral-500">
                        Accepted formats: PDF, Word, TXT, JPG, PNG (Max size: 10MB)
                      </p>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel</Button>
                  <Button 
                    onClick={handleDocumentUpload}
                    disabled={!selectedFile || !selectedDocumentType || uploading}
                  >
                    {uploading ? "Uploading..." : "Upload Document"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="photos">
              <Card>
                <CardHeader>
                  <CardTitle>Photo Upload</CardTitle>
                  <CardDescription>
                    Upload photos of property issues, violations, or other evidence.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center py-6 text-neutral-600">Coming soon! Photo upload functionality will be available in the next release.</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Your Upload History</CardTitle>
                  <CardDescription>
                    View and manage your previously uploaded documents and photos.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border p-4 text-center">
                    <p className="py-6 text-neutral-600">You haven't uploaded any files yet.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="mt-8 bg-neutral-50 rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">About Document Storage</h2>
            <p className="text-sm text-neutral-600 mb-2">
              All uploaded documents are securely stored and encrypted. You control who can access your documents, 
              and they can be used to support your case if needed.
            </p>
            <p className="text-sm text-neutral-600">
              <strong>Note:</strong> This system will soon include a historical data analysis tool to help identify 
              patterns across documents from multiple tenants, providing valuable insights for community organizing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Upload;