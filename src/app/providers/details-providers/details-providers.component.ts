import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-details-providers',
  templateUrl: './details-providers.component.html',
  styles: [
  ]
})
export class DetailsProvidersComponent implements OnInit {

  firstname: string;
  desc: string;
  deadline: string;
  id: number;
  lastname: string;
  phone: string;
  email: string;
  status: string

  constructor (private providerService: ProviderService, private route: ActivatedRoute) { }

  ngOnInit(): void {
      
    this.route.paramMap
    .subscribe( params => this.id = parseInt(params.get('id') || '{}') );

    this.providerDetails();

  }

  providerDetails(){

    this.providerService.detailProvider(this.id)
    .subscribe({
      next: (data) => {
        console.log(data);

        this.firstname = data[0].firstname;
        this.desc = data[0].desc;
        this.deadline = data[0].deadline;
        this.id = data[0].id;
        this.lastname = data[0].lastname;
        this.phone = data[0].phone;
        this.email = data[0].email;
        this.status = data[0].status

      },
      error: (error) => {
        console.log(error);
      }
    })
  
  }

}
