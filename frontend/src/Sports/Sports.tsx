import { useState,useEffect } from "react";
import axios from "axios";
// import CutomAlerts from "../Components/Alerts";

import {Alert,Info} from "../Components/Notifications"



function Sports() { 
    
    const [inputValue, setInputValue] = useState('');
    const [data,setData] = useState<any[]>([]);
    const [myerror, setMyError] = useState<any[]>([]);
    const [myinfo, setMyInfo] = useState<any[]>([]);
    
    interface ResultItem {
        data: {
          data: string[],
          error: number,
          message: string,
        };
        statusCode: number;
    }

    async function callAPI(inputValue:string,
        methodtype:string,
    ){
        let result:ResultItem;


        if(methodtype == "post"){        
            await axios.post("http://localhost:3000/api/teams", 
                {"name": inputValue},
                { headers:{
                    'Content-Type': 'application/json'}
                }
            )    
            .then(function (response) {
                result = response.data;
                if(result.data.data != null){
                    if(result.data.error)
                    {
                        setMyError([...myerror,result.data.message])
                        setInputValue('')
                        return
                    }else{
                        setData(result.data.data)
                        setMyInfo([...myinfo,result.data.message])
                        setInputValue('')
                    }
                }
            })
            .catch(function (error) {
                    // error comes from nestjs validation
                    const errs = error.response.data.errors;
                    setMyError([...myerror,...errs])
                    return false;
            });         
        }

      
        if(methodtype == "get"){
            await axios.get("http://localhost:3000/api/teams",
                
                { headers:{
                    'Content-Type': 'application/json'}
                }
            )    
            .then(function (response) {
                result = response.data;
                if(result.data.data != null){
                    if(result.data.error)
                    {
                        setMyError([...myerror,result.data.message])
                        setInputValue('')
                        return
                    }else{
                        setData(result.data.data)
                        setMyInfo([...myinfo,result.data.message])
                        setInputValue('')
                    }
                }
            })
            .catch(function (error) {
                    // error comes from nestjs validation
                    const errs = error.response.data.errors;
                    setMyError([...myerror,...errs])
                    return false;
            });    
        }

        
          /*
        await axios.post("http://localhost:3000/api/teams", 
            {"name": inputValue},
            { headers:{
                'Content-Type': 'application/json'}
            }
        ).then(function (response) {
            result = response.data;
            if(result.data.error)
            {
                setMyError([...myerror,result.data.message])
                setInputValue('')
                return
            }else{
                setData(result.data.data)
            }
          })
          .catch(function (error) {
                // error comes from nestjs validation
                const errs = error.response.data.errors;
                setMyError([...myerror,...errs])
                return false;
          });
          */
          
    }

    
    const handleChange = (e:any) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = async (e:any) => {
        
        e.preventDefault();
        try {
            
            /* Validations Client side */
            setInputValue(inputValue.trim());

            //imput value is empty
            if (!inputValue) {  
                return false;
            }

            if (inputValue.length < 5 || inputValue.length > 20) { 
                setMyError([...myerror,"Team name must be between 5 and 20 characters"]) 
                return false;
            }

            /* End Validations Client side */

            
            // call api from nestjs
            callAPI(inputValue,'post')

                    
        } catch (error) {
          console.error("Error:", error);
        }
    };

    //remove one alert
    const closeAlert = (e:any) => {        
        const i = e.target.getAttribute('data-index')        
        let tmp = myerror      
        tmp.splice(i, 1)
        setMyError([...tmp])
    }

    //remove one alert
    const closeInfo = (e:any) => {        
        const i = e.target.getAttribute('data-index')        
        let tmp = myinfo      
        tmp.splice(i, 1)
        setMyInfo([...tmp])
    }

    useEffect(() => {
        // call api from nestjs when page refreshed
        callAPI('','get')
    }, []); 

  return (
    <>
        <div className="flex pt-5 overflow-hidden bg-gray-50 dark:bg-gray-900">            
            <div id="main-content" className="relative w-full h-full overflow-y-auto bg-gray-50 ml-auto mr-auto mt-0 mb-0 dark:bg-gray-900">
                <main>
                    <div className="px-4 pt-6">
                        <div className="grid gap-4 xl:grid-cols-2 2xl:grid-cols-3">
                            <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                                <div className="px-4 pt-6"> 
                                    {myerror.map((me,index)=>( me &&
                                        <Alert key={index} indexVal={index} message={me} onClose={closeAlert} />
                                    ) )} 

                                    {myinfo.map((me,index)=>( me &&
                                        <Info key={index} indexVal={index} message={me} onClose={closeInfo} />
                                    ) )}
                                </div>
                                <div className="flex items-center justify-between mb-4">
                                    <br/>
                                    <label className="block mb-2 text-gray-600 font-medium">Enter Text</label>
                                    <br/>
                                    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-96">
                                    <div className="col-span-6 sm:col-span-3">
                                        <input
                                            value={inputValue}
                                            onChange={handleChange}
                                            type="text" 
                                            placeholder="Type something..."
                                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                                        />

                                        <button disabled={!inputValue.trim()} type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
                                            Submit
                                        </button>
                                    </div>
                                    </form>
                                </div>
                            </div>
                            <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                                <table className="mt-5 min-w-full table-auto border-collapse border border-gray-300">
                                    <thead>
                                    <tr className="border-b">                                    
                                        <th className="px-4 py-2 text-left">Logo</th>
                                        <th className="px-4 py-2  text-left">Team Name</th>
                                        <th className="px-4 py-2 text-left">League Name</th>
                                        <th className="px-4 py-2 text-left">Country</th>
                                    </tr>
                                    </thead>
                                    <tbody>                        
                                        {data.map((d,index)=>((d != null ) ?
                                            <tr key={index} className={"border-b " + (index%2==0?'bg-cyan-100':'bg-sky-100')}>
                                                
                                                <td className="px-4 py-2 capitalize text-left"><img src={d.strLogo} alt={d.strTeam} width={100} height={50} /></td> 
                                                <td className="px-4 py-2 capitalize">{d.strTeam}</td>                                               
                                                <td className="px-4 py-2 capitalize">{d.strLeague}</td>
                                                <td className="px-4 py-2 capitalize">{d.strCountry}</td>
                                                
                                            </tr>  : ''                      
                                        ))}
                                    </tbody>
                                </table>
                               
                            </div>
                        </div>                     
                    </div>
                </main>               
            </div>
        </div>
    </>
  )
}

export default Sports
