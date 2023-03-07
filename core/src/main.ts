import { AgChart, AgChartOptions, AgChartInstance } from 'ag-charts-community';
import { LicenseManager } from './license/licenseManager';

export * from 'ag-charts-community';

export class AgEnterpriseCharts {
    public static create(options: AgChartOptions): AgChartInstance {
        new LicenseManager(options.container as any).validateLicense();

        return AgChart.create(options);
    }
}
