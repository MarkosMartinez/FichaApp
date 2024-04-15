import { Component } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FichaApp'; //TODO Usar esto
  language = 'es';
  config: any;

  constructor(private translate: TranslateService, private configService: ConfigService) {
    translate.setDefaultLang('es');
  }
  ngOnInit(): void {
    
      this.configService.getConfig().subscribe(resultado =>{
        //console.log(resultado);
        sessionStorage.setItem("config", JSON.stringify(resultado));
        this.aplicarConfig();
      });

  }

  aplicarConfig(){
    this.config = sessionStorage.getItem("config");
    if(this.config){
      this.config = JSON.parse(this.config);

      this.language = this.config[0].language;
      this.title = this.config[0].app_name;
      this.translate.use(this.language);
    }else{
      this.language = 'es';
      this.title = 'FichaApp';
      this.translate.use(this.language);
    }
  }
}
