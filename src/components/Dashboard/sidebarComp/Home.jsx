
import React, { useState } from "react";



function Home() {
    const [files, setFiles] = useState([]);

    const handleFileChange = (e) => {
        setFiles([...e.target.files]);
    };

    return (
        <div className="wrap">

            <h3 className="text-center mb-4 text-white">Required Documents</h3>

            {/* 2x2 Grid */}
            <div className="grid">

                {/* Identity Proof */}
                <div className="card-box accent-blue mb-4">
                    <h5 className="title-blue">Identity Proof</h5>
                    <div className="choices mt-3">
                        <label className="choice"><input type="checkbox" /> Aadhaar Card (Xerox)</label>
                        <label className="choice"><input type="checkbox" /> PAN Card (Xerox)</label>
                        <label className="choice"><input type="checkbox" /> Driving License / Voter ID</label>
                        <label className="choice"><input type="checkbox" /> Passport (if available)</label>
                    </div>
                </div>

                {/* Employment */}
                <div className="card-box accent-yellow mb-4">
                    <h5 className="title-yellow">Employment Documents</h5>
                    <div className="choices mt-3">
                        <label className="choice"><input type="checkbox" /> Previous Employment Relieving Letter</label>
                        <label className="choice"><input type="checkbox" /> Experience Certificate</label>
                        <label className="choice"><input type="checkbox" /> Latest Salary Slip</label>
                    </div>
                </div>

                {/* Educational */}
                <div className="card-box accent-green mb-4">
                    <h5 className="title-green">Educational Documents</h5>
                    <div className="choices mt-3">
                        <label className="choice"><input type="checkbox" /> 10th / SSC Marksheet</label>
                        <label className="choice"><input type="checkbox" /> 12th / HSC Marksheet</label>
                        <label className="choice"><input type="checkbox" /> Graduation / Degree Certificate</label>
                        <label className="choice"><input type="checkbox" /> Post-Graduation Certificate</label>
                    </div>
                </div>

                {/* Banking */}
                <div className="card-box accent-purple mb-4">
                    <h5 className="title-purple">Banking & Miscellaneous</h5>
                    <div className="choices mt-3">
                        <label className="choice"><input type="checkbox" /> Bank Passbook / Cancelled Cheque</label>
                        <label className="choice"><input type="checkbox" /> Passport Size Photographs</label>
                    </div>
                </div>

            </div>

            {/* Upload Section */}
            <div className="card-box accent-blue mt-4">
                <h5 className="title-blue text-center">Upload Documents</h5>

                <div className="mt-3">
                    <input
                        type="file"
                        className="form-control"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                        onChange={handleFileChange}
                    />

                    <p className="note mt-2">
                        Supported formats: PDF, JPG, PNG, DOC — Max 10MB per file
                    </p>

                    <div style={{ fontSize: "0.9rem", marginTop: "8px" }}>
                        {files.map((file, i) => (
                            <div key={i}>• {file.name}</div>
                        ))}
                    </div>
                </div>
            </div>

            {/* INTERNAL STYLES */}
            <style>{`
        :root{
          --card-bg:#fff;
          --radius:12px;
          --gap:24px;
          --blue:#1d4ed8;
          --yellow:#f59e0b;
          --green:#10b981;
          --purple:#8b5cf6;
          --shadow:0 6px 18px rgba(15,23,42,0.06);
        }

        body {
          background: linear-gradient(180deg,#0b111f 2%, #3d4046 90%);
        }

        .wrap {
          max-width: 1100px;
          margin: 40px auto;
          padding: 24px;
        }

        .card-box {
          background: var(--card-bg);
          padding: 20px;
          border-radius: var(--radius);
          border: 4px solid transparent;
          box-shadow: var(--shadow);
        }

        .grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--gap);
        }

        @media(min-width:768px) {
          .grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .accent-blue { border-color: rgba(29,78,216,0.3); }
        .accent-yellow { border-color: rgba(245,158,11,0.3); }
        .accent-green { border-color: rgba(16,185,129,0.3); }
        .accent-purple { border-color: rgba(139,92,246,0.3); }

        .title-blue { color: var(--blue); }
        .title-yellow { color: var(--yellow); }
        .title-green { color: var(--green); }
        .title-purple { color: var(--purple); }

        .choices {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .choice {
          display: flex;
          gap: 10px;
        }

        .note {
          color: #555;
          font-size: 0.85rem;
        }
      `}</style>
        </div>
    );
}

export default Home
