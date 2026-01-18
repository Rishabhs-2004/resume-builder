function printcv(){
    window.print();
  }

  function addnewWE(){
    let newNode=document.createElement('textarea');
    newNode.classList.add('w-100');
    newNode.classList.add('form-control');
    newNode.classList.add('workIn');
    // newNode.classList.add('mt-2');
    newNode.setAttribute('placeholder','Enter here');
    newNode.setAttribute('rows',2);

    let we=document.getElementById('we');
    let weBtn=document.getElementById('weBtn');

    we.insertBefore(newNode,weBtn);

  }
  function addnewAQ(){
    let newNode=document.createElement('textarea');
    newNode.classList.add('w-100');
    newNode.classList.add('form-control');
    newNode.classList.add('acadmicIn');
    // newNode.classList.add('mt-2');
    newNode.setAttribute('placeholder','Enter here');
    newNode.setAttribute('rows',2);

    let we=document.getElementById('ac');
    let weBtn=document.getElementById('aqBtn');

    aq.insertBefore(newNode,aqBtn);

  }

  function createCV(){
    document.getElementById('nameOut').innerHTML=document.getElementById('nameIn').value;   
    document.getElementById('bignameOut').innerHTML=document.getElementById('nameIn').value;   
    document.getElementById('conOut').innerHTML=document.getElementById('conIn').value;   
    document.getElementById('addOut').innerHTML=document.getElementById('addIn').value;       

    document.getElementById('fbOut').innerHTML=document.getElementById('fbIn').value;   
    document.getElementById('instaOut').innerHTML=document.getElementById('instaIn').value;   
    document.getElementById('linOut').innerHTML=document.getElementById('linIn').value;   

    document.getElementById('objectiveOut').innerHTML=document.getElementById('objectiveIn').value;  

    let workInobj= document.getElementsByClassName('workIn');
    let str='';
    for(let e of workInobj)   {
        str = str + `<li> ${e.value} </li>`;     
    }    
    document.getElementById('weULLI').innerHTML=str;

    let acadmicInobj= document.getElementsByClassName('acadmicIn');
    let str1='';
    for(let e of acadmicInobj)   {
        str1 = str1 + `<li> ${e.value} </li>`;     
    }    
    document.getElementById('aqULLI').innerHTML=str1;
    document.getElementById('mainPage').style.display='none';
    document.getElementById('secPage').style.display='block';


  }

  img=document.getElementById('profile');
  let file=document.getElementById('file');
  file.addEventListener('change',function(){
    const chooseFile=this.files[0];
    if(chooseFile){
        const reader=new FileReader();
        reader.addEventListener('load',function(){
            img.setAttribute('src',reader.result);
        });
        reader.readAsDataURL(chooseFile);
    }
  });