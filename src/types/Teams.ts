export type Team = {
    id: number;
    code?: string;
    country?: string;
    founded?: number;
    logo: string;
    name: string;
    national?: boolean;
}

export type Venue = {
    address?: string;
    capacity?: number;
    city: string;
    id: number | null;
    image?: string;
    name: string;
    surface?: string;
}

export type TeamsResponse = {
    team: Team;
    venue: Venue;
}