export interface UserDetails{
    userFirstName: string;
    userLastName: string;
    userName: string;
    userPassword: string
    role: UserRole[];
}
export interface UserRole{
    roleName: string[];
    roleDescription: string;
}

export class UserData {
    department: string;
    employeetype: string;
    userLastName: string;
    userFirstName: string;
    qnumber: string;
    role: UserRole[];
    
    constructor(
        department?: string,
        employeetype?: string,
        userLastName?: string,
        userFirstName?: string,
        qnumber?: string,
        role?: UserRole[]
    ) {
        this.department = department;
        this.employeetype = employeetype;
        this.userLastName = userLastName;
        this.userFirstName = userFirstName;
        this.qnumber = qnumber;
        this.role = role;
    }
}

export interface UserOption {
    img: string;
    text: string;
    allowerdRoles: string[];
    route: string;
}
export enum CaseStatus {
    new = 'NEW',
    preselection = 'PRESELECTION',
    inProgress = 'IN_PROGRESS',
    finalized = 'FINALIZED',
    markedForDeletion = 'MARKED_FOR_DELETION',
    reopened = 'REOPENED',
    caseDeleted = 'CASE_DELETED',
}

export enum ProcessingStatus {
    success = 'SUCCESS',
    failed = 'FAILED',
}

export interface CaseMarker {
    caseId?: number;
    status?: CaseStatus | string;
    eventId?: string;
    modelName?: string;
    lat?: number;
    lng?: number;
    victims?: number;
    carsInvolved?: number;
    severity?: string;
    sa05dx?: boolean;
    series?: string;
    variant?: string;
    img?: string;
}

export enum MarkerColor {
    new = 'blue',
    preselection = 'violet',
    inProgress = 'green',
    finalized = '',
    markedForDeletion = 'red',
    reopened = '',
    caseDeleted = 'red',
}

export interface MarkersList {
    markers: CaseMarker[];
}

export interface CaseProcessingStatus {
    caseId: number;
    processStatus: string;
    message: string;
}

export interface IServiceError {
    status?: number;
    message: string;
    errorDetails?: IServiceErrorDetails | null;
}

export interface IServiceErrorDetails {
    errorcode?: string;
    message: string;
    severity?: string;
    stackTrace?: string[];
    status?: string;
}

export interface PositionZoom {
    zoom?: number,
    position?: google.maps.LatLng,
}