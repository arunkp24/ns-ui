import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { ErrorComponent } from "./components/error.component";

@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule
    ],
    providers: [],
    declarations: [ErrorComponent],
    exports: [ErrorComponent]
})
export class SharedModule {}