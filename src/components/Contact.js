import React, { Component } from 'react';
import   '../firebase';
import firebase from 'firebase';
import { v4 as uuid } from 'uuid';
import storage from "firebase";
import Fuse from 'fuse.js'
class Contacts extends Component{
    state={
        fullname:'',
        mobile:'',
        email:'',
        address:'',
        listData:[],
        upname:'',
        upmobile:'',
        upemail:'',
        upaddress:'',
        // image:null,
        image:'',
songs:'',
items:[],
search:'',
        // progressos: 0,
        
    }
  
    readImages = async (e) => {
        const file = e.target.files[0];
        const id = uuid();
        // const storageRef = firebase.storage().ref('images').child(id)
        const imagesRef = firebase.storage().ref('images').child(id);
         await imagesRef.put(file);
         imagesRef.getDownloadURL().then((url) => {
           console.log(url);
          this.setState({image:url});
         });
        
      };

      readSong = async (e) => {
        const file = e.target.files[0];
        const id = uuid()
        // const storageRef = firebase.stornage().ref('images').child(id)
        const imagesRef = firebase.storage().ref('song').child(id);
         await imagesRef.put(file);
         imagesRef.getDownloadURL().then((url) => {
           console.log(url)
          this.setState({songs:url});
          console.log(this.state.songs);
         });
        
      };
      filterList = (event) => {
        const options = {
            includeScore: true
          }
          
          const fuse = new Fuse(this.state.listData)
          
          const result = fuse.search('usman')
          console.log(result);
    }

handleChange = e =>{
    if(e.target.files[0]){
        const image = e.target.files[0];
        this.setState(()=>({image}));
    }
}

handleChangesong = e =>{
    if(e.target.files[0]){
        const image = e.target.files[0];
        this.setState(()=>({image}));
    }
}



componentDidMount(){
    firebase.database().ref('users').on('value',snapShot => {
        let listData = [];
        snapShot.forEach(snap => {
            listData.push(snap.val());
        });
        this.setState({listData:listData});
    });
   
}


Submit = e =>{
e.preventDefault();


console.log(this.state.song);
firebase.database().ref('users/'+this.state.fullname).set({
fullname:this.state.fullname,
email:this.state.email,
mobile:this.state.mobile,
address:this.state.address,
url:this.state.image,

songUrl:this.state.songs
});

}

updateDone = ()=>{

firebase.database().ref('users/'+this.state.upname).update({
    
   
    email:this.state.upemail,
    mobile:this.state.upmobile,
    address:this.state.upaddress
    });
   
    }

delete=(name)=> {
  console.log({name})
    firebase.database().ref('users/'+name).remove()
}

update=(name,email,mobile,address)=> {
    // console.log({name});
    // console.log({email});
    // console.log({mobile});
    // console.log({address});
    this.setState({upname:name});
    this.setState({upemail:email});
    this.setState({upmobile:mobile});
    this.setState({upaddress:address});
    //   firebase.database().ref('users/'+name).update()
  
  }
  

render(){
return(
    <>

<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Update Values</h5>




        
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <form autoComplete='on'  >
    
   
    <div className='form-group input-group col-md-12'>
        <div className='input-group-prepend'>
            <div className='input-group-text'>
                <i className='fa fa-mobile-alt'></i>
            </div>
        </div>
        <input className='form-control' placeholder='Mobile' name='mobile'
    value={this.state.upmobile}
    onChange={e=> this.setState({upmobile:e.target.value})}
  
        />
    
 





    </div>





    <div className='form-group input-group col-md-12'>
        <div className='input-group-prepend'>
            <div className='input-group-text'>
                <i className='fa fa-envelope'></i>
            </div>
        </div>
        <input className='form-control' placeholder='Email' name='email'
    value={this.state.upemail}
    onChange={e=> this.setState({upemail:e.target.value})}
       
        />
       
    
    </div>
    <div className='form-group input-group col-md-12'>
        
        <textarea className='form-control' placeholder='Address' name='address'
     value={this.state.upaddress}
     onChange={e=> this.setState({upaddress:e.target.value})}
     
       
        />
       
    </div>
    
        
    
   </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <input type="submit" value="save" className='btn btn-primary'  onClick={() => this.updateDone()}/>
      
      </div>
    </div>
  </div>
</div>






    
<div class="jumbotron jumbotron-fluid">
  <div class="container">
    <h1 class="display-4 text-center">Contact Form</h1>
  {console.log(this.state)}
  </div>
</div>
      <div className='row'>
          <div className="col-lg-4 col-md-4 col-sm-12">
          <form autoComplete='off' onSubmit={(e)=> this.Submit(e)} >
    <div className='form-group input-group col-md-12'>
        <div className='input-group-prepend'>
            <div className='input-group-text'>
                <i className='fa fa-user'></i>
            </div>
        </div>
        <input className='form-control' placeholder='Full name' name='fullname'
      onChange={e=> this.setState({fullname:e.target.value})}
        />

    </div>
   
    <div className='form-group input-group col-md-12'>
        <div className='input-group-prepend'>
            <div className='input-group-text'>
                <i className='fa fa-mobile-alt'></i>
            </div>
        </div>
        <input className='form-control' placeholder='Mobile' name='mobile'
     onChange={e=> this.setState({mobile:e.target.value})}
        />
    
 





    </div>
    <div className='form-group input-group col-md-12'>
        <div className='input-group-prepend'>
            <div className='input-group-text'>
                <i className='fa fa-envelope'></i>
            </div>
        </div>
        <input className='form-control' placeholder='Email' name='email'
       onChange={e=> this.setState({email:e.target.value})}
        />
       
    
    </div>
    <div className='form-group input-group col-md-12'>
        <div className='input-group-prepend'>
            
        </div>
        <input type="file" className='form-control'  name='image'
    onChange={this.readImages}
        />
       
    
    </div>
    <div className='form-group input-group col-md-12'>
        <div className='input-group-prepend'>
            
        </div>
        <input type="file" className='form-control'  name='song'
    onChange={this.readSong}
        />
       
    
    </div>
    <div className='form-group input-group col-md-12'>
        
        <textarea className='form-control' placeholder='Address' name='address'
        onChange={e=> this.setState({address:e.target.value})}
        
       
        />
       
    </div>
    
        <input type="submit" value="save" className='btn btn-primary btn-block'/>
        
   </form>
   
          </div>

          
          <div className="col-lg-8 col-md-8 col-sm-12">
              <div>List of Contacts</div>
              <div className='form-group input-group col-md-12'>
              <div className='input-group-prepend'>
            <div className='input-group-text'>
                <i className='fa fa-search'></i>
            </div>
        </div>
        <input className='form-control' placeholder='Search' name='search'
 onChange={e=> this.setState({search:e.target.value})}
onChange={this.filterList} 
   
       
/>
       
    
    </div>
             
              
        
              <table class="table table-striped">
    <thead>
      <tr>
        <th>Full Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Address</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {this.state.listData.map(data=>{
          return(
      <tr>
        <td>{data.fullname}</td>
        <td>{data.email}</td>
        <td>{data.mobile}</td>
        <td>{data.address}</td>
        <td>
        <button className='fa fa-trash'  onClick={() => this.delete(data.fullname)}>
      
        </button>
        <button className="fa fa-bell" aria-hidden="true" data-toggle="modal" data-target="#exampleModal" onClick={() => this.update(data.fullname,data.email,data.mobile,data.address)}  >
            </button>
        </td>
        <td>
   
            </td>
      </tr>
          );    
})}
    </tbody>
  </table>
          </div>
      </div>

      </>
);
}
}
export default Contacts;