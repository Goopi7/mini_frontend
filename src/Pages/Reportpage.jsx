import { Navbar } from "./Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";

export const Reportpage = () => {
    const [reports, setReports] = useState([]);
    const [filterReport,setFilterReport] = useState([]);

    useEffect(() => {
        axios.get("https://mini-backend-ll7c.onrender.com/api/report/")
            .then(response => 
                {
                    setReports(response.data)
                    setFilterReport(response.data);
                }
                )
            
            .catch(error => console.error("Error fetching reports:", error));
    }, []);

    // 🔹 Group reports by date
    const groupedReports = filterReport.reduce((acc, report) => {
        if (!acc[report.date]) {
            acc[report.date] = [];
        }
        acc[report.date].push(report);
        return acc;
    }, {});
    const filter = () => {
        const name = document.getElementById("name").value.trim().toLowerCase();
        const rollnumber = document.getElementById("roll").value.trim();
        const branch = document.getElementById("branch").value.trim().toLowerCase();
        const from = document.getElementById("from").value;
        const to = document.getElementById("to").value;
    
        let filtered = reports;
    
        if (name) {
            filtered = filtered.filter(report => report.name.toLowerCase().includes(name));
        }
        if (rollnumber) {
            filtered = filtered.filter(report => report.rollNumber.includes(rollnumber));
        }
        if (branch) {
            filtered = filtered.filter(report => report.branch.toLowerCase().includes(branch));
        }
        if (from && to) {
            if (new Date(from) > new Date(to)) {
                alert("Invalid Date Range!");
                return;
            }
            filtered = filtered.filter(report =>
                new Date(report.date) >= new Date(from) && new Date(report.date) <= new Date(to)
            );
        }
    
        setFilterReport(filtered);
    };
    

    return (
        <>
            <Navbar />
            <div style={{ border: "2px solid black", padding: "10px", zIndex: -1, paddingTop: "80px" }} className="m-auto d-flex flex-wrap gap-4 align-items-center justify-content-center">
  
            <div>
    <label htmlFor="name" className="me-2 fw-bold">Name :</label>
    <input type="text" id="name"  placeholder="Enter Name" className="form-control d-inline w-auto" />
  </div>
  {/* Roll Number Input */}
  <div>
    <label htmlFor="roll" className="me-2 fw-bold">Roll Number:</label>
    <input type="text" id="roll" placeholder="Enter Roll Number" className="form-control d-inline w-auto" />
  </div>

  {/* From and To Dates */}
  <div>
    <label htmlFor="from" className="me-2 fw-bold">From:</label>
    <input type="date" id="from" className="form-control d-inline w-auto me-3" />

    <label htmlFor="to" className="me-2 fw-bold">To:</label>
    <input type="date" id="to" className="form-control d-inline w-auto" />
  </div>

  {/* Branch Input */}
  <div>
    <label htmlFor="branch" className="me-2 fw-bold">Department : </label>
    <select type="text" id="branch" placeholder="Enter Branch" className="form-control d-inline w-auto" >
    <option value="">All</option>
        <option value="cse">CSE</option>
        <option value="it">IT</option>
        <option value="csd">CSD</option>
        <option value="aiml">AI&ML</option>
        <option value="aids">AIDS</option>
        <option value="ece">ECE</option>
        <option value="eee">EEE</option>
        <option value="mech">MECH</option>
        <option value="civil">CIVIL</option>
        
    </select>
  </div>

  {/* Search Button */}
  <div>
    <button className="btn btn-primary mt-3" onClick={()=>{filter()}}>Search 🔍</button>
  </div>
</div>


            <div style={{ overflowX: "auto", border: "2px solid black", padding: "10px", zIndex:-1, paddingTop:"30px"}}>
                <table className="w-100 m-auto" border="1" cellPadding="10" style={{ border: "2px solid black", borderCollapse: "collapse" }}>
                    <thead >
                        <tr style={{ border: "2px solid black" }}>
                           
                            <th style={{ border: "2px solid black" }}>S.NO</th>
                            <th style={{ border: "2px solid black" }}>Roll Number</th>
                            <th style={{ border: "2px solid black" }}>Name</th>
                            <th style={{ border: "2px solid black" }}>Branch</th>
                            <th style={{ border: "2px solid black" }}>Check-In</th>
                            <th style={{ border: "2px solid black" }}>Late By (min)</th>
                            <th style={{ border: "2px solid black" }}>Check-Out</th>
                            <th style={{ border: "2px solid black" }}>Early By (min)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(groupedReports).map((date, dateIndex) => (
                            <React.Fragment key={dateIndex}>
                                <tr style={{ backgroundColor: "#f0f0f0", fontWeight: "bold" }}>
                                    <td style={{ border: "2px solid black", textAlign: "center" }} colSpan="9">{date}</td>
                                </tr>
                                {groupedReports[date].map((report, index) => (
                                    <tr key={index}>
                                        
                                        <td style={{ border: "2px solid black" }}>{index + 1}</td>
                                        <td style={{ border: "2px solid black" }}>{report.rollNumber}</td>
                                        <td style={{ border: "2px solid black" }}>{report.name}</td>
                                        <td style={{ border: "2px solid black" }}>{report.branch}</td>
                                        <td style={{ border: "2px solid black" }}>
    {report.lateEntryDuration > 0
        ? Math.floor((report.lateEntryDuration + 550) / 60) + ":" + ((report.lateEntryDuration + 550) % 60).toString().padStart(2, '0')
        : "-"
    }
    
    
</td>
<td style={{ border: "2px solid black" }}>
     {report.lateEntryDuration ? report.lateEntryDuration :"-"} 
</td>

<td style={{ border: "2px solid black" }}>
    {report.earlyExitDuration  > 0
        ? Math.floor((980 - report.earlyExitDuration ) / 60) + ":" + ((980 - report.earlyExitDuration ) % 60).toString().padStart(2, '0')
        : "-"
    }
    
    
</td>
<td style={{ border: "2px solid black" }}>
     {report.earlyExitDuration ? report.earlyExitDuration : "-"} 
</td></tr>
                                ))}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};
