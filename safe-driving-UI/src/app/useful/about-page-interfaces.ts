export interface AboutAPP {
    releaseNotes: ReleaseNote[];
    beBuildVersion: VersionData;
    feVersion: VersionData;
}

export interface ReleaseNote {
    releaseVersion: string;
    issueType: string;
    issueId: string;
    issueSummary: string;
}

export interface VersionData {
    version?: string;
    buildNumber?: string;
    buildDate?: string;
    commit?: string;
}
