import { useEffect, useState } from "react";
import { Save, Settings } from "lucide-react";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";

import { useSettings } from "../hooks/useSettings";
import { useUpdateSettings } from "../hooks/useUpdateSettings";

export default function AdminSettingsPage() {
  const { data: settings, isLoading, isError } = useSettings();

  const updateSettingsMutation = useUpdateSettings();

  const [applicationName, setApplicationName] = useState("");
  const [institutionName, setInstitutionName] = useState("");
  const [supportEmail, setSupportEmail] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // Populate form when settings are loaded
  useEffect(() => {
    if (!settings) return;

    setApplicationName(settings.applicationName);
    setInstitutionName(settings.institutionName);
    setSupportEmail(settings.supportEmail);
    setAcademicYear(String(settings.academicYear));
    setMaintenanceMode(settings.maintenanceMode);
  }, [settings]);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({
      message,
      type,
    });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateSettingsMutation.mutate(
      {
        applicationName: applicationName.trim(),
        institutionName: institutionName.trim(),
        supportEmail: supportEmail.trim(),
        academicYear: Number(academicYear),
        maintenanceMode,
      },
      {
        onSuccess: () => {
          showToast("Settings updated successfully.", "success");
        },

        onError: () => {
          showToast("Failed to update settings.", "error");
        },
      },
    );
  };

  if (isLoading) {
    return (
      <Card className="p-6">
        <p className="py-10 text-center text-sm text-text-muted">
          Loading settings...
        </p>
      </Card>
    );
  }

  if (isError || !settings) {
    return (
      <Card className="p-6">
        <p className="py-10 text-center text-sm text-danger">
          Failed to load settings.
        </p>
      </Card>
    );
  }

  return (
    <>
      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} />}

      <div className="space-y-6">
        {/* Header */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-primary">
            Administration
          </p>

          <h1 className="mt-2 flex items-center gap-2 text-2xl font-bold text-text-primary sm:text-3xl">
            <Settings size={28} />
            Settings
          </h1>

          <p className="mt-1 text-sm text-text-secondary">
            Manage application-level settings.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* General Settings */}
          <Card className="p-5 sm:p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-text-primary">
                General Settings
              </h2>

              <p className="mt-1 text-sm text-text-secondary">
                Configure basic application information.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {/* Application Name */}
              <div>
                <label
                  htmlFor="applicationName"
                  className="mb-2 block text-sm font-medium text-text-primary"
                >
                  Application Name
                </label>

                <input
                  id="applicationName"
                  type="text"
                  value={applicationName}
                  onChange={(e) => setApplicationName(e.target.value)}
                  className="
                    h-11
                    w-full
                    rounded-xl
                    border
                    border-input-border
                    bg-surface
                    px-4
                    text-sm
                    text-text-primary
                    outline-none
                    transition
                    focus:border-primary
                  "
                />
              </div>

              {/* Institution Name */}
              <div>
                <label
                  htmlFor="institutionName"
                  className="mb-2 block text-sm font-medium text-text-primary"
                >
                  Institution Name
                </label>

                <input
                  id="institutionName"
                  type="text"
                  value={institutionName}
                  onChange={(e) => setInstitutionName(e.target.value)}
                  className="
                    h-11
                    w-full
                    rounded-xl
                    border
                    border-input-border
                    bg-surface
                    px-4
                    text-sm
                    text-text-primary
                    outline-none
                    transition
                    focus:border-primary
                  "
                />
              </div>

              {/* Support Email */}
              <div className="md:col-span-2">
                <label
                  htmlFor="supportEmail"
                  className="mb-2 block text-sm font-medium text-text-primary"
                >
                  Support Email
                </label>

                <input
                  id="supportEmail"
                  type="email"
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                  className="
                    h-11
                    w-full
                    rounded-xl
                    border
                    border-input-border
                    bg-surface
                    px-4
                    text-sm
                    text-text-primary
                    outline-none
                    transition
                    focus:border-primary
                  "
                />
              </div>
            </div>
          </Card>

          {/* Academic Settings */}
          <Card className="p-5 sm:p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-text-primary">
                Academic Settings
              </h2>

              <p className="mt-1 text-sm text-text-secondary">
                Configure the current academic year.
              </p>
            </div>

            <div className="max-w-sm">
              <label
                htmlFor="academicYear"
                className="mb-2 block text-sm font-medium text-text-primary"
              >
                Academic Year
              </label>

              <input
                id="academicYear"
                type="number"
                min={2000}
                max={2100}
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                className="
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-input-border
                  bg-surface
                  px-4
                  text-sm
                  text-text-primary
                  outline-none
                  transition
                  focus:border-primary
                "
              />
            </div>
          </Card>

          {/* System Settings */}
          <Card className="p-5 sm:p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-text-primary">
                System Settings
              </h2>

              <p className="mt-1 text-sm text-text-secondary">
                Control application availability.
              </p>
            </div>

            <label
              htmlFor="maintenanceMode"
              className="
                flex
                cursor-pointer
                items-center
                justify-between
                gap-4
                rounded-xl
                border
                border-border
                p-4
                transition
                hover:bg-background
              "
            >
              <div>
                <p className="font-medium text-text-primary">
                  Maintenance Mode
                </p>

                <p className="mt-1 text-sm text-text-secondary">
                  Temporarily put the application into maintenance mode.
                </p>
              </div>

              <input
                id="maintenanceMode"
                type="checkbox"
                checked={maintenanceMode}
                onChange={(e) => setMaintenanceMode(e.target.checked)}
                className="
                  h-5
                  w-5
                  shrink-0
                  accent-primary
                "
              />
            </label>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button
              type="submit"
              leftIcon={<Save size={17} />}
              disabled={updateSettingsMutation.isPending}
            >
              {updateSettingsMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
