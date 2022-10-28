import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  mensajeError: String = ""

  public formularioAlta: FormGroup

  constructor(private router: Router, public fb: FormBuilder) {
    this.formularioAlta = this.fb.group(
      {nombre: ["", Validators.required],
      password: ["", Validators.required]}
    )
  }

  ngOnInit(): void {
  }

  guardar(){
    if(this.formularioAlta.invalid){
      this.mensajeError= "Formulario invalido";
    }else{
      this.router.navigateByUrl("sala");
    }
    
  }

  login(){
    this.router.navigateByUrl("login");
  }

}
