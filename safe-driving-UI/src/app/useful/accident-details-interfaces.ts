export interface AccidentDetails {
    event?: Event;
    vehicle?: Vehicle;
    vehicleStatus?: VehicleStatus;
    airbags?: Airbags;
    seatbelts?: SeatBeltStatus;
    agentReport?: AgentReport;
    collisions?: Collisions;
    trace?: Trace;
}

export interface Event {
    caseId?: number;
    eventId?: string;
    lat: number;
    lng: number;
    accidentDateTime?: Date;
    urgency?: string;
    probabilityMais?: number;
}
export interface Vehicle {
    vin?: string;
    leftHandDrive: boolean;
    modelType?: string;
    modelName?: string;
    motorcycle?: boolean;
    productionDate?: Date;
    engineType?: string;
    homeCountryCode?: string;
    hmiLanguage?: string;
    customer?: string;
    contact?: string;
}

export interface VehicleStatus {
    rolloverDetected?: boolean;
    dv1x?: number;
    dv1y?: number;
    dv2x?: number;
    dv2y?: number;
    dv3x?: number;
    dv3y?: number;
    backupBatteryUsed?: boolean;
    backupAntennaUsed?: boolean;
    vehicleOrientation?: VehicleOrientation;
    driverDoorOpened?: boolean;
}

export interface Airbags {
    airbagDriverFront?: AirbagStatus;
    airbagFrontPassengerFront?: AirbagStatus;
    airbagDriverKnee?: AirbagStatus;
    airbagFrontPassengerKnee?: AirbagStatus;
    airbagDriverThorax?: AirbagStatus;
    airbagFrontPassengerThorax?: AirbagStatus;
    airbagDriverHead?: AirbagStatus;
    airbagFrontPassengerHead?: AirbagStatus;

    airbagCenterHead: AirbagStatus;
    airbagDriverSideRear: AirbagStatus;
    airbagPassengerSideRear: AirbagStatus;
}

export interface SeatBeltStatus {
    seatbeltDriver: string;
    seatbeltFrontPassenger: string;
    seatbeltRearDriverSide: string;
    seatbeltRearPassengerSide: string;
    seatbeltRearMiddle: string;

    seatbeltRear3DriverSide: string;
    seatbeltRear3PassengerSide: string;
}

export interface AgentReport {
    hvStatus?: null;
    dasStatus?: null;
    actionStatus?: string;
    audioStatus?: string;
    occupants?: number;
    occupantChild?: boolean;
    occupantsInjured?: boolean;
    occupantsTrapped?: boolean;
    occupantsEjected?: boolean;
    fire?: boolean;
    agentNotes?: string;
    agentChat?: string;
}

export interface Collisions {
    collision1Front: boolean;
    collision1Rear: boolean;
    collision1Driver: boolean;
    collision1Passenger: boolean;
    collision2Front: boolean;
    collision2Rear: boolean;
    collision2Driver: boolean;
    collision2Passenger: boolean;
    collision3Front: boolean;
    collision3Rear: boolean;
    collision3Driver: boolean;
    collision3Passenger: boolean;
}

export interface Trace {
    pearl1Lat?: number;
    pearl1Lng?: number;
    pearl2Lat?: number;
    pearl2Lng?: number;
    pearl3Lat?: number;
    pearl3Lng?: number;
    pearl4Lat?: number;
    pearl4Lng?: number;
}

export type AirbagStatus = 'fired' | 'not-fired' | 'not_equipped';
export type VehicleOrientation = 'NORMAL' | 'SIDE' | 'ROOF' | 'UNKNOWN';
