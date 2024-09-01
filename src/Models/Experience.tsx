
export class Experience {
    companies: Array<Company> = [];

    constructor(thus: Partial<Experience>) {
        Object.assign(this, thus);
    }
}

export class Company {
    title: string = "";
    url: string = "";
    siteUrl: string = "";
    kind: string = "";
    date: string = "";
    roles: Array<Role> = [];
    projects: Array<Project> = [];
    location: string = "";
    description: string = "";

    constructor(thus: Partial<Company>) {
        Object.assign(this, thus);
    }
}

export class Role {
    position: string = "";
    constructor(thus: Partial<Role>) {
        Object.assign(this, thus);
    }
}

export class Project {
    urls: Array<string> = [];
    title: string = "";
    description: string = "";
    skills: Array<string> = [];

    constructor(thus: Partial<Project>) {
        Object.assign(this, thus);
    }
}