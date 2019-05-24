document.getElementById('request').onclick =(e) =>{
    e.preventDefault() 
    
    FormdataSend();

  }


  function tableMaker(){
      axios.get('/all').then((res) =>{
        //   console.log(res.data);
        document.getElementById('table-rows').innerHTML  = '' ;
          res.data.forEach(element => {
           rowHtml = ` <tr class="highlight">
           <th scope="row">${element.id}</th>
           <td>${element.name}</td>
           <td >${element.age}</td>
           <td>${element.category}</td>
           <td><button class="btn btn-danger"  id="delete-${element.id}">Delete </button></td>
           <td><button class="btn btn-success"  id="update-${element.id}">Update </button></td>
         </tr>`
         document.getElementById('table-rows').innerHTML += rowHtml
            // console.log(rowHtml)
          });
        //  document.getElementById('table-data').style.visibility = 'visible'
    
        Update()
        Delete()
      });
     

  }

// To LOAD THE FUNCCTION AT ThE BEGGINING   TO GET THE USER AT THE BEGGINING 
/**
 * @READ fUNCTIONALITY
 */
  tableMaker();


//THIS IS A TABLE UPDATOR FUNCTION 
  function tableUpdator(){
    document.getElementById('table-rows').innerHTML  = '' ;
    axios.get('/all').then((res) =>{
        console.log(res.data);
        res.data.forEach(element => {
         rowHtml = ` <tr>
         <th scope="row">${element.id}</th>
         <td contenteditable="false" >${element.name}</td>
         <td contenteditable="false">${element.age}</td>
         <td contenteditable="false">${element.category}</td>
         <td><button class="btn btn-danger"  id="delete-${element.id}">Delete </button></td>
         <td><button class="btn btn-success"  id="update-${element.id}">Update </button></td>
         </tr>
       </tr>`
       document.getElementById('table-rows').innerHTML += rowHtml

          console.log(rowHtml)
        });
      //  document.getElementById('table-data').style.visibility = 'visible'
      Update()
      Delete();
    });

  }


/**
 * @CREATING  FUNCTIONALITY
 */

  function FormdataSend(){
      
    console.log(document.getElementById('firstName').value)
    console.log(document.getElementById('dob').value)
    console.log(document.getElementById('category').value)

    axios.post('http://localhost:3001/post', {
        firstName: document.getElementById('firstName').value ,
        dob:document.getElementById('dob').value,
        category:document.getElementById('category').value,
      }).then(function (response) {
        console.log('Hit');
        console.log(response);
        console.log(response.data);
        
        if(response.data.code == 100) {
          alert(response.data.status)
        }
        else if(200){
          alert(response.data.status)

        }
        tableUpdator()
      }).catch(function (error) {
        console.log(error);
      });
      
  }



  /**
   *  let Row = document.createElement('tr');
              console.log(Object.keys(element));
              Object.keys(element).forEach(elm =>{
                let tableData = document.createElement('td');
                let textNode = 
              })
   */

/**
 * @Update Funcionality 
 * @param {*} e  ->Event
 */
   function Update(e){
    console.log(document.querySelectorAll('button.btn-success'));
    document.querySelectorAll('button.btn-success').forEach(updbtn =>{
        document.getElementById(updbtn.id).onclick = (e) =>{
            console.log(e.target.innerText );
            let previosDob = e.target.parentNode.parentNode.children[2].innerText;
            alert(previosDob)
            let updatedData = {
                id: '',
                firstName: '' ,
                dob: '',
                category:'',
              }

      /**
       * @If user  is click the submit button 
       *  */        
            if(e.target.innerText == 'Submit'){
                Submit(e);
                // e.target.innerText = 'Update'
            }


            e.target.innerText = 'Submit';
            

            console.log(e.target.parentNode.parentNode.children)
            for(let i = 1; i < 4; i++ ){
                console.log(e.target.parentNode.parentNode.children[i]);
                e.target.parentNode.parentNode.children[i].contentEditable= true
            }
            let updId = e.target.id
            console.group('Update');
                console.log(e.target.parentNode.parentNode);
            console.groupEnd
            let id = parseInt(updId.split('-')[1])
            
        }
      })
   }



  function Delete(){
    console.log(document.querySelectorAll('button.btn-danger'));
    document.querySelectorAll('button.btn-danger').forEach(delbtn =>{
      document.getElementById(delbtn.id).onclick = (e) =>{
          console.log(e.target);
          let btnId = e.target.id
          console.log(parseInt(btnId.split('-')[1]))
          let id = parseInt(btnId.split('-')[1])
          axios.delete(`http://localhost:3001/delete/${id}`).then(res=>{
              alert(res.status);
              tableUpdator();
          })
      }
    })
  }



  function Submit(e){
    alert('Here');
    updatedData = {
        id: e.target.parentNode.parentNode.children[0].innerText ,
        firstName: e.target.parentNode.parentNode.children[1].innerText ,
        dob:  e.target.parentNode.parentNode.children[2].innerText,
        category:e.target.parentNode.parentNode.children[3].innerText,
      }
      UpdateYear = updatedData.dob
      UpdateYear = parseInt(UpdateYear.split('-')[0])
      
      let today = new Date();
      let year =  today.getFullYear()
      if(year - UpdateYear < 18 ){
          
          alert('Your entered age is less than 18 so you can\'t  apply  ');
          e.target.parentNode.parentNode.children[2].innerText = 'Not Changed'
          e.target.innerText = 'Update';
          tableUpdator()
          return;
      }

      if(e.target.parentNode.parentNode.children[1].innerText =='Mukul' || e.target.parentNode.parentNode.children[1].innerText =='mukul' ){
        e.target.parentNode.parentNode.children[1].innerText  = 'Enter other name'
        alert('Mukul  Name not allowed ')
          e.target.innerText = 'Update';
            tableUpdator();
          return ;
      }


      if(!(e.target.parentNode.parentNode.children[2] != 'Veg' || e.target.parentNode.parentNode.children[2] != 'Non-Veg') ){
        alert('Choose A Valid category')
        e.target.innerText = 'Update';
            tableUpdator();
          return ;
      }

    for(let i = 0; i < 4; i++ ){
        console.log(e.target.parentNode.parentNode.children[i].innerText);
        e.target.parentNode.parentNode.children[i].contentEditable= false;
    }
    updatedData = {
        id: e.target.parentNode.parentNode.children[0].innerText ,
        firstName: e.target.parentNode.parentNode.children[1].innerText ,
        dob:  e.target.parentNode.parentNode.children[2].innerText,
        category:e.target.parentNode.parentNode.children[3].innerText,
      };
      alert(JSON.stringify(updatedData))
      axios.put('http://localhost:3001/edit' , updatedData).then(res=>{
          alert(e.target)
        e.target.innerText = 'Update';
          alert(JSON.stringify(res));
          console.log(res.data)
      })
    // e.target.innerText = 'Update';
    console.log(e.target)
    return;
}