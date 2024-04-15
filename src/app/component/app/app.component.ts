import { Component } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { ConfigService } from '../../services/config.service';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  app_name = 'FichaApp'; //TODO Usar esto
  language = 'es';
  config: any;

  constructor(private translate: TranslateService, private title: Title, private configService: ConfigService) {
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
      this.app_name = this.config[0].app_name;
      this.translate.use(this.language);
      this.title.setTitle(this.config[0].app_name);
    }else{
      this.language = 'es';
      this.app_name = 'FichaApp';
      this.translate.use(this.language);
    }
  }
}
