import { IComponentOptions } from 'angular';
import { Credential, JSONWebToken } from "@digitalpersona/core";
import { IEnrollService, ServiceError } from '@digitalpersona/services';
import { PasswordEnroll } from '@digitalpersona/enrollment';

import template from './passwordChange.html';
import { TokenEnroll } from '../tokenEnroll';

export default class PasswordChangeControl extends TokenEnroll
{
    public static readonly Component: IComponentOptions = {
        ...TokenEnroll.Component,
        template,
        controller: PasswordChangeControl,
    };

    private newPassword : string;
    private oldPassword: string;
    private showPassword: boolean;

    public static $inject = ["EnrollService"];
    constructor(
        enrollService: IEnrollService,
    ){
        super(Credential.Password, enrollService);
    }

    public updateOldPassword(value: string) {
        this.oldPassword = value || "";
        super.resetError();
    }
    public updateNewPassword(value: string) {
        this.newPassword = value || "";
        super.resetError();
    }

    public async submit() {
        super.emitOnBusy();
        try {
            await new PasswordEnroll(this.enrollService)
                .enroll(this.identity, this.newPassword, this.oldPassword);
            super.emitOnEnroll();
        } catch (error) {
            super.emitOnError(new Error(this.mapServiceError(error)));
        }
    }

    protected mapServiceError(error: ServiceError) {
        switch (error.code) {
            default: return super.mapServiceError(error);
        }
    }
}