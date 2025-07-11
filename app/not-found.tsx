import Link from "next/link";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <MainLayout>
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="flex flex-col items-center space-y-4">
              <AlertCircle className="h-16 w-16 text-gray-400" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  404 - Page Not Found
                </h1>
                <p className="text-gray-600 mt-2">
                  The page you're looking for doesn't exist or has been moved.
                </p>
              </div>
              <div className="flex space-x-4">
                <Button asChild>
                  <Link href="/">Go Home</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/api-clients/users">Test APIs</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
