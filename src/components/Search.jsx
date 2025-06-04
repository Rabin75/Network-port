import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import confetti from 'canvas-confetti'; // 🎉 Import confetti effect

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [error, setError] = useState('');
  const [tableData, setTableData] = useState(null);
  const [showChangeVlanButton, setShowChangeVlanButton] = useState(false);
  const [showVlanOptions, setShowVlanOptions] = useState(false);
  const [vlanMessage, setVlanMessage] = useState('');

  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate('/');
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setError('');
  };

  const handleSubmit = () => {
    setVlanMessage('');
    setShowVlanOptions(false);
    setShowChangeVlanButton(false);

    if (!selectedLevel && searchTerm) {
      alert('Please select a level first!');
      return;
    }

    if (selectedLevel && !searchTerm) {
      alert('Please enter a desk number!');
      return;
    }

    let tableConfig = {
      deskNo: searchTerm,
      dataPort: ['N/A'],
      voicePort: 'N/A',
      status: { A: 'N/A', B: 'N/A' },
      vlan: 'N/A',
      switch: 'N/A',
    };

    if (selectedLevel === 44 && searchTerm === '001') {
      tableConfig = {
        deskNo: '001',
        dataPort: ['001A', '001B'],
        voicePort: '001D',
        status: { A: 'Connected', B: 'Disconnected' },
        vlan: 'Trade',
        switch: 'brn47-oo1-et1',
      };
      setShowChangeVlanButton(true);
    } else if (selectedLevel === 47 && searchTerm === '002') {
      tableConfig = {
        deskNo: '002',
        dataPort: ['002A', '002B'],
        voicePort: '002D',
        status: { A: 'Connected', B: 'Disconnected' },
        vlan: 'Corp',
        switch: 'brn47-oo2-et1',
      };
      setShowChangeVlanButton(true);
    } else if (selectedLevel === 48 && searchTerm === '003') {
      tableConfig = {
        deskNo: '003',
        dataPort: ['003A', '003B'],
        voicePort: '003D',
        status: { A: 'Connected', B: 'Disconnected' },
        vlan: 'Dev',
        switch: 'brn47-oo3-et1',
      };
      setShowChangeVlanButton(true);
    }

    setTableData(tableConfig);
  };

  const handleVlanChange = () => {
    setShowVlanOptions(true);
    setVlanMessage('');
  };

  const applyVlanChange = (newVlan) => {
    if (tableData) {
      setTableData((prev) => ({ ...prev, vlan: newVlan }));
      setShowVlanOptions(false);
      setVlanMessage(`VLAN changed to ${newVlan} successfully! 🎉`);
      confetti({ particleCount: 100, spread: 160, origin: { y: 0.6 } });
    }
  };

  return (
    <>
      {/* Fixed Top Bar */}
      <div className="fixed-top bg-white py-3 d-flex flex-column align-items-start ps-3">
        <div className="d-flex gap-3">
          <button className={`btn ${selectedLevel === 44 ? 'btn-success' : 'btn-primary'} px-5 py-3 fs-5`} onClick={() => setSelectedLevel(44)}>Level 44</button>
          <button className={`btn ${selectedLevel === 47 ? 'btn-success' : 'btn-primary'} px-5 py-3 fs-5`} onClick={() => setSelectedLevel(47)}>Level 47</button>
          <button className={`btn ${selectedLevel === 48 ? 'btn-success' : 'btn-primary'} px-5 py-3 fs-5`} onClick={() => setSelectedLevel(48)}>Level 48</button>
        </div>

        {/* Search + Enter + Sign Out */}
        <div className="d-flex gap-3 w-100 mt-3 align-items-center justify-content-between">
          <input
            type="text"
            className="form-control w-50 py-3 fs-5"
            placeholder="Enter desk number or port number"
            value={searchTerm}
            onChange={handleSearch}
          />
          <button className="btn btn-success px-5 py-3 fs-5" onClick={handleSubmit}> Enter </button>
          <button className="btn btn-danger px-5 py-3 fs-5" onClick={handleSignOut}> Sign Out </button>
        </div>
      </div>

      {/* Desk Information Table */}
      {tableData && (
        <div className="container mt-5 d-flex gap-4 align-items-start pt-5">
          <div>
            <h4>Desk Information</h4>
            <table className="table table-bordered">
              <tbody>
                <tr><th>Desk No</th><td>{tableData.deskNo}</td></tr>
                <tr><th>Data Port</th><td>{tableData.dataPort.join(', ')}</td></tr>
                <tr><th>Voice Port</th><td>{tableData.voicePort}</td></tr>
                <tr><th>Status</th><td>A: {tableData.status.A}, B: {tableData.status.B}</td></tr>
                <tr><th>VLAN</th><td>{tableData.vlan}</td></tr>
                <tr><th>Switch</th><td>{tableData.switch}</td></tr>
              </tbody>
            </table>
          </div>

          {/* VLAN Actions */}
          {showChangeVlanButton && (
            <div>
              {!showVlanOptions && (
                <button className="btn btn-warning px-4 py-2 fs-5" onClick={handleVlanChange}>Change VLAN</button>
              )}

              {showVlanOptions && (
                <div className="mt-3">
                  <h5>Select VLAN:</h5>
                  <div className="d-flex flex-column gap-2">
                    {['Trade', 'Corp', 'Dev', 'Trade Support', 'Startarb'].map((vlan) => (
                      <button key={vlan} className="btn btn-info px-4 py-2 fs-5" onClick={() => applyVlanChange(vlan)}>{vlan}</button>
                    ))}
                  </div>
                </div>
              )}

              {vlanMessage && <div className="alert alert-success mt-3 fs-5">{vlanMessage} 🎉✨</div>}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Search;
