import type Sex from "$lib/data/Sex";
import type Preference from "$lib/data/Preference";

class User {
    username: string;
    password: string;
    login: string;
    sex: Sex;
    preference: Preference;

    constructor(username: string, password: string, login: string, sex: Sex, preference: Preference) {
        this.username = username;
        this.password = password;
        this.login = login;
        this.sex = sex;
        this.preference = preference;
    }
}

export default User;
