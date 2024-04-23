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
      if(localStorage.getItem("config")) this.aplicarConfig();

      this.configService.getConfig().subscribe(resultado =>{
        localStorage.setItem("config", JSON.stringify(resultado.config));
        this.aplicarConfig();
      });

  }

  aplicarConfig(){
    this.config = localStorage.getItem("config");
    if(this.config && this.config != undefined){
      this.config = JSON.parse(this.config);
      this.language = this.config[0].language;
      this.app_name = this.config[0].app_name;
    }else{
      this.language = 'es';
      this.app_name = 'FichaApp';
    }
    this.title.setTitle(this.config[0].app_name);
    this.translate.use(this.language);
  }
}
