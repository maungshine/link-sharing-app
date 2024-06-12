export interface verifyEmailResponse {
    success?: string;
    error?: string;
}

export type structureType = {
    [x: number]: {
        platform?: string,
        link?: string,
        priority?: string
    }
}

export type structureTypeArray = structureType[];