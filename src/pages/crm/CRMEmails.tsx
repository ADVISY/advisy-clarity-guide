import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, FileText, Send, History, Settings } from "lucide-react";
import { EmailTemplatesList } from "@/components/crm/emails/EmailTemplatesList";
import { EmailComposer } from "@/components/crm/emails/EmailComposer";
import { EmailHistory } from "@/components/crm/emails/EmailHistory";
import { EmailAutomationSettings } from "@/components/crm/settings/EmailAutomationSettings";

export default function CRMEmails() {
  const [activeTab, setActiveTab] = useState("compose");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          Centre Emailing
        </h1>
        <p className="text-muted-foreground mt-2">
          Gérez vos templates, envoyez des emails et suivez vos campagnes
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
          <TabsTrigger value="compose" className="gap-2">
            <Send className="h-4 w-4" />
            <span className="hidden sm:inline">Composer</span>
          </TabsTrigger>
          <TabsTrigger value="templates" className="gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Templates</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="gap-2">
            <History className="h-4 w-4" />
            <span className="hidden sm:inline">Historique</span>
          </TabsTrigger>
          <TabsTrigger value="automation" className="gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Automation</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="compose" className="space-y-6">
          <EmailComposer />
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <EmailTemplatesList />
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <EmailHistory />
        </TabsContent>

        <TabsContent value="automation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Automatisation des Emails</CardTitle>
              <CardDescription>
                Configurez les emails automatiques envoyés lors d'événements spécifiques
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EmailAutomationSettings />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
