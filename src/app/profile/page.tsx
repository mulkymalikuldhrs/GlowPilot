'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { User, Save } from "lucide-react";
import { useState } from "react";

export default function ProfilePage() {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        // Mock saving data
        setTimeout(() => {
            setLoading(false);
            toast({
                title: "Profile Updated",
                description: "Your profile information has been saved.",
            })
        }, 1000);
    }

    return (
        <div className="container mx-auto max-w-4xl py-8">
            <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <User className="h-8 w-8" />
                </div>
                <h1 className="text-4xl font-bold tracking-tight">User Profile</h1>
                <p className="mt-2 max-w-2xl text-muted-foreground">
                    Manage your profile information to get personalized skincare recommendations.
                </p>
            </div>

            <Card className="mt-8 glass-card">
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>This information helps us tailor our advice to you.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                             <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" placeholder="Your Name" defaultValue="Mulky Malikul Dhaher"/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="age">Age</Label>
                                <Input id="age" type="number" placeholder="Your Age" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="skinType">Skin Type</Label>
                             <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select your skin type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="normal">Normal</SelectItem>
                                    <SelectItem value="oily">Oily</SelectItem>
                                    <SelectItem value="dry">Dry</SelectItem>
                                    <SelectItem value="combination">Combination</SelectItem>
                                    <SelectItem value="sensitive">Sensitive</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                       
                        <div className="space-y-2">
                            <Label htmlFor="concerns">Primary Skin Concerns</Label>
                            <Textarea id="concerns" placeholder="e.g., Acne, Dark Spots, Wrinkles" />
                        </div>

                         <div className="space-y-2">
                            <Label htmlFor="preferences">Product Preferences</Label>
                            <Textarea id="preferences" placeholder="e.g., Vegan, Fragrance-free, Brands you like" />
                        </div>
                        
                        <div className="space-y-2">
                             <Label htmlFor="budget">Skincare Budget (Monthly)</Label>
                             <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select your budget" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="<50">$0 - $50</SelectItem>
                                    <SelectItem value="50-100">$50 - $100</SelectItem>
                                    <SelectItem value="100-200">$100 - $200</SelectItem>
                                    <SelectItem value=">200">$200+</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Saving..." : "Save Changes"}
                            <Save className="ml-2 h-4 w-4" />
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
