import { Component } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { TranslateService, TranslateModule } from "@ngx-translate/core";
import { MatSnackBar } from '@angular/material/snack-bar';

import { MainComponent } from '../main/main.component';
import { AlertComponent } from '../alert/alert.component';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatFabButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatOption } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-config',
    templateUrl: './config.component.html',
    styleUrl: './config.component.css',
    standalone: true,
    imports: [RouterLink, RouterOutlet, MatProgressSpinner, MatFormField, MatLabel, MatSelect, FormsModule, MatOption, MatInput, MatButton, MatFabButton, MatIcon, TranslateModule]
})
export class ConfigComponent {

  config: any;
  idiomas = ["es", "en", "eu"];
  idiomaSeleccionado = '';
  appName = '';
  updateDesactivado: boolean = false;
  loading: boolean = true;

  constructor(private translate: TranslateService, private router: Router, private cookieService: CookieService, public dialog: MatDialog, private mainComponent: MainComponent, private _snackBar: MatSnackBar, private configService: ConfigService) { }

  ngOnInit(): void {
    this.loadConfig();

  }

  loadConfig(modo: number = 0){
    this.configService.getConfig().subscribe(resultado =>{
      //console.log(resultado);
      localStorage.setItem("config", JSON.stringify(resultado.config));
      
      this.config = JSON.stringify(resultado.config);
      this.idiomaSeleccionado = JSON.parse(this.config)[0].language;
      this.appName = JSON.parse(this.config)[0].app_name;

      if(modo == 1) this.mainComponent.aplicarConfig();
      this.loading = false;
    });
  }

  updateConfig(){
    this.updateDesactivado = true;
    this.configService.updateConfig(this.idiomaSeleccionado, this.appName).subscribe(resultado =>{
      if(resultado){
        this.translate.use(this.idiomaSeleccionado);
        setTimeout(() => {
          this._snackBar.open(this.translate.instant('CONFIG.config_updated_snack'), this.translate.instant('CONFIG.accept_snack'), {
            duration: 3 * 1000, // 3 Segundos
          });
        }, 250);
        this.updateDesactivado = false;
        this.loadConfig(1);
      }else{
        this._snackBar.open(this.translate.instant('CONFIG.config_updated_error_snack'), this.translate.instant('CONFIG.accept_snack'), {
          duration: 3 * 1000, // 3 Segundos
        });
        this.updateDesactivado = false;
      }
    });
  }

  resetDb(){
    let dialogRef = this.dialog.open(AlertComponent, {
      height: '200px',
      width: '400px',
      data: {btn: 2, msg: this.translate.instant('CONFIG.db_reset_label'), title: this.translate.instant('ALERT.label_warning').toUpperCase()}
    });
    dialogRef.afterClosed().subscribe(result => {
     if (result == "Ok"){
      this.configService.resetDb().subscribe(resultado =>{
        if(resultado.success){
          this._snackBar.open(this.translate.instant('CONFIG.db_reset_successfully'), this.translate.instant('CONFIG.accept_snack'), {
            duration: 3 * 1000,
          });
        }
      setTimeout(() => {
        localStorage.setItem("seleccion", '0');
        this.cookieService.delete('token');
        this.cookieService.delete('name');
        this.cookieService.delete('role');
        localStorage.removeItem("seleccion");
        this.router.navigate(['login']);
      }, 3000);
      });
     }
    });
  }

  refresh(){
    this.loading = true;
    this.loadConfig();
  }

}
