import React,{useState,useEffect} from 'react';
const ContactForm = (props) =>{
    const intialFieldValues={
        fullname:'',
        mobile: '',
        email: '',
        address: ''
    }
var [values, setValues] = useState(intialFieldValues)
const handleInputChange = e =>{
    var {name,value} = e.target
setValues({
    ...values,
    [name]:value
})
}
const handleFormSubmit = e =>{
    e.preventDefault();
    props.addorEdit(values)
}


    return(
   <form autoComplete='off' onSubmit={handleFormSubmit}>
    <div className='form-group input-group col-md-12'>
        <div className='input-group-prepend'>
            <div className='input-group-text'>
                <i className='fa fa-user'></i>
            </div>
        </div>
        <input className='form-control' placeholder='Full name' name='fullname'
        value = {values.fullname}
        
        onChange={handleInputChange}
        />

    </div>
   
    <div className='form-group input-group col-md-12'>
        <div className='input-group-prepend'>
            <div className='input-group-text'>
                <i className='fa fa-mobile-alt'></i>
            </div>
        </div>
        <input className='form-control' placeholder='Mobile' name='mobile'
        value = {values.mobile} 
        onChange={handleInputChange}
        />
    
 





    </div>
    <div className='form-group input-group col-md-12'>
        <div className='input-group-prepend'>
            <div className='input-group-text'>
                <i className='fa fa-envelope'></i>
            </div>
        </div>
        <input className='form-control' placeholder='Email' name='email'
        value = {values.email} 
        
        onChange={handleInputChange}
        />
       
    
    </div>
    <div className='form-group input-group col-md-12'>
        
        <textarea className='form-control' placeholder='Address' name='address'
        value = {values.address} 
        
        onChange={handleInputChange}
        />
       
    </div>
    
        <input type="submit" value="save" className='btn btn-primary btn-block'/>
    
   </form>
    ); 
    
    }
    export default ContactForm;