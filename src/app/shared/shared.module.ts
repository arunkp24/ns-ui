import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { ErrorComponent } from "./components/error.component";

@NgModule({
    imports: [
        CommonModule,
        MatCardModule
    ],
    providers: [],
    declarations: [ErrorComponent],
    exports: [ErrorComponent]
})
export class SharedModule {}