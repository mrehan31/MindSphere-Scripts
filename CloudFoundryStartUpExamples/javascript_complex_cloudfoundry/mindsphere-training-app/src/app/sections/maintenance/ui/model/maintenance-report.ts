import { MaintenancePeriod } from './maintenance-period';

export interface MaintenanceReport {
    maintenancePeriod: MaintenancePeriod;
    maintainer: string;
    reason: string;
    description: string;
}
