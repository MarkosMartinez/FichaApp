import { Component } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from '@angular/material/snack-bar';

import { MainComponent } from '../main/main.component';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrl: './config.component.css'
})
export class ConfigComponent {

  config: any;
  idiomas = ["es", "en"];
  idiomaSeleccionado = "";
  appName = ""
  updateDesactivado: boolean = false;
  refreshDisabled: boolean = false;

  constructor(private translate: TranslateService, private mainComponent: MainComponent, private _snackBar: MatSnackBar, private configService: ConfigService) { }

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
      this.refreshDisabled = false;
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

  refresh(){
    this.refreshDisabled = true;
    this.loadConfig();
  }

}
