window.addEventListener("load",function(){
	class Carta{
		constructor(id,imagen,contenedor){//contenedor es DOM
			this.id = id;//número
			this.imagen = imagen;//ruta a la img
			contenedor.appendChild(this.crearCarta());
		}
		crearCarta(){
			var carta = document.createElement("a");
			carta.href = "#";
			carta.classList.add("carta");
			var imagen = document.createElement("img");
			imagen.src = this.imagen;
			carta.appendChild(imagen);
			return carta;
		}
	}
	var colores = ["ff0000","00ff00","0000ff","ff00ff","ffff00"];
	var letras = ["A","B","C","D","E","F"];
	var cartas = [];
	var mesa = document.querySelector(".mesa");
	var preSeleccion = [];
	var faseJuego = 0;//0 ---> primera fase 1 ------> segunda fase(comparación)
	var indiceAnterior = 0;
	//preselección de cartas
	for(var i = 0; i < letras.length; i++){
		var indiceColor = Math.floor(Math.random()*colores.length);

		preSeleccion[i] = { id : i + 1 , url : `http://placehold.it/150x200/${colores[indiceColor]}/ffffff?text=${letras[i]}`};
		preSeleccion[i + 6] = { id : i + 1 , url : `http://placehold.it/150x200/${colores[indiceColor]}/ffffff?text=${letras[i]}`};
	}
	preSeleccion.sort((a,b) => 0.5 - Math.random());
	
	preSeleccion.forEach(item => {
		cartas.push(new Carta(item.id,item.url,mesa));
	});


	var cartasDom = document.querySelectorAll(".carta");
	
	for(let i = 0; i < cartasDom.length; i++){
		cartasDom[i].addEventListener("click",function(evento){
			evento.preventDefault();

			if(faseJuego < 1){
				//primera fase
				this.classList.add("visible");
				indiceAnterior = i;
				faseJuego = 1;
			}else{
				//segunda fase
				this.classList.add("visible");
				mesa.style.pointerEvents = "none";
				setTimeout(()=>{
					if(cartas[i].id == cartas[indiceAnterior].id){
						//son iguales
						cartasDom[i].classList.add("invisible");
						cartasDom[indiceAnterior].classList.add("invisible");
					}else{
						//no son iguales
						cartasDom[i].classList.remove("visible");
						cartasDom[indiceAnterior].classList.remove("visible");
					}
					mesa.style.pointerEvents = "auto";
					faseJuego = 0;
				},1000);
			}

		});
	}



});