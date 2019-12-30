import { Component } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Shutdown } from "@live/entities";
import { Logger } from "@live/services";
import { DIALOG_CONFIG_SMALL } from "../../constants/mat-dialog-config-small";
import { ShutdownService } from "../../services/shutdown/shutdown.service";
import { ShutdownDialogComponent } from "../shutdown-dialog/shutdown-dialog.component";

@Component({
  selector: "shutdown-button",
  templateUrl: "./shutdown.component.html",
  styleUrls: ["./shutdown.component.scss"]
})
export class ShutdownComponent {

  constructor(
    private _logger: Logger,
    public shutdownDialog: MatDialog,
    private _shutdownService: ShutdownService) {
  }

  publicopenDialog(): void {
    this.shutdownDialog
      .open(ShutdownDialogComponent, DIALOG_CONFIG_SMALL)
      .afterClosed()
      .toPromise()
      .then((result) => {
        this._logger.info(`The dialog was closed, result: ${result}`);

        if (result) {
          const shutdown = new Shutdown(null);
          this._shutdownService.setShutdown(shutdown);
        }
      });
  }
}
