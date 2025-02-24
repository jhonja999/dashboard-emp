// Update your TableIntegrations.types.ts
export interface TableIntegrationsProps {
    app: string;
    icon: React.ComponentType<{ className?: string }>;
    type: string;
    rate: number;
    profit: number;
  }