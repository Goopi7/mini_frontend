import { Navbar } from "./Navbar";
import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";


    export const Homepage = () =>{
       
            const [scanner, setScanner] = useState("");
            const [currentStudent ,setCurrentStudent] = useState(null);
            const [currentRollnumber,setCurrentRollNubmer]=useState("");
            const [currentStudentHistory,setCurrentStudentHistory] =useState([]);

            const handleReportAction = async (action) => {
              if (!scanner.trim()) {
                  alert("Please enter or scan a roll number.");
                  return;
              }
              console.log(action);
              console.log(scanner);
              try {
                  const response = await axios.post(
                      `https://mini-backend-ll7c.onrender.com/api/reportData/${scanner}`, // Use POST
                      {  action } // Send data in the request body
                  );

                console.log(response.data);
                  alert(
                      `Roll Number ${scanner} marked as ${action} successfully! 
                      Late: ${response.data.lateEntry} min, 
                      Early Exit: ${response.data.earlyExit} min`
                  );
                  setCurrentStudent(response.data);
                  console.log(response.data);
                  setCurrentRollNubmer(scanner);
                  // console.log(currentStudent.name);

                  setScanner(""); // Clear input after submission
              } catch (error) {
                  console.error("Error updating report:", error);
                  alert(error.response?.data?.message || `Failed to mark ${scanner} as ${action}.`);
              }
          };

          const formatTime = (time) => {
            if (!time) return "-";
            const date = new Date(time);
            return date.toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
              hourCycle: "h23",
            });
          };

          useEffect(() => {
            // console Student Data:", currentStudent);
          }, [currentStudent]);

          const history = async ()=>{
              axios.get(`https://mini-backend-ll7c.onrender.com/api/reportData/history/${currentRollnumber}`)
              .then(response => setCurrentStudentHistory(response.data))
              .catch(error => console.error("Error fetching reports:", error)); 
            
          }
          console.log(currentStudentHistory);
          
          const current =new Date();
          const hours = current.getHours();
          const minutes = current.getMinutes();
          if (((hours < 12) || (hours === 12 && minutes < 50) )&& scanner.length === 10) {
                handleReportAction("IN");
            }


          
        
    return(
       
<>
<div className="d-flex flex-column justify-content-between vh-100">
        <Navbar></Navbar>
        <div className="d-flex flex-column  align-items-center shadow p-5 m-auto border rounded-5">
            <div className=""> <label htmlFor="" className="m-2">Roll Number : </label>
            <input type="text" placeholder="Enter the rollnumber.." className="m-2"
            value={scanner}
            onChange={(e) =>{setScanner(e.target.value)}}/>
            </div>
           <div className="m-auto">
            <button className="btn btn-success m-2" onClick={() => handleReportAction("IN")}
              >IN</button>
            <button className="btn btn-danger m-2"  onClick={() => handleReportAction("OUT")}>OUT</button>
            </div>
            
        </div>
{currentStudent && <div style={{ overflowX: "auto", border: "2px solid black", padding: "10px"}}>
<table className="w-100 m-auto" border="1" cellPadding="10" style={{ border: "2px solid black", borderCollapse: "collapse" }}>
  <tbody>
  <tr>
    <td style={{ border: "2px solid black" }}>{currentStudent.date}</td>
    <td style={{ border: "2px solid black" }}>{currentStudent.rollNumber}</td>
    <td style={{ border: "2px solid black" }} onClick={() => history()}>{currentStudent.name}</td>
    <td style={{ border: "2px solid black" }}>{currentStudent.branch}</td>
    <td style={{ border: "2px solid black" }}>{formatTime(currentStudent.Intime)}</td>
    <td style={{ 
  border: "2px solid black", 
  color: currentStudent.lateEntry ? "red" : "black"
}}>
  {currentStudent.lateEntry
    ? `${Math.floor(currentStudent.lateEntry / 60)}:${(currentStudent.lateEntry % 60).toString().padStart(2, "0")}`
    : "-"}
</td>          
                  <td style={{ border: "2px solid black" }}>{formatTime(currentStudent.OutTime)}</td>
                  <td style={{ 
  border: "2px solid black", 
  color: currentStudent.earlyExit ? "red" : "black"
}}>
  {currentStudent.earlyExit
    ? `${Math.floor(currentStudent.earlyExit / 60)}:${(currentStudent.earlyExit % 60).toString().padStart(2, "0")}`
    : "-"}
</td>


  </tr>
  </tbody>
  </table>
</div>
    }

{currentStudentHistory.length > 0 && (
  <div style={{ overflowX: "auto", marginTop: "20px", border: "2px solid black", padding: "10px" }}>
    <h4 className="text-center mb-3">Attendance History</h4>
    <table className="w-100" border="1" cellPadding="10" style={{ border: "2px solid black", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th>Date</th>
          <th>In Time</th>
          <th>Late Entry</th>
          <th>Out Time</th>
          <th>Early Exit</th>
        </tr>
      </thead>
      <tbody>
        {currentStudentHistory.map((record, index) => (
          <tr key={index}>
            <td>{record.date}</td>
            <td>{formatTime(record.checkInTime)}</td>
            <td style={{ color: record.lateEntry ? "red" : "black" }}>
              {record.lateEntryDuration ? `${Math.floor(record.lateEntryDuration / 60)}:${(record.lateEntryDuration % 60).toString().padStart(2, "0")}` : "-"}
            </td>
            <td>{formatTime(record.checkOutTime)}</td>
            <td style={{ color: record.earlyExitDuration ? "red" : "black" }}>
              {record.earlyExitDuration ? `${Math.floor(record.earlyExitDuration / 60)}:${(record.earlyExitDuration % 60).toString().padStart(2, "0")}` : "-"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

        <footer className="bg-primary  py-4 ">

           
           
           

        </footer>
</div>

       
</>
    );
}