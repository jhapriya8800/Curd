import './App.css';
import { useEffect, useState } from "react";
import { EmployeeData } from './EmployeeData';
// import { clear } from '@testing-library/user-event/dist/clear';
function App() {
  const [data,setData] = useState([]);
  const [FirstName, setFirstName]= useState('')
  const[LastName,setLastName]=useState('')
  const[age,setAge]=useState(0)
  const[id ,setId]=useState(0)
  const [isUpdate , setisUpdate]=useState(false)
  useEffect(()=>{
    setData(EmployeeData)
  },[])
  const handleEdit=(id)=>{
   const dt= data.filter(item=>item.id===id)
   if(dt !== undefined){
    setisUpdate(true)
    setId(id);
    setFirstName(dt[0].firstName)
    setLastName(dt[0].LastName)
    setAge(dt[0].age)
   }
  };
  const handleDelete=(id)=>{
    if(id>0){
      if(window.confirm("Are You Sure Want Delete this Item")){
        const dt = data.filter(item=>item.id !== id)
        setData(dt)
      }

    }
  };
  const handlesave=(e)=>{
    let error=''
    if(FirstName ==='')
      error += "First Name is required ,";

    if(LastName ==='')
      error += "Last Name is required ,";

    if(age <= 0 )
      error += "age is required.";

    if(error === ''){

      
      e.preventDefault();
      const dt = [...data]
      const newObject={
        id :EmployeeData.length+1 ,
        firstName: FirstName,
        LastName:LastName,
        age:age,
      }
      
      dt.push(newObject);
      setData(dt)
    }
    else{
      alert(error)
    }
    
  };
  
  const handleclear=(id)=>{
    setisUpdate(false)
    setId(0);
    setFirstName('')
    setLastName('')
    setAge('')
  };
  const handleUpdate=()=>{
    const index =data.map((item)=>{
      return item.id
    }).indexOf(id);

    const dt = [...data];
    dt[index].firstName=FirstName
    dt[index].LastName=LastName
    dt[index].age= age
    setData(dt)
    handleclear();

  }
  return (
    <>
    <div style={{display:'flex',justifyContent:'center',marginTop:"50px",marginBottom:"60px"}}>
      <div>
        <label>First Name:
          <input type='text' placeholder='Enter First Name' onChange={(e)=>{setFirstName(e.target.value)}} value={FirstName}/>
        </label>
        <label>Last Name:
          <input type='text' placeholder='Enter Last Name' onChange={(e)=>{setLastName(e.target.value)}} value={LastName}/>
        </label>
        <label>Age:
          <input type='Number' placeholder='Enter Password' onChange={(e)=>{setAge(e.target.value)}} value={age}/>
        </label>
       {
          !isUpdate ? 
          <button className='btn btn-primary ms-4' onClick={(e)=>handlesave(e)}>Save</button>
          :
          <button className='btn btn-primary ms-4' onClick={()=>handleUpdate()}>Update</button>
       }
          <button className='btn btn-danger ms-4' onClick={()=>handleclear()}>Clear</button>
        
      </div>
    </div>
<table className='table table-hover'>
  <thead>
    <tr>
      <td>Sr.No</td>
      <td>ID</td>
      <td>FirstName</td>
      <td>LastName</td>
      <td>Age</td>
      <td>Action</td>
    </tr>
  </thead>
  <tbody>
    {
      data.map((item,index) =>{
        return(
        <tr key={index}>
          <td>{index+1}</td>
          <td>{item.id}</td>
          <td>{item.firstName}</td>
          <td>{item.LastName}</td>
          <td>{item.age}</td>
          <td>
            <button className='btn btn-primary me-4' onClick={()=>handleEdit(item.id)}>Edit</button>
            <button className='btn btn-danger' onClick={()=>handleDelete(item.id)}>Delete</button>
          </td>
        </tr>
        )
      })
    }
  </tbody>
</table>
    </>
  );
}

export default App;
