import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ProviderClass } from 'src/app/model/providers.class';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-add-providers',
  templateUrl: './add-providers.component.html',
  styles: [
  ]
})

export class AddProvidersComponent implements OnInit {
  submitted = false;
  emailError = false;
  emailErrorMsg = "Invalid Email. Try Again."
  providers : ProviderClass[];
  provider = new ProviderClass();
  providersForm : FormGroup;

  constructor(private providerService: ProviderService) { }

  ngOnInit(): void {
      this.buildFormControls();
      this.loadData();
  }

  getControl(name: any) : AbstractControl | null {
    return this.providersForm.get(name);
  }

  handleSubmit() {
    console.log(this.providersForm);
    this.buildProvider();
    if(!this.isInvalidEmail()){
      this.providerService.addProvider(this.provider)
        .subscribe({
          next: (data) => {

          },
          error: (error) => {
            console.log(error);
          }
        })

        this.submitted = true;
        this.emailError= false;
    } 
  }


  isInvalidEmail(){
    let email = this.providersForm.get('email')?.value;
    if(this.providers.filter(el => el.email == email).length>0){
      this.emailError = true;
      return true;
    }
    return false;
  }


  getNewId(){
    let newId : number;
    while(true){
      newId = Math.floor(Math.random() * 10000) + 99999;
      if(this.providers.findIndex(el => el.id == newId) == -1) {
        return newId;
      }
    }
  }

  buildProvider(){
    let p = this.providersForm.value;
    this.provider.id = this.getNewId();
    this.provider.firstname = p.firstname;
    this.provider.lastname = p.lastname;
    this.provider.desc = p.desc;
    this.provider.status = p.status;
    this.provider.deadline = p.deadline;
    this.provider.phone = p.phone;
    this.provider.email = p.email;
  }


  buildFormControls(){
    this.providersForm = new FormGroup({
      firstname : new FormControl('Name',[Validators.required, Validators.minLength(2)]),
      lastname : new FormControl(),
      desc : new FormControl(),
      status : new FormControl(),
      deadline : new FormControl(),
      phone : new FormControl('',[Validators.required]),
      email : new FormControl('',[Validators.required, Validators.email])
    })
  }

  //Getting all the data from DB
  loadData(){
    this.providerService.getProviders()
      .subscribe({
        next: (data) => {
          this.providers = data;
        },
        error: (error) => {
          console.log(error);
        }
      })
  }
}
