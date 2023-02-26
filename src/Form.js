import React, { useState,useEffect } from "react";
import "./App.css";

const Form = () => {
  const [add, setadd] = useState([1]);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [FormDataf, setFormDataf] = useState({
    TeamName: "",
    Description: "",
   
  });
  const [FormDatas, setFormDatas] = useState([{
    FullName: "",
    Email: "",
  }]);
  


  //first two value mate
  const handleInputfirst= (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormDataf((prev) => {
      return { ...prev, [name]: value };
    });
  };


  const handleInputSecond=(index,e)=>{
    const {name, value}= e.target;
    const list= [...FormDatas];
    list[index][name]= value;
    setFormDatas(list);

  }
  const handleaddclick=(e,index)=>{ 
    
    setFormDatas([...FormDatas, { FullName:'', Email:''}]);


  }

 



  const HandleSubmit = (e) => {
    e.preventDefault();
      setFormErrors(validate(FormDataf));
      setFormErrors(validate(FormDatas));

    setIsSubmit(true);
    console.log(FormDataf.TeamName,"teamName");
    console.log(FormDataf.Description,"description");
    console.log(FormDatas[0].FullName,"fullname");
    console.log(FormDatas[0].Email,"email");  
    console.log('FormDatas: ', FormDatas);
  };



  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {      
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.FullName) {
      errors.FullName = "FullName is required!";
    }
    else if (values.FullName.length >= 4) {
    }
    if (!values.Email) {
      errors.Email = "Email is required!";
    } else if (!regex.test(values.Email)) {
      errors.Email = "This is not a valid email format!";
    }
    if (!values.Description) {
      errors.Description = "Description is required";
    } 
    else if (values.Description.length >= 10) {
    }
    return errors;
  };

  const handleremove= index=>{
    const list=[...FormDatas];
    list.splice(index,1);
    setFormDatas(list);
  }


  const HandleReset = () => { 
    setFormDataf({
      TeamName: "",
      Description: "",     
    
    });
    setFormDatas({
   
      FullName: "",
      Email: "",
    });
  };


  return (
    <>  

       {/* firstpart */}
      <form onSubmit={HandleSubmit}></form>    
      <div className="container">
        <h1 className="mx-10">Add Team</h1>
        <h4 className="my-3">1.Basic Details</h4>
        <div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              TEAM NAME
            </label>
            <input
              type="text"
              className="form-control"
              name="TeamName"
              onChange={handleInputfirst}
              value={FormDataf.TeamName}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label ">
              DESCRIPTION
            </label>
            <textarea
              type="text"
              className="form-control"
              name="Description"
              onChange={handleInputfirst}
              value={FormDataf.Description}
              id="exampleInputPassword1"
              rows="8"
            />
            <p>{formErrors.Description}</p>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-9">
              <h4 className="my-4">2.Members </h4>
            </div>
            <div className="col-3">
              <button
                type="button"
                className="btn btn-light"
                onClick={handleaddclick}              >
                {" "}
                + ADD MEMBER
              </button>
            </div>
          </div>
        </div>



        {/* second part */}
        <div className="Add">
          {FormDatas.map( (input,index)=>{
            return (
              <div className="row" >
                <div className="col-5">
                  <label htmlFor="name" className="form-label">
                    FULL NAME
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="FullName"
                    onChange={e=>handleInputSecond(index,e)}
                    value={input.FullName}
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                   <p>{formErrors.FullName}</p>

                </div>
                <div className="col-5">
                  <label htmlFor="exampleInputEmail1" className="">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name="Email"
                    onChange={e=>handleInputSecond(index,e)}
                    value={input.Email}
                    id="inputPassword2"
                    placeholder=""
                  />
                   <p>{formErrors.Email}</p>
                </div>
                <div className="col-auto">
                  <button type="submit"  onClick={()=> handleremove(index)}className="btn btn-primary ">
                    -
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <button
          type="button"
          className="btn btn-light my-3 mx-2"
          onClick={HandleSubmit}
        >
          SUBMIT
        </button>
        <button
          type="button"
          className="btn btn-dark my-3 mx-2"
          onClick={HandleReset}
        >
          RESET
        </button>
      </div>
    </>
  );
};

export default Form;
