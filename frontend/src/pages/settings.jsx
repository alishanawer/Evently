import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Settings() {
  return (
    <div className="p-4">
      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>Settings ⚙️</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Settings functionality will be available in a future update.
          </p>
          <p className="mt-2 text-sm">
            For now, you can use this section to imagine where user preferences,
            API keys, and platform options will live.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
