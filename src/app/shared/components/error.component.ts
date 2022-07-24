import { Component, Input, OnInit } from '@angular/core';
import { ErrorInterface } from '../types/error.interface';

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.scss']
})
export class ErrorComponent {

    @Input() error!: {statusCode: number, message: string} | null;

}