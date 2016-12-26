export class Course {
    constructor(private $key: string,
                private courseListIcon: string,
                private description: string,
                private iconUrl: string,
                private longDescription: string,
                private url: string) {
    }

    static fromJson({$key, courseListIcon, description, iconUrl, longDescription, url}) {
        return new Course($key, courseListIcon, description, iconUrl, longDescription, url);
    }

    static fromJsonArray(json: any[]): Course[] {
        return json.map(Course.fromJson);
    }
}