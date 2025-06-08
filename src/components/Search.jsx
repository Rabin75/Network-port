import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import confetti from 'canvas-confetti';
import humanAvatar from './human.webp';
import { FaSearch } from 'react-icons/fa';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [portData, setPortData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [vlanMessage, setVlanMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [progress, setProgress] = useState(0);
  const [changingText, setChangingText] = useState('');
  const [showSignOut, setShowSignOut] = useState(false);

  const navigate = useNavigate();

  const toggleSignOut = () => setShowSignOut(prev => !prev);
  const handleSignOut = () => navigate('/');

  const handleLevelClick = (level) => {
    const isSame = selectedLevel === level;
    setSelectedLevel(isSame ? null : level);
    setSearchTerm('');
    setPortData([]);
    setShowTable(false);
    setEditIndex(null);
    setVlanMessage('');
    setShowSignOut(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setVlanMessage('');
  };

  const handleSearchSubmit = () => {
    if (!selectedLevel || !searchTerm) {
      alert('Please select a level and enter a desk number.');
      return;
    }

    setLoading(true);
    setShowTable(false);
    setEditIndex(null);
    setVlanMessage('');

    setTimeout(() => {
      setLoading(false);
      let results = [];
      if (selectedLevel === 44 && searchTerm === '002') {
        results = [
          { deskNo: '44-0A-I1', portNo: '002A', vlan: 700, status: 'Connected', description: 'Trade', switch: 'leaf44-et1' },
          { deskNo: '44-0A-I1', portNo: '002B', vlan: 701, status: 'Notconnected', description: 'Startarb', switch: 'leaf44-et2' },
          { deskNo: '44-0A-I1', portNo: '002C', vlan: 706, status: 'Connected', description: 'Cisco', switch: 'leaf44-et3' },
          { deskNo: '44-0A-I1', portNo: '002D', vlan: 707, status: 'Notconnected', description: 'IPC', switch: 'leaf44-et4' },
        ];
      } else if (selectedLevel === 47 && searchTerm === '001') {
        results = [
          { deskNo: '47-0A-I1', portNo: '001A', vlan: 702, status: 'Connected', description: 'Dev', switch: 'leaf04-et13' },
          { deskNo: '47-0A-I1', portNo: '001B', vlan: 703, status: 'Notconnected', description: 'Corp', switch: 'leaf04-et14' },
          { deskNo: '47-0A-I1', portNo: '001C', vlan: 706, status: 'Connected', description: 'Cisco', switch: 'leaf09-et9' },
          { deskNo: '47-0A-I1', portNo: '001D', vlan: 707, status: 'Notconnected', description: 'IPC', switch: 'leaf09-et11' },
        ];
      } else if (selectedLevel === 48 && searchTerm === '003') {
        results = [
          { deskNo: '48-0B-X1', portNo: '003A', vlan: 702, status: 'Connected', description: 'Dev', switch: 'leaf48-et10' },
          { deskNo: '48-0B-X1', portNo: '003B', vlan: 703, status: 'Notconnected', description: 'Corp', switch: 'leaf48-et11' },
          { deskNo: '48-0B-X1', portNo: '003C', vlan: 706, status: 'Connected', description: 'Cisco', switch: 'leaf48-et12' },
          { deskNo: '48-0B-X1', portNo: '003D', vlan: 707, status: 'Notconnected', description: 'IPC', switch: 'leaf48-et13' },
        ];
      }

      if (results.length) {
        setPortData(results);
        setShowTable(true);
      } else {
        alert('No data found for that desk/level.');
      }
    }, 3000);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearchSubmit();
  };

  const handleChangeClick = (index) => {
    setEditIndex(index);
    setVlanMessage('');
    setProgress(0);
  };

  const applyVlanChange = (index, newVlan) => {
    setChangingText(`Changing port ${portData[index].portNo} to ${vlanLabelMap[newVlan]}(${newVlan}) VLAN`);
    setEditIndex(null);
    setProgress(1);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          const updated = [...portData];
          updated[index].vlan = newVlan;
          updated[index].description = vlanLabelMap[newVlan] || 'Unknown';
          setPortData(updated);
          setChangingText(`Finalizing configuration for port ${updated[index].portNo}...`);
          setTimeout(() => {
            setChangingText('');
            setProgress(0); // Hide progress bar after success
            setVlanMessage(`VLAN for ${updated[index].portNo} changed to ${newVlan} successfully! 🎉`);
            confetti({ particleCount: 100, spread: 160, origin: { y: 0.6 }, startVelocity: 30 });
          }, 2500);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  const getVlanOptions = (portNo) => {
    const suffix = portNo.slice(-1);
    return suffix === 'A' || suffix === 'B' ? [700, 701, 702, 703, 704] : [706, 707];
  };

  const vlanLabelMap = {
    700: 'Trade', 701: 'Startarb', 702: 'Dev', 703: 'Corp',
    704: 'TradeSupport', 706: 'Cisco', 707: 'IPC'
  };

  return (
    <>
      <div className="fixed-top bg-white py-3 d-flex justify-content-between align-items-center px-3">
        <div className="d-flex gap-3">
          {[44, 47, 48].map((level) => (
            <button
              key={level}
              className={`btn ${selectedLevel === level ? 'btn-success' : 'btn-primary'} px-4 py-2 fs-5`}
              onClick={() => handleLevelClick(level)}
            >
              Level {level}
            </button>
          ))}
        </div>
        <div style={{ cursor: 'pointer', position: 'relative' }} onClick={toggleSignOut}>
          <img src={humanAvatar} alt="User Avatar" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
          {showSignOut && (
            <button
              className="btn btn-danger btn-sm"
              style={{ position: 'absolute', right: 0, top: '45px', whiteSpace: 'nowrap', fontSize: '10px', padding: '2px 6px' }}
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          )}
        </div>
      </div>

      <div className="container" style={{ paddingTop: '140px' }}>
        {selectedLevel && (
          <div className="d-flex gap-3 justify-content-center px-3 mb-2 fixed-top" style={{ top: '100px' }}>
            <input
              type="text"
              className="form-control w-50 py-3 fs-5"
              placeholder="Enter desk number"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
            />
            <button className="btn btn-success px-4 py-3 fs-5" onClick={handleSearchSubmit}>
              <FaSearch />
            </button>
          </div>
        )}

        <div style={{ paddingTop: selectedLevel ? '120px' : '160px' }}>
          {loading && (
            <div className="text-center my-5">
              <div className="spinner-border text-primary" role="status" />
              <p className="mt-3 fs-5">Loading desk info...</p>
            </div>
          )}

          {showTable && (
            <>
              <h4 className="mb-3 text-primary">Desk Information</h4>
              {changingText && <div className="alert alert-info fs-6 py-2 px-3">{changingText}</div>}
              {progress > 0 && (
                <div className="progress mb-3" style={{ height: '20px' }}>
                  <div
                    className="progress-bar progress-bar-striped progress-bar-animated"
                    role="progressbar"
                    style={{ width: `${progress}%`, fontSize: '14px' }}
                  >
                    {progress}%
                  </div>
                </div>
              )}

              <table className="table table-bordered">
                <thead className="table-light">
                  <tr>
                    <th>Desk no:</th>
                    <th>Port no:</th>
                    <th>VLAN</th>
                    <th>Status</th>
                    <th>Description</th>
                    <th>Switch</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {portData.map((row, index) => (
                    <tr key={index}>
                      <td>{row.deskNo}</td>
                      <td>{row.portNo}</td>
                      <td>{row.vlan}</td>
                      <td>{row.status}</td>
                      <td>{row.description}</td>
                      <td>{row.switch}</td>
                      <td>
                        {editIndex === index ? (
                          <div className="d-flex flex-column gap-1">
                            {getVlanOptions(row.portNo).map((vlanOption) => (
                              <button
                                key={vlanOption}
                                className="btn btn-sm btn-info"
                                onClick={() => applyVlanChange(index, vlanOption)}
                              >
                                {vlanLabelMap[vlanOption]} ({vlanOption})
                              </button>
                            ))}
                          </div>
                        ) : (
                          <button className="btn btn-sm btn-warning" onClick={() => handleChangeClick(index)}>
                            Change
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {vlanMessage && <div className="alert alert-success fs-5">{vlanMessage}</div>}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;

