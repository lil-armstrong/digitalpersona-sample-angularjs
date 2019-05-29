import { IWindowService } from 'angular';
import { JSONWebToken, User, JWT, ClaimName } from '@digitalpersona/core';

export class IdentityService
{
    static IDENTITY_KEY = "identity";

    static $inject = ["$window"]
    constructor(
        private $window: IWindowService
    ){
        console.log("IdentityService created")
    }

    public get userName(): string|null {
        const token: JSONWebToken|null = this.get();
        if (!token) return null;
        const subject = JWT.claims(token)[ClaimName.SubjectName];
        if (!subject) return null;
        return (subject instanceof User) ? subject.name : subject;
    }

    public get() : JSONWebToken | null {
        return this.$window.sessionStorage.getItem(IdentityService.IDENTITY_KEY);
    }

    public set(identity: JSONWebToken) {
        this.$window.sessionStorage.setItem(IdentityService.IDENTITY_KEY, identity);
    }

    public clear() {
        this.$window.sessionStorage.removeItem(IdentityService.IDENTITY_KEY);
    }
}