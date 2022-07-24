import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ErrorInterface } from '../types/error.interface';

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.scss']
})
export class ErrorComponent{

    constructor(private location: Location) {}

    @Input() error!: ErrorInterface | null;
    @Input() showBackButton: Boolean = false;

    goBack(): void {
        this.location.back();
    }

}