import type Sex from "$lib/data/Sex";
import type Preference from "$lib/data/Preference";

class RegistrationFormData {
    username: string;
    password: string;
    login: string;
    sex: Sex;
    preference: Preference;
    age: number;
    age_min: number;
    age_max:number;
    description:string;

    constructor(username: string, password: string, login: string, sex: Sex, preference: Preference, age:number, age_min: number, age_max:number,description:string)
{
        this.username = username;
        this.password = password;
        this.login = login;
        this.sex = sex;
        this.preference = preference;
        this.age=age;
        this.age_min=age_min;
        this.age_max=age_max;
        this.description=description;
    }
}

export default RegistrationFormData;
