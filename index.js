function resetFields(){
    document.getElementById("Input1").value='';
    document.getElementById("Input2").value='';
    document.getElementById("Input3").value='';
    document.getElementById("Input4").value='selecciona';
}

function createR() {
    
    //Guardo los datos capturados usando el id de cada control
    var id = document.getElementById("Input1").value;
    var nombre = document.getElementById("Input2").value;
    var superpoder = document.getElementById("Input3").value;
    var universo = document.getElementById("Input4").value;


    //validaciones
    if (id.length > 0) {
        //creo un objeto que guarda los datos
        var heroe = {
            id, //matricula:id
            nombre,
            superpoder,
            universo,
        }

        var lista_heroe=JSON.parse(localStorage.getItem("Heroe"));

        if(lista_heroe==null)
        { 
            var lista_heroe = [];
        }
        
        const existe = lista_heroe.some(element=>element.id==id); 

        if(!existe||document.getElementById("Input1").disabled==true)
        {
            
            if(document.getElementById("Input1").disabled==true)
            {
                var lista_heroe=lista_heroe.filter(heroe=>heroe.id!=id);

            }
                
            lista_heroe.push(heroe);
            var temporal = lista_heroe.sort((a,b) => a.id-b.id);
            localStorage.setItem("Heroe", JSON.stringify(temporal));
            
            read();
            resetFields();
            swal("Listo!", "Agregado correctamente", "success");

        }
        else
        {
            swal("Error", "Ya existe ese id de heroe","warning");
        }

    } 
    else 
    {
        swal("Error", "Llena todos los campos","warning");
    }

    document.getElementById("Input1").disabled = false;
    
}

function read(){
    document.getElementById("Table1").innerHTML='';
    

    const lista_heroe = JSON.parse(localStorage.getItem("Heroe"));
    
     
    if(lista_heroe)
    {
        lista_heroe.forEach((heroe)=>printRow(heroe));
    }
}


function printRow(heroe){
    
    if(heroe!=null){
        var table = document.getElementById("Table1"); 

        //creamos un nuevo elemento en la tabla en la ultima posicion
        var row = table.insertRow(-1);

        //Insertamos cada una de las celdas/columnas del registro
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        
        //Agregamos la informacion a cada una de las columnas del registro
        cell1.innerHTML = heroe.id;
        cell2.innerHTML = heroe.nombre; 
        cell3.innerHTML = heroe.superpoder;
        cell4.innerHTML = heroe.universo; 
        cell5.innerHTML = `<button type="button" class="btn btn-outline-danger" onClick="deleteR(${heroe.id})">Eliminar</button>`;
        cell6.innerHTML = '<button type="button" class="btn btn-outline-success" onClick="seekR('+heroe.id+')">Modificar</button>';
    }
}

function deleteR(id){
    const lista_heroe = JSON.parse(localStorage.getItem("Heroe"));
    var temporal=lista_heroe.filter(heroe=>heroe.id!=id);
    localStorage.setItem("Heroe", JSON.stringify(temporal));

    if(temporal.length==0)
    { 
        localStorage.removeItem("Heroe");
    }
 
    read();
    
}

function seekR(id){

    const lista_heroe = JSON.parse(localStorage.getItem("Heroe"));
    var heroe=lista_heroe.filter(heroe=>heroe.id==id);
    //console.log(heroe[0]);
    updateR(heroe[0]);
}

function updateR(heroe){
    if(heroe!=null)
    {
        document.getElementById("Input1").value=heroe.id;
        document.getElementById("Input1").disabled = true;
        document.getElementById("Input2").value=heroe.nombre;
        document.getElementById("Input3").value=heroe.superpoder;
        document.getElementById("Input4").value=heroe.universo;
    }
}


//Para consulta de universo
function readQ(){
    document.getElementById("Table2").innerHTML='';
    var c = document.getElementById("Input5").value;
  
    const lista_heroe = JSON.parse(localStorage.getItem("Heroe"));
    var heroeC=lista_heroe.filter(heroe=>heroe.universo==c);
    if(heroeC)
    {
        heroeC.forEach((heroe)=>printRowQ(heroe));
    }
    //console.log(heroeC)

}


function printRowQ(heroe){

    var table = document.getElementById("Table2"); 
    
    //creamos un nuevo elemento en la tabla en la ultima posicion
    var row = table.insertRow(-1);

    //Insertamos cada una de las celdas/columnas del registro
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    
    //Agregamos la informacion a cada una de las columnas del registro
    cell1.innerHTML = heroe.id;
    cell2.innerHTML = heroe.nombre; 
    cell3.innerHTML = heroe.superpoder;
    cell4.innerHTML = heroe.universo; 
   
}