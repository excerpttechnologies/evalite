import { SettingsForm } from "@/app/components/settings/settings-form"

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground text-balance">
          Settings
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          Configure your business and invoice preferences
        </p>
      </div>
      <SettingsForm />
    </div>
  )
}
