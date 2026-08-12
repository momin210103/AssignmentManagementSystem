export interface ApplicationSettings {
  id: string;
  applicationName: string;
  institutionName: string;
  supportEmail: string;
  academicYear: number;
  maintenanceMode: boolean;
}

export interface UpdateSettingsRequest {
  applicationName: string;
  institutionName: string;
  supportEmail: string;
  academicYear: number;
  maintenanceMode: boolean;
}
