import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public previsualizacion : string;
  public archivos:any = []
  public loading:boolean

  constructor(private sanitizer : DomSanitizer) {}

  capturarFile(event):any {
    const archivoCapturado = event.target.files[0]
    this.extraerBase64(archivoCapturado).then((imagen : any) => {
      this.previsualizacion = imagen.base
      console.log(imagen)
    })
    this.archivos.push(archivoCapturado)
    console.log("CONTENIDO",event.target.files);
    
    // Rescatamos la extensión de sólo los archivos que sean imagenes
    console.log("EXTENSION", event.target.files[0].type.replace("image/",""))
  }


  // Nos codifica la imagen a base 64
  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error =>{
        resolve({
          base: null
        });
      };
    }catch(e) {
      return null;
    }
      
  })


  /*
  subirArchivo() : any {
    try{
      this.loading = true
      // Debemos inicializar un FormData para envio del archivo binario
      const formularioDatos = new FormData();
      this.archivos.forEach(archivo => {
        console.log(archivo)
        // Mi backend recibe el nombre de image
        formularioDatos.append('image',archivo)
      })

      this.rest.post('http://localhost:8000/usuario/', formularioDatos).subscribe(res => {
        console.log('Respuesta del servidor', res)
        this.loading = false;
      })
    }catch(e) {
      console.log('Error ',e);
      this.loading = false;
    }
  }
  */



}
