export class User {
    public id: number;
    public userId: string;
    public firstName: string;
    public lastName: string;
    public username: string;
    public email: string;
    public password: string;
    public lastLoginDate: Date;
    public lastLoginDateDisplay: Date;
    public joinDate: Date;
    public profileImageUrl: string;
    public active: boolean;
    public notLocked: boolean;
    public role: string;
    public authorities: string[];
    public darkModeEnabled: boolean;

    constructor() {
        this.id = null;
        this.userId = '';
        this.firstName = '';
        this.lastName = '';
        this.username = '';
        this.email = '';
        this.password = '';
        this.lastLoginDate = null;
        this.lastLoginDateDisplay = null;
        this.joinDate = null;
        this.profileImageUrl = '';
        this.active = false;
        this.notLocked = false;
        this.role = '';
        this.authorities = [];
        this.darkModeEnabled = false;
    }
}
