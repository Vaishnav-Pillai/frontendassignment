import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../services/provider.service';
import { ProviderClass } from '../model/providers.class';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styles: [
  ]
})
export class ProvidersComponent implements OnInit {

  providers: ProviderClass[];

  constructor(private providerService: ProviderService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.providerService.getProviders()
      .subscribe({
        next: (data) => {
          this.providers = data;
          console.log(data);
        },
        error: (error) => {
          console.log(error);
        }
      })
  }
}
