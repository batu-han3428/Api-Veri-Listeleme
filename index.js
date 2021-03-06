const usersApi = () =>{
    fetch("https://jsonplaceholder.typicode.com/users").
    then(response=>response.json()).
    then(girilenVeri).
    catch(e=>console.log(e));
}

const todosApi = (element) =>{
    fetch(`https://jsonplaceholder.typicode.com/todos/?userId=${element.id}`).
    then(response=>response.json()).
    then(todo => veriOlusturucu(todo, element)).
    catch(e=>console.log(e));
}

const girilenVeri = (data) => {
    let cumle = [];
    document.getElementById('arama').addEventListener('keyup',function(e){
        if(e.keyCode == 8){         
            cumle.splice(0,cumle.length);
            Array.from(this.value).forEach(element=>cumle.push(element));
            veriEslestir(data, cumle);
        }
    });
    document.getElementById('arama').addEventListener('cut',function(){
        const selection = document.getSelection().toString();
        cumle.forEach((element,index)=>{
            if(selection.includes(element)){
                cumle.splice(index,selection.length);
            }
        });
        veriEslestir(data, cumle);
    });
    document.getElementById('arama').addEventListener('paste',function(e){
        setTimeout(() => {
            cumle.splice(0,cumle.length);
            Array.from(this.value).forEach(element=>cumle.push(element));
            veriEslestir(data, cumle);
        }, 1);
    });
    document.getElementById('arama').addEventListener('keypress',function(e){
        const selection = document.getSelection().toString();
        if(selection != ""){
            let c = cumle.toString().replace(/,/g,"");
            if(c.indexOf(selection) || c === selection){                       
                cumle.splice(c.indexOf(selection),selection.length,String.fromCharCode(e.keyCode));
                veriEslestir(data, cumle);
            }else if(c.indexOf(selection) > -1){
                cumle.splice(c.indexOf(selection),selection.length,String.fromCharCode(e.keyCode));
                veriEslestir(data, cumle);
            }
        }else{
            setTimeout(() => {
                cumle.splice(0,cumle.length);
                Array.from(this.value).forEach(element=>cumle.push(element));
                veriEslestir(data, cumle);
            }, 1);
        }
    });
}

const veriEslestir = (data,cumle) =>{
    veri = cumle.toString().replace(/,/g,"");
    data.forEach(element => {
        if(element.username.toLowerCase() == veri.toLowerCase()){
            todosApi(element);
        }else{
            profilBulunamadi(veri);
        }
    });
}

const veriOlusturucu = (todo,element) => {
    document.getElementById('bulunamadi').innerHTML="";
    let html = "";
    html =`
            <h5 class="card-title">??leti??im</h5>
            <ul class="list-group">
                <li class="list-group-item">Kullan??c?? Ad??: ${element.username}</li>
                <li class="list-group-item">E-Mail: ${element.email}</li>
                <li class="list-group-item">Web Site: ${element.website}</li>
                <li class="list-group-item">??irket: ${element.company.name}</li>
                <li class="list-group-item">Telefon No: ${element.phone}</li>
                <li class="list-group-item">Adres: ${element.address.street} ${element.address.suite} ${element.address.city} ${element.address.zipcode}</li>
            </ul>
            <hr class="my-5"/>
            <h5 class="card-title">Yap??lacaklar Listesi</h5>
            <ul class="list-group">
    `;

    todo.forEach((veri,index)=>{
        html+=`
            <li class="list-group-item">${index+1}: ${veri.title}</li>
        `;
    });

    html +=`</ul>`;
    document.getElementById('veriListele').innerHTML=html;
    document.getElementById('veriListeleCard').style.display='block';
}

const profilBulunamadi = (veri) =>{
    document.getElementById('veriListeleCard').style.display='none';
    document.getElementById('veriListele').innerHTML="";
    let html = "";
    if(veri == ""){
        document.getElementById('bulunamadi').innerHTML="";
    }else{
        html = `${veri} bulunamad??..`;
        document.getElementById('bulunamadi').innerHTML=html;
    }  
}

document.addEventListener('DOMContentLoaded',usersApi());