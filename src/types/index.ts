export interface Speaker {
    id: string;
    name: string;
    age: number;
    gender: 'male' | 'female';
    
}

export interface Concordance {
    snippet: string;
    gender: string;
    age: number;
    timestamp: string;
}

export interface Statistics {
    totalSpeakers: number;
    genderNumbers: {
        male: number;
        female: number;
    };
    ageNumbers: {
        [age: number]: number; //age here is given as a key where is the value is the no. of speakers of that age
    }
}

export interface SearchResult {
    concordances: Concordance[];
    statistics: Statistics;
}