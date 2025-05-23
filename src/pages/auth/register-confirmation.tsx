import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle, Loader2 } from "lucide-react";
import { authApi } from '@/apis/auth';

type ConfirmationStatus = "loading" | "success" | "error" | "idle";

export default function RegisterConfirmationPage() {
    const location = useLocation();
    const [status, setStatus] = useState<ConfirmationStatus>("idle");
    const [message, setMessage] = useState<string>("");

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const userId = queryParams.get('userId');
        const token = queryParams.get('token');

        if (userId && token) {
            setStatus("loading");
            authApi.confirmEmail({ userId, token })
                .then(() => {
                    setStatus("success");
                    setMessage("Your email has been successfully confirmed! You can now log in.");
                })
                .catch((error: any) => {
                    setStatus("error");
                    setMessage(error.response?.data?.message || "Confirmation failed. The link may be invalid or expired.");
                });
        } else {
            setStatus("error");
            setMessage("Invalid confirmation link. Please check the URL or contact support if the issue persists.");
        }
    }, [location.search]);

    const renderContent = () => {
        switch (status) {
            case "loading":
            case "idle":
                return (
                    <div className="flex flex-col items-center justify-center space-y-2">
                        <Loader2 className="h-12 w-12 animate-spin text-primary" />
                        <p className="text-gray-600 dark:text-gray-300">Confirming your registration...</p>
                    </div>
                );
            case "success":
                return (
                    <div className="text-center space-y-4">
                        <div className="flex justify-center mb-4">
                            <CheckCircle className="h-16 w-16 text-green-500" />
                        </div>
                        <CardTitle className="text-2xl font-bold">Registration Confirmed!</CardTitle>
                        <p className="text-gray-600 dark:text-gray-300">{message}</p>
                        <Button asChild className="w-full mt-6">
                            <Link to="/auth/login">Go to Login</Link>
                        </Button>
                    </div>
                );
            case "error":
                return (
                    <div className="text-center space-y-4">
                        <div className="flex justify-center mb-4">
                            <AlertTriangle className="h-16 w-16 text-red-500" />
                        </div>
                        <CardTitle className="text-2xl font-bold">Confirmation Failed</CardTitle>
                        <p className="text-gray-600 dark:text-gray-300">{message}</p>
                        <Button asChild className="w-full mt-6">
                            <Link to="/">Go to Homepage</Link>
                        </Button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <Card className="w-full max-w-md mx-auto">
                <CardHeader>
                    {/* Title is now part of renderContent for dynamic display */}
                </CardHeader>
                <CardContent>
                    {renderContent()}
                </CardContent>
            </Card>
        </div>
    );
} 