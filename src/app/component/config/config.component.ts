import { Component } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrl: './config.component.css'
})
export class ConfigComponent {

  constructor(private translate: TranslateService, private configService: ConfigService) {
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
    this.configService.getConfig().subscribe(resultado =>{
      console.log(resultado);
      sessionStorage.setItem("config", JSON.stringify(resultado));
    });
  }
}
