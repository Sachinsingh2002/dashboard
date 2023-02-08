import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICon_constraints, IConnectivity, IService } from '../../../../root/interfaces/service';
import { DialogConnectionSettingsView } from '../../../dialogs/content-connection/dialog-connection-settings-view.component';
import { SubComponent } from '../../../../root/classes/subComponent';

@Component({
    selector: 'form-connectivity',
    templateUrl: './connectivity.component.html',
    styleUrls: ['./connectivity.component.css'],
})

// TODO Simplify this and dont use a form array. or only a local one
export class ConnectivityComponent extends SubComponent implements OnInit {
    @Input() service: IService;
    connectivity: IConnectivity[] = [];

    constructor(public dialog: MatDialog) {
        super();
    }

    ngOnInit(): void {
        this.connectivity = this.service?.connectivity ?? [];
    }

    addConnectivity() {
        const c: IConnectivity = {
            con_constraints: [],
            target_microservice_id: 'has to be selected',
        };
        this.connectivity.push(c);
    }

    deleteConnection(index: number) {
        this.connectivity.splice(index, 1);
    }

    openDialog(index: number) {
        const dialogRef = this.dialog.open(DialogConnectionSettingsView, { data: this.connectivity[index] });

        dialogRef.afterClosed().subscribe((result) => {
            console.log(result);
            this.saveDialogData(result, index);
        });
    }

    // Saving the Dialog Data to the Array and the Form
    saveDialogData(data: ICon_constraints, index: number) {
        if (this.connectivity[index].con_constraints.length === 0) {
            // Why the if?
            const entry: ICon_constraints = {
                type: data.type,
                threshold: data.threshold,
                rigidness: data.rigidness,
                convergence_time: data.convergence_time,
            };
            this.connectivity[index].con_constraints.push(entry);
        }
        // TODO implement also that updates are possible
    }

    getData(): any {
        return {
            connectivity: this.connectivity,
        };
    }
}
