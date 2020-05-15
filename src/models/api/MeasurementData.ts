export interface MeasurementData {
    gyroscopeX?: number;
    gyroscopeY?: number;
    gyroscopeZ?: number;
    accelerometerX?: number;
    accelerometerY?: number;
    accelerometerZ?: number;
    batteryLevel?: number;
    gpsLatitude?: number;
    gpsLongitude?: number;
    sendDate: Date;
}
